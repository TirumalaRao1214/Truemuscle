/**
 * True Muscle Fitness Hub — Interactive Fitness Assistant Chatbot
 * Modular, extensible architecture with keyword matching, lead conversion, and future AI/API readiness.
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
    this.leadFlowState = null; // { step: 'name'|'phone'|'goal'|'confirm', data: {} }
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

    // Render initial message if empty
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
    this.leadFlowState = null;
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
    const greetingText = `Hi 👋\nWelcome to True Muscle Fitness Hub.\n\nI'm your fitness assistant.\n\nWhat can I help you with today?`;
    this.appendBotMessage(greetingText, [
      { text: "🏋️ Memberships", action: "memberships" },
      { text: "💪 Training Programs", action: "programs" },
      { text: "🔥 Fat Loss", action: "fatloss" },
      { text: "💪 Muscle Building", action: "muscle" },
      { text: "👤 Personal Training", action: "personaltraining" },
      { text: "📅 Book Free Trial", action: "freetrial" },
      { text: "📍 Gym Location", action: "location" },
      { text: "🕐 Opening Hours", action: "hours" }
    ]);
  }

  renderDefaultChips() {
    if (!this.chipsContainer) return;
    const chips = [
      { label: "MEMBERSHIPS", action: "memberships" },
      { label: "PROGRAMS", action: "programs" },
      { label: "COACHES", action: "trainers" },
      { label: "FREE TRIAL", action: "freetrial" },
      { label: "LOCATION", action: "location" },
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

      let formattedText = this.escapeHtml(text).replace(/\n/g, '<br>');

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

      // Bind button events
      const btnEls = msgEl.querySelectorAll('.tm-chat-action-btn');
      btnEls.forEach((btnEl, idx) => {
        const btnData = buttons[idx];
        btnEl.addEventListener('click', () => {
          if (btnData.url) {
            window.open(btnData.url, '_blank');
          } else if (btnData.openModal) {
            if (window.tmLeadEngine) window.tmLeadEngine.openModal(btnData.goalPrefill);
          } else if (btnData.action) {
            this.handleAction(btnData.action, btnData.text, btnData.payload);
          }
        });
      });

      // Bind back button event
      const backBtnEl = msgEl.querySelector('.tm-chat-back-btn');
      if (backBtnEl && backAction) {
        backBtnEl.addEventListener('click', () => {
          this.handleAction(backAction, "← Back");
        });
      }

      this.scrollToBottom();
    }, 380);
  }

  handleUserMessage(rawText) {
    this.appendUserMessage(rawText);
    const text = rawText.toLowerCase().trim();

    // 1. Check if user is currently inside interactive Lead Capture Flow
    if (this.leadFlowState) {
      this.handleLeadFlowInput(rawText);
      return;
    }

    // 2. Medical keyword check (Responsible guidance disclaimer)
    if (text.includes('pain') || text.includes('injury') || text.includes('disease') || text.includes('medicine') || text.includes('cure') || text.includes('doctor') || text.includes('blood pressure') || text.includes('diabetes')) {
      this.appendBotMessage(
        "I can provide general fitness and training information, but for medical conditions or specific injuries, please consult a qualified healthcare professional.\n\nOur certified coaches can also customize low-impact rehab or mobility routines for you.",
        [
          { text: "👤 TALK TO A TRAINER", action: "startlead_pt" },
          { text: "📅 BOOK FREE TRIAL", action: "freetrial" }
        ],
        "home"
      );
      return;
    }

    // 3. Keyword Pattern Matching
    if (text.includes('membership') || text.includes('price') || text.includes('pricing') || text.includes('cost') || text.includes('fee') || text.includes('plan')) {
      this.handleAction('memberships', rawText);
    } else if (text.includes('muscle') || text.includes('hypertrophy') || text.includes('bulk') || text.includes('biceps') || text.includes('size')) {
      this.handleAction('muscle', rawText);
    } else if (text.includes('fat loss') || text.includes('weight loss') || text.includes('lose weight') || text.includes('diet') || text.includes('shred') || text.includes('belly fat') || text.includes('burn fat')) {
      this.handleAction('fatloss', rawText);
    } else if (text.includes('strength') || text.includes('powerlifting') || text.includes('squat') || text.includes('deadlift') || text.includes('bench')) {
      this.handleAction('strength', rawText);
    } else if (text.includes('personal train') || text.includes('pt') || text.includes('coach') || text.includes('trainer') || text.includes('one on one') || text.includes('1 on 1')) {
      this.handleAction('personaltraining', rawText);
    } else if (text.includes('location') || text.includes('address') || text.includes('where') || text.includes('guntur') || text.includes('place') || text.includes('map')) {
      this.handleAction('location', rawText);
    } else if (text.includes('timing') || text.includes('time') || text.includes('hour') || text.includes('open') || text.includes('sunday') || text.includes('morning') || text.includes('night')) {
      this.handleAction('hours', rawText);
    } else if (text.includes('trial') || text.includes('free trial') || text.includes('book') || text.includes('session') || text.includes('visit') || text.includes('demo')) {
      this.handleAction('freetrial', rawText);
    } else if (text.includes('join') || text.includes('joining') || text.includes('admission') || text.includes('start')) {
      this.handleAction('join', rawText);
    } else if (text.includes('whatsapp') || text.includes('chat') || text.includes('number') || text.includes('contact') || text.includes('phone') || text.includes('call')) {
      this.handleAction('whatsapp', rawText);
    } else if (text.includes('program') || text.includes('routine') || text.includes('workout') || text.includes('class')) {
      this.handleAction('programs', rawText);
    } else if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('good morning') || text.includes('good evening')) {
      this.appendBotMessage(
        "Hey! Ready to train? Let's find the best workout program and plan for your fitness transformation.",
        [
          { text: "🏋️ VIEW MEMBERSHIPS", action: "memberships" },
          { text: "💪 EXPLORE PROGRAMS", action: "programs" },
          { text: "📅 BOOK FREE TRIAL", action: "freetrial" }
        ],
        "home"
      );
    } else {
      // General Fallback
      this.appendBotMessage(
        "I'm here to help you get stronger and achieve your goals at True Muscle Fitness Hub. What would you like to explore?",
        [
          { text: "🏋️ MEMBERSHIPS", action: "memberships" },
          { text: "💪 TRAINING PROGRAMS", action: "programs" },
          { text: "📅 BOOK FREE TRIAL", action: "freetrial" },
          { text: "📍 LOCATION & TIMING", action: "location" }
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
          "We offer flexible membership plans engineered around your long-term fitness transformation:\n\nChoose a plan to view details:",
          [
            { text: "MONTHLY PLAN", action: "plan_details", payload: "Monthly" },
            { text: "QUARTERLY PLAN", action: "plan_details", payload: "Quarterly" },
            { text: "HALF YEARLY (BEST VALUE)", action: "plan_details", payload: "Half Yearly", primary: true },
            { text: "ANNUAL PASS", action: "plan_details", payload: "Annual" },
            { text: "1-ON-1 PERSONAL TRAINING", action: "startlead_pt" }
          ],
          "home"
        );
        break;

      case 'plan_details':
        const planName = payload || 'Membership';
        const planObj = GYM_CONFIG.membershipPlans.find(p => p.name.toLowerCase().includes(planName.toLowerCase())) || GYM_CONFIG.membershipPlans[0];
        const isCustomPrice = planObj.price === "₹XXXX";
        
        const priceText = isCustomPrice 
          ? "Please contact True Muscle Fitness Hub for current membership pricing and special seasonal offers." 
          : `${planObj.price} ${planObj.period}`;

        this.appendBotMessage(
          `🏷️ ${planObj.name} PLAN (${planObj.tagline})\n\n💰 Price: ${priceText}\n\n✓ Full Strength & Cardio Arena Access\n✓ Biomechanical Equipment\n✓ Locker & Shower Amenities\n✓ Fitness Assessment`,
          [
            { text: "💬 INQUIRE ON WHATSAPP", url: `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${GYM_CONFIG.whatsappTemplates.membershipInquiry(planObj.name)}`, primary: true },
            { text: "📅 BOOK FREE TRIAL FIRST", action: "freetrial" },
            { text: "← OTHER PLANS", action: "memberships" }
          ],
          "memberships"
        );
        break;

      case 'programs':
        this.appendBotMessage(
          "Our science-backed training curriculums focus on progressive overload, biomechanics, and personalized results.\n\nWhich discipline interests you?",
          [
            { text: "💪 MUSCLE BUILDING", action: "muscle" },
            { text: "🔥 FAT LOSS & CONDITIONING", action: "fatloss" },
            { text: "⚡ MAXIMUM STRENGTH", action: "strength" },
            { text: "👤 1-ON-1 COACHING", action: "personaltraining" }
          ],
          "home"
        );
        break;

      case 'muscle':
        this.appendBotMessage(
          "Great! Our Muscle Building & Hypertrophy program focuses on structured resistance splits, progressive overload, and biomechanical machines to build dense size safely.",
          [
            { text: "📅 BOOK FREE TRIAL", action: "freetrial", goalPrefill: "Muscle Building & Hypertrophy", openModal: true, primary: true },
            { text: "👤 TALK TO A TRAINER", action: "startlead_pt", payload: "Muscle Building" },
            { text: "🏋️ VIEW MEMBERSHIPS", action: "memberships" }
          ],
          "programs"
        );
        break;

      case 'fatloss':
        this.appendBotMessage(
          "For Fat Loss & Shredding, we combine metabolic resistance circuits, HIIT conditioning, and daily activity tracking to burn stubborn fat while keeping lean muscle.",
          [
            { text: "📅 BOOK FREE TRIAL", action: "freetrial", goalPrefill: "Fat Loss & Weight Management", openModal: true, primary: true },
            { text: "👤 TALK TO A TRAINER", action: "startlead_pt", payload: "Fat Loss" },
            { text: "🏋️ VIEW MEMBERSHIPS", action: "memberships" }
          ],
          "programs"
        );
        break;

      case 'strength':
        this.appendBotMessage(
          "Our Maximum Strength program focuses on compound barbell movements (Squats, Deadlifts, Bench, Overhead Press) calibrated for pure athletic power and periodized loads.",
          [
            { text: "📅 BOOK FREE TRIAL", action: "freetrial", goalPrefill: "Strength Training", openModal: true, primary: true },
            { text: "👤 CONNECT WITH HEAD COACH", action: "startlead_pt", payload: "Strength Training" },
            { text: "🏋️ VIEW MEMBERSHIPS", action: "memberships" }
          ],
          "programs"
        );
        break;

      case 'personaltraining':
        this.appendBotMessage(
          "Focused coaching. Individual attention. Our certified Master Coaches provide dedicated 1-on-1 form correction, tailored meal plans, and weekly body scans.",
          [
            { text: "⚡ CONNECT WITH A COACH", action: "startlead_pt", payload: "Personal Training", primary: true },
            { text: "📅 BOOK FREE TRIAL", action: "freetrial" },
            { text: "💬 WHATSAPP DIRECT", action: "whatsapp" }
          ],
          "programs"
        );
        break;

      case 'trainers':
        this.appendBotMessage(
          "Meet our certified coaches:\n\n• Coach Arjun V. — Head Strength & CSCS (8+ yrs)\n• Coach Priya S. — Functional & Fat Loss (6+ yrs)\n• Coach Rajesh K. — Hypertrophy & ISSA Master (10+ yrs)\n• Coach Sneha R. — Mobility & NASM (5+ yrs)\n\nWould you like to book a session with a coach?",
          [
            { text: "👤 BOOK COACH CONSULTATION", action: "startlead_pt", primary: true },
            { text: "📅 BOOK FREE TRIAL", action: "freetrial" }
          ],
          "home"
        );
        break;

      case 'location':
        this.appendBotMessage(
          `📍 True Muscle Fitness Hub is located at:\n\n${GYM_CONFIG.address}\n\n(Centrally located on Nagaram Palem Main Road, Guntur)`,
          [
            { text: "🗺️ GET DIRECTIONS (GOOGLE MAPS)", url: GYM_CONFIG.addressParts.googleMapsUrl, primary: true },
            { text: "💬 WHATSAPP LOCATION PIN", action: "whatsapp" },
            { text: "🕐 VIEW OPENING HOURS", action: "hours" }
          ],
          "home"
        );
        break;

      case 'hours':
        this.appendBotMessage(
          `🕐 Gym Operating Timings:\n\n• Monday – Saturday: ${GYM_CONFIG.hours.weekdays}\n• Sunday: ${GYM_CONFIG.hours.sunday}\n\nDedicated morning and evening strength slots available.`,
          [
            { text: "📅 BOOK FREE TRIAL", action: "freetrial", primary: true },
            { text: "📍 GET DIRECTIONS", action: "location" }
          ],
          "home"
        );
        break;

      case 'join':
      case 'freetrial':
        this.appendBotMessage(
          "You can start your fitness journey with a complimentary trial session at True Muscle Fitness Hub!",
          [
            { text: "📅 OPEN FREE TRIAL FORM", openModal: true, primary: true },
            { text: "💬 INQUIRE ON WHATSAPP", action: "whatsapp" }
          ],
          "home"
        );
        break;

      case 'whatsapp':
        const inquiryMsg = GYM_CONFIG.whatsappTemplates.quickInquiry();
        const waUrl = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${inquiryMsg}`;
        window.open(waUrl, '_blank');
        this.appendBotMessage(
          "Opening WhatsApp chat with True Muscle Fitness Hub now. Let us know if you need anything else!",
          [
            { text: "📅 BOOK FREE TRIAL", action: "freetrial" },
            { text: "🏋️ VIEW MEMBERSHIPS", action: "memberships" }
          ],
          "home"
        );
        break;

      case 'startlead_pt':
        this.leadFlowState = {
          step: 'name',
          interest: payload || 'Personal Training',
          data: {}
        };
        this.appendBotMessage(
          `Great! I can connect you directly with our coaching team for ${this.leadFlowState.interest}.\n\nWhat is your full name?`
        );
        break;

      default:
        this.renderInitialGreeting();
    }
  }

  handleLeadFlowInput(input) {
    if (!this.leadFlowState) return;

    if (this.leadFlowState.step === 'name') {
      const name = input.trim();
      if (name.length < 2) {
        this.appendBotMessage("Please share your full name so our coach can address you properly:");
        return;
      }
      this.leadFlowState.data.name = name;
      this.leadFlowState.step = 'phone';
      this.appendBotMessage(`Thanks ${name}! What is your 10-digit WhatsApp mobile number?`);
      return;
    }

    if (this.leadFlowState.step === 'phone') {
      const rawPhone = input.trim().replace(/[\s\-\+]/g, '');
      const indianPhoneRegex = /^(?:91)?[6-9]\d{9}$/;
      if (!indianPhoneRegex.test(rawPhone)) {
        this.appendBotMessage("Please enter a valid 10-digit mobile number:");
        return;
      }
      this.leadFlowState.data.phone = rawPhone;
      this.leadFlowState.step = 'goal';
      this.appendBotMessage(
        "Awesome. What is your primary fitness goal?",
        [
          { text: "Muscle Building & Hypertrophy", action: "lead_goal_select", payload: "Muscle Building & Hypertrophy" },
          { text: "Fat Loss & Weight Management", action: "lead_goal_select", payload: "Fat Loss & Weight Management" },
          { text: "Strength & Powerlifting", action: "lead_goal_select", payload: "Strength Training" },
          { text: "General Fitness & Health", action: "lead_goal_select", payload: "General Fitness" }
        ]
      );
      return;
    }

    if (this.leadFlowState.step === 'goal') {
      this.leadFlowState.data.goal = input.trim();
      this.finishLeadFlow();
    }
  }

  finishLeadFlow(selectedGoal) {
    if (selectedGoal) {
      this.leadFlowState.data.goal = selectedGoal;
    }

    const leadData = {
      name: this.leadFlowState.data.name,
      phone: this.leadFlowState.data.phone,
      goal: this.leadFlowState.data.goal || 'General Fitness',
      interest: this.leadFlowState.interest || 'Personal Training'
    };

    const waEncoded = GYM_CONFIG.whatsappTemplates.chatbotLead(leadData);
    const waUrl = `https://wa.me/${GYM_CONFIG.whatsappNumber}?text=${waEncoded}`;

    this.leadFlowState = null; // reset flow

    this.appendBotMessage(
      `✓ All set, ${leadData.name}!\n\nYour inquiry for ${leadData.interest} (${leadData.goal}) is ready to send to True Muscle Fitness Hub.`,
      [
        { text: "💬 SEND DETAILS ON WHATSAPP", url: waUrl, primary: true },
        { text: "📅 BOOK FREE TRIAL", action: "freetrial" }
      ],
      "home"
    );
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
