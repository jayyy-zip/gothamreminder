/* ==========================================================================
   BATMAN REMINDER — JAVASCRIPT INTERACTIONS & ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initGothamParticles();
  initBatSignalFollower();
  initHeroAppInteractions();
  initFAQAccordion();
});

/* 1. Header Elevation on Scroll */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* 2. Gotham Atmospheric Particles Canvas */
function initGothamParticles() {
  const canvas = document.getElementById('gotham-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      speedY: Math.random() * 0.8 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.85 ? '#F5C518' : '#8A8A8A'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y > height) {
        p.y = -5;
        p.x = Math.random() * width;
      }
      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* 3. Subtle Bat-Signal Cursor Tracking Spotlight */
function initBatSignalFollower() {
  const spotlight = document.getElementById('batSignalSpotlight');
  if (!spotlight) return;

  let mouseX = window.innerWidth * 0.8;
  let mouseY = 200;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function update() {
    currentX += (mouseX - currentX) * 0.04;
    currentY += (mouseY - currentY) * 0.04;

    spotlight.style.left = `${currentX - 200}px`;
    spotlight.style.top = `${currentY - 200}px`;

    requestAnimationFrame(update);
  }

  update();
}

/* 4. Hero App Interactive Widget */
function initHeroAppInteractions() {
  // Interval Tabs
  const tabInterval = document.getElementById('tabInterval');
  const tabFixed = document.getElementById('tabFixed');
  
  if (tabInterval && tabFixed) {
    tabInterval.addEventListener('click', () => {
      tabInterval.classList.add('active');
      tabFixed.classList.remove('active');
    });
    tabFixed.addEventListener('click', () => {
      tabFixed.classList.add('active');
      tabInterval.classList.remove('active');
    });
  }

  // Time +/- Buttons
  let minutes = 45;
  const timeMinEl = document.getElementById('timeMin');
  const btnUp = document.getElementById('btnTimeUp');
  const btnDown = document.getElementById('btnTimeDown');

  if (btnUp && btnDown && timeMinEl) {
    btnUp.addEventListener('click', () => {
      minutes = Math.min(120, minutes + 15);
      timeMinEl.textContent = minutes < 10 ? '0' + minutes : minutes;
      playBatcomputerChime(660);
    });

    btnDown.addEventListener('click', () => {
      minutes = Math.max(15, minutes - 15);
      timeMinEl.textContent = minutes < 10 ? '0' + minutes : minutes;
      playBatcomputerChime(440);
    });
  }

  // Set Reminder button feedback
  const btnSet = document.getElementById('btnSetReminder');
  if (btnSet) {
    btnSet.addEventListener('click', () => {
      playBatcomputerChime(880);
      const originalText = btnSet.innerHTML;
      btnSet.innerHTML = '<span>✓ Protocol Armed &amp; Active</span>';
      btnSet.style.background = '#27C93F';
      btnSet.style.color = '#050505';

      setTimeout(() => {
        btnSet.innerHTML = originalText;
        btnSet.style.background = '';
        btnSet.style.color = '';
      }, 2500);
    });
  }

  // Test Reminder button
  const btnTest = document.getElementById('btnTestReminder');
  if (btnTest) {
    btnTest.addEventListener('click', () => {
      triggerBatmanDrop();
    });
  }
}

/* 5. Quick Water Logging Simulator */
window.logWater = function(amount) {
  playBatcomputerChime(520);
  
  // Show ephemeral toast
  const toast = document.createElement('div');
  toast.className = 'quick-toast';
  toast.innerHTML = `<span>💧 +${amount}ml Hydration Logged</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 2000);
};

/* 6. Batman Drop Simulation Modal */
window.triggerBatmanDrop = function() {
  const overlay = document.getElementById('batmanDropOverlay');
  if (!overlay) return;

  playBatAlertSound();
  overlay.classList.add('active');
};

window.dismissBatmanDrop = function(logged = false) {
  const overlay = document.getElementById('batmanDropOverlay');
  if (!overlay) return;

  overlay.classList.remove('active');
  if (logged) {
    logWater(250);
  }
};

/* 7. FAQ Accordion */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach((f) => {
        f.classList.remove('active');
        f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        playBatcomputerChime(550);
      }
    });
  });
}

/* 8. Web Audio API Batcomputer Sound Effects */
function playBatcomputerChime(freq = 440) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    // Autoplay safeguard
  }
}

function playBatAlertSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Dual-tone Batcomputer Alert
    [320, 640].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.26);
    });
  } catch (e) {}
}

/* Toast styling injected dynamically */
const toastStyle = document.createElement('style');
toastStyle.innerHTML = `
.quick-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid #F5C518;
  color: #F5F5F5;
  padding: 12px 20px;
  border-radius: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(245, 197, 24, 0.3);
  z-index: 9999;
  animation: toastSlideIn 0.3s ease forwards;
}
.quick-toast.fade-out {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}
@keyframes toastSlideIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(toastStyle);
