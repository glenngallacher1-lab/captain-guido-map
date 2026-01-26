* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --navy: #1a3a52;
  --cream: #e8d4b8;
  --orange: #c85a3c;
  --gold: #f4a836;
  --dark-bg: #0f1419;
  --text-light: #ffffff;
  --text-dark: #1a3a52;
}

body {
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: var(--dark-bg);
  color: var(--text-light);
  overflow-x: hidden;
  scroll-behavior: smooth;
}

/* Navigation */
#navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(15, 20, 25, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid rgba(232, 212, 184, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.nav-logo span {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--gold);
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  color: var(--cream);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gold);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a:hover {
  color: var(--gold);
}

.wallet-btn {
  background: linear-gradient(135deg, var(--orange), var(--gold));
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.wallet-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(244, 168, 54, 0.4);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.mobile-menu span {
  width: 25px;
  height: 3px;
  background: var(--cream);
  border-radius: 3px;
  transition: 0.3s;
}

/* Map Section */
#map-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#bg-logo {
  position: absolute;
  inset: 0;
  background-image: url("captain-guido.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 45%;
  opacity: 0.08;
  z-index: 1;
  pointer-events: none;
}

#map {
  width: 100%;
  height: 100%;
  z-index: 2;
  filter: brightness(0.7) contrast(1.1);
}

.map-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  pointer-events: none;
}

.map-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--cream);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.map-subtitle {
  font-size: 1.5rem;
  color: var(--gold);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  margin-bottom: 3rem;
}

.scroll-indicator {
  animation: bounce 2s infinite;
}

.scroll-indicator span {
  display: block;
  color: var(--cream);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.arrow-down {
  width: 30px;
  height: 30px;
  border-left: 3px solid var(--gold);
  border-bottom: 3px solid var(--gold);
  transform: rotate(-45deg);
  margin: 0 auto;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.ship {
  font-size: 28px;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 10px rgba(244, 168, 54, 0.8));
}

/* Section Styles */
.section {
  min-height: 100vh;
  padding: 8rem 2rem;
  position: relative;
}

.section.dark {
  background: linear-gradient(180deg, #0f1419 0%, #1a3a52 100%);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--cream), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  text-align: center;
  font-size: 1.25rem;
  color: var(--cream);
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

/* Hero Section */
.hero-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.hero-logo {
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.glitch {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  position: relative;
  color: var(--gold);
  letter-spacing: 3px;
}

.tagline {
  font-size: 1.75rem;
  color: var(--orange);
  margin-bottom: 2rem;
  font-weight: 600;
}

.description {
  font-size: 1.25rem;
  color: var(--cream);
  line-height: 1.8;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
}

.btn-primary, .btn-secondary {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--orange), var(--gold));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(244, 168, 54, 0.5);
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--cream);
  color: var(--cream);
}

.btn-secondary:hover {
  background: var(--cream);
  color: var(--navy);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 4rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background: rgba(232, 212, 184, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(232, 212, 184, 0.1);
}

.stat-item h3 {
  font-size: 3rem;
  color: var(--gold);
  margin-bottom: 0.5rem;
}

.stat-item p {
  color: var(--cream);
  font-size: 1.1rem;
}

/* Story Section */
.story-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.story-card {
  background: rgba(232, 212, 184, 0.05);
  border: 1px solid rgba(232, 212, 184, 0.2);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.story-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--orange), var(--gold));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.story-card:hover::before {
  transform: scaleX(1);
}

.story-card:hover {
  transform: translateY(-5px);
  border-color: var(--gold);
  box-shadow: 0 10px 30px rgba(244, 168, 54, 0.2);
}

.chapter-number {
  color: var(--gold);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.story-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--cream);
}

.story-card p {
  color: rgba(232, 212, 184, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.status {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status.unlocked {
  background: rgba(244, 168, 54, 0.2);
  color: var(--gold);
}

/* Impact Section */
.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.impact-card {
  background: rgba(26, 58, 82, 0.3);
  border: 1px solid rgba(232, 212, 184, 0.2);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.impact-card:hover {
  transform: translateY(-5px);
  border-color: var(--orange);
  box-shadow: 0 10px 30px rgba(200, 90, 60, 0.3);
}

.impact-location {
  color: var(--orange);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.impact-card h4 {
  font-size: 1.5rem;
  color: var(--cream);
  margin-bottom: 1.5rem;
}

.impact-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.impact-metric {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold);
}

.metric-label {
  font-size: 0.85rem;
  color: rgba(232, 212, 184, 0.7);
}

.charity-name {
  color: var(--cream);
  font-weight: 600;
  font-size: 1.1rem;
}

.blockchain-badge {
  text-align: center;
  padding: 2rem;
  background: rgba(244, 168, 54, 0.1);
  border: 2px solid var(--gold);
  border-radius: 12px;
  margin-top: 3rem;
}

.blockchain-badge p {
  color: var(--gold);
  font-size: 1.1rem;
  font-weight: 600;
}

/* Footer */
footer {
  background: var(--navy);
  padding: 4rem 2rem 2rem;
  border-top: 1px solid rgba(232, 212, 184, 0.2);
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-section h4 {
  color: var(--gold);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-section a {
  display: block;
  color: var(--cream);
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: var(--gold);
}

.footer-logo {
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(232, 212, 184, 0.1);
  text-align: center;
  color: rgba(232, 212, 184, 0.6);
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
}

.modal-content {
  background: var(--navy);
  margin: 10% auto;
  padding: 3rem;
  border: 2px solid var(--gold);
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close {
  color: var(--cream);
  float: right;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
}

.close:hover {
  color: var(--gold);
}

.modal-content h2 {
  color: var(--gold);
  margin-bottom: 2rem;
  text-align: center;
}

.wallet-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.wallet-option {
  background: rgba(232, 212, 184, 0.05);
  border: 2px solid rgba(232, 212, 184, 0.2);
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--cream);
  font-size: 1.1rem;
  font-weight: 600;
}

.wallet-option:hover {
  background: rgba(244, 168, 54, 0.1);
  border-color: var(--gold);
  transform: translateX(5px);
}

.wallet-option span:first-child {
  font-size: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu {
    display: flex;
  }

  .map-title {
    font-size: 2rem;
  }

  .map-subtitle {
    font-size: 1rem;
  }

  .glitch {
    font-size: 2.5rem;
  }

  .stats {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .story-grid {
    grid-template-columns: 1fr;
  }

  .impact-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }
}
