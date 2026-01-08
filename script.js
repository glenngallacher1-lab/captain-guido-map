/* ==============================
   CONFIGURATION
   ============================== */

// Total loop duration in seconds
const TOTAL_ANIMATION_TIME = 15;

// Chapter route (order = story order)
const chapters = [
  { name: "Port of Ostia", coords: [41.73, 12.29], unlocked: true },
  { name: "Cairo / Red Sea", coords: [30.8, 32.3], unlocked: false },
  { name: "Arabian Sea", coords: [15, 65], unlocked: false },
  { name: "Indian Ocean", coords: [-10, 80], unlocked: false },
  { name: "Philippine Sea", coords: [15, 130], unlocked: false },
  { name: "South Pacific", coords: [-20, -140], unlocked: false },
  { name: "North Pacific", coords: [35, -160], unlocked: false },
  { name: "Bering Sea", coords: [58, -175], unlocked: false },
  { name: "Arctic Ocean", coords: [75, 0], unlocked: false },
  { name: "Gulf of America", coords: [25, -90], unlocked: false },
  { name: "South Atlantic", coords: [-40, -20], unlocked: false }, // pushed south
  { name: "Return to Ostia", coords: [41.73, 12.29], unlocked: false },
];

/* ==============================
   MAP SETUP
   ============================== */

const map = L.map("map", {
  worldCopyJump: true,
  zoomControl: false,
}).setView([0, 0], 2);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  { attribution: "" }
).addTo(map);

/* ==============================
   ICONS
   ============================== */

const shipIcon = L.divIcon({
  className: "ship",
  html: "⚓",
  iconSize: [24, 24],
});

function createPing(color) {
  return L.circleMarker([0, 0], {
    radius: 4,
    color,
    fillColor: color,
    fillOpacity: 0.8,
  });
}

/* ==============================
   CREATE SMOOTH CURVE
   ============================== */

function catmullRomSpline(points, segmentsPerLeg = 50) {
  const result = [];
  const pts = points.slice();
  pts.unshift(points[0]); // duplicate first point
  pts.push(points[points.length - 1]); // duplicate last point

  for (let i = 0; i < pts.length - 3; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const p2 = pts[i + 2];
    const p3 = pts[i + 3];

    for (let t = 0; t < 1; t += 1 / segmentsPerLeg) {
      const t2 = t * t;
      const t3 = t2 * t;

      const lat =
        0.5 *
        ((2 * p1[0]) +
          (-p0[0] + p2[0]) * t +
          (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
          (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);

      const lng =
        0.5 *
        ((2 * p1[1]) +
          (-p0[1] + p2[1]) * t +
          (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
          (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);

      result.push([lat, lng]);
    }
  }
  result.push(points[points.length - 1]);
  return result;
}

const routeCoords = catmullRomSpline(chapters.map(c => c.coords), 100);

L.polyline(routeCoords, {
  color: "#ffffff",
  weight: 2,
  opacity: 0.8,
}).addTo(map);

/* ==============================
   MARKERS
   ============================== */

chapters.forEach(chapter => {
  const color = chapter.unlocked ? "#d87a32" : "#2ecc71";
  createPing(color).setLatLng(chapter.coords).addTo(map);
});

/* ==============================
   SHIP ANIMATION
   ============================== */

const ship = L.marker(routeCoords[0], { icon: shipIcon }).addTo(map);

let progress = 0;
const totalFrames = TOTAL_ANIMATION_TIME * 60; // 60fps

function animateShip() {
  progress = (progress + 1) % totalFrames;
  const index = Math.floor((progress / totalFrames) * routeCoords.length);
  ship.setLatLng(routeCoords[index]);
  requestAnimationFrame(animateShip);
}

animateShip();
