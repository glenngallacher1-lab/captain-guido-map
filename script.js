const map = L.map("map", {
  worldCopyJump: true,
  zoomControl: false
}).setView([20, 0], 2);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  { attribution: "" }
).addTo(map);

const shipIcon = L.divIcon({
  className: "ship",
  html: "🚢",
  iconSize: [28, 28]
});

const route = [
  [41.73, 12.29],
  [30.8, 32.3],
  [20, 38],
  [-10, 80],
  [15, 130],
  [-21.694129, -147.915508],
  [-40, -120],
  [-55, -90],
  [-58.28392, -59.1938],
  [10, -40],
  [35, -45],
  [25, -90],
  [39.0915, -174.3706],
  [58, -175],
  [41.73, 12.29]
];

L.polyline(route, {
  color: "#ffffff",
  weight: 2,
  opacity: 0.8
}).addTo(map);

const ship = L.marker(route[0], { icon: shipIcon }).addTo(map);

let i = 0;
let t = 0;
const speed = 0.0005;

function animate() {
  const a = route[i];
  const b = route[i + 1];

  if (!b) {
    i = 0;
    t = 0;
    requestAnimationFrame(animate);
    return;
  }

  const lat = a[0] + (b[0] - a[0]) * t;
  const lng = a[1] + (b[1] - a[1]) * t;

  ship.setLatLng([lat, lng]);

  t += speed;

  if (t >= 1) {
    t = 0;
    i++;
  }

  requestAnimationFrame(animate);
}

animate();

