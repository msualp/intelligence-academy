# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Intelligence Academy is a React-based single-page application for Rowan University's AI Startup Accelerator program. Originally a static HTML site, it has been migrated to React while preserving the original design and animations.

**Key Facts:**
- React 18 with Vite as build tool
- React Router for client-side routing
- Tailwind CSS + custom CSS for styling
- Deployed on Vercel with automatic deployments
- Features a "unicorn-focused" AI accelerator theme with $100K investment offering

## Common Commands

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Serve production build locally
npm run serve
```

**Note:** No test or lint commands are configured yet. The project focuses on rapid development and deployment.

## Architecture & Structure

### Routing Strategy
The HomePage (`/`) has its own complete layout with custom header/footer, while all other pages share a common layout with DraftBanner, Header, and Footer components. This is handled in App.jsx using nested routes.

### Component Architecture
- **Pages** (`/src/pages/`): Full page components that include their own CSS files
  - HomePage: Complete standalone page with all sections inline
  - Other pages: Use shared layout components
- **Components** (`/src/components/`): Reusable UI components
  - Each component has its own CSS file
  - Components use CSS modules pattern (importing CSS directly)

### Styling Approach
1. **CSS Variables**: Defined in root for colors, shadows, spacing
2. **Component CSS**: Each component has dedicated CSS file
3. **Tailwind CSS**: Available but used sparingly to preserve original design
4. **Dark Mode**: CSS variables switch based on `[data-theme="dark"]`

### Key Design Elements
- Particle background animation (CSS-based, not canvas)
- Glassmorphism effects with backdrop-filter
- Gradient text animations
- Responsive design with clamp() functions
- Mac-inspired UI with smooth transitions

## Important Context

### Recent Migration
The project was recently migrated from a single HTML file to React. The original design is preserved in `/archive/new_homepage_original.html`. When making changes:
1. Preserve the original aesthetic and animations
2. Maintain responsiveness across all breakpoints
3. Keep the glassmorphism and gradient effects
4. Ensure dark mode works properly

### HomePage Structure
The HomePage component contains all sections inline rather than using separate components. This was intentional to preserve the exact original design. The sections include:
- Hero with particle background
- Differentiators
- Statistics  
- Program overview
- Call to action
- Custom footer

### Dark Mode Implementation
- Toggle component in header (appears on menu hover)
- Uses localStorage to persist preference
- CSS variables automatically adjust colors
- Smooth transitions between modes

### Deployment Configuration
- Vercel deployment via `vercel.json`
- SPA configuration with rewrites to handle client-side routing
- Automatic deployments from main branch

## Working with This Codebase

### Adding New Features
1. For HomePage changes: Edit directly in HomePage.jsx/css
2. For new pages: Create in `/src/pages/` with matching CSS file
3. For shared components: Add to `/src/components/`
4. Maintain existing CSS variable naming conventions

### Common Tasks

**Creating a new page:**
1. Create `PageName.jsx` and `PageName.css` in `/src/pages/`
2. Add route in `App.jsx`
3. Import shared components as needed
4. Follow existing page structure for consistency

**Modifying animations:**
- Particle animations: `ParticleBackground.css`
- Text gradients: Look for `gradientShift` keyframes
- Hover effects: `.interactive` classes and component-specific hovers

**Updating content:**
- Most content is in JSX files, not separate data files
- Hero content: `HomePage.jsx` lines 231-236
- Footer links and info: `Footer.jsx` or page-specific footers

### Performance Considerations
- Images should be optimized before adding
- Animations use CSS transforms for better performance
- Particle background is CSS-based, not canvas, for simplicity

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: < 768px  
- Desktop: < 1024px
- Wide: > 1600px

Each breakpoint has specific adjustments for typography, spacing, and layout.

## Future Development Notes

The original improvement document (`WEBSITE-IMPROVEMENT-RECOMMENDATIONS.md`) outlined plans for enhanced "unicorn factory" messaging, but these have largely been implemented. Key areas for future work:
- Add backend API integration for application forms
- Implement analytics tracking
- Add more interactive data visualizations
- Create admin dashboard for content management
- Add testimonials and success stories sections