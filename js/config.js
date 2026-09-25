/**
 * True Muscle Fitness Hub — Configuration & Data Store
 * All gym-specific information, pricing, trainers, programs, and contact numbers.
 * Centralized store for easy editing.
 */

const GYM_CONFIG = {
  name: "True Muscle Fitness Hub",
  brandName: "TRUE MUSCLE",
  tagline: "BUILD YOUR STRONGER SELF",
  subTagline: "Train harder. Get stronger. Become the best version of yourself.",
  shortDescription: "Guntur's premier fitness & strength sanctuary. Elite equipment, certified trainers, and world-class athletic programming tailored to your transformation.",

  // Address Details
  address: "#26-1-75, Nagaram Palem Main Road, Rama Commerce Complex, Kanna Vari Thota, Guntur, Andhra Pradesh – 522004",
  addressParts: {
    line1: "#26-1-75, Nagaram Palem Main Road",
    line2: "Rama Commerce Complex, Kanna Vari Thota",
    city: "Guntur",
    state: "Andhra Pradesh",
    pincode: "522004",
    googleMapsUrl: "https://maps.google.com/?q=Nagaram+Palem+Main+Road+Rama+Commerce+Complex+Kanna+Vari+Thota+Guntur+Andhra+Pradesh+522004",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.4312781489434!2d80.4365!3d16.3067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a755d5b780001%3A0x6a0a000000000000!2sNagaram%20Palem%20Main%20Rd%2C%20Guntur%2C%20Andhra%20Pradesh%20522004!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },

  // Contact Details
  whatsappNumber: "919876543210", // REPLACE_WITH_REAL_NUMBER when provided
  phoneNumber: "+91 98765 43210", // REPLACE_WITH_REAL_NUMBER when provided
  phoneRaw: "+919876543210",
  email: "info@truemusclefitness.in",
  instagramHandle: "@truemuscle_guntur",
  instagramUrl: "https://instagram.com/truemuscle_guntur",
  youtubeUrl: "https://youtube.com/@truemuscle_guntur",
  facebookUrl: "https://facebook.com/truemusclefitnesshub",

  // Operating Hours
  openingHours: "Monday – Saturday: 5:00 AM – 10:00 PM | Sunday: 6:00 AM – 1:00 PM",
  hours: {
    weekdays: "5:00 AM – 10:00 PM",
    saturday: "5:00 AM – 10:00 PM",
    sunday: "6:00 AM – 1:00 PM (Morning Special)"
  },

  // Preferred Trial Time Slots
  timeSlots: [
    "Morning — 5:00 AM to 9:00 AM",
    "Mid-Morning — 9:00 AM to 12:00 PM",
    "Afternoon — 12:00 PM to 4:00 PM",
    "Evening — 4:00 PM to 8:00 PM",
    "Night — 8:00 PM to 10:00 PM"
  ],

  // Fitness Goals Options
  fitnessGoals: [
    "Muscle Building & Hypertrophy",
    "Fat Loss & Weight Management",
    "Strength Training",
    "General Fitness",
    "Beginner Fitness",
    "Personal Training",
    "Functional Training",
    "Cardio & Conditioning"
  ],

  // Stats & Highlights
  stats: [
    { number: "7500+", label: "Sq. Ft. Floor Space", suffix: "SQ.FT" },
    { number: "50+", label: "Elite Biomechanical Machines", suffix: "+" },
    { number: "1200+", label: "Active Transformations", suffix: "+" },
    { number: "12+", label: "Certified Strength Coaches", suffix: "+" }
  ],

  // Membership Plans
  membershipPlans: [
    {
      id: "monthly",
      name: "MONTHLY",
      tagline: "FLEXIBLE ACCESS",
      price: "₹XXXX",
      period: "PER MONTH",
      popular: false,
      badge: "FLEXIBLE",
      features: [
        "Full Gym & Strength Floor Access",
        "Cardio & HIIT Deck Usage",
        "Locker & Shower Facilities",
        "Complimentary Fitness Assessment",
        "Mobile App Workout Access"
      ]
    },
    {
      id: "quarterly",
      name: "QUARTERLY",
      tagline: "FOUNDATION PLAN",
      price: "₹XXXX",
      period: "FOR 3 MONTHS",
      popular: false,
      badge: "POPULAR",
      features: [
        "Everything in Monthly Plan",
        "1 Free 1-on-1 Personal Training Session",
        "Bi-weekly Body Composition Analysis",
        "Basic Nutrition & Macro Guideline",
        "Priority Locker Allocation"
      ]
    },
    {
      id: "half-yearly",
      name: "HALF YEARLY",
      tagline: "SERIOUS TRANSFORMATION",
      price: "₹XXXX",
      period: "FOR 6 MONTHS",
      popular: true,
      badge: "BEST VALUE",
      features: [
        "Everything in Quarterly Plan",
        "2 Complimentary PT Sessions",
        "Custom Nutritional Meal Plan",
        "Monthly Fitness Milestone Check-in",
        "15 Days Membership Freeze Facility",
        "Official True Muscle Shaker & Tee"
      ]
    },
    {
      id: "annual",
      name: "ANNUAL",
      tagline: "ULTIMATE COMMITMENT",
      price: "₹XXXX",
      period: "FOR 12 MONTHS",
      popular: false,
      badge: "VIP STATUS",
      features: [
        "All-Access Unlimited Annual Pass",
        "4 Complimentary PT Sessions",
        "Full Custom Nutrition & Macro Coaching",
        "45 Days Membership Freeze Facility",
        "VIP Locker Room Access",
        "Full True Muscle Athlete Kit"
      ]
    },
    {
      id: "personal-training",
      name: "PERSONAL COACHING",
      tagline: "1-ON-1 DEDICATED",
      price: "₹XXXX",
      period: "PACKAGE SESSIONS",
      popular: false,
      badge: "ELITE 1-ON-1",
      features: [
        "Dedicated Master Coach for Every Workout",
        "100% Customized Biomechanical Form Correction",
        "Tailored Daily Meal Plans & WhatsApp Audits",
        "Targeted Goal Tracking & Weekly Scans",
        "Guaranteed Transformation Milestones"
      ]
    }
  ],

  // WhatsApp Message Generators
  whatsappTemplates: {
    freeTrial: (data) => {
      return encodeURIComponent(
        `Hi True Muscle Fitness Hub,\n\n` +
        `I would like to book a free trial.\n\n` +
        `Name: ${data.name || 'Not provided'}\n` +
        `Mobile: ${data.phone || 'Not provided'}\n` +
        `Fitness Goal: ${data.goal || 'General Fitness'}\n` +
        `Preferred Date: ${data.date || 'Earliest available'}\n` +
        `Preferred Time: ${data.time || 'Morning'}\n\n` +
        `Please contact me regarding my trial session.\n\n` +
        `Thank you!`
      );
    },
    chatbotLead: (data) => {
      return encodeURIComponent(
        `Hi True Muscle Fitness Hub,\n\n` +
        `I found you through the website fitness assistant.\n\n` +
        `Name: ${data.name || 'Visitor'}\n` +
        `Mobile: ${data.phone || 'Not provided'}\n` +
        `Goal: ${data.goal || 'General Fitness'}\n` +
        `Interested in: ${data.interest || 'Personal Training'}\n\n` +
        `I would like to know more.\n\n` +
        `Thank you!`
      );
    },
    membershipInquiry: (planName) => {
      return encodeURIComponent(
        `Hi True Muscle Fitness Hub,\n\n` +
        `I am interested in the ${planName} membership plan.\n` +
        `Please share the latest package pricing, special offers, and admission details.\n\n` +
        `Thank you!`
      );
    },
    quickInquiry: () => {
      return encodeURIComponent(
        `Hi True Muscle Fitness Hub,\n\n` +
        `I would like to inquire about gym membership, personal training, and facilities at your Guntur center.\n\n` +
        `Please share more details.`
      );
    }
  },

  // Fitness Categories
  categories: [
    {
      id: "strength",
      title: "STRENGTH TRAINING",
      subtitle: "POWER & LOAD",
      description: "Progressive overload, barbell mastery, power racks, and compound lifting routines designed to maximize pure athletic strength.",
      image: "images/programs/strength.png",
      tag: "CORE POWER"
    },
    {
      id: "muscle-building",
      title: "MUSCLE BUILDING",
      subtitle: "HYPERTROPHY & SCULPT",
      description: "Targeted volume isolation, modern cable stacks, biomechanical plate-loaded machines, and high-intensity hypertrophy splits.",
      image: "images/programs/men.png",
      tag: "HYPERTROPHY"
    },
    {
      id: "fat-loss",
      title: "FAT LOSS & SHRED",
      subtitle: "LEAN CONDITIONING",
      description: "High-metabolic resistance training, HIIT protocols, and caloric expenditure circuits to burn stubborn fat while preserving lean tissue.",
      image: "images/programs/fatloss.png",
      tag: "HIIT & METCON"
    },
    {
      id: "functional",
      title: "FUNCTIONAL FITNESS",
      subtitle: "ATHLETIC AGILITY",
      description: "Kettlebells, plyometrics, slam balls, turf sled pushes, and battle ropes engineered to build real-world athleticism and joint resilience.",
      image: "images/facilities/functional-turf.png",
      tag: "MOBILITY & SPEED"
    },
    {
      id: "cardio",
      title: "CARDIO ENDURANCE",
      subtitle: "AEROBIC CAPACITY",
      description: "Commercial curved treadmills, air bikes, rowing ergs, and stair masters to elevate VO2 max and heart health.",
      image: "images/programs/cardio.png",
      tag: "VO2 MAX"
    },
    {
      id: "personal-training",
      title: "PERSONAL COACHING",
      subtitle: "1-ON-1 ATTENTION",
      description: "Tailored 1-on-1 coaching, bespoke nutrition planning, movement screening, and relentless accountability to fast-track your goals.",
      image: "images/programs/personal-training.png",
      tag: "VIP COACHING"
    }
  ],

  // Featured Programs
  programs: [
    {
      id: "muscle-prog",
      name: "MUSCLE BUILDING",
      pitch: "Build strength. Build size. Build confidence.",
      desc: "An intensive hypertrophy curriculum utilizing biomechanical machines, calibrated barbells, and science-backed training blocks.",
      features: ["Biomechanical Form Coaching", "Macro & Calorie Target Guide", "Progressive Volume Splits"],
      image: "images/programs/men.png",
      badge: "MOST POPULAR"
    },
    {
      id: "fatloss-prog",
      name: "FAT LOSS & LEAN METABOLISM",
      pitch: "Train hard. Move better. Feel stronger.",
      desc: "Dynamic metabolic resistance combined with high-energy cardiovascular conditioning to accelerate fat oxidation.",
      features: ["High Calorie Burn Circuits", "Body Composition Tracking", "Daily Step & Activity Audits"],
      image: "images/programs/fatloss.png",
      badge: "HIGH INTENSITY"
    },
    {
      id: "strength-prog",
      name: "MAXIMUM STRENGTH",
      pitch: "Progressive training designed around your goals.",
      desc: "Heavy compound lifting focusing on Squat, Bench, Deadlift, and Overhead Press with periodized load progression.",
      features: ["Calibrated Power Barbell Training", "RPE-Based Periodization", "Joint Stability & Recovery"],
      image: "images/programs/maximum-strength.png",
      badge: "ELITE POWER"
    },
    {
      id: "pt-prog",
      name: "PERSONAL TRAINING",
      pitch: "Focused coaching. Individual attention.",
      desc: "Exclusive 1-on-1 coaching customized completely to your schedule, physical capabilities, and personal milestones.",
      features: ["Dedicated Personal Coach", "Weekly Body Fat Analysis", "Custom Meal & Supplement Protocol"],
      image: "images/programs/personal-training.png",
      badge: "1-ON-1 DIRECT"
    }
  ],

  // Testimonials
  testimonials: [
    {
      quote: "True Muscle completely revolutionized my training mindset. The equipment quality in Guntur is unmatched — zero waiting for squat racks, elite barbells, and coaches who genuinely correct your biomechanics.",
      author: "Kalyan R.",
      goal: "Gained 8kg Lean Muscle",
      duration: "Member for 14 Months"
    },
    {
      quote: "The energy here hits you the second you walk through the doors. I dropped 14kg in 6 months following their structured fat loss program and nutrition guidance. Best fitness decision I've ever made in Guntur.",
      author: "Venkata Satish B.",
      goal: "Dropped 14kg & Body Fat from 28% to 15%",
      duration: "Member for 8 Months"
    },
    {
      quote: "As a female lifter, finding an intimidating-free yet serious strength gym in Guntur was difficult until True Muscle opened. The trainers treat everyone with equal respect and focus on real strength.",
      author: "Divya M.",
      goal: "Deadlift PR 100kg & Functional Fitness",
      duration: "Member for 10 Months"
    }
  ],

  // Transformations
  transformations: [
    {
      title: "12-WEEK HYPERTROPHY TRANSFORMATION",
      category: "Muscle Building & Shred",
      beforeImg: "images/programs/maximum-strength.png",
      afterImg: "images/programs/men.png",
      stats: {
        timeline: "12 Weeks",
        result: "+6.5kg Lean Mass",
        fatLoss: "-7% Body Fat"
      }
    }
  ],

  // Coaches & Trainers
  trainers: [
    {
      name: "Coach Arjun V.",
      role: "Head Strength & Conditioning Coach",
      experience: "8+ Years Experience",
      specialization: "Olympic Lifting, Hypertrophy, Powerbuilding",
      certifications: "CSCS / K11 Certified Master Trainer",
      image: "images/trainers/coach-arjun.png",
      instagram: "@coach_arjun_tm"
    },
    {
      name: "Coach Priya S.",
      role: "Senior Functional & Fat Loss Coach",
      experience: "6+ Years Experience",
      specialization: "HIIT, Body Transformation, Women's Strength",
      certifications: "ACE Certified / Functional Movement Specialist",
      image: "images/trainers/coach-priya.png",
      instagram: "@priya_fit_coach"
    },
    {
      name: "Coach Rajesh K.",
      role: "Senior Bodybuilding & Physique Specialist",
      experience: "10+ Years Experience",
      specialization: "Hypertrophy Splits, Contest Prep, Mobility",
      certifications: "ISSA Certified Fitness Coach",
      image: "images/trainers/coach-rajesh.png",
      instagram: "@rajesh_ironphysique"
    },
    {
      name: "Coach Sneha R.",
      role: "Mobility & Nutrition Coach",
      experience: "5+ Years Experience",
      specialization: "Corrective Exercise, Sports Nutrition, Calisthenics",
      certifications: "NASM Certified / Precision Nutrition L1",
      image: "images/trainers/coach-sneha.png",
      instagram: "@sneha_movewell"
    }
  ]
};

// Aliases for backward compatibility
const TM_CONFIG = {
  gymInfo: {
    brandName: GYM_CONFIG.brandName,
    tagline: GYM_CONFIG.tagline,
    subTagline: GYM_CONFIG.subTagline,
    fullName: GYM_CONFIG.name,
    shortDescription: GYM_CONFIG.shortDescription,
    address: GYM_CONFIG.addressParts,
    contact: {
      phone: GYM_CONFIG.phoneNumber,
      phoneRaw: GYM_CONFIG.phoneRaw,
      whatsappNumber: GYM_CONFIG.whatsappNumber,
      email: GYM_CONFIG.email,
      instagramHandle: GYM_CONFIG.instagramHandle,
      instagramUrl: GYM_CONFIG.instagramUrl,
      youtubeUrl: GYM_CONFIG.youtubeUrl,
      facebookUrl: GYM_CONFIG.facebookUrl
    },
    hours: GYM_CONFIG.hours,
    stats: GYM_CONFIG.stats
  },
  whatsappTemplates: GYM_CONFIG.whatsappTemplates,
  categories: GYM_CONFIG.categories,
  programs: GYM_CONFIG.programs,
  whyPoints: [
    {
      num: "01",
      title: "TRAIN HARDER",
      subtitle: "Unmatched Training Atmosphere",
      desc: "A distraction-free, high-energy environment loaded with premium grade iron, Olympic lifting platforms, and pro-level audio."
    },
    {
      num: "02",
      title: "MOVE BETTER",
      subtitle: "Biomechanical Precision",
      desc: "State-of-the-art machines designed around natural human movement arcs to eliminate joint stress while hitting muscle targets."
    },
    {
      num: "03",
      title: "GET STRONGER",
      subtitle: "Data-Driven Progression",
      desc: "Structured training methodologies, coach guidance, and measurable benchmarks so you never hit a plateau."
    },
    {
      num: "04",
      title: "STAY CONSISTENT",
      subtitle: "Community & Discipline",
      desc: "A brotherhood and sisterhood of motivated individuals pushing each other to stay disciplined day after day."
    }
  ],
  trainers: GYM_CONFIG.trainers,
  memberships: GYM_CONFIG.membershipPlans,
  testimonials: GYM_CONFIG.testimonials,
  transformations: GYM_CONFIG.transformations
};

// Freeze config objects
Object.freeze(GYM_CONFIG);
Object.freeze(TM_CONFIG);
