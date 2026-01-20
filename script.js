const map = L.map("map", { zoomControl: false, worldCopyJump: true }).setView([10, 0], 2);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png").addTo(map);

const pts = [
  [41.73, 12.29],
  [30.8, 31.0],
  [22.0, 38.0],
  [-10, 80],
  [15, 130],
  [-21.694129, -147.915508],
  [-35, -150],
  [-50, -140],
  [-58.28392, -59.1938],
  [-40, -30],
  [25, -90],
  [40, -40],
  [41.73, 12.29]
];

function curve(p, n = 80) {
  const r = [];
  const q = [p[0], ...p, p[p.length - 1]];
  for (let i = 0; i < q.length - 3; i++) {
    for (let t = 0; t <= 1; t += 1 / n) {
      const t2 = t * t;
      const t3 = t2 * t;
      const lat =
        0.5 *
        ((2 * q[i + 1][0]) +
          (-q[i][0] + q[i + 2][0]) * t +
          (2 * q[i][0] - 5 * q[i + 1][0] + 4 * q[i + 2][0] - q[i + 3][0]) * t2 +
          (-q[i][0] + 3 * q[i + 1][0] - 3 * q[i + 2][0] + q[i + 3][0]) * t3);
      const lng =
        0.5 *
        ((2 * q[i + 1][1]) +
          (-q[i][1] + q[i + 2][1]) * t +
          (2 * q[i][1] - 5 * q[i + 1][1] + 4 * q[i + 2][1] - q[i + 3][1]) * t2 +
          (-q[i][1] + 3 * q[i + 1][1] - 3 * q[i + 2][1] + q[i + 3][1]) * t3);
      r.push([lat, lng]);
    }
  }
  return r;
}

const path = curve(pts, 120);

L.polyline(path, { color: "#ffffff", weight: 2, opacity: 0.85 }).addTo(map);

const ship = L.marker(path[0], {
  icon: L.divIcon({ html: "⛵", iconSize: [22, 22], className: "ship" })
}).addTo(map);

let i = 0;
const speed = 0.12;

function move() {
  i = (i + speed) % path.length;
  ship.setLatLng(path[Math.floor(i)]);
  requestAnimationFrame(move);
}

move();
