/**
 * True Muscle Fitness Hub — WhatsApp Lead Engine & Modal Controller
 * No database required — direct WhatsApp link generator
 */

class TMWhatsAppEngine {
  constructor() {
    this.modal = document.getElementById('freeTrialModal');
    this.openBtns = document.querySelectorAll('.js-open-trial-modal');
    this.closeBtn = document.getElementById('modalCloseBtn');
    this.form = document.getElementById('trialBookingForm');
    this.floatingBtn = document.getElementById('floatingWhatsAppBtn');
    
    this.init();
  }

  init() {
    // Open modal triggers
    this.openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    // Close modal trigger
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Backdrop click close
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }

    // Escape key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('is-active')) {
        this.closeModal();
      }
    });

    // Form submission -> WhatsApp redirect
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleTrialSubmit();
      });
    }

    // Floating WhatsApp Button Direct Action
    if (this.floatingBtn) {
      this.floatingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = TM_CONFIG.whatsappTemplates.quickInquiry();
        const url = `https://wa.me/${TM_CONFIG.gymInfo.contact.whatsappNumber}?text=${msg}`;
        window.open(url, '_blank');
      });
    }
  }

  openModal() {
    if (!this.modal) return;
    this.modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    
    // Set default date to tomorrow
    const dateInput = document.getElementById('trialDate');
    if (dateInput && !dateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  handleTrialSubmit() {
    const name = document.getElementById('trialName')?.value.trim();
    const phone = document.getElementById('trialPhone')?.value.trim();
    const goal = document.getElementById('trialGoal')?.value;
    const date = document.getElementById('trialDate')?.value;
    const time = document.getElementById('trialTime')?.value;

    if (!name || !phone) {
      alert('Please provide your name and mobile number.');
      return;
    }

    const data = { name, phone, goal, date, time };
    const encodedMsg = TM_CONFIG.whatsappTemplates.freeTrial(data);
    const whatsappUrl = `https://wa.me/${TM_CONFIG.gymInfo.contact.whatsappNumber}?text=${encodedMsg}`;

    // Close modal and redirect
    this.closeModal();
    window.open(whatsappUrl, '_blank');
  }

  static inquiryForPlan(planName) {
    const encodedMsg = TM_CONFIG.whatsappTemplates.membershipInquiry(planName);
    const whatsappUrl = `https://wa.me/${TM_CONFIG.gymInfo.contact.whatsappNumber}?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
  }
}

// Initializer helper
window.initWhatsAppEngine = function() {
  window.tmLeadEngine = new TMWhatsAppEngine();
};
