# React Migration Guide for Intelligence Academy

## Overview
This guide outlines how to implement the new_homepage.html design using React.js while preserving the original look and feel.

## Project Structure

```
intelligence-academy/
├── archive/                    # Old HTML files preserved
│   ├── index_old.html
│   ├── new_homepage_original.html
│   └── ...other old files
├── src/
│   ├── components/
│   │   ├── DraftBanner.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── StatsSection.jsx
│   │   ├── ProgramSection.jsx
│   │   └── ParticleBackground.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ApplyPage.jsx
│   │   ├── ProgramPage.jsx
│   │   └── PartnersPage.jsx
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── utils/
│   │   └── smoothScroll.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## Key Components to Create

### 1. ParticleBackground Component
```jsx
// Animated background particles
// Extract particle CSS and animation logic
```

### 2. HeroSection Component
```jsx
// Main hero with gradient text
// Includes CTA buttons and disclaimers
```

### 3. Interactive Cards
```jsx
// Reusable card component for stats, programs, etc.
// Hover effects and animations
```

## CSS Strategy

1. **Keep all original styles**: Extract CSS from new_homepage.html
2. **Component-specific CSS**: Each component gets its own CSS file
3. **Global variables**: Maintain the CSS custom properties
4. **Responsive design**: Keep all media queries intact

## Animation Preservation

1. **Intersection Observer**: For scroll animations
2. **CSS animations**: Keep all keyframes
3. **Hover effects**: Maintain interactive states
4. **Particle animation**: Use React refs for DOM manipulation

## Build & Deployment

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### Vercel Deployment
The `vercel.json` should be updated to:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## Next Steps

1. Install dependencies: `npm install`
2. Create remaining components following the pattern
3. Extract all sections from index.html into components
4. Test all animations and interactions
5. Deploy to Vercel

## Important Notes

- All original styling is preserved in component CSS files
- The gradient animations and Mac-inspired UI remain intact
- Responsive design breakpoints are maintained
- Interactive effects use React state management
- The particle background is created dynamically in React

## Quick Start for Other Pages

To apply this style to other pages:

1. Import the global CSS and component library
2. Use the Header and Footer components
3. Apply the same color variables and typography
4. Use the interactive card components
5. Maintain the glassmorphism effects

This approach ensures consistency across all pages while leveraging React's component reusability.