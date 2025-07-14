# Intelligence Academy @ Rowan University

**AI Startup Accelerator & Unicorn Factory***

> Transform your AI vision into reality with Greater Philadelphia's premier AI startup accelerator.

[![Deployment Status](https://img.shields.io/badge/deployment-vercel-brightgreen)](https://ia.demo.sociail.com)
[![React](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-5.0.0-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-4.1.11-cyan)](https://tailwindcss.com/)

## 🦄 About Intelligence Academy

Intelligence Academy is a conceptual AI startup accelerator program designed to maximize the unicorn potential of AI startups through:

- **$100K Investment** per team with founder-friendly terms
- **Fortune 500 Partnerships** for immediate pilot customers
- **NSF I-Corps Methodology** with 40% survival rates
- **Regional Cost Advantage** in Greater Philadelphia
- **University Research Pipeline** from Rowan University

## 🌐 Live Deployments

- **Primary Demo**: [ia.demo.sociail.com](https://ia.demo.sociail.com)
- **Future Domain**: [www.iamunicorn.org](https://www.iamunicorn.org) *(planned)*

## 🏗️ Project Structure

```
intelligence-academy/
├── public/                 # Static assets
│   └── index.html         # Main HTML template
├── src/                   # Source code
│   ├── components/        # Reusable React components
│   │   ├── Header.jsx     # Navigation header
│   │   ├── HeroSection.jsx # Landing hero section
│   │   ├── DraftBanner.jsx # Development banner
│   │   ├── Footer.jsx     # Site footer
│   │   └── ...           # Other components
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx   # Landing page
│   │   ├── AboutPage.jsx  # About program
│   │   ├── ApplyPage.jsx  # Application form
│   │   ├── PartnersPage.jsx # Corporate partners
│   │   ├── MentorsPage.jsx  # Mentor network
│   │   └── ContactPage.jsx  # Contact information
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── api/                  # Serverless functions
│   ├── submit-application.js # Form submission handler
│   └── ...              # Other API endpoints
├── docs/                 # Documentation
├── archive/              # Archived files and old versions
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── vercel.json           # Vercel deployment config
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/msualp/intelligence-academy.git
   cd intelligence-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📱 Key Features

### 🎯 Landing Page
- **Full-screen hero section** with particle animation background
- **Mobile-first responsive design** optimized for all devices
- **Interactive navigation** with side tray menu
- **Smooth scrolling** between sections
- **Call-to-action buttons** leading to application

### 📊 Content Sections
- **AI Unicorn Statistics** - Data-driven methodology explanation
- **Program Differentiators** - What makes us unique
- **Corporate Partnerships** - Fortune 500 connections
- **Application Process** - 2-minute application form

### 🎨 Design System
- **Modern glassmorphism** UI with backdrop blur effects
- **Gradient animations** and interactive hover states
- **Dark/light mode toggle** (in development)
- **Consistent typography** using system fonts
- **Accessible color contrast** meeting WCAG guidelines

### 📱 Mobile Optimization
- **Mobile-first approach** with progressive enhancement
- **Touch-friendly navigation** with gesture support
- **Optimized loading** with lazy loading and code splitting
- **Responsive images** and adaptive layouts

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run serve        # Serve built files

# Deployment
vercel --prod        # Deploy to Vercel
```

### Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.0
- **Styling**: TailwindCSS 4.1.11 + Custom CSS
- **Routing**: React Router DOM 6.20.0
- **Deployment**: Vercel
- **Form Handling**: Mailgun API
- **Email Service**: Nodemailer

### Code Organization

- **Components**: Modular, reusable React components
- **Pages**: Full page components with routing
- **Styles**: Component-scoped CSS with global variables
- **API**: Serverless functions for form submission
- **Utils**: Helper functions and constants

## 🚀 Deployment

### Vercel (Recommended)

The site is configured for automatic deployment on Vercel:

1. **Connect repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your hosting provider
# Upload the 'dist' folder contents
```

## 📧 Form Submission

The application form uses Mailgun for email delivery:

1. **Configure Mailgun** API keys in environment variables
2. **Set up email templates** in `/api/submit-application.js`
3. **Test form submission** in development environment

## 🎨 Styling Guidelines

### CSS Variables
```css
:root {
  --primary-blue: #007AFF;
  --accent-orange: #FF9500;
  --text-primary: #1D1D1F;
  --header-bg: rgba(255, 255, 255, 0.85);
  --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

### Component Structure
- Use semantic HTML elements
- Follow BEM naming convention for CSS classes
- Implement responsive design with mobile-first approach
- Use CSS custom properties for theming

## 🔧 Configuration

### Environment Variables

```bash
# Email Configuration
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
ADMIN_EMAIL=admin@intelligence-academy.rowan.edu

# Site Configuration
VITE_SITE_URL=https://ia.demo.sociail.com
VITE_CONTACT_EMAIL=apply@intelligence-academy.rowan.edu
```

### Vercel Configuration

The `vercel.json` file configures:
- Serverless function routing
- Static file serving
- Redirect rules
- Environment variables

## 📈 Performance

### Optimization Features
- **Code splitting** with React.lazy()
- **Image optimization** with responsive loading
- **CSS purging** with TailwindCSS
- **Bundle analysis** with Vite
- **Caching strategies** for static assets

### Lighthouse Scores (Target)
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🤝 Contributing

### Development Workflow

1. **Create feature branch** from main
2. **Make changes** following coding standards
3. **Test thoroughly** on multiple devices
4. **Submit pull request** with description
5. **Review and merge** after approval

### Coding Standards

- Use ESLint and Prettier for code formatting
- Write semantic, accessible HTML
- Follow React best practices
- Document complex functions
- Test on mobile devices

## 📞 Support

### Contact Information

- **Email**: apply@intelligence-academy.rowan.edu
- **Phone**: (856) 256-4000
- **Address**: South Jersey Technology Park, Glassboro, NJ 08028

### Development Team

- **Lead Developer**: Mustafa Sualp
- **Project Type**: Conceptual demonstration
- **Institution**: Rowan University

## 📄 License

This project is a conceptual demonstration and is not an official Rowan University program.

## 🔮 Future Enhancements

### Planned Features
- [ ] Dark mode implementation
- [ ] Advanced form validation
- [ ] Multi-language support
- [ ] Blog/news section
- [ ] Alumni showcase
- [ ] Interactive program timeline
- [ ] Virtual campus tour
- [ ] Real-time application status

### Technical Improvements
- [ ] Progressive Web App (PWA) features
- [ ] Advanced analytics integration
- [ ] A/B testing framework
- [ ] Content Management System (CMS)
- [ ] Advanced SEO optimization
- [ ] Performance monitoring

---

**Disclaimer**: *This is a conceptual demonstration website and does not represent an official Rowan University program. The "unicorn factory" designation is aspirational based on AI sector performance data.*

---

<div align="center">

**🦄 Building Greater Philadelphia's First AI Unicorn by 2030**

[Apply Now](https://ia.demo.sociail.com/apply) • [Learn More](https://ia.demo.sociail.com/about) • [Contact Us](https://ia.demo.sociail.com/contact)

</div>
