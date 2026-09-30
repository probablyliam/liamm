# Portfolio — Liam Maiorino

Personal portfolio site, live at [liamm.ca](https://liamm.ca). React + Vite, deployed on Vercel (auto-deploys on push to `main`).
All content lives in **`src/config.js`** — edit that one file to update the site.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Structure

```
src/
├── config.js              # ← all content lives here
├── pages/
│   ├── Home.jsx           # the single-page sections
│   ├── ProjectDetail.jsx  # /projects/<slug> detail page
│   └── NotFound.jsx       # any unknown URL
├── components/            # Nav, Intro, Projects, Skills, Experience, Footer
├── index.css             # design tokens (light + dark), shared primitives
├── media.js              # status + in-view video playback helpers
└── App.jsx               # routing
```

## Adding a project

Each project in `config.js` gets its own shareable page at `/projects/<slug>`.

```js
{
  id: 3,
  slug: "my-project",                 // becomes /projects/my-project
  title: "My Project",
  year: "2026",
  status: "Live",                     // short label, e.g. "Live" or "Unity demo"
  kind: "Interactive data visualization",
  problem: "The problem it solves, in one line.",
  built: ["What I built", "One short point each"],
  tech: ["React", "TypeScript"],
  cover: "/my-project/cover.jpg",     // card image in /public
  preview: "/my-project/preview.mp4", // optional muted loop on the card
  showcase: { src: "/my-project/hero.mp4", poster: "/my-project/hero.jpg" },
  tagline: "One-line summary under the title.",
  description: "Longer paragraph for the detail page.",
  features: ["Thing one", "Thing two"],
  links: {                            // empty or missing hides the button
    live: "https://…",
    github: "https://github.com/…"
  }
}
```

Bigger projects can add `abilities`, `build` and `takeaways` sections; the comment above
`projects` in `config.js` lists every field.

## Other content

- **Experience** — minimal by default. Add a one-line `summary` to any role to show it
  (keep it generic; no internal tool/system names).
- **Skills** — grouped lists (`{ group, items }`).
- **Contact** — goes through LinkedIn. The site deliberately has no email or phone number.

## Theming

Colors, fonts, and the blueprint grid are CSS variables in `src/index.css` (`:root`).

## Deployment

Push to `main` → Vercel auto-deploys. `vercel.json` rewrites all routes to `index.html`
so deep links like `/projects/imperial-lineage` work on refresh.
```bash
npm run build   # then deploy dist/ to any static host
```

## License

The code is here to read and learn from. The written content, images and video on the site are © Liam Maiorino, all rights reserved.
