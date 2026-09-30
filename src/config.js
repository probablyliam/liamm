// Portfolio Configuration
// Single source of truth. Edit this file to update the site.
// ---------------------------------------------------------------------------

export const portfolioConfig = {
  // --- Identity -------------------------------------------------------------
  name: "Liam Maiorino",
  // The headline — one line that says what you do. Shown under your name.
  role: "Software engineer working in cryptography, security, and backend systems.",
  location: "Toronto, ON",

  // Short, factual status line shown in the header/intro. Keep it concrete.
  status: "Senior Cryptography Developer @ RBC",

  // The intro. A few practical sentences — what you do, not a sales pitch.
  intro:
    "I build and maintain cryptographic services at RBC, and use side projects to explore data visualization, simulations, tools, and game systems.",

  // About. Kept for reference / optional reuse — not shown on the main page in
  // the current utility-first layout.
  about: {
    lead: "I do my best work where the problems are hard and the outcome actually matters — building things that hold up, picking things up fast, and leaving the team and the codebase better than I found them.",
    personal:
      "Outside of work I'm usually outside. Skiing all winter, downhill and freestyle, then wakeboarding and lately tennis once it warms up. The rest of my time goes to playing guitar, a good game, and watching shows and movies with the people I care about.",

    // Small "get to know me" cards. Each one is optional and degrades nicely
    // if you don't have art yet — it'll show a clean labelled tile instead.
    //   label     the category, e.g. "On repeat", "Favourite film"
    //   title     the thing
    //   subtitle  artist / year / one detail
    //   art       image path in /public (or a full URL). Optional.
    //   link      where clicking goes. Optional.
    //   spotify   a Spotify track URL → renders a playable preview instead of
    //             a static tile. Only used on the song. Optional.
    favorites: [
      {
        label: "On repeat",
        title: "Stay",
        subtitle: "Post Malone",
        art: "", // e.g. "/fav/stay.jpg"
        // Paste a track link to get a real 30s preview player, e.g.
        // spotify: "https://open.spotify.com/track/5PjdY0CKGZdEuoNab3yDmX",
        spotify: "",
        link: "",
      },
      {
        label: "Favourite show",
        title: "LOST",
        subtitle: "2004 – 2010",
        art: "", // e.g. "/fav/lost.jpg"
        link: "",
      },
      {
        label: "Favourite film",
        title: "Dune: Part Two",
        subtitle: "2024",
        art: "", // e.g. "/fav/dune.jpg"
        link: "",
      },
    ],
  },

  // --- Links ----------------------------------------------------------------
  // The "Contact" link uses `email` (mailto) if set, otherwise falls back to
  // LinkedIn. Email is blank by default to avoid scrapers — add it if you'd
  // rather take direct contact.
  social: {
    github: "https://github.com/probablyliam",
    linkedin: "https://linkedin.com/in/liam-maiorino",
    email: "",
    // Optional: drop a PDF in /public and point here to show a "Résumé" link.
    resume: "",
  },

  // --- Projects -------------------------------------------------------------
  // Every project gets its own shareable page at /projects/<slug>.
  //
  // The schema scales: a small project just needs a cover, blurb and a few
  // features. A big one (like the Unity game) can add a `preview` clip on the
  // card, a `showcase` that leads with the finished result, and a `story`
  // walking through how it came together.
  //
  //   --- card (the project directory) ---
  //   kind      the "what type of work is this" line, e.g. "Interactive data viz"
  //   summary   one-sentence description of the project.
  //   problem   the problem it solves (1 line).
  //   built     what you actually built — a string or array of short points.
  //   tech      tech tags.
  //   status    "Live", "In development", "Archived", etc.
  //   cover     freeze-frame image shown on the card (path in /public)
  //   preview   OPTIONAL short, muted clip that plays on hover (like YouTube).
  //             Use a small .mp4/.webm. Falls back to the cover if absent.
  //   featured  set true on ONE project to give it the big top slot.
  //   accent    OPTIONAL { light, dark } colour used for this project's page.
  //
  //   --- detail page ---
  //   showcase  the finished result, shown FIRST. One of:
  //               { type: "image",   src: "/shot.png", alt: "..." }
  //               { type: "video",   src: "/clip.mp4", poster: "/poster.jpg" }
  //               { type: "youtube", id: "VIDEO_ID" }
  //   description  longer explanation in plain language.
  //   features  list of notable points → shown as "Highlights".
  //   story     OPTIONAL ordered blocks for bigger projects: { heading, body, media }
  //             - body can be a string or an array of paragraphs.
  //             - media is optional and uses the same shape as showcase.
  //   links     any of: live, github, download, devlog (omit/empty to hide)
  projects: [
    {
      id: 1,
      slug: "imperial-lineage",
      title: "Imperial Lineage",
      year: "2026",
      status: "Live",
      kind: "Interactive data visualization",
      featured: false,
      // Page accent on the detail page, taken from the project itself.
      accent: { light: "#8a5a00", dark: "#e8b64c" },
      problem:
        "Roman succession rarely ran father to son. Emperors often adopted their heirs, and the line sometimes passed through a grandchild, so the real connections are hard to follow.",
      built: [
        "Modeled every emperor and the exact relationship on each link (born, adopted, or succession).",
        "Rendered the full network as a pannable, zoomable graph with search, a legend, and one-click navigation between relatives.",
        "Wrote a custom chronological layout so nodes and edges never overlap, with a detail panel for each ruler's reign, family, and sources.",
      ],
      cover: "/imperial-lineage.jpg",
      preview: "/imperial/preview.mp4", // short, muted hover clip
      // The one-sentence "what is this", shown directly under the hero.
      tagline:
        "A visual, node-based map of Roman imperial succession, showing who descended from whom, who was adopted, and where the line passed by adoption instead of birth.",
      showcase: {
        type: "video",
        src: "/imperial/imperial.mp4",
        poster: "/imperial/imperial.jpg",
        caption: "Searching for emperors and following family links in the live graph.",
      },
      description:
        "I've always been interested in the Roman empire, and especially the tangled connections between generations. An emperor's grandchild might have a child who eventually takes the throne, or an emperor might adopt a suitable heir instead of a trueborn son. I built a node-based view of the whole succession so I could actually see those threads. The whole tree is on screen from the start: select anyone to see their portrait, birth, death, and reign, search for a name to jump to them, and follow parents, children, and successors straight from the detail panel.",
      features: [
        "Select any individual to see their portrait, birth, death, and reign",
        "Search for any emperor or relative and the graph centres on them",
        "Move between predecessors, successors, parents, and children from the detail panel",
        "See how each link was made: born to them, adopted, or a succession that skipped the bloodline",
        "Pan and zoom the full network, or hide relatives to see the bare succession chain",
        "A custom chronological layout keeps the graph readable, with no overlapping nodes or edges",
      ],
      tech: ["React", "TypeScript", "Vite", "Cytoscape.js", "Node.js"],
      links: {
        live: "https://imperial-lineage.vercel.app/",
        github: "",
      },
    },
    {
      id: 2,
      slug: "cursed-energy-trial",
      title: "Cursed Energy Trial",
      year: "2026",
      status: "Unity demo",
      kind: "Unity combat & physics systems demo",
      featured: true,
      accent: { light: "#6a32c9", dark: "#b99aff" },
      // One-line hook for the project card.
      // Shown as "Problem" on the detail page — framed as the challenge I set.
      problem:
        "Build real-time game systems and game feel from scratch in Unity, covering physics-driven abilities, destruction, and a full scoring loop, end to end.",
      built: [
        "Three physics-driven abilities (push, pull, delete), each defined as data with its own tunable physics profile.",
        "A central physics service plus a destruction and scoring system with grade-based results.",
        "An event-driven feedback layer (camera shake, FOV, audio) kept decoupled from gameplay logic.",
        "Custom shader-graph effects, a Mixamo + Blender animation setup, and editor tools that generate the arena and HUD.",
      ],
      // --- MEDIA -------------------------------------------------------------
      // Real assets live in /public/cet/. Every clip ships a compressed .mp4
      // plus a .jpg poster. Clips autoplay muted and loop, but only while on
      // screen (an IntersectionObserver pauses anything scrolled out of view).
      cover: "/cet/cover.jpg", // freeze-frame for the project card
      preview: "/cet/preview.mp4", // short, muted hover clip (YouTube-style)
      // Hero: the gameplay highlight reel. Autoplays muted, only while on screen.
      showcase: {
        type: "video",
        src: "/cet/hero.mp4",
        poster: "/cet/hero.jpg",
        caption: "Gameplay preview.",
      },
      // The one-sentence "what is this", shown directly under the hero.
      tagline:
        "A Unity demo inspired by Jujutsu Kaisen, where you play as Gojo and use his cursed techniques to push, pull, and erase everything in the arena.",
      // A short overview — the main idea, for anyone who reads on.
      description:
        "I wanted to make something that lets you feel like Gojo, using his powerful abilities to throw the environment around, with a fun gameplay loop on top. The core of it was getting the abilities to feel right, getting the look right with the toon shader, and writing custom shaders for each ability so they stay true to the source material while still feeling unique to the game. It also has the parts you would expect from a real game: full movement, full animation, and a custom UI.",
      // "What makes it interesting" — six compact, scannable cards.
      features: [
        { title: "Physics-based destruction", detail: "Objects topple, scatter, and dissolve in real time." },
        { title: "Custom abilities", detail: "Push, pull, and delete, each built as its own physics system." },
        { title: "Live grading system", detail: "A timed run scored from Grade 4 up to Special Grade." },
        { title: "Data-driven architecture", detail: "Abilities are ScriptableObjects, not hard-coded logic." },
        { title: "Custom shaders", detail: "Cel shading and a point-of-impact dissolve effect." },
        { title: "Animation pipeline", detail: "Mixamo locomotion retargeted through Blender into Unity." },
      ],
      // "Custom abilities" — the centerpiece. Three equal columns, each a short
      // looping clip, a colour-coded name, a flavour line, and how it works.
      abilities: [
        {
          name: "Red",
          color: "#c8453d",
          video: "/cet/red.mp4",
          poster: "/cet/red.jpg",
          blurb: "Divergence of infinity, turned outward into a repelling force.",
          feels: "Heavy shockwave.",
          detail: "It pushes gently while you hold it, then jumps to full force on release.",
        },
        {
          name: "Blue",
          color: "#3667d6",
          video: "/cet/blue.mp4",
          poster: "/cet/blue.jpg",
          blurb: "Convergence of infinity. It collapses space toward a point and drags everything in.",
          feels: "Swirling, controlled chaos.",
          detail: "A custom orbit system keeps objects circling the centre at a stable distance and speed.",
        },
        {
          name: "Purple",
          color: "#7d3fcf",
          video: "/cet/purple.mp4",
          poster: "/cet/purple.jpg",
          blurb: "Red and Blue forced together into an imaginary mass.",
          feels: "Overpowered finisher.",
          detail: "It deletes whatever it passes through, dissolving objects from the exact point of impact.",
        },
      ],
      // "How it was built" — four engineering notes. Each leads with the main
      // idea (always visible), with deeper detail tucked into an expander.
      build: [
        {
          title: "Shaders and VFX",
          body: "Every effect is custom, built in Unity Shader Graph and particle systems. Red has a deep black hole pull, Blue swirls objects around it, and Purple tears them apart, with custom lightning, wind, and debris on top. Instead of shattering a full mesh, Purple uses a dissolve that burns objects away from the point it hits.",
          details: [
            "The dissolve is a URP Shader Graph driven from gameplay. The physics layer reports the exact surface contact point, and that position seeds the dissolve, so the burn spreads from where the hit landed rather than the object's center. It is a cheap effect that reads as real destruction.",
            "The toon look starts from a Toon Shader on the Unity Asset Store. I built custom materials from it for the player, objects, and environment. The shader graphs, particle effects, and the wiring from a gameplay impact to a shader parameter are my work.",
          ],
          media: { type: "video", src: "/cet/redshader.mp4", poster: "/cet/redshader.jpg" },
        },
        {
          title: "Animation pipeline",
          body: "The character is fully animated with Blender and Mixamo. It has walk, idle, jump, full 3D movement, strafing while aiming, and custom cast animations matched to the anime. You keep moving and strafing while an ability fires, so it stays responsive without feeling stiff.",
          details: [
            "The ability controller raises events when a cast starts and which colour it is. A small animation controller listens to those events and sets the animator parameters. The casting animation plays on the upper body while the legs keep walking, running, or standing on their own, so you can move and aim while a cast is going off.",
            "I used Blender for retargeting and the custom attack poses, and Unity's animator handles the blending at runtime.",
          ],
          media: { type: "video", src: "/cet/blender.mp4", poster: "/cet/blender.jpg" },
        },
        {
          title: "Systems architecture",
          body: "Abilities are data, not code. Each one is a ScriptableObject that pairs a physics profile with a feedback profile. A single physics service applies the forces, and a separate feedback bus drives the camera and audio, which keeps gameplay logic decoupled from the effects.",
          details: [
            "Input becomes an ability command on a channel. The controller commits on press, and if both colours land inside a short window it upgrades the cast to Purple and refunds the colour you already spent.",
            "The physics service runs one non-allocating overlap query per tick, caps the hit count, and de-duplicates by rigidbody root so a ragdoll only gets pushed once. It then hands each hit to the active ability's physics profile. Red pushes, Blue captures into orbit, and Purple deletes.",
            "Casts raise events on the feedback bus, and separate presenters handle camera shake and audio. The shake skews the camera's projection matrix instead of moving its transform, so it never fights the camera rig.",
            "The arena, HUD, and environment are generated by editor tools I wrote, so I could rebuild and retune the layout quickly instead of placing everything by hand.",
          ],
          components: [
            { name: "Input", role: "Turns controls into ability commands on a channel." },
            { name: "Ability (data)", role: "A ScriptableObject pairing a physics profile with a feedback profile." },
            { name: "Physics service", role: "One non-allocating query per tick, applied through each ability's profile." },
            { name: "Feedback bus", role: "Events that drive camera shake and audio, separate from gameplay." },
            { name: "Trial layer", role: "Limits casts and scores destruction without touching the physics." },
          ],
        },
        {
          title: "Trial mode",
          body: "To make it a game, the trial gives you a limited set of casts (5 Red, 5 Blue, 2 Purple) and 60 seconds to destroy as much of the arena as you can. The run is graded on the same scale sorcerers are ranked on in the anime, from Grade 4 up to Special Grade. I tuned it to be easy to learn but hard to master, so a first run already feels good while a top grade rewards careful aim and combos.",
          details: [
            "Each object scores once, the first time it is meaningfully broken. That can be deleted by Purple, detached when a joint snaps, knocked far from where it started, or thrown out of bounds. It is how Red and Blue earn score without dealing any damage.",
            "The physics also opens up combos. Different sized objects shove and drag each other, so a well aimed cast can set off far more destruction than it touches directly.",
          ],
          media: { type: "video", src: "/cet/trial.mp4", poster: "/cet/trial.jpg" },
        },
      ],
      // "What I learned" — a few substantive, human takeaways in my own words.
      takeaways: [
        "Game design is much harder than it looks. Most of the work is hundreds of small fixes a player would never notice, but they are exactly what makes something feel right.",
        "To get a game to feel the way you want, you have to build the systems yourself. Owning the physics, shaders, and animation is what gave me the control to actually tune the feel.",
        "AI is a great tool for building software. I drove Unity and Blender through their MCP servers for editor tasks, asset generation, and scene setup, but game feel still needs a human touch. Knowing when something feels right is not something it can decide for you.",
      ],
      tech: [
        "Unity",
        "C#",
        "URP",
        "Shader Graph",
        "HLSL",
        "Blender",
        "Mixamo",
        "New Input System",
        "ProBuilder / CSG",
      ],
      links: {
        // Fill in whatever you ship. Buttons only appear for non-empty links.
        // download: "https://your-itch-page.itch.io/cursed-energy-trial", // a playable build
        // devlog: "https://youtube.com/...",                              // a devlog video/playlist
        // github: "https://github.com/probablyliam/...",                  // source, if you make it public
      },
    },
  ],

  // --- Experience -----------------------------------------------------------
  // Roles are listed as title, company, type, period, and location only.
  // The component supports an optional `summary` line and `highlights` array,
  // but this page is public, so the specifics of the work stay off it.
  experience: [
    {
      id: 1,
      title: "Senior Cryptography Developer",
      company: "RBC",
      employmentType: "Full-time",
      period: "Jul 2025 – Present",
      location: "Toronto, ON",
    },
    {
      id: 2,
      title: "Cryptography Developer",
      company: "RBC",
      employmentType: "Full-time",
      period: "Jan 2024 – Jul 2025",
      location: "Toronto, ON",
    },
    {
      id: 3,
      title: "Cryptography Developer",
      company: "RBC",
      employmentType: "Co-op",
      period: "May 2023 – Aug 2023",
      location: "Toronto, ON",
    },
    {
      id: 4,
      title: "Software Developer",
      company: "Optiwave Systems Inc.",
      employmentType: "Co-op",
      period: "May 2022 – Aug 2022",
      location: "Ottawa, ON",
    },
    {
      id: 5,
      title: "Cyber Security Developer",
      company: "Hydro Ottawa",
      employmentType: "Co-op",
      period: "May 2021 – Dec 2021",
      location: "Ottawa, ON",
    },
    {
      id: 6,
      title: "Software Developer",
      company: "RBC Wealth Management",
      employmentType: "Internship",
      period: "May 2020 – Aug 2020",
      location: "Toronto, ON",
    },
  ],

  education: {
    school: "Carleton University",
    degree: "B.C.S. Honours — Computer & Internet Security",
    detail: "Minor in Philosophy",
    period: "2019 – 2023",
    location: "Ottawa, ON",
  },

  // --- Skills ---------------------------------------------------------------
  // One-line focus statement, then grouped lists for fast scanning.
  // Each item can be a plain string, or { name, pro } — set `pro: true` to mark
  // something you've used in a professional/production setting. The point isn't
  // to rank yourself; it's to separate "shipped with this at work" from
  // "comfortable with this" without making anything look like a weakness.
  // A group can also carry a `note` — a short line rendered under its chips
  // (used for the AI tools, so we don't pad the list with every assistant).
  skillsFocus:
    "Backend and security engineering: production APIs, data, and infrastructure, with a focus on cryptography and PKI. I also build AI-integrated tooling with agents and MCP.",
  skills: [
    {
      group: "Languages",
      items: [
        { name: "Python", pro: true },
        { name: "C#", pro: true },
        { name: "JavaScript", pro: true },
        { name: "TypeScript" },
        { name: "PowerShell", pro: true },
        { name: "C / C++" },
        { name: "Java" },
      ],
    },
    {
      group: "Web & APIs",
      items: [
        { name: "Django", pro: true },
        { name: "Flask", pro: true },
        { name: "Express.js", pro: true },
        { name: "Gunicorn", pro: true },
        { name: "REST APIs", pro: true },
        { name: "React" },
        { name: "Node.js" },
      ],
    },
    {
      group: "Data & infrastructure",
      items: [
        { name: "SQL", pro: true },
        { name: "Data analysis & metrics", pro: true },
        { name: "Linux", pro: true },
        { name: "Docker", pro: true },
        { name: "GitHub Actions", pro: true },
        { name: "Ansible", pro: true },
        { name: "Nginx", pro: true },
        { name: "AWS", pro: true },
        { name: "Azure", pro: true },
        { name: "Git", pro: true },
        { name: "MongoDB" },
      ],
    },
    {
      group: "Security",
      items: [
        { name: "Cryptography & key management", pro: true },
        { name: "PKI / certificate management", pro: true },
        { name: "Application security", pro: true },
        { name: "Active Directory", pro: true },
        { name: "LDAP", pro: true },
      ],
    },
    {
      group: "AI-assisted development",
      items: [
        { name: "MCP server & tool development", pro: true },
        { name: "LLM agent integration", pro: true },
        { name: "FastMCP", pro: true },
      ],
    },
  ],
};
