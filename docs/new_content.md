# Intelligence Academy Website Development Wiki

## Table of Contents
1. [Project Overview](#project-overview)
2. [Site Architecture](#site-architecture)
3. [Design System](#design-system)
4. [Header Implementation](#header-implementation)
5. [Hero Section](#hero-section)
6. [Content Sections](#content-sections)
7. [Responsive Design Requirements](#responsive-design-requirements)
8. [Technical Specifications](#technical-specifications)
9. [Copy Bank](#copy-bank)
10. [Development Checklist](#development-checklist)

---

## Project Overview

### Mission
Create a premium, Apple-inspired website for Intelligence Academy @ Rowan University - an AI startup accelerator positioned as a "Unicorn Factory" for Greater Philadelphia.

### Key Goals
- **Primary CTA**: Drive applications for Spring 2026 cohort
- **Positioning**: Unicorn-focused AI accelerator with regional advantages
- **Credibility**: Balance ambitious claims with academic backing
- **Conversion**: Clean, modern design optimized for application submissions

### Target Audience
- AI entrepreneurs and founders
- Graduate students with AI research
- Faculty with commercializable technology
- Corporate innovators seeking to launch AI startups

---

## Site Architecture

### Primary Navigation
```
Header:
├── Logo: Intelligence Academy @ Rowan / AI Startup Accelerator & Unicorn Factory*
├── Hamburger Menu (☰)
│   ├── Home
│   ├── Program
│   ├── Our Vision  
│   ├── Partners
│   ├── About
│   └── Contact
└── Apply Now Button (with "Spring 2026 Cohort" pill)
```

### Page Structure
```
Single Page Application:
├── Concept Demo Banner (closable)
├── Header (shrinking on scroll)
├── Hero Section (full viewport)
├── What Makes Us Different
├── Statistics Section
├── Program Methodology
├── Call to Action
└── Footer
```

---

## Design System

### Color Palette
```css
--primary-blue: #007AFF (Apple Blue)
--primary-gray: #1D1D1F (Text Primary)
--secondary-gray: #86868B (Text Secondary)
--light-gray: #F5F5F7 (Backgrounds)
--white: #FFFFFF
--accent-green: #30D158
--accent-orange: #FF9500 (@ Rowan, Unicorn Factory, Pills)
--border-light: rgba(0, 0, 0, 0.1)
```

### Typography
```css
Font Stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

Hierarchy:
- Hero Title: clamp(2rem, 5vw, 4rem), weight: 700
- Hero Subtitle: clamp(1.1rem, 3vw, 1.75rem), weight: 600, color: blue
- Section Titles: clamp(2rem, 4vw, 3rem), weight: 700
- Body Text: clamp(1rem, 2.5vw, 1.25rem), color: secondary-gray
- Fine Print: 0.8rem, italic, color: secondary-gray
```

### Spacing System
```css
Base Unit: 1rem (16px)
- Small: 0.5rem (8px)
- Medium: 1rem (16px) 
- Large: 2rem (32px)
- XL: 4rem (64px)
- Section Padding: 80px vertical, 2rem horizontal
```

### Border Radius
```css
--border-radius: 12px (buttons, cards)
--border-radius-large: 20px (sections, major containers)
```

---

## Header Implementation

### Concept Demo Banner
```html
<!-- CRITICAL: Always include disclaimer -->
<div class="draft-banner" id="draftBanner">
    <span class="warning-icon">⚠️</span>
    CONCEPT DEMO - Not an official Rowan University program
    <button class="banner-close" id="bannerClose">×</button>
</div>
```

**Styling Requirements:**
- Fixed position, top: 0
- Red-orange gradient background
- 30px height (26px mobile)
- Closable with X button (reappears on reload)
- White text, 0.75rem font size

### Main Header
```html
<header class="header">
    <nav class="nav">
        <a href="#" class="logo">
            <div>Intelligence Academy <span class="rowan">@ Rowan</span></div>
            <div class="logo-subtitle">AI Startup Accelerator & <span class="unicorn-factory">Unicorn Factory</span><span class="asterisk">*</span></div>
        </a>
        
        <div class="header-actions">
            <div class="cta-container">
                <a href="#apply" class="cta-button">Apply Now</a>
                <div class="cohort-pill">Spring 2026 Cohort</div>
            </div>
            <button class="hamburger-menu" id="hamburger">☰</button>
            <div class="nav-dropdown" id="navDropdown">
                <!-- Navigation items -->
            </div>
        </div>
    </nav>
</header>
```

**Key Features:**
- **Logo Styling**: "@ Rowan" in orange, "Unicorn Factory" in blue & bold
- **Shrinking Header**: 150% normal size, shrinks on scroll (50px+ scroll distance)
- **Glassmorphism**: backdrop-blur(20px), rgba(255,255,255,0.8)
- **Hamburger**: Perfect circle (48px), gray background, blue on hover
- **Pill**: Orange, positioned top-right of Apply button
- **Responsive**: Logo text scales down on mobile, no line breaks

---

## Hero Section

### Content Structure
```html
<section class="hero">
    <div class="hero-main-content">
        <!-- Primary messaging and CTA -->
    </div>
    
    <div class="scroll-indicator">
        <a href="#differentiators" class="scroll-link">
            Learn More <span class="scroll-arrow">↓</span>
        </a>
    </div>
    
    <div class="hero-footer">
        <!-- Fine print and disclaimers -->
    </div>
</section>
```

### Copy Requirements

**Title:** "Transform Your AI Vision Into Reality"

**Subtitle:** "The AI Unicorn Advantage is Real"

**Description:** 
"More AI startups are reaching billion-dollar valuations in **quarter the time** with **half the team** and **double the success rate**¹ vs. traditional unicorns. Our program focuses on the specific methodology and partnerships that maximize your AI startup's unicorn potential."

**CTA Button:** "Submit 2-Min Application"
**Sub-text:** "Get invited to apply for Spring 2026 cohort"

**Disclaimers:**
- Asterisk: "*Aspiring unicorn catalyst based on AI sector performance data..."
- Footnote: "¹ Source: CB Insights State of AI Report 2024, PitchBook Unicorn Analysis"

### Layout Requirements
- **Full Viewport**: min-height: calc(100vh - header height)
- **Flexbox Layout**: justify-content: space-between
- **Main Content**: Centered vertically with 60px top padding
- **Learn More**: Bouncing animation, gray text, links to next section
- **Footer**: Anchored to bottom with fine print

---

## Content Sections

### 1. What Makes Us Different
```html
<section class="differentiators-section">
    <div class="container">
        <h2>What Makes Us Different</h2>
        <p>Our unicorn-focused methodology combines the best of regional connection, university research, corporate partnerships, and entrepreneurial excellence all with a strong focus on AI.</p>
        
        <div class="highlight-cards">
            <!-- 5 benefit cards -->
        </div>
    </div>
</section>
```

**Cards Content:**
1. **$100K Investment** - Per team with founder-friendly terms
2. **Fortune 500 Partnerships** - For pilot customers and strategic exits
3. **Proven NSF I-Corps** - Methodology with 40% survival rates
4. **30% Cost Savings** - vs. coastal alternatives in Greater Philadelphia
5. **Access to Compute** - High-performance GPU clusters and cloud credits for AI development and training

### 2. Statistics Section
**Title:** "Why AI Companies Become Unicorns Differently"
**Subtitle:** "The statistics that drive our unicorn-focused methodology"

**Comparison Table:**
| Unicorn Metric | Traditional Startups | AI Startups | AI Advantage |
|---|---|---|---|
| Time to $1B Valuation | 25 years average | 7 years average | **Quarter the time** |
| Team Size at Unicorn Status | 1,000+ employees | 200-500 employees | **Half the team size** |
| Success Rate to Unicorn | 1% of startups | 2% of AI startups | **Double the success** |
| Capital Efficiency | $500M+ raised | $100-200M raised | **2.5x more efficient** |

### 3. Program Methodology
**Title:** "How We Maximize Your Unicorn Potential"
**Subtitle:** "Every program element designed for exponential growth"

**Four Pillars:**
1. **Fortune 500 Corporate Partnerships** (🏢)
2. **NSF I-Corps Customer Discovery** (🔬)
3. **Regional Cost Advantage** (💰)
4. **University Research Pipeline** (🎓)

### 4. Final CTA Section
- **Background:** Primary blue
- **Title:** "Ready to Build Your AI Unicorn*?"
- **Subtitle:** "Submit your 2-minute application and take the first step toward billion-dollar impact"
- **Button:** White background, blue text

---

## Responsive Design Requirements

### Breakpoints
```css
/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Small Mobile */
@media (max-width: 480px) { }
```

### Critical Requirements
1. **No Horizontal Scrolling** - All content must fit viewport width
2. **Header Text Must Not Break** - Logo text scales, never wraps
3. **Touch Targets** - Minimum 44px for all interactive elements
4. **Readable Typography** - Text never smaller than 14px
5. **Proper Spacing** - Maintain visual hierarchy on all screens

### Mobile-Specific Adjustments
- Header: Smaller logo, tighter padding
- Hero: Reduced font sizes, adjusted spacing
- Cards: Single column layout
- Tables: Horizontal scroll or stack vertically
- Buttons: Full-width on small screens

---

## Technical Specifications

### Performance Requirements
- **Page Load Speed**: Under 3 seconds
- **Google PageSpeed Score**: 90+ 
- **Core Web Vitals**: All green
- **Mobile Friendly**: Google Mobile-Friendly Test pass

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Graceful Degradation**: Basic functionality in older browsers

### SEO Requirements
```html
<title>Intelligence Academy @ Rowan University | AI Startup Accelerator & Unicorn Factory</title>
<meta name="description" content="Join Greater Philadelphia's premier AI startup accelerator. $100K investment, Fortune 500 partnerships, and unicorn-focused methodology. Apply for Spring 2026 cohort.">
<meta name="keywords" content="AI startup accelerator, unicorn factory, artificial intelligence entrepreneurship, Greater Philadelphia startups, university accelerator">
```

### Accessibility
- **WCAG 2.1 AA Compliance**
- **Semantic HTML**: Proper heading hierarchy, alt tags, form labels
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader**: ARIA labels where needed
- **Color Contrast**: 4.5:1 minimum ratio

---

## Copy Bank

### Headlines & Taglines
- "Transform Your AI Vision Into Reality"
- "The AI Unicorn Advantage is Real"
- "AI Startup Accelerator & Unicorn Factory*"
- "Greater Philadelphia's First AI Unicorn by 2030"

### Value Propositions
- "More AI startups are reaching billion-dollar valuations in quarter the time with half the team and double the success rate vs. traditional unicorns"
- "Our unicorn-focused methodology combines the best of regional connection, university research, corporate partnerships, and entrepreneurial excellence"
- "$100K investment with founder-friendly terms"
- "Fortune 500 partnerships for pilot customers and strategic exits"

### Call-to-Action Copy
- "Submit 2-Min Application"
- "Get invited to apply for Spring 2026 cohort"
- "Apply Now"
- "Ready to Build Your AI Unicorn*?"

### Legal/Disclaimer Copy
- "*Aspiring unicorn catalyst based on AI sector performance data. While unicorn outcomes remain statistically rare (2% of AI startups vs. 1% traditional), our methodology systematically addresses the factors that give AI companies demonstrable advantages in achieving billion-dollar valuations."
- "¹ Source: CB Insights State of AI Report 2024, PitchBook Unicorn Analysis"
- "CONCEPT DEMO - Not an official Rowan University program"

### Contact Information
- **Email**: apply@iamunicorn.org
- **Phone**: (856) 256-4000
- **Address**: South Jersey Technology Park, Glassboro, NJ 08028

---

## Development Checklist

### Phase 1: Foundation ✅
- [ ] Set up development environment
- [ ] Implement design system (colors, typography, spacing)
- [ ] Create responsive grid system
- [ ] Set up build process and optimization

### Phase 2: Header & Navigation ✅
- [ ] Concept demo banner with close functionality
- [ ] Shrinking header on scroll
- [ ] Logo with proper styling (orange @ Rowan, blue Unicorn Factory)
- [ ] Hamburger menu with dropdown
- [ ] Apply Now button with pill
- [ ] Mobile responsive header

### Phase 3: Hero Section ✅
- [ ] Full viewport layout
- [ ] Responsive typography with clamp()
- [ ] Proper vertical spacing and alignment
- [ ] Learn More scroll indicator with animation
- [ ] Fine print with footnotes and learn more links

### Phase 4: Content Sections
- [ ] What Makes Us Different with 5 cards
- [ ] Statistics section with comparison table
- [ ] Program methodology with 4 pillars
- [ ] Final CTA section
- [ ] Smooth scroll between sections

### Phase 5: Polish & Optimization
- [ ] Loading animations and transitions
- [ ] Hover effects and micro-interactions
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Accessibility audit

### Phase 6: Quality Assurance
- [ ] Content review and copy editing
- [ ] Legal disclaimer verification
- [ ] SEO optimization
- [ ] Analytics implementation
- [ ] Form functionality testing

---

## Important Notes for Development Team

### 🚨 Critical Requirements
1. **Always include concept demo banner** - Legal requirement for transparency
2. **Maintain asterisk disclaimers** - Must accompany all "unicorn" claims
3. **Responsive header text** - Logo must never break to multiple lines
4. **Apple-inspired design** - Clean, minimal, premium feel throughout
5. **Performance first** - Fast loading is non-negotiable

### 🎯 Conversion Optimization
1. **Apply Now prominence** - Primary CTA should always be visible
2. **Trust indicators** - University backing, corporate partners, statistics
3. **Social proof** - Data-driven claims with sources
4. **Clear value prop** - Benefits obvious within 5 seconds
5. **Reduced friction** - Simple application process messaging

### 🔧 Technical Best Practices
1. **Progressive enhancement** - Works without JavaScript
2. **Mobile-first** - Design for mobile, enhance for desktop
3. **Semantic HTML** - Proper document structure
4. **CSS Grid/Flexbox** - Modern layout techniques
5. **Optimized assets** - Compressed images, minified code

### 📞 Contact for Questions
- **Product Owner**: [Contact Information]
- **Design Lead**: [Contact Information]  
- **Technical Lead**: [Contact Information]

---

*Last Updated: [Current Date]*
*Version: 1.0*