const map = L.map("map", {
  zoomControl: false,
  worldCopyJump: true
}).setView([0, -30], 2);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png").addTo(map);

const route = [
  [41.9, 12.5],
  [15, -25],
  [-10, -45],
  [-30, -65],
  [-45, -80],
  [-40, -110]
];

L.polyline(route, {
  color: "#ffffff",
  weight: 2.5,
  opacity: 0.9
}).addTo(map);

const ship = L.marker(route[0], {
  icon: L.divIcon({
    className: "ship",
    html: "⛵",
    iconSize: [22, 22]
  })
}).addTo(map);

let i = 0;
let t = 0;
const speed = 0.0012;

function animate() {
  if (i >= route.length - 1) return;

  const a = route[i];
  const b = route[i + 1];

  t += speed;
  if (t >= 1) {
    t = 0;
    i++;
  }

  const lat = a[0] + (b[0] - a[0]) * t;
  const lng = a[1] + (b[1] - a[1]) * t;

  ship.setLatLng([lat, lng]);
  requestAnimationFrame(animate);
}

animate();

