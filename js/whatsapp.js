/**
 * True Muscle Fitness Hub — WhatsApp Lead Engine, Free Trial Modal Controller & Inline Validation
 * Enhanced with validation, clean inline error states, and premium success confirmation.
 */

class TMWhatsAppEngine {
  constructor() {
    this.modal = document.getElementById('freeTrialModal');
    this.openBtns = document.querySelectorAll('.js-open-trial-modal');
    this.closeBtn = document.getElementById('modalCloseBtn');
    this.form = document.getElementById('trialBookingForm');
    this.formBody = document.getElementById('trialFormBody');
    this.successCard = document.getElementById('trialSuccessCard');
    this.floatingBtn = document.getElementById('floatingWhatsAppBtn');
    
    this.dateInput = document.getElementById('trialDate');
    this.nameInput = document.getElementById('trialName');
    this.phoneInput = document.getElementById('trialPhone');
    this.goalInput = document.getElementById('trialGoal');
    this.timeInput = document.getElementById('trialTime');

    this.btnProceedWhatsApp = document.getElementById('btnProceedWhatsApp');
    this.btnEditTrial = document.getElementById('btnEditTrial');

    this.preparedWhatsAppData = null;

    this.init();
  }

  init() {
    // Set minimum date to today (YYYY-MM-DD)
    if (this.dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;
      this.dateInput.min = todayStr;
      
      // Default to today if empty
      if (!this.dateInput.value) {
        this.dateInput.value = todayStr;
      }
    }

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

    // Form submission -> Validation -> Success State
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleTrialSubmit();
      });
    }

    // Inline validation clearance on user input
    [this.nameInput, this.phoneInput, this.goalInput, this.dateInput, this.timeInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => this.clearError(input));
        input.addEventListener('change', () => this.clearError(input));
      }
    });

    // Success state buttons
    if (this.btnProceedWhatsApp) {
      this.btnProceedWhatsApp.addEventListener('click', () => {
        if (this.preparedWhatsAppData) {
          const encodedMsg = GYM_CONFIG.whatsappTemplates.freeTrial(this.preparedWhatsAppData);
          const whatsappUrl = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodedMsg}`;
          this.closeModal();
          window.open(whatsappUrl, '_blank');
        }
      });
    }

    if (this.btnEditTrial) {
      this.btnEditTrial.addEventListener('click', () => {
        this.showFormView();
      });
    }

    // Floating WhatsApp Button Direct Action
    if (this.floatingBtn) {
      this.floatingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = GYM_CONFIG.whatsappTemplates.quickInquiry();
        const url = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${msg}`;
        window.open(url, '_blank');
      });
    }
  }

  openModal(prefillGoal) {
    if (!this.modal) return;
    this.showFormView();
    if (prefillGoal && this.goalInput) {
      this.goalInput.value = prefillGoal;
    }
    this.modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  showFormView() {
    if (this.formBody) this.formBody.style.display = 'block';
    if (this.successCard) this.successCard.style.display = 'none';
  }

  showSuccessView(data) {
    this.preparedWhatsAppData = data;
    if (this.formBody) this.formBody.style.display = 'none';
    if (this.successCard) {
      this.successCard.style.display = 'block';
      
      const summaryName = document.getElementById('summaryName');
      const summaryPhone = document.getElementById('summaryPhone');
      const summaryGoal = document.getElementById('summaryGoal');
      const summaryDateTime = document.getElementById('summaryDateTime');

      if (summaryName) summaryName.textContent = data.name;
      if (summaryPhone) summaryPhone.textContent = data.phone;
      if (summaryGoal) summaryGoal.textContent = data.goal;
      if (summaryDateTime) summaryDateTime.textContent = `${data.formattedDate} • ${data.time}`;
    }
  }

  showError(inputElement, errorMsg) {
    if (!inputElement) return;
    inputElement.classList.add('is-invalid');
    const group = inputElement.closest('.form-group-custom');
    if (group) {
      let errSpan = group.querySelector('.inline-error-msg');
      if (!errSpan) {
        errSpan = document.createElement('span');
        errSpan.className = 'inline-error-msg';
        group.appendChild(errSpan);
      }
      errSpan.textContent = errorMsg;
    }
  }

  clearError(inputElement) {
    if (!inputElement) return;
    inputElement.classList.remove('is-invalid');
    const group = inputElement.closest('.form-group-custom');
    if (group) {
      const errSpan = group.querySelector('.inline-error-msg');
      if (errSpan) {
        errSpan.remove();
      }
    }
  }

  formatUserDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`; // DD-MM-YYYY format
    }
    return dateStr;
  }

  handleTrialSubmit() {
    let isValid = true;

    // 1. Validate Name
    const nameVal = this.nameInput ? this.nameInput.value.trim() : '';
    if (!nameVal || nameVal.length < 2) {
      this.showError(this.nameInput, 'Please enter your full name.');
      isValid = false;
    } else {
      this.clearError(this.nameInput);
    }

    // 2. Validate Indian Mobile
    const phoneVal = this.phoneInput ? this.phoneInput.value.trim().replace(/[\s\-\+]/g, '') : '';
    const indianPhoneRegex = /^(?:91)?[6-9]\d{9}$/;
    if (!phoneVal || !indianPhoneRegex.test(phoneVal)) {
      this.showError(this.phoneInput, 'Please enter a valid 10-digit mobile number.');
      isValid = false;
    } else {
      this.clearError(this.phoneInput);
    }

    // 3. Validate Goal
    const goalVal = this.goalInput ? this.goalInput.value : '';
    if (!goalVal) {
      this.showError(this.goalInput, 'Please select a fitness goal.');
      isValid = false;
    } else {
      this.clearError(this.goalInput);
    }

    // 4. Validate Date
    const dateVal = this.dateInput ? this.dateInput.value : '';
    if (!dateVal) {
      this.showError(this.dateInput, 'Please select a preferred trial date.');
      isValid = false;
    } else {
      const selected = new Date(dateVal + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        this.showError(this.dateInput, 'Date cannot be in the past.');
        isValid = false;
      } else {
        this.clearError(this.dateInput);
      }
    }

    // 5. Validate Time
    const timeVal = this.timeInput ? this.timeInput.value : '';
    if (!timeVal) {
      this.showError(this.timeInput, 'Please select a preferred time slot.');
      isValid = false;
    } else {
      this.clearError(this.timeInput);
    }

    if (!isValid) {
      return;
    }

    const formattedDate = this.formatUserDate(dateVal);
    const data = {
      name: nameVal,
      phone: phoneVal,
      goal: goalVal,
      date: formattedDate,
      time: timeVal,
      formattedDate: formattedDate
    };

    // Show premium confirmation success state before opening WhatsApp
    this.showSuccessView(data);
  }

  static inquiryForPlan(planName) {
    const encodedMsg = GYM_CONFIG.whatsappTemplates.membershipInquiry(planName);
    const whatsappUrl = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
  }
}

// Initializer helper
window.initWhatsAppEngine = function() {
  window.tmLeadEngine = new TMWhatsAppEngine();
};
