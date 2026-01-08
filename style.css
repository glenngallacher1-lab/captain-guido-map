* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0b0e11;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
  color: white;
}

#map-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#world-map {
  width: 90%;
  max-width: 1200px;
}

/* Continents */
.continent {
  fill: #14181f;
  opacity: 0.9;
}

/* Route */
#route-path {
  fill: none;
  stroke: #ffffff;
  stroke-width: 1.5;
  opacity: 0.7;
  stroke-dasharray: 4 6;
}

/* Ship */
#ship {
  fill: #ffffff;
  filter: drop-shadow(0 0 6px rgba(255,255,255,0.4));
}

/* Nodes */
.node {
  fill: #1f8f4c; /* locked = green (Malinov) */
  transition: fill 3.5s ease;
}

.node.unlocked {
  fill: #d98a32; /* muted orange */
}

/* Ping effect */
.ping {
  fill: none;
  stroke: rgba(217,138,50,0.4);
  stroke-width: 1;
  animation: ping 2s ease-out infinite;
}

@keyframes ping {
  from {
    r: 4;
    opacity: 0.8;
  }
  to {
    r: 18;
    opacity: 0;
  }
}
