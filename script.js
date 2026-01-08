/* =========================
   🔧 EDIT CHAPTER SETTINGS
   ========================= */

const chapters = [
  { name: "Port of Ostia", x: 480, y: 210, unlockTime: 0 },
  { name: "Cairo", x: 520, y: 220, unlockTime: 6 },
  { name: "Arabian Sea", x: 600, y: 240, unlockTime: 12 },
  { name: "Indian Ocean", x: 680, y: 260, unlockTime: 18 },
  { name: "Philippine Sea", x: 760, y: 280, unlockTime: 24 },
  { name: "South Pacific", x: 840, y: 300, unlockTime: 30 },
];

/*
🔥 WHEN YOU RELEASE A NEW CHAPTER:
- add a new object
- increase unlockTime
- THAT’S IT
*/

const LOOP_DURATION = 36; // seconds for full loop

/* ========================= */

const svg = document.getElementById("world-map");
const ship = document.getElementById("ship");
const path = document.getElementById("route-path");
const nodesGroup = document.getElementById("nodes");

const pathLength = path.getTotalLength();
let startTime = null;

/* Create nodes */
chapters.forEach((c, index) => {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  node.setAttribute("cx", c.x);
  node.setAttribute("cy", c.y);
  node.setAttribute("r", 4);
  node.classList.add("node");

  if (index === 0) node.classList.add("unlocked");

  nodesGroup.appendChild(node);

  c.element = node;
});

/* Animation loop */
function animate(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = (timestamp - startTime) / 1000;

  const progress = (elapsed % LOOP_DURATION) / LOOP_DURATION;
  const point = path.getPointAtLength(progress * pathLength);

  ship.setAttribute("cx", point.x);
  ship.setAttribute("cy", point.y);

  chapters.forEach(c => {
    if (elapsed >= c.unlockTime && !c.element.classList.contains("unlocked")) {
      c.element.classList.add("unlocked");

      // Ping effect
      const ping = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      ping.setAttribute("cx", c.x);
      ping.setAttribute("cy", c.y);
      ping.setAttribute("r", 4);
      ping.classList.add("ping");
      svg.appendChild(ping);

      setTimeout(() => ping.remove(), 2000);
    }
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
