/**
 * True Muscle Fitness Hub — Micro-Animations & Scroll Observer
 */

class TMAnimations {
  constructor() {
    this.initScrollReveal();
    this.initBeforeAfterSlider();
    this.initNumberCounters();
  }

  initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    };

    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);
    document.querySelectorAll('.reveal-on-scroll, .why-number-card, .program-card-editorial, .membership-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });

    // Handle in-view style
    const style = document.createElement('style');
    style.innerHTML = `
      .in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
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
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      beforeLayer.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    const onStart = (e) => {
      isDragging = true;
      setPosition(e.pageX || e.touches[0].pageX);
    };

    const onEnd = () => {
      isDragging = false;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      setPosition(e.pageX || (e.touches && e.touches[0].pageX));
    };

    wrapper.addEventListener('mousedown', onStart);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('mousemove', onMove);

    wrapper.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchmove', onMove, { passive: true });
  }

  initNumberCounters() {
    const counterElements = document.querySelectorAll('.stat-num[data-target]');
    if (!counterElements.length) return;

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          const suffix = entry.target.getAttribute('data-suffix') || '';
          let count = 0;
          const step = Math.ceil(target / 40);
          
          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              entry.target.innerHTML = `${target}<span>${suffix}</span>`;
              clearInterval(timer);
            } else {
              entry.target.innerHTML = `${count}<span>${suffix}</span>`;
            }
          }, 30);

          obs.unobserve(entry.target);
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
