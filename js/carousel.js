/**
 * True Muscle Fitness Hub — Carousel Engine
 * High-performance smooth touch, wheel, drag & button-navigated carousel
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
    // Arrow button controls
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
    });

    this.viewport.addEventListener('mouseup', () => {
      this.isDown = false;
      this.viewport.style.cursor = 'grab';
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
    const card = this.viewport.querySelector('.category-card, .trainer-card, .testimonial-card');
    const step = card ? card.offsetWidth + 24 : 340;
    this.viewport.scrollBy({
      left: direction * step,
      behavior: 'smooth'
    });
  }
}

// Initializer helper
window.initCarousels = function() {
  new TMCarousel('#categoriesViewport', '#catPrevBtn', '#catNextBtn');
  new TMCarousel('#trainersViewport', '#trainerPrevBtn', '#trainerNextBtn');
};
