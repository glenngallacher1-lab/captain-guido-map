/**
 * CGC Google OAuth Setup
 * Run once: node auth.js
 * Saves your token to token.json for future use.
 */

const { google } = require('googleapis');
const fs = require('fs');
const http = require('http');
const url = require('url');

const CREDS_FILE = './credentials.json';
const TOKEN_FILE = './token.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

if (!fs.existsSync(CREDS_FILE)) {
  console.error(`
  ❌  credentials.json not found.

  Follow these steps:
  1. Go to https://console.cloud.google.com/
  2. Create a new project (e.g. "CGC Tools")
  3. Enable the Google Sheets API:
       APIs & Services → Enable APIs → search "Google Sheets API" → Enable
  4. Create OAuth credentials:
       APIs & Services → Credentials → Create Credentials → OAuth client ID
       Application type: Desktop app
       Name: CGC Sync
  5. Download the JSON → save as  tools/credentials.json
  6. Run:  node auth.js
  `);
  process.exit(1);
}

const creds = JSON.parse(fs.readFileSync(CREDS_FILE));
const { client_id, client_secret, redirect_uris } = creds.installed || creds.web;

const oauth2 = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3456/oauth2callback');

const authUrl = oauth2.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent'
});

console.log('\n⚓ CGC Google Sheets Auth\n');
console.log('Opening browser for Google login...');
console.log('If it does not open, visit:\n' + authUrl + '\n');

// Try to open the browser
const open = (u) => {
  const { exec } = require('child_process');
  exec(`open "${u}" 2>/dev/null || xdg-open "${u}" 2>/dev/null || start "${u}"`);
};
open(authUrl);

// Local server to catch the redirect
const server = http.createServer(async (req, res) => {
  const qs = url.parse(req.url, true).query;
  if (!qs.code) { res.end('No code received.'); return; }

  res.end('<h2 style="font-family:monospace;color:#0a2540">✓ Authenticated! You can close this tab.</h2>');
  server.close();

  try {
    const { tokens } = await oauth2.getToken(qs.code);
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
    console.log('✓ Token saved to token.json');
    console.log('\nNow run:  npm run sync\n');
  } catch (err) {
    console.error('Error getting token:', err.message);
  }
});

server.listen(3456, () => {
  console.log('Waiting for Google callback on localhost:3456...');
});
