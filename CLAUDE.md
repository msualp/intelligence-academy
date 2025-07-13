# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (uses Vite, typically runs on port 5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Serve built files using the 'serve' package
npm run serve
```

## Architecture Overview

### Dual Layout System
The application uses a unique dual-layout routing structure in `src/App.jsx`:
- **HomePage** (`/`) - Standalone layout with integrated header, banner, and navigation
- **All other pages** - Shared layout with `<DraftBanner />`, `<Header />`, and `<Footer />` components

This means HomePage has its own complete implementation of navigation and header effects, while other pages use the shared Header component.

### Form Submission Architecture
Located in `/api/` directory with multiple implementations:
- `submit-application.js` - Main Vercel serverless function
- `submit-application-mailgun.js` - Mailgun email integration
- `submit-application-simple.js` - Simple local storage version
- Forms use Mailgun API for professional email delivery with HTML templates

### CSS Architecture
- **CSS Variables** for theming and design tokens (defined in each page's CSS)
- **Component-scoped CSS** files (e.g., `HomePage.css`, `Header.css`)
- **Glassmorphism effects** using `backdrop-filter` and `rgba()` transparencies
- **Particle animation system** with 6 unique particles in the hero section

### Particle Background System
The HomePage features a sophisticated particle animation system:
- 6 particles with unique colors (blue, orange, cyan, purple, red, green)
- Each particle has individual `radial-gradient` backgrounds and `box-shadow` glows
- Complex animation with `translateY`, `translateX`, `scale`, and `rotate` transformations
- Z-index layering: hero `::before` (-1), particles (1), hero `::after` (2)

### Navigation System
- **Homepage**: Full integrated side tray with glassmorphism effects
- **Other pages**: Shared Header component with matching side tray design
- **Mobile-first responsive** design with breakpoints at 768px, 1024px
- **Dark mode toggle** integrated in side tray header controls

### State Management Patterns
- Local component state with `useState` for UI interactions
- Scroll-based state management for header shrinking effects
- Intersection Observer API for scroll-triggered animations
- Form validation with real-time error display

## Key Implementation Details

### Email Configuration
Current setup uses `sociail.com` domain temporarily in Mailgun integration. The target domain `iamunicorn.org` requires DNS configuration as documented in `docs/MAILGUN_SETUP.md`.

### Environment Variables Required
```bash
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=sociail.com  # Currently configured domain
ADMIN_EMAIL=admin@intelligence-academy.rowan.edu
```

### Vercel Deployment Configuration
- **SPA routing**: `vercel.json` redirects all routes to `/index.html`
- **Serverless functions**: API routes in `/api/` directory
- **CORS headers**: Configured for form submission endpoints
- **Build output**: Static files in `/dist` directory

### Mobile-First Responsive Design
- **Dynamic viewport units**: Uses `100dvh` for mobile browser compatibility
- **Clamp() functions**: Responsive typography scaling
- **Touch-friendly**: 44px minimum touch targets
- **Backdrop-filter fallbacks**: Graceful degradation for older browsers

### Development Considerations
- **No traditional CSS framework**: Uses custom CSS with design system variables
- **React 18**: Uses modern React patterns (no class components)
- **Vite HMR**: Fast development with hot module replacement
- **ES Modules**: Modern JavaScript module system throughout

### Form Handling Specifics
- **GDPR compliance**: Consent checkbox and data retention notices
- **Real-time validation**: Client-side validation with server-side verification
- **Email templates**: Professional HTML emails for both applicants and admins
- **File structure**: Form submissions saved locally as JSON and text files for backup

## Common Troubleshooting

### Particle Visibility Issues
If particles aren't visible, check:
1. Z-index conflicts (particles should be z-index: 1)
2. Hero background overlays (should be minimal opacity)
3. Body background (should be transparent, not solid gradient)

### Header Consistency Issues
When updating navigation, remember to update BOTH:
1. `src/components/Header.jsx` (shared component)
2. `src/pages/HomePage.jsx` (integrated navigation)

### Email Delivery Issues
1. Verify Mailgun API keys in environment variables
2. Check domain configuration (currently using sociail.com)
3. Test with simple version first (`submit-application-simple.js`)

### Mobile Layout Issues
- Always test with real mobile devices
- Check dynamic viewport height (`100dvh`) support
- Verify touch targets meet accessibility guidelines
- Test side tray navigation on various screen sizes