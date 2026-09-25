/**
 * True Muscle Fitness Hub — Micro-Animations & Scroll Observer v2
 */

class TMAnimations {
  constructor() {
    this.initHeroLoad();
    this.initScrollReveal();
    this.initBeforeAfterSlider();
    this.initNumberCounters();
  }

  initHeroLoad() {
    // Trigger hero image zoom-out on load for cinematic feel
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      requestAnimationFrame(() => {
        heroSection.classList.add('loaded');
      });
    }
  }

  initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Apply stagger delay based on sibling index
          const parent = entry.target.parentElement;
          if (parent) {
            const siblings = Array.from(parent.querySelectorAll('.reveal-on-scroll'));
            const idx = siblings.indexOf(entry.target);
            const delay = Math.min(idx * 80, 320);
            entry.target.style.transitionDelay = `${delay}ms`;
          }
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    // Observe all scroll-reveal targets
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Also observe why-number-cards, program cards, membership cards
    document.querySelectorAll('.why-number-card, .program-card-editorial, .membership-card').forEach(el => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
      }
    });
  }

  initBeforeAfterSlider() {
    const wrapper = document.getElementById('baSliderWrapper');
    const beforeLayer = document.getElementById('baBeforeLayer');
    const handle = document.getElementById('baHandle');

    if (!wrapper || !beforeLayer || !handle) return;

    let isDragging = false;

    const setPosition = (x) => {
      const rect = wrapper.getBoundingClientRect();
      let offsetX = x - rect.left;
      offsetX = Math.max(20, Math.min(offsetX, rect.width - 20));
      const percentage = (offsetX / rect.width) * 100;
      beforeLayer.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    const onStart = (e) => {
      isDragging = true;
      wrapper.style.cursor = 'ew-resize';
      const clientX = e.touches ? e.touches[0].pageX : e.pageX;
      setPosition(clientX);
    };

    const onEnd = () => {
      isDragging = false;
      wrapper.style.cursor = '';
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].pageX : e.pageX;
      setPosition(clientX);
    };

    wrapper.addEventListener('mousedown', onStart);
    wrapper.addEventListener('touchstart', onStart, { passive: true });

    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    // Initialize at 50%
    setPosition(wrapper.getBoundingClientRect().left + wrapper.offsetWidth / 2);
  }

  initNumberCounters() {
    const counterElements = document.querySelectorAll('.stat-num[data-target]');
    if (!counterElements.length) return;

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1200;
          const step = Math.ceil(target / (duration / 30));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              el.innerHTML = `${target}<span>${suffix}</span>`;
              clearInterval(timer);
            } else {
              el.innerHTML = `${count}<span>${suffix}</span>`;
            }
          }, 30);

          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  }
}

// Initializer helper
window.initAnimations = function() {
  new TMAnimations();
};
