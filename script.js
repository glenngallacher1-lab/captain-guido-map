// Initialize map
const map = L.map('map').setView([30, 20], 3);

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

// Place ship at starting point
const ship = L.marker(chapters[0].coords, {
  icon: shipIcon
}).addTo(map);

// Animate ship movement
function animateShip() {
