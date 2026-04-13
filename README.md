# Personal Portfolio Site

A sleek, minimal React portfolio website with easy configuration. Edit your portfolio information in one place and the site updates automatically.

## Features

- ✨ Clean, professional design (no AI-generated look)
- 📱 Fully responsive mobile-first design
- 🌓 Light/dark mode support
- ⚙️ Simple configuration system
- 🚀 Built with Vite + React for fast development

## Getting Started

### 1. Configure Your Portfolio

Edit `src/config.js` with your personal information:

```js
export const portfolioConfig = {
  name: "Your Full Name",
  title: "Your Title",
  location: "Toronto, ON, Canada",
  
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourprofile",
    email: "your.email@example.com",
  },

  about: "Your about section text",

  projects: [
    {
      id: 1,
      title: "Project Name",
      description: "Project description",
      url: "https://project-url.com",
      tags: ["React", "TypeScript"],
    },
  ],

  skills: ["React", "JavaScript", "CSS", "Node.js"],
};
```

### 2. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio.

### 3. Build for Production

```bash
npm run build
```

### Project Structure

```
src/
├── config.js                 # Edit your portfolio info here
├── components/
│   ├── Hero.jsx             # Header section
│   ├── Projects.jsx         # Project showcase
│   ├── Experience.jsx       # Experience timeline
│   ├── Skills.jsx           # Skills list
│   └── Footer.jsx           # Footer
├── App.jsx                  # Main app component
├── index.css                # Global styles
└── App.css                  # App container styles
```

## Deployment

The site is optimized for deployment on Vercel, Netlify, or any static host.

### Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy with one click

Alternatively:
```bash
npm run build
# Deploy the dist/ folder
```

## Customization

- Colors and spacing are in the CSS files
- For dark mode, modify the CSS variables in `src/index.css`
- Each component has its own CSS file for easy customization

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **CSS 3** - Styling with custom properties
- **JavaScript ES6+** - Modern JavaScript

---

**Start by editing `src/config.js` to personalize your portfolio!**
