# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Intelligence Academy is a static landing page for Rowan University's AI Startup Accelerator program. It's a single-page website built with vanilla HTML, CSS, and JavaScript - no frameworks or build process required.

**Key Facts:**
- Single HTML file (`index.html`) contains all code
- Pure static site with inline styles and scripts
- Deployed on Vercel
- Currently shows "draft proposal" disclaimer
- Focused on $100K AI startup accelerator program

## Common Commands

```bash
# Run development server
npm start
# or
npm dev

# Both commands run 'serve' - a static file server on port 3000
```

**Note:** No build, test, or lint commands exist - this is intentional as the project has no build process.

## Architecture & Structure

### File Organization
- `index.html` - Contains entire website (HTML, CSS, JavaScript all inline)
- `package.json` - Minimal npm configuration with serve dependency
- `vercel.json` - Deployment configuration
- `WEBSITE-IMPROVEMENT-RECOMMENDATIONS.md` - Detailed roadmap for future enhancements

### Code Style
- **CSS:** Inline styles using modern CSS features (Grid, Flexbox, custom properties)
- **JavaScript:** Vanilla JS embedded in script tags, no external dependencies
- **HTML:** Semantic HTML5 markup

### Key Features Implemented
1. Neural network animated background
2. Animated timeline visualization
3. Responsive design
4. Interactive hover effects
5. Gradient-based modern aesthetic

## Important Context

### Current Status
The website is a "draft proposal" for an AI startup accelerator. The `WEBSITE-IMPROVEMENT-RECOMMENDATIONS.md` file contains extensive plans for transforming it into a "unicorn factory" focused platform with:
- 2-minute application forms
- Fortune 500 partner showcases
- Unicorn success metrics
- Regional advantage visualizations

### Development Approach
When making changes:
1. Everything stays in `index.html` unless specifically restructuring
2. Maintain inline styles and scripts pattern
3. Keep it simple - no build process or external dependencies
4. Focus on static content that works without server-side logic

### Deployment
- Automatic deployment via Vercel on git push
- No build step required
- Static hosting configuration in `vercel.json`

## Working with This Codebase

### Adding Features
Since everything is in one file, locate the appropriate section:
- Styles are in `<style>` tag in `<head>`
- Scripts are at the bottom before `</body>`
- Use existing CSS variables for consistency
- Follow the established pattern of inline everything

### Making Changes
1. Edit `index.html` directly
2. Test locally with `npm start`
3. Commit changes (Vercel auto-deploys)

### Future Improvements
Refer to `WEBSITE-IMPROVEMENT-RECOMMENDATIONS.md` for the comprehensive roadmap, focusing on:
- Unicorn-focused messaging
- 2-minute application form
- Corporate partner integration
- Success metrics visualization

The improvement document serves as the primary guide for any significant enhancements to the website.