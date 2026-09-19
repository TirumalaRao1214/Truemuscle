/**
 * True Muscle Fitness Hub — Main Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Nav Toggle
  const mobileToggleBtn = document.getElementById('mobileMenuToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggleBtn && mobileNavOverlay) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = mobileToggleBtn.classList.toggle('is-open');
      mobileNavOverlay.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggleBtn.classList.remove('is-open');
        mobileNavOverlay.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Smooth active state navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Initialize Subsystems
  if (window.initCarousels) window.initCarousels();
  if (window.initBMICalculator) window.initBMICalculator();
  if (window.initWhatsAppEngine) window.initWhatsAppEngine();
  if (window.initFitnessAssistant) window.initFitnessAssistant();
  if (window.initAnimations) window.initAnimations();

  // 5. Dynamic Membership Click Handling
  document.querySelectorAll('.js-select-plan').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planName = btn.getAttribute('data-plan') || 'General';
      TMWhatsAppEngine.inquiryForPlan(planName);
    });
  });
});
