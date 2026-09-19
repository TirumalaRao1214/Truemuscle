# True Muscle Fitness Hub — Website Project Plan

## Top-Level Overview
Design and build an original, ultra-premium, high-performance static fitness platform for **True Muscle Fitness Hub** located in Guntur, Andhra Pradesh. Inspired by modern, cinematic, high-energy platforms (such as Cult.fit) with a bold Black/White/Red accent visual system, large athletic typography, full-bleed imagery, horizontal carousels, interactive tools (BMI calculator, interactive Before/After comparison slider, Free Trial WhatsApp lead generator modal), floating WhatsApp quick-contact, and complete local SEO & responsive optimization for all devices (320px to 4K).

---

## Sub-Tasks

### Sub-Task 1: Core Configuration & Architectural Setup
- **Intent**: Establish the clean folder structure, asset pipeline, centralized gym data (`config.js`), and base HTML skeleton with meta tags and LocalBusiness JSON-LD schema.
- **Expected Outcomes**:
  - `true-muscle/` directory created with `index.html`, `css/`, `js/`, and `assets/`.
  - `js/config.js` containing all editable gym info, business address in Guntur, WhatsApp formatting templates, trainer data, membership tier models, and program lists.
  - Complete semantic HTML header, meta OpenGraph tags, schema markup for SEO.
- **Todo List**:
  - [ ] Create folder structure: `css/`, `js/`, `assets/images/`, `assets/icons/`.
  - [ ] Build `js/config.js` with centralized gym data and placeholders.
  - [ ] Scaffold `index.html` with accessibility, Google Fonts (Bebas Neue / Montserrat / Syne or Clash Display styling via Google Fonts), and meta tags.
- **Relevant Context**: Root directory, `js/config.js`, `index.html`.
- **Status**: `[ ] pending`

### Sub-Task 2: Styling & Visual System (Black / Charcoal / White / Red)
- **Intent**: Create the modular, ultra-premium dark/light alternating aesthetic with bold typography, CSS custom variables, modern card aesthetics, backdrop-filter blurs, and fluid responsive layouts.
- **Expected Outcomes**:
  - `css/style.css` defining the CSS variable color palette (`--black`, `--charcoal`, `--dark-card`, `--white`, `--red-accent`, `--red-glow`, `--text-muted`), font hierarchies, hero typography, glowing accents, buttons, and custom scrollbars.
  - `css/responsive.css` covering breakpoints (320px, 375px, 414px, 768px, 1024px, 1440px, 1920px) with mobile-app style bottom dock and navigation.
- **Todo List**:
  - [ ] Implement color variables, typography scales, spacing tokens in `css/style.css`.
  - [ ] Create utility classes, button variants (glow, ghost, red athletic), and card styles.
  - [ ] Build responsive rules in `css/responsive.css` ensuring zero horizontal overflow on mobile.
- **Relevant Context**: `css/style.css`, `css/responsive.css`.
- **Status**: `[ ] pending`

### Sub-Task 3: Hero, Header, Mobile Navigation & Gym Experience Section
- **Intent**: Build the 100vh cinematic hero with animated headline reveal, dynamic sticky glassmorphic navigation, full-screen mobile menu drawer, and the immersive editorial "Welcome to True Muscle" gym experience section.
- **Expected Outcomes**:
  - Sticky glass header that transitions smoothly on scroll with logo, quick navigation links, and "JOIN NOW" CTA.
  - Full-screen mobile overlay menu with smooth open/close interactions.
  - Dominant hero section with cinematic athletic video/image backdrop, bold condensed typography, Guntur location pill, dual CTAs, and scroll-down indicator.
  - Immersive editorial Gym Experience showcase highlighting Free Weights, Strength Area, Cardio, Machines, and Functional Training.
- **Todo List**:
  - [ ] Build header and full-screen mobile navigation drawer.
  - [ ] Code the 100vh Hero section with headline reveal animation and CTA triggers.
  - [ ] Build the "Welcome to True Muscle" editorial showcase.
- **Relevant Context**: `index.html`, `js/app.js`, `css/style.css`.
- **Status**: `[ ] pending`

### Sub-Task 4: Category Slider & Editorial Programs Showcase
- **Intent**: Provide Cult.fit-style horizontal category card browsing ("TRAIN YOUR WAY") and high-impact editorial program cards ("FIND YOUR TRAINING").
- **Expected Outcomes**:
  - Smooth touch-swipe & desktop drag/button scroll carousel for fitness categories (Strength, Muscle Building, Fat Loss, Functional Fitness, Cardio, Personal Training).
  - High-contrast editorial program cards with dark gradient overlays, badges, and deep dive expanders.
  - Responsive snap scrolling on mobile devices.
- **Todo List**:
  - [ ] Build `js/carousel.js` supporting touch swiping, drag scrolling, and prev/next arrow controls.
  - [ ] Markup and style Category carousel cards with high-resolution imagery and explore CTAs.
  - [ ] Build Programs editorial section with full-bleed cards and descriptions.
- **Relevant Context**: `index.html`, `js/carousel.js`, `css/style.css`.
- **Status**: `[ ] pending`

### Sub-Task 5: "Why True Muscle" & Coaches Showcase Carousel
- **Intent**: Construct a modern numbered feature progression (01 Train Harder, 02 Move Better, 03 Get Stronger, 04 Stay Consistent) and interactive Trainer / Coach cards with social links and horizontal navigation.
- **Expected Outcomes**:
  - Numbered feature list with large athletic numbers, scroll-triggered highlights, and sleek typography.
  - Trainer cards carousel showcasing coach portraits, specializations, experience metrics, and direct booking triggers.
- **Todo List**:
  - [ ] Code the "Why True Muscle" horizontal/grid feature section with staggered entrance.
  - [ ] Build Coaches carousel with navigation arrows, bio modals, and Instagram links.
- **Relevant Context**: `index.html`, `js/carousel.js`, `js/config.js`.
- **Status**: `[ ] pending`

### Sub-Task 6: Interactive Modules (BMI Calculator & Before/After Transformation Slider)
- **Intent**: Deliver interactive client-side fitness tools that boost user engagement and demonstrate tangible visual results.
- **Expected Outcomes**:
  - Client-side BMI calculator in `js/calculator.js` with instant metric calculations, animated gauge/category meter, health advice, and medical disclaimer.
  - Smooth interactive Before/After comparison image slider with draggable split divider and touch support.
- **Todo List**:
  - [ ] Implement Before/After interactive slider with mouse & touch drag events.
  - [ ] Create sleek BMI calculator with metric inputs (height/weight/age), category indicator, and animated score display in `js/calculator.js`.
- **Relevant Context**: `js/calculator.js`, `index.html`, `css/style.css`.
- **Status**: `[ ] pending`

### Sub-Task 7: Memberships, Testimonial Quotes & Location Hub
- **Intent**: Showcase transparent membership tiers, editorial member reviews, and local Guntur address/maps integration.
- **Expected Outcomes**:
  - Membership pricing grid (Monthly, Quarterly, Half Yearly, Annual, Personal Training) with featured badge, feature checklists, and direct trial/join triggers.
  - Large editorial testimonial quote slider.
  - Location section with Guntur landmark info, opening hours, Google Maps embed, and direct "Get Directions" / "Call Now" / "WhatsApp" action buttons.
- **Todo List**:
  - [ ] Render membership cards with benefit checklists and highlighted popular tier.
  - [ ] Build editorial member quote slider.
  - [ ] Build location section featuring exact Nagaram Palem address, Google Maps iframe, and contact triggers.
- **Relevant Context**: `index.html`, `js/config.js`, `css/style.css`.
- **Status**: `[ ] pending`

### Sub-Task 8: Free Trial Modal, WhatsApp Lead Engine & Floating Quick Action
- **Intent**: High-conversion booking pipeline that collects visitor preferences and opens a formatted WhatsApp chat without backend dependencies.
- **Expected Outcomes**:
  - Modern modal dialog triggered from any "BOOK FREE TRIAL" CTA.
  - Form validation (Name, Mobile, Goal, Date, Time) in `js/whatsapp.js`.
  - Automatic conversion to clean WhatsApp message with one-click direct chat opening.
  - Persistent bottom-right floating WhatsApp badge with pulse animation and mobile sticky bottom trial bar.
- **Todo List**:
  - [ ] Create Free Trial modal dialog with smooth backdrop fade and scale-in animation.
  - [ ] Implement `js/whatsapp.js` to format and route messages directly to the configured WhatsApp phone number.
  - [ ] Add floating WhatsApp CTA button and mobile bottom sticky trial bar.
- **Relevant Context**: `js/whatsapp.js`, `index.html`, `css/style.css`.
- **Status**: `[ ] pending`

### Sub-Task 9: Animations, Performance & Cross-Device Polish
- **Intent**: Add micro-interactions, scroll reveals (IntersectionObserver), number counters, image lazy loading, and finalize the production-ready build for Render / Static Hosting.
- **Expected Outcomes**:
  - Lightweight scroll animations in `js/animations.js` (staggered cards, counter tickers, reveal effects).
  - High quality curated royalty-free fitness imagery with lazy loading.
  - Pre-deployment validation ensuring all links, modals, carousels, and responsive viewports (320px - 1920px) run flawlessly out-of-the-box.
- **Todo List**:
  - [ ] Implement `js/animations.js` with IntersectionObserver for reveal effects and stat counting.
  - [ ] Verify image sources, accessibility alt tags, and lazy loading.
  - [ ] Validate responsive behavior across mobile, tablet, and desktop breakpoints.
- **Relevant Context**: `js/animations.js`, `index.html`, `css/responsive.css`.
- **Status**: `[ ] pending`
