/**
 * True Muscle Fitness Hub — Carousel Engine v2
 * Categories, Trainers, and Testimonials carousel support
 */

class TMCarousel {
  constructor(viewportSelector, prevBtnSelector, nextBtnSelector) {
    this.viewport = document.querySelector(viewportSelector);
    this.prevBtn = document.querySelector(prevBtnSelector);
    this.nextBtn = document.querySelector(nextBtnSelector);

    if (!this.viewport) return;

    this.isDown = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.init();
  }

  init() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.scrollStep(-1));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.scrollStep(1));
    }

    // Mouse drag scrolling
    this.viewport.addEventListener('mousedown', (e) => {
      this.isDown = true;
      this.viewport.style.cursor = 'grabbing';
      this.viewport.style.userSelect = 'none';
      this.startX = e.pageX - this.viewport.offsetLeft;
      this.scrollLeft = this.viewport.scrollLeft;
    });

    this.viewport.addEventListener('mouseleave', () => {
      this.isDown = false;
      this.viewport.style.cursor = 'grab';
      this.viewport.style.userSelect = '';
    });

    this.viewport.addEventListener('mouseup', () => {
      this.isDown = false;
      this.viewport.style.cursor = 'grab';
      this.viewport.style.userSelect = '';
    });

    this.viewport.addEventListener('mousemove', (e) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - this.viewport.offsetLeft;
      const walk = (x - this.startX) * 1.8;
      this.viewport.scrollLeft = this.scrollLeft - walk;
    });
  }

  scrollStep(direction) {
    const card = this.viewport.querySelector('.category-card, .trainer-card');
    const step = card ? card.offsetWidth + 20 : 340;
    this.viewport.scrollBy({
      left: direction * step,
      behavior: 'smooth'
    });
  }
}

/**
 * Testimonial Slider — slide-based with dot navigation
 */
class TMTestimonialSlider {
  constructor() {
    this.track = document.getElementById('testimonialTrack');
    this.viewport = document.getElementById('testimonialViewport');
    this.prevBtn = document.getElementById('testPrevBtn');
    this.nextBtn = document.getElementById('testNextBtn');
    this.dots = document.querySelectorAll('.testimonial-dot');

    if (!this.track) return;

    this.current = 0;
    this.total = this.track.children.length;
    this.autoplayInterval = null;

    this.init();
  }

  init() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.goTo((this.current - 1 + this.total) % this.total);
        this.resetAutoplay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.goTo((this.current + 1) % this.total);
        this.resetAutoplay();
      });
    }

    this.dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        this.goTo(idx);
        this.resetAutoplay();
      });
    });

    // Touch swipe support
    let touchStartX = 0;
    this.track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.goTo((this.current + 1) % this.total);
        } else {
          this.goTo((this.current - 1 + this.total) % this.total);
        }
        this.resetAutoplay();
      }
    }, { passive: true });

    // Autoplay
    this.startAutoplay();
  }

  goTo(index) {
    this.current = index;
    this.track.style.transform = `translateX(-${this.current * 100}%)`;
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.current);
    });
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.goTo((this.current + 1) % this.total);
    }, 5500);
  }

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }
}

// Initializer helper
window.initCarousels = function() {
  new TMCarousel('#categoriesViewport', '#catPrevBtn', '#catNextBtn');
  new TMCarousel('#trainersViewport', '#trainerPrevBtn', '#trainerNextBtn');
  new TMTestimonialSlider();
};
