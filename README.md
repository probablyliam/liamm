# Portfolio — Liam Maiorino

Personal portfolio site. React + Vite, deployed on Vercel (auto-deploys on push to `main`).
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
└── App.jsx               # routing
```

## Adding a project

Each project in `config.js` gets its own shareable page at `/projects/<slug>`.

```js
{
  id: 3,
  slug: "my-project",                 // becomes /projects/my-project
  title: "My Project",
  blurb: "One line shown on the card.",
  year: "2026",
  status: "Live",                     // or "In development", etc.
  cover: "/my-cover.jpg",             // card image (put file in /public). "" = grid placeholder
  description: "Longer paragraph for the detail page.",
  features: ["Thing one", "Thing two"],
  tech: ["Unity", "C#"],
  media: [
    { type: "youtube", id: "VIDEO_ID" },           // YouTube embed
    { type: "video",   src: "/clip.mp4" },         // self-hosted file in /public
    { type: "image",   src: "/shot.png", alt: "…" } // screenshot/gif in /public
  ],
  links: {                            // any of these; omit to hide the button
    live: "https://…",
    download: "https://itch.io/…",
    devlog: "https://…",
    github: "https://github.com/…"
  }
}
```

**Showing off the Unity game:** drop screenshots/gifs in `/public`, add them to `media`,
add a YouTube gameplay video with `{ type: "youtube", id: "…" }`, and link a build via
`links.download`. No code changes needed.

## Other content

- **Experience** — minimal by default. Add a one-line `summary` to any role to show it
  (keep it generic; no internal tool/system names).
- **Skills** — grouped lists (`{ group, items }`).
- **Résumé** — set `social.resume` to a PDF path in `/public` to show a Résumé link.

## Theming

Colors, fonts, and the blueprint grid are CSS variables in `src/index.css` (`:root`).

## Deployment

Push to `main` → Vercel auto-deploys. `vercel.json` rewrites all routes to `index.html`
so deep links like `/projects/imperial-lineage` work on refresh.
```bash
npm run build   # then deploy dist/ to any static host
```
