/* ==============================
   EDIT SECTION (TOUCH THIS ONLY)
   ============================== */

// Total loop duration in seconds
const TOTAL_ANIMATION_TIME = 20;

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
  { name: "South Atlantic", coords: [-25, -20], unlocked: false },
  { name: "Return to Ostia", coords: [41.73, 12.29], unlocked: false },
];

/* ==============================
   MAP SETUP
   ============================== */

const map = L.map("map", {
  worldCopyJump: true,
  zoomControl: false,
}).setView([20, 0], 2);

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
   DRAW ROUTE
   ============================== */

const routeCoords = chapters.map(c => c.coords);

L.polyline(routeCoords, {
  color: "#ffffff",
  weight: 2,
  opacity: 0.6,
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

const ship = L.marker(chapters[0].coords, { icon: shipIcon }).addTo(map);

let leg = 0;
let progress = 0;

const stepsPerLeg = (TOTAL_ANIMATION_TIME * 60) / (chapters.length - 1);

function animateShip() {
  const start = chapters[leg].coords;
  const end = chapters[leg + 1].coords;

  progress += 1 / stepsPerLeg;

  const lat = start[0] + (end[0] - start[0]) * progress;
  const lng = start[1] + (end[1] - start[1]) * progress;

  ship.setLatLng([lat, lng]);

  if (progress >= 1) {
    progress = 0;
    leg++;

    if (leg >= chapters.length - 1) {
      leg = 0;
      ship.setLatLng(chapters[0].coords);
    }
  }

  requestAnimationFrame(animateShip);
}

animateShip();
