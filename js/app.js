/**
 * True Muscle Fitness Hub — Main Application Controller v2
 */

document.addEventListener('DOMContentLoaded', () => {

  // 0. Mobile sticky bar — apply body class so content is not obscured
  const applyStickyBarClass = () => {
    const isVisible = window.innerWidth <= 576;
    document.body.classList.toggle('has-sticky-bar', isVisible);
  };
  applyStickyBarClass();
  window.addEventListener('resize', applyStickyBarClass, { passive: true });

  // 1. Header scroll effect
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load

  // 2. Mobile Nav Toggle
  const mobileToggleBtn = document.getElementById('mobileMenuToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggleBtn && mobileNavOverlay) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = mobileToggleBtn.classList.toggle('is-open');
      mobileNavOverlay.classList.toggle('is-active', isOpen);
      mobileToggleBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggleBtn.classList.remove('is-open');
        mobileNavOverlay.classList.remove('is-active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on overlay background click
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) {
        mobileToggleBtn.classList.remove('is-open');
        mobileNavOverlay.classList.remove('is-active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // 3. Active navigation state on scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNav = () => {
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
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // 4. Initialize Subsystems
  if (window.initCarousels) window.initCarousels();
  if (window.initBMICalculator) window.initBMICalculator();
  if (window.initWhatsAppEngine) window.initWhatsAppEngine();
  if (window.initFitnessAssistant) window.initFitnessAssistant();
  if (window.initAnimations) window.initAnimations();

  // 5. Membership plan click → WhatsApp
  document.querySelectorAll('.js-select-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const planName = btn.getAttribute('data-plan') || 'General';
      TMWhatsAppEngine.inquiryForPlan(planName);
    });
  });

  // 6. Program enquire buttons (open modal with prefilled goal)
  document.querySelectorAll('.js-program-enquire').forEach(btn => {
    btn.addEventListener('click', () => {
      const program = btn.getAttribute('data-program') || '';
      if (window.tmLeadEngine) {
        window.tmLeadEngine.openModal(program);
      }
    });
  });

  // 7. Program WhatsApp buttons
  document.querySelectorAll('.js-wa-program').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const program = btn.getAttribute('data-program') || '';
      const msg = encodeURIComponent(
        `Hi True Muscle Fitness Hub,\n\nI am interested in the ${program} program.\nPlease share more details and pricing.\n\nThank you!`
      );
      window.open(`https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${msg}`, '_blank');
    });
  });

  // 8. (Category cards already handled by js-open-trial-modal class in whatsapp.js)

  // 9. (Floating WhatsApp button is handled by whatsapp.js engine)
});
