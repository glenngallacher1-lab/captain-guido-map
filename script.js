// Initialize map centered on Port of Ostia
const map = L.map('map').setView([41.73, 12.29], 4);

// Dark ocean-style map tiles
L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  {
    attribution: ''
  }
).addTo(map);

// Ship icon
const shipIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/77/77305.png',
  iconSize: [40, 40],
});

// Chapter locations (route points)
const chapters = [
  { name: "Port of Ostia", coords: [41.73, 12.29] },
  { name: "Cairo / Red Sea", coords: [30.8, 32.3] },
  { name: "Arabian Sea", coords: [15, 65] },
  { name: "Indian Ocean", coords: [-10, 80] },
  { name: "Philippine Sea", coords: [15, 130] },
  { name: "North Atlantic Gyre", coords: [35, -45] },
];

// Draw route line
const routeCoords = chapters.map(c => c.coords);
L.polyline(routeCoords, {
  color: 'cyan',
  weight: 3,
  dashArray: '6 6'
}).addTo(map);

// Animation variables
let currentLeg = 0;
let progress = 0;

// Place ship at starting point with popup
const ship = L.marker(chapters[0].coords, {
  icon: shipIcon
}).addTo(map)
  .bindPopup(`🚢 ${chapters[0].name}`)
  .openPopup();

// Animate ship movement along the route
function animateShip() {
  if (currentLeg >= chapters.length - 1) return;

  const start = chapters[currentLeg].coords;
  const end = chapters[currentLeg + 1].coords;

  progress += 0.002; // speed control

  const lat = start[0] + (end[0] - start[0]) * progress;
  const lng = start[1] + (end[1] - start[1]) * progress;

  ship.setLatLng([lat, lng]);

  if (progress >= 1) {
    progress = 0;
    currentLeg++;

    ship.bindPopup(`🚢 ${chapters[currentLeg].name}`).openPopup();
  }

  requestAnimationFrame(animateShip);
}

// Start the animation
animateShip();
