// ============================================
// ENTRY SCREEN
// ============================================
function enterSite() {
  console.log('Enter button clicked!'); // Debug log
  const entryScreen = document.getElementById('entry-screen');
  document.body.classList.remove('entry-active');
  entryScreen.classList.add('hidden');
  document.body.style.overflow = 'auto';
  
  // Start animations after entry
  setTimeout(() => {
    entryScreen.style.display = 'none';
  }, 800);
}

// ============================================
// MAP SETUP
// ============================================
const map = L.map("map", {
  worldCopyJump: true,
  zoomControl: false,
  attributionControl: false,
  dragging: true,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false
}).setView([20, 0], 2);

// Dark blue ocean, black countries map
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  { 
    attribution: "",
    maxZoom: 19
  }
).addTo(map);

// Add custom styling for dark blue ocean and black countries
const mapStyle = document.createElement('style');
mapStyle.textContent = `
  .leaflet-container {
    background: #0d1b2a !important;
  }
  .leaflet-tile-pane {
    filter: brightness(0.3) contrast(1.8) saturate(0.3);
  }
`;
document.head.appendChild(mapStyle);

// Ship Icon
const shipIcon = L.divIcon({
  className: "ship",
  html: "🚢",
  iconSize: [32, 32]
});

// Chapter coordinates based on the story
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

// Draw the glowing route line
const routeLine = L.polyline(route, {
  color: "#f4a836",
  weight: 3,
  opacity: 0.7,
  dashArray: "10, 10",
  className: "route-line"
}).addTo(map);

// Add chapter markers
chapters.forEach((chapter, index) => {
  const marker = L.circleMarker(chapter.coords, {
    radius: 10,
    fillColor: chapter.unlocked ? "#f4a836" : "#666",
    color: "#fff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.9
  }).addTo(map);

  // Custom popup styling
  marker.bindPopup(`
    <div style="
      text-align: center; 
      padding: 1rem;
      background: #0a1628;
      border: 1px solid #f4a836;
      color: #e8d4b8;
      min-width: 200px;
    ">
      <strong style="
        color: #f4a836;
        font-size: 0.9rem;
        letter-spacing: 2px;
        display: block;
        margin-bottom: 0.5rem;
      ">CHAPTER ${index + 1}</strong>
      <span style="
        color: #e8d4b8;
        font-size: 1.1rem;
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
      ">${chapter.name}</span>
      <span style="
        font-size: 0.8rem;
        color: ${chapter.unlocked ? '#4caf50' : '#999'};
        font-weight: 600;
        letter-spacing: 1px;
      ">
        ${chapter.unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
      </span>
    </div>
  `, {
    closeButton: false,
    className: 'custom-popup'
  });
});

// Animate ship along the route
const ship = L.marker(route[0], { icon: shipIcon }).addTo(map);

let currentSegment = 0;
let progress = 0;
const speed = 0.0004; // Adjust speed here

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

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
const nav = document.getElementById('main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLLING
// ============================================
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

// ============================================
// WALLET MODAL
// ============================================
function openWalletModal() {
  const modal = document.getElementById('wallet-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWalletModal() {
  const modal = document.getElementById('wallet-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeWalletModal();
  }
});

// ============================================
// WALLET CONNECTION
// ============================================
async function connectWallet(walletType) {
  console.log(`Connecting to ${walletType}...`);

  // Check if MetaMask/Web3 provider is available
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const account = accounts[0];
      
      // Update button text with shortened address
      const walletBtn = document.querySelector('.wallet-connect-btn .nav-text');
      walletBtn.textContent = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
      
      // Close modal
      closeWalletModal();
      
      console.log('Connected wallet:', account);
      
      // Optional: Show success notification
      showNotification('Wallet Connected Successfully!');
      
      // You can add more logic here:
      // - Fetch CGC token balance
      // - Check if user holds specific NFTs
      // - Enable holder-only features
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      showNotification('Failed to connect wallet. Please try again.', 'error');
    }
  } else {
    // No Web3 provider detected
    showNotification(`Please install ${walletType === 'metamask' ? 'MetaMask' : 'a Web3 wallet'} to connect!`, 'error');
    
    // Redirect to wallet installation
    if (walletType === 'metamask') {
      setTimeout(() => {
        window.open('https://metamask.io/download/', '_blank');
      }, 1000);
    }
  }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
  // Remove any existing notifications
  const existingNotif = document.querySelector('.notification');
  if (existingNotif) {
    existingNotif.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 5rem;
    right: 2rem;
    background: ${type === 'success' ? '#4caf50' : '#f44336'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyle);

// ============================================
// INTERSECTION OBSERVER (Scroll Animations)
// ============================================
const observerOptions = {
  threshold: 0.15,
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

// Observe all cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.chapter-card, .impact-item, .section-content'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
});

// ============================================
// TOKEN PRICE FETCHER (Placeholder)
// ============================================
async function fetchCGCPrice() {
  // Replace this with your actual token contract/API
  // Example: CoinGecko API, DEX API, or blockchain query
  
  try {
    // Placeholder data
    return {
      price: 0.000123,
      change24h: +5.67,
      marketCap: 1234567,
      volume24h: 234567
    };
  } catch (error) {
    console.error('Error fetching price:', error);
    return null;
  }
}

// Optional: Update price on page
fetchCGCPrice().then(data => {
  if (data) {
    console.log('CGC Price Data:', data);
    // You can display this data in your UI if you add price elements
  }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c⚓ CAPTAIN GUIDO COIN ⚓', 'color: #f4a836; font-size: 24px; font-weight: bold;');
console.log('%cSaving our oceans, one token at a time.', 'color: #e8d4b8; font-size: 14px;');
console.log('%cWebsite loaded successfully! 🌊', 'color: #4caf50; font-size: 12px;');

// ============================================
// MOBILE MENU (Optional - Add if needed)
// ============================================
function createMobileMenu() {
  // Add mobile menu functionality here if needed
  // This would be useful for responsive navigation on smaller screens
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Captain Guido website initialized.');
  
  // Ensure body starts with entry screen active
  document.body.classList.add('entry-active');
  
  // Add event listener for enter button
  const enterButton = document.getElementById('enterButton');
  if (enterButton) {
    enterButton.addEventListener('click', enterSite);
  }
  
  // Add event listener for wallet connect button
  const walletConnectBtn = document.getElementById('walletConnectBtn');
  if (walletConnectBtn) {
    walletConnectBtn.addEventListener('click', openWalletModal);
  }
  
  // Add event listener for modal close button
  const closeModalBtn = document.getElementById('closeModal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeWalletModal);
  }
  
  // Add event listener for modal overlay
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeWalletModal);
  }
  
  // Add event listeners for wallet options
  const walletOptions = document.querySelectorAll('.wallet-option');
  walletOptions.forEach(option => {
    option.addEventListener('click', function() {
      const walletType = this.getAttribute('data-wallet');
      connectWallet(walletType);
    });
  });
});
