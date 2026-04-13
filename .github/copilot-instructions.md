# Personal Portfolio Site - Development Instructions

## Quick Start

1. **Edit your portfolio info**: Open `src/config.js` and update your name, title, location, social links, projects, and skills
2. **Run locally**: `npm run dev` - visit http://localhost:5173
3. **Build for production**: `npm run build` - output goes to `dist/`

## File Organization

- **src/config.js** - Single source of truth for all your portfolio data
- **src/components/** - Reusable React components (Hero, Projects, Experience, Skills, Footer)
- **src/App.jsx** - Main component that combines all sections
- **src/index.css** - Global styles with CSS variables for easy theming
- **README.md** - User documentation

## Customization Guide

### Change color scheme
Edit the CSS variables in `src/index.css` (`:root` section)

### Add/edit projects  
Update the `projects` array in `src/config.js`

### Modify styling
Each component has its own CSS file in `src/components/`

### Add new sections
1. Create a new component in `src/components/`
2. Import it in `src/App.jsx`
3. Add it to the JSX in the `<div className="app">`

## Development Notes

- Uses React 19 with Vite for fast HMR
- Mobile-first responsive design
- Supports light/dark mode via `prefers-color-scheme`
- No external component library - pure CSS for control and simplicity

## Deployment

Ready for Vercel, Netlify, or any static host. Just run `npm run build` and deploy the `dist/` folder.
