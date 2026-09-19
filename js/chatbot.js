/**
 * True Muscle Fitness Hub — Fitness Assistant Chatbot Engine
 * Brand: TRUE MUSCLE FITNESS ASSISTANT (Your Fitness Guide)
 * Fully clientside JavaScript implementation reading directly from GYM_CONFIG.
 * Designed with a modular getBotResponse(message) structure for future AI/API backend compatibility.
 */

class TMFitnessAssistant {
  constructor() {
    this.container = document.getElementById('tmChatbotContainer');
    this.toggleBtn = document.getElementById('tmChatbotToggleBtn');
    this.panel = document.getElementById('tmChatbotPanel');
    this.closeBtn = document.getElementById('tmChatbotCloseBtn');
    this.minimizeBtn = document.getElementById('tmChatbotMinimizeBtn');
    this.clearBtn = document.getElementById('tmChatbotClearBtn');
    this.messagesList = document.getElementById('tmChatbotMessages');
    this.inputForm = document.getElementById('tmChatbotInputForm');
    this.inputField = document.getElementById('tmChatbotInput');
    this.chipsContainer = document.getElementById('tmChatbotChips');
    this.unreadDot = document.getElementById('tmChatbotUnreadDot');

    // Conversation State
    this.history = [];
    this.isOpen = false;

    this.init();
  }

  init() {
    // Toggle Chatbot
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleChat());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeChat());
    }

    if (this.minimizeBtn) {
      this.minimizeBtn.addEventListener('click', () => this.closeChat());
    }

    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => this.clearChat());
    }

    // Escape key closes chatbot (accessibility requirement)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });

    // Input submission
    if (this.inputForm) {
      this.inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.inputField.value.trim();
        if (text) {
          this.handleUserMessage(text);
          this.inputField.value = '';
        }
      });
    }

    // Render initial message & chips
    this.renderInitialGreeting();
    this.renderDefaultChips();
  }

  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  openChat() {
    this.isOpen = true;
    if (this.panel) this.panel.classList.add('is-active');
    if (this.toggleBtn) this.toggleBtn.classList.add('is-active');
    if (this.unreadDot) this.unreadDot.style.display = 'none';
    this.scrollToBottom();
    if (this.inputField) {
      setTimeout(() => this.inputField.focus(), 250);
    }
  }

  closeChat() {
    this.isOpen = false;
    if (this.panel) this.panel.classList.remove('is-active');
    if (this.toggleBtn) this.toggleBtn.classList.remove('is-active');
  }

  clearChat() {
    this.history = [];
    if (this.messagesList) this.messagesList.innerHTML = '';
    this.renderInitialGreeting();
    this.renderDefaultChips();
  }

  scrollToBottom() {
    if (this.messagesList) {
      this.messagesList.scrollTop = this.messagesList.scrollHeight;
    }
  }

  renderInitialGreeting() {
    const greetingText = "Hi 👋\nWelcome to True Muscle Fitness Hub.\n\nI'm your fitness assistant.\n\nWhat are you looking for today?";
    this.appendBotMessage(greetingText, [
      { text: "🏋️ Memberships", action: "memberships" },
      { text: "💪 Training Programs", action: "programs" },
      { text: "🔥 Fat Loss", action: "fatloss" },
      { text: "🏋️ Muscle Building", action: "muscle" },
      { text: "👤 Personal Training", action: "personaltraining" },
      { text: "📅 Book Free Trial", action: "freetrial" },
      { text: "📍 Location", action: "location" },
      { text: "🕐 Gym Timings", action: "hours" },
      { text: "💬 WhatsApp", action: "whatsapp" }
    ]);
  }

  renderDefaultChips() {
    if (!this.chipsContainer) return;
    const chips = [
      { label: "MEMBERSHIPS", action: "memberships" },
      { label: "PROGRAMS", action: "programs" },
      { label: "FAT LOSS", action: "fatloss" },
      { label: "MUSCLE BUILDING", action: "muscle" },
      { label: "PERSONAL TRAINING", action: "personaltraining" },
      { label: "FREE TRIAL", action: "freetrial" },
      { label: "LOCATION", action: "location" },
      { label: "TIMINGS", action: "hours" },
      { label: "WHATSAPP", action: "whatsapp" }
    ];

    this.chipsContainer.innerHTML = '';
    chips.forEach(chip => {
      const btn = document.createElement('button');
      btn.className = 'tm-chat-chip-btn';
      btn.type = 'button';
      btn.textContent = chip.label;
      btn.addEventListener('click', () => this.handleAction(chip.action, chip.label));
      this.chipsContainer.appendChild(btn);
    });
  }

  appendUserMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'tm-chat-msg tm-chat-msg-user';
    msgEl.setAttribute('role', 'status');
    msgEl.innerHTML = `<div class="tm-chat-bubble tm-chat-bubble-user">${this.escapeHtml(text)}</div>`;
    this.messagesList.appendChild(msgEl);
    this.scrollToBottom();
  }

  showTypingIndicator() {
    const typingEl = document.createElement('div');
    typingEl.className = 'tm-chat-msg tm-chat-msg-bot tm-typing-indicator';
    typingEl.id = 'tmChatTyping';
    typingEl.innerHTML = `
      <div class="tm-chat-avatar">TM</div>
      <div class="tm-chat-bubble tm-chat-bubble-bot">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    this.messagesList.appendChild(typingEl);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const typingEl = document.getElementById('tmChatTyping');
    if (typingEl) typingEl.remove();
  }

  appendBotMessage(text, buttons = [], backAction = null) {
    this.showTypingIndicator();

    setTimeout(() => {
      this.hideTypingIndicator();

      const msgEl = document.createElement('div');
      msgEl.className = 'tm-chat-msg tm-chat-msg-bot';
      msgEl.setAttribute('role', 'status');

      const formattedText = this.escapeHtml(text).replace(/\n/g, '<br>');

      let buttonsHtml = '';
      if (buttons && buttons.length > 0) {
        buttonsHtml = `<div class="tm-chat-btn-group">`;
        buttons.forEach((btn, index) => {
          buttonsHtml += `<button type="button" class="tm-chat-action-btn ${btn.primary ? 'tm-btn-primary' : ''}" data-idx="${index}">${this.escapeHtml(btn.text)}</button>`;
        });
        buttonsHtml += `</div>`;
      }

      let backHtml = '';
      if (backAction) {
        backHtml = `<div class="tm-chat-back-row"><button type="button" class="tm-chat-back-btn">← Back</button></div>`;
      }

      msgEl.innerHTML = `
        <div class="tm-chat-avatar">TM</div>
        <div class="tm-chat-bubble tm-chat-bubble-bot">
          <div class="tm-chat-text">${formattedText}</div>
          ${buttonsHtml}
          ${backHtml}
        </div>
      `;

      this.messagesList.appendChild(msgEl);

      // Bind button click events
      const btnEls = msgEl.querySelectorAll('.tm-chat-action-btn');
      btnEls.forEach((btnEl, idx) => {
        const btnData = buttons[idx];
        btnEl.addEventListener('click', () => {
          if (btnData.url) {
            window.open(btnData.url, '_blank');
          } else if (btnData.openTrial) {
            this.triggerFreeTrial(btnData.goalPrefill);
          } else if (btnData.action) {
            this.handleAction(btnData.action, btnData.text, btnData.payload);
          }
        });
      });

      // Bind back button click
      const backBtnEl = msgEl.querySelector('.tm-chat-back-btn');
      if (backBtnEl && backAction) {
        backBtnEl.addEventListener('click', () => {
          this.handleAction(backAction, "← Back");
        });
      }

      this.scrollToBottom();
    }, 450);
  }

  /**
   * Triggers the existing Free Trial modal or scrolls smoothly to the section
   */
  triggerFreeTrial(goalPrefill) {
    this.closeChat();
    if (window.tmLeadEngine && typeof window.tmLeadEngine.openModal === 'function') {
      window.tmLeadEngine.openModal(goalPrefill);
    } else {
      const modal = document.getElementById('freeTrialModal');
      if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    }
  }

  /**
   * Process user typed messages through structured handler
   * Extensible: can be swapped with async getBotResponse(message) for future AI API
   */
  handleUserMessage(rawText) {
    this.appendUserMessage(rawText);
    const text = rawText.toLowerCase().trim();

    // 1. Medical questions check
    if (text.includes('pain') || text.includes('injury') || text.includes('cure') || text.includes('medicine') || text.includes('doctor') || text.includes('disease') || text.includes('bp') || text.includes('blood pressure') || text.includes('diabetes')) {
      this.appendBotMessage(
        "I can provide general fitness information, but I can't diagnose medical conditions. For medical concerns, please consult a qualified healthcare professional.",
        [
          { text: "TALK TO GYM", action: "whatsapp" },
          { text: "BOOK FREE TRIAL", action: "freetrial" }
        ],
        "home"
      );
      return;
    }

    // 2. Buying / Joining intent
    if (text === 'i want to join' || text.includes('how to join') || text.includes('how can i join') || text.includes('join') || text.includes('admission')) {
      this.appendBotMessage(
        "Absolutely. The easiest way to get started is with a free trial.\n\nWould you like to book one?",
        [
          { text: "YES, BOOK TRIAL", action: "freetrial", primary: true },
          { text: "VIEW MEMBERSHIPS", action: "memberships" }
        ],
        "home"
      );
      return;
    }

    // 3. Price / Cost / Fees intent
    if (text.includes('how much') || text.includes('price') || text.includes('cost') || text.includes('fees') || text.includes('fee')) {
      this.appendBotMessage(
        "Our membership options include monthly, quarterly, half-yearly and annual plans.\n\nWhich one would you like to see?",
        [
          { text: "MONTHLY", action: "plan_details", payload: "Monthly" },
          { text: "QUARTERLY", action: "plan_details", payload: "Quarterly" },
          { text: "HALF YEARLY", action: "plan_details", payload: "Half Yearly", primary: true },
          { text: "ANNUAL", action: "plan_details", payload: "Annual" },
          { text: "PERSONAL TRAINING", action: "plan_details", payload: "Personal" }
        ],
        "home"
      );
      return;
    }

    // 4. Keyword Routing
    if (text.includes('membership') || text.includes('plan')) {
      this.handleAction('memberships', rawText);
    } else if (text.includes('muscle') || text.includes('hypertrophy') || text.includes('bulk')) {
      this.handleAction('muscle', rawText);
    } else if (text.includes('fat loss') || text.includes('weight loss') || text.includes('lose weight') || text.includes('diet') || text.includes('shred')) {
      this.handleAction('fatloss', rawText);
    } else if (text.includes('strength') || text.includes('powerlifting') || text.includes('squat') || text.includes('deadlift')) {
      this.handleAction('strength', rawText);
    } else if (text.includes('personal train') || text.includes('trainer') || text.includes('coach') || text.includes('pt')) {
      this.handleAction('personaltraining', rawText);
    } else if (text.includes('location') || text.includes('address') || text.includes('where')) {
      this.handleAction('location', rawText);
    } else if (text.includes('timing') || text.includes('hour') || text.includes('open') || text.includes('sunday')) {
      this.handleAction('hours', rawText);
    } else if (text.includes('trial') || text.includes('book')) {
      this.handleAction('freetrial', rawText);
    } else if (text.includes('whatsapp') || text.includes('contact') || text.includes('phone') || text.includes('call')) {
      this.handleAction('whatsapp', rawText);
    } else if (text.includes('program') || text.includes('workout') || text.includes('routine')) {
      this.handleAction('programs', rawText);
    } else if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      this.appendBotMessage(
        "Hi 👋 Welcome to True Muscle Fitness Hub. What are you looking for today?",
        [
          { text: "🏋️ Memberships", action: "memberships" },
          { text: "💪 Training Programs", action: "programs" },
          { text: "📅 Book Free Trial", action: "freetrial" },
          { text: "📍 Location", action: "location" }
        ],
        "home"
      );
    } else {
      // 5. Unknown question fallback
      this.appendBotMessage(
        "I'm still learning about True Muscle Fitness Hub.\n\nI can help you with:\n• Memberships\n• Training Programs\n• Personal Training\n• Free Trial\n• Location\n• Gym Timings\n\nWhat would you like to know?",
        [
          { text: "🏋️ Memberships", action: "memberships" },
          { text: "💪 Training Programs", action: "programs" },
          { text: "👤 Personal Training", action: "personaltraining" },
          { text: "📅 Book Free Trial", action: "freetrial" },
          { text: "📍 Location", action: "location" },
          { text: "🕐 Gym Timings", action: "hours" }
        ],
        "home"
      );
    }
  }

  handleAction(action, userLabel = null, payload = null) {
    if (userLabel && userLabel !== "← Back") {
      this.appendUserMessage(userLabel);
    }

    switch(action) {
      case 'home':
        this.renderInitialGreeting();
        break;

      case 'memberships':
        this.appendBotMessage(
          "We have different membership options for your training goals.\n\nWhich plan would you like to know about?",
          [
            { text: "MONTHLY", action: "plan_details", payload: "Monthly" },
            { text: "QUARTERLY", action: "plan_details", payload: "Quarterly" },
            { text: "HALF YEARLY", action: "plan_details", payload: "Half Yearly", primary: true },
            { text: "ANNUAL", action: "plan_details", payload: "Annual" },
            { text: "PERSONAL TRAINING", action: "plan_details", payload: "Personal" }
          ],
          "home"
        );
        break;

      case 'plan_details':
        const planName = payload || 'Monthly';
        const planObj = (GYM_CONFIG.membershipPlans || []).find(p => p.name.toLowerCase().includes(planName.toLowerCase())) || 
                        (GYM_CONFIG.membershipPlans ? GYM_CONFIG.membershipPlans[0] : null);

        const hasConfiguredPrice = planObj && planObj.price && planObj.price !== "₹XXXX";
        const priceDisplay = hasConfiguredPrice 
          ? `${planObj.price} ${planObj.period || ''}`
          : "Please contact True Muscle Fitness Hub for the latest pricing.";

        const planTitle = planObj ? `${planObj.name} PLAN` : `${planName.toUpperCase()} PLAN`;

        this.appendBotMessage(
          `🏷️ ${planTitle}\n\n${priceDisplay}\n\n✓ Full Gym & Strength Floor Access\n✓ Biomechanical Machines\n✓ Locker & Shower Amenities\n✓ Fitness Assessment`,
          [
            { text: "BOOK FREE TRIAL", action: "freetrial", primary: true },
            { text: "CONTACT GYM", action: "whatsapp" },
            { text: "← OTHER PLANS", action: "memberships" }
          ],
          "memberships"
        );
        break;

      case 'programs':
        this.appendBotMessage(
          "Choose your training goal:",
          [
            { text: "MUSCLE BUILDING", action: "muscle" },
            { text: "FAT LOSS", action: "fatloss" },
            { text: "STRENGTH", action: "strength" },
            { text: "FUNCTIONAL FITNESS", action: "functional" },
            { text: "CARDIO", action: "cardio" },
            { text: "PERSONAL TRAINING", action: "personaltraining" }
          ],
          "home"
        );
        break;

      case 'muscle':
        this.appendBotMessage(
          "Want to build muscle?\n\nTrue Muscle's strength-focused training can help you work toward your muscle-building goals through structured workouts and progressive training.\n\nWould you like to book a free trial?",
          [
            { text: "BOOK FREE TRIAL", action: "freetrial", openTrial: true, goalPrefill: "Muscle Building & Hypertrophy", primary: true },
            { text: "TALK TO TRAINER", action: "whatsapp" }
          ],
          "programs"
        );
        break;

      case 'fatloss':
        this.appendBotMessage(
          "Looking to improve your fitness and lose body fat?\n\nWe can help you explore structured training and conditioning options.\n\nWould you like to start with a free trial?",
          [
            { text: "BOOK FREE TRIAL", action: "freetrial", openTrial: true, goalPrefill: "Fat Loss & Weight Management", primary: true },
            { text: "VIEW PROGRAMS", action: "programs" }
          ],
          "programs"
        );
        break;

      case 'strength':
        this.appendBotMessage(
          "Strength training focuses on progressively improving your ability to perform resistance exercises.\n\nReady to experience the gym?",
          [
            { text: "BOOK FREE TRIAL", action: "freetrial", openTrial: true, goalPrefill: "Strength Training", primary: true },
            { text: "VIEW PROGRAMS", action: "programs" }
          ],
          "programs"
        );
        break;

      case 'functional':
        this.appendBotMessage(
          "Functional fitness builds real-world athletic agility, joint resilience, and dynamic power using turf tracks, kettlebells, and plyometrics.\n\nReady to train?",
          [
            { text: "BOOK FREE TRIAL", action: "freetrial", openTrial: true, goalPrefill: "Functional Training", primary: true },
            { text: "VIEW PROGRAMS", action: "programs" }
          ],
          "programs"
        );
        break;

      case 'cardio':
        this.appendBotMessage(
          "Our cardio and endurance deck features commercial curved treadmills, air bikes, and rowing ergs to elevate VO2 max and aerobic fitness.",
          [
            { text: "BOOK FREE TRIAL", action: "freetrial", openTrial: true, goalPrefill: "Cardio & Conditioning", primary: true },
            { text: "VIEW PROGRAMS", action: "programs" }
          ],
          "programs"
        );
        break;

      case 'personaltraining':
        this.appendBotMessage(
          "Looking for one-on-one guidance?\n\nI can help you get started with personal training.",
          [
            { text: "BOOK FREE TRIAL", action: "freetrial", openTrial: true, goalPrefill: "Personal Training", primary: true },
            { text: "CONTACT TRAINER", action: "whatsapp" }
          ],
          "programs"
        );
        break;

      case 'location':
        this.appendBotMessage(
          `True Muscle Fitness Hub is located at:\n\n${GYM_CONFIG.address}`,
          [
            { text: "GET DIRECTIONS", url: (GYM_CONFIG.addressParts && GYM_CONFIG.addressParts.googleMapsUrl) || `https://maps.google.com/?q=${encodeURIComponent(GYM_CONFIG.address)}`, primary: true },
            { text: "WHATSAPP", action: "whatsapp" }
          ],
          "home"
        );
        break;

      case 'hours':
        const timingsText = GYM_CONFIG.openingHours || 
          (GYM_CONFIG.hours ? `Monday – Saturday: ${GYM_CONFIG.hours.weekdays}\nSunday: ${GYM_CONFIG.hours.sunday}` : "Please contact True Muscle Fitness Hub for today's timings.");

        this.appendBotMessage(
          `Our gym timings are:\n\n${timingsText}`,
          [
            { text: "WHATSAPP", action: "whatsapp", primary: true },
            { text: "BOOK FREE TRIAL", action: "freetrial" }
          ],
          "home"
        );
        break;

      case 'freetrial':
        this.triggerFreeTrial();
        break;

      case 'whatsapp':
        const defaultMsg = encodeURIComponent("Hi True Muscle Fitness Hub,\n\nI would like to know more about your gym memberships and training programs.");
        const waUrl = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${defaultMsg}`;
        window.open(waUrl, '_blank');
        this.appendBotMessage(
          "Opening WhatsApp chat with True Muscle Fitness Hub now. Let us know if you have any other questions!",
          [
            { text: "BOOK FREE TRIAL", action: "freetrial" },
            { text: "VIEW MEMBERSHIPS", action: "memberships" }
          ],
          "home"
        );
        break;

      default:
        this.renderInitialGreeting();
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Global Chatbot Initializer
window.initFitnessAssistant = function() {
  window.tmAssistant = new TMFitnessAssistant();
};
