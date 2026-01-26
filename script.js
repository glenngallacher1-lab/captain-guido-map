// Map Setup
const map = L.map("map", {
  worldCopyJump: true,
  zoomControl: false
}).setView([20, 0], 2);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  { attribution: "" }
).addTo(map);

// Ship Icon
const shipIcon = L.divIcon({
  className: "ship",
  html: "🚢",
  iconSize: [28, 28]
});

// Chapter locations based on the story
const chapters = [
  { name: "Port of Ostia", coords: [41.73, 12.29], unlocked: true },
  { name: "Signals in Cairo", coords: [30.0444, 31.2357], unlocked: true },
  { name: "Arabian Tides", coords: [20, 60], unlocked: true },
  { name: "Indian Abyss", coords: [-10, 80], unlocked: true },
  { name: "Philippine Sea", coords: [15, 130], unlocked: true },
  { name: "South Pacific", coords: [-21.694129, -147.915508], unlocked: true },
  { name: "North Pacific", coords: [40, -150], unlocked: true },
  { name: "Bering Sea", coords: [58, -175], unlocked: true },
  { name: "North Atlantic", coords: [45, -30], unlocked: true },
  { name: "Gulf of America", coords: [25, -90], unlocked: true },
  { name: "South Atlantic", coords: [-20, -30], unlocked: true },
  { name: "Return to Ostia", coords: [41.73, 12.29], unlocked: true }
];

// Create route from chapter coordinates
const route = chapters.map(chapter => chapter.coords);

// Draw the route
L.polyline(route, {
  color: "#f4a836",
  weight: 3,
  opacity: 0.8,
  dashArray: "10, 10"
}).addTo(map);

// Add markers for each chapter
chapters.forEach((chapter, index) => {
  const marker = L.circleMarker(chapter.coords, {
    radius: 8,
    fillColor: chapter.unlocked ? "#f4a836" : "#666",
    color: "#fff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map);

  marker.bindPopup(`
    <div style="text-align: center; padding: 0.5rem;">
      <strong style="color: #1a3a52;">Chapter ${index + 1}</strong><br>
      <span style="color: #c85a3c;">${chapter.name}</span><br>
      <span style="font-size: 0.85rem; color: ${chapter.unlocked ? '#4caf50' : '#999'};">
        ${chapter.unlocked ? '✓ Unlocked' : '🔒 Locked'}
      </span>
    </div>
  `);
});

// Animate ship along the route
const ship = L.marker(route[0], { icon: shipIcon }).addTo(map);

let currentSegment = 0;
let progress = 0;
const speed = 0.0003;

function animateShip() {
  const start = route[currentSegment];
  const end = route[currentSegment + 1];

  if (!end) {
    currentSegment = 0;
    progress = 0;
    requestAnimationFrame(animateShip);
    return;
  }

  const lat = start[0] + (end[0] - start[0]) * progress;
  const lng = start[1] + (end[1] - start[1]) * progress;

  ship.setLatLng([lat, lng]);

  progress += speed;

  if (progress >= 1) {
    progress = 0;
    currentSegment++;
  }

  requestAnimationFrame(animateShip);
}

animateShip();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.transform = 'translateY(0)';
  } else if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});

// Wallet Connection Modal
const modal = document.getElementById('walletModal');
const btn = document.getElementById('connectWallet');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
  modal.style.display = 'block';
}

span.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Wallet connection handlers
document.querySelectorAll('.wallet-option').forEach(option => {
  option.addEventListener('click', function() {
    const wallet = this.dataset.wallet;
    connectWallet(wallet);
  });
});

async function connectWallet(walletType) {
  // Check if MetaMask/Web3 provider is available
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      
      // Update button text
      const connectBtn = document.getElementById('connectWallet');
      connectBtn.textContent = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
      connectBtn.style.background = 'linear-gradient(135deg, #4caf50, #8bc34a)';
      
      // Close modal
      modal.style.display = 'none';
      
      console.log('Connected wallet:', account);
      
      // You can add more logic here like:
      // - Fetching CGC token balance
      // - Checking if user holds tokens
      // - Enabling special features for holders
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  } else {
    alert(`Please install ${walletType === 'metamask' ? 'MetaMask' : 'a Web3 wallet'} to connect!`);
    // Redirect to MetaMask installation
    if (walletType === 'metamask') {
      window.open('https://metamask.io/download/', '_blank');
    }
  }
}

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all story cards and impact cards
document.querySelectorAll('.story-card, .impact-card, .stat-item').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Add particle effect to hero section (optional enhancement)
function createParticles() {
  const heroSection = document.getElementById('home');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(244, 168, 54, 0.5);
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
      animation-delay: ${Math.random() * 5}s;
    `;
    heroSection.appendChild(particle);
  }
}

// Call createParticles on load
window.addEventListener('load', createParticles);

// CGC Token Price Fetcher (placeholder - replace with actual API)
async function fetchCGCPrice() {
  // This is a placeholder. Replace with your actual token contract address
  // and use a service like CoinGecko API or directly query the blockchain
  
  // Example with CoinGecko (if listed):
  // const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=captain-guido-coin&vs_currencies=usd');
  // const data = await response.json();
  
  // For now, return placeholder
  return {
    price: 0.000123,
    change24h: +5.67
  };
}

// Update price display if you add it to the page
fetchCGCPrice().then(data => {
  console.log('CGC Price:', data);
  // Update DOM elements with price data
});

console.log('Captain Guido website loaded successfully! ⚓🌊');
