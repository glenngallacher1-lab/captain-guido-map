/**
 * CGC → Google Sheets Sync
 * Pushes charities.csv and the debug log to Google Sheets.
 * Run: node sync.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDS_FILE  = './credentials.json';
const TOKEN_FILE  = './token.json';
const CHARITIES   = path.join(__dirname, '../charities.csv');
const SCOPES      = ['https://www.googleapis.com/auth/spreadsheets'];

// ── Auth ─────────────────────────────────────────────────────────────────────
function getAuth() {
  if (!fs.existsSync(CREDS_FILE)) {
    console.error('❌  Run  npm run auth  first.');
    process.exit(1);
  }
  if (!fs.existsSync(TOKEN_FILE)) {
    console.error('❌  No token found. Run  npm run auth  first.');
    process.exit(1);
  }

  const creds = JSON.parse(fs.readFileSync(CREDS_FILE));
  const { client_id, client_secret } = creds.installed || creds.web;
  const oauth2 = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3456/oauth2callback');
  oauth2.setCredentials(JSON.parse(fs.readFileSync(TOKEN_FILE)));
  return oauth2;
}

// ── Parse CSV ─────────────────────────────────────────────────────────────────
function parseCSV(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n');
  return lines.map(line => {
    // Handle quoted fields with commas inside
    const cols = [];
    let cur = '', inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === ',' && !inQ) { cols.push(cur); cur = ''; continue; }
      cur += ch;
    }
    cols.push(cur);
    return cols;
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const auth   = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  // Load stored sheet ID (so we reuse the same sheet each run)
  const ID_FILE = './sheet-id.json';
  let spreadsheetId;

  if (fs.existsSync(ID_FILE)) {
    spreadsheetId = JSON.parse(fs.readFileSync(ID_FILE)).id;
    console.log(`⚓ Using existing sheet: ${spreadsheetId}`);
  } else {
    // Create a new spreadsheet
    const created = await sheets.spreadsheets.create({
      requestBody: {
        properties: { title: 'CGC — Oceanic Charities & Updates' },
        sheets: [
          { properties: { title: 'Charities', index: 0 } },
          { properties: { title: 'Debug Log', index: 1 } }
        ]
      }
    });
    spreadsheetId = created.data.spreadsheetId;
    fs.writeFileSync(ID_FILE, JSON.stringify({ id: spreadsheetId }));
    console.log(`✓ Created new spreadsheet: ${spreadsheetId}`);
    console.log(`  Open: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
  }

  // ── Push charities ───────────────────────────────────────────────────────
  const charityRows = parseCSV(CHARITIES);

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: 'Charities!A1:Z1000'
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Charities!A1',
    valueInputOption: 'RAW',
    requestBody: { values: charityRows }
  });

  // Style header row
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.957, green: 0.659, blue: 0.208 }, // gold #f4a836
                textFormat: { bold: true, foregroundColor: { red: 0.04, green: 0.145, blue: 0.251 } } // navy
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat)'
          }
        },
        {
          autoResizeDimensions: {
            dimensions: { sheetId: 0, dimension: 'COLUMNS', startIndex: 0, endIndex: 6 }
          }
        }
      ]
    }
  });

  console.log(`✓ Charities synced (${charityRows.length - 1} entries)`);

  // ── Push debug log if it exists ──────────────────────────────────────────
  const DEBUG_LOG = path.join(__dirname, '../debug-log.json');
  if (fs.existsSync(DEBUG_LOG)) {
    const log = JSON.parse(fs.readFileSync(DEBUG_LOG));
    const logRows = [['Date', 'Type', 'Description']];
    log.forEach(e => logRows.push([e.date, e.type, e.desc]));

    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Debug Log!A1:Z1000'
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Debug Log!A1',
      valueInputOption: 'RAW',
      requestBody: { values: logRows }
    });

    console.log(`✓ Debug log synced (${log.length} entries)`);
  }

  console.log(`\n✓ Done. Sheet URL:`);
  console.log(`  https://docs.google.com/spreadsheets/d/${spreadsheetId}\n`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
