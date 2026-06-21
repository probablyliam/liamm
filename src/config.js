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
  status: "Cryptography Developer @ RBC",

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
      summary:
        "A visual, node-based map of the Roman emperors and how succession actually passed between them.",
      problem:
        "Roman succession rarely ran father-to-son — emperors adopted heirs, and lines jumped through grandchildren — so the real connections are hard to follow.",
      built: [
        "Modeled every emperor and the exact relationship on each link (born, adopted, or succession).",
        "Rendered the full network as a pannable, zoomable graph you can select and expand.",
      ],
      cover: "/imperial-lineage.jpg",
      preview: "/imperial/preview.mp4", // short, muted hover clip
      // The one-sentence "what is this", shown directly under the hero.
      tagline:
        "A visual, node-based map of Roman imperial succession — who descended from whom, who was adopted, and where the bloodline gave way to politics.",
      showcase: {
        type: "video",
        src: "/imperial/imperial.mp4",
        poster: "/imperial/imperial.jpg",
        caption: "Selecting emperors and expanding their lineage in the live graph.",
      },
      description:
        "I've always been interested in the Roman empire, and especially the tangled connections between generations — an emperor whose grandchild's child eventually takes the throne, or one who adopts a suitable heir instead of a trueborn son. So I built a node-based view of the whole succession: select anyone to see their birth, death, and reign, and expand the descendants of a single person or the entire imperial line.",
      features: [
        "Select any individual to see their birth, death, and reign",
        "Expand the descendants of one person — or load the entire imperial lineage",
        "See how each link was made: born to them, adopted, or a succession that skipped the bloodline",
        "Pan, zoom, and explore the full network of emperors",
      ],
      tech: ["React", "TypeScript", "Vite", "Cytoscape.js"],
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
      status: "Playable demo",
      kind: "Unity combat & physics systems demo",
      featured: true,
      // One-line hook for the project card.
      summary:
        "A playable Unity combat demo exploring third-person control, physics-driven abilities, real-time destruction, stylized VFX, and a complete timed scoring loop.",
      // Shown as "Problem" on the detail page — framed as the challenge I set.
      problem:
        "A from-scratch test of real-time game systems and game feel — physics-driven abilities, destruction, and a full scoring loop — built and tuned end to end in Unity.",
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
        caption: "Gameplay: movement, the three abilities, real-time destruction, and the trial HUD.",
      },
      // The one-sentence "what is this", shown directly under the hero.
      tagline:
        "A playable Unity demo inspired by Jujutsu Kaisen: play as Gojo and use three Cursed Techniques — Red to push, Blue to pull, and Purple to delete — to tear an arena apart.",
      // Three at-a-glance stats, shown as a compact row under the tagline.
      stats: [
        { label: "Built", value: "Physics abilities + destruction systems" },
        { label: "Focus", value: "Game feel + animation + feedback" },
        { label: "Tools", value: "Unity, Blender, Shader Graph" },
      ],
      // A short overview — the main idea, for anyone who reads on.
      description:
        "The whole project was about getting the feel of the abilities right — balanced, fun, and cinematic. Most of the time went into the physics systems underneath each technique, so they react to the environment in their own way rather than sharing one generic push. Under the visuals it's really a study in cause and effect: making every cast read clearly and land with weight.",
      // "What makes it interesting" — six compact, scannable cards.
      features: [
        { title: "Physics-based destruction", detail: "Objects topple, scatter, and dissolve in real time." },
        { title: "Three distinct abilities", detail: "Push, pull, and delete — each its own rigidbody behaviour." },
        { title: "Live grading system", detail: "A timed run scored from Grade 4 up to Special Grade." },
        { title: "Data-driven architecture", detail: "Abilities are ScriptableObjects, not hard-coded logic." },
        { title: "Custom shaders", detail: "Cel shading and a point-of-impact dissolve effect." },
        { title: "Animation pipeline", detail: "Mixamo locomotion retargeted through Blender into Unity." },
      ],
      // "The three abilities" — the centerpiece. Three equal columns, each a
      // short looping clip plus three one-line facts.
      abilities: [
        {
          name: "Red",
          color: "#c8453d",
          video: "/cet/red.mp4",
          poster: "/cet/red.jpg",
          purpose: "Push objects away.",
          feels: "Heavy shockwave.",
          detail: "Pushes while you hold it, then multiplies the force on release into a shockwave.",
        },
        {
          name: "Blue",
          color: "#3667d6",
          video: "/cet/blue.mp4",
          poster: "/cet/blue.jpg",
          purpose: "Pull objects inward.",
          feels: "Swirling, controlled chaos.",
          detail: "Captures objects into a real orbit — tuned for distance and speed so they don't collide or jitter.",
        },
        {
          name: "Purple",
          color: "#7d3fcf",
          video: "/cet/purple.mp4",
          poster: "/cet/purple.jpg",
          purpose: "Delete anything it touches.",
          feels: "Overpowered finisher.",
          detail: "Red + Blue combined into imaginary mass; dissolves objects from the exact point of impact.",
        },
      ],
      // "How it was built" — four engineering notes. Each leads with the main
      // idea (always visible), with deeper detail tucked into an expander.
      build: [
        {
          title: "Shaders + VFX",
          body: "Every effect is custom, built from the ground up in Unity Shader Graph and particle systems — the deep black-hole pull on Red, the swirl on Blue, and Purple's chaotic destruction, plus custom lightning, wind, and debris. Purple burns objects away from the exact point it lands instead of shattering the whole mesh.",
          details: [
            "The dissolve is a URP Shader Graph driven from gameplay: the physics layer reports the precise surface contact point, and that world position seeds the dissolve so the burn radiates from the hit, not the object's pivot — a cheap effect that reads as real destruction.",
            "A Toon Shader from the Unity Asset Store is the base; I built custom materials from it for the player, objects, and environment to land the anime look. The shader graphs, particle effects, and the link from a gameplay impact to a shader parameter are mine.",
          ],
          media: { type: "video", src: "/cet/redshader.mp4", poster: "/cet/redshader.jpg" },
        },
        {
          title: "Animation pipeline",
          body: "A fully animated character built with Blender and Mixamo — walk, idle, jump, 3D movement, strafing while aiming, and custom cast animations matched to the anime. It stays responsive while looking smooth: you keep moving and strafing while an ability fires.",
          details: [
            "Casts play on a masked upper-body layer timed to the frame the ability commits, so the cast blends over locomotion instead of locking the player in place.",
            "Blender handled retargeting and the custom attack poses; Unity's animator drives the movement blends, strafe, and layer masks at runtime.",
          ],
          media: { type: "video", src: "/cet/blender.mp4", poster: "/cet/blender.jpg" },
        },
        {
          title: "Systems architecture",
          body: "Abilities are data, not code. Each is a ScriptableObject pairing a physics profile with a feedback profile; one physics service applies the forces, and a static feedback bus drives camera and audio — so gameplay logic stays decoupled from the juice.",
          details: [
            "Input becomes an ability command on a channel. The controller commits on press, and if both colours land inside a short window it upgrades the cast to Purple and refunds the colour already spent.",
            "The physics service runs one non-allocating overlap query per tick, caps the hit count, and de-duplicates by rigidbody root (so a ragdoll is pushed once), then hands each hit to the active ability's physics profile — Red pushes, Blue captures into orbit, Purple deletes.",
            "Casts raise events on the feedback bus; separate presenters handle camera shake (a projection-matrix skew, so the transform never moves) and audio. Adding a new ability is authoring an asset, not writing a system.",
          ],
          media: { type: "diagram" },
        },
        {
          title: "Trial mode",
          body: "To make it a game, the trial gives you a limited set of casts — 5 Red, 5 Blue, 2 Purple — and 60 seconds to destroy as much of the arena as you can, scored and graded. The map and abilities are tuned so a first run scores okay, but there's plenty of room to chase a better one.",
          details: [
            "Objects score once, the first time they're meaningfully broken: deleted by Purple, detached when a joint snaps, displaced far from where they started, or knocked out of bounds. That's how Red and Blue earn score without dealing damage.",
            "The physics opens up combos — differently sized objects shove and drag each other, so a well-aimed cast can chain into far more destruction than it touches directly. The grade ladder runs from Grade 4 up to Special Grade.",
          ],
          media: { type: "video", src: "/cet/trial.mp4", poster: "/cet/trial.jpg" },
        },
      ],
      // "What I learned" — a few substantive, human takeaways in my own words.
      takeaways: [
        "Game design is far harder than it looks. Most of the work is hundreds of small fixes a player would never notice — but they're exactly what makes something feel right.",
        "To get a game to feel the way you want, you have to build the systems yourself. Owning the physics, shaders, and animation is what gave me the control to actually tune the feel.",
        "AI is a great tool for building software, but game feel still needs a human touch — knowing when something \"feels right\" isn't something it can decide for you.",
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
  // One plain-English `summary` line per role does more than a title and a
  // date ever will. No internal names/systems — just what the work was.
  experience: [
    {
      id: 1,
      title: "Cryptography Developer",
      company: "RBC",
      employmentType: "Full-time",
      period: "Jan 2024 – Present",
      location: "Toronto, ON",
      summary: "",
    },
    {
      id: 2,
      title: "Cryptography Developer",
      company: "RBC",
      employmentType: "Co-op",
      period: "May 2023 – Aug 2023",
      location: "Toronto, ON",
      summary: "",
    },
    {
      id: 3,
      title: "Software Developer",
      company: "Optiwave Systems Inc.",
      employmentType: "Co-op",
      period: "May 2022 – Aug 2022",
      location: "Ottawa, ON",
      summary: "",
    },
    {
      id: 4,
      title: "Cyber Security Developer",
      company: "Hydro Ottawa",
      employmentType: "Co-op",
      period: "May 2021 – Dec 2021",
      location: "Ottawa, ON",
      summary: "",
    },
    {
      id: 5,
      title: "Software Developer",
      company: "RBC Wealth Management",
      employmentType: "Internship",
      period: "May 2020 – Aug 2020",
      location: "Toronto, ON",
      summary: "",
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
    "Backend and security engineering — production APIs, data, and infrastructure, with a focus on cryptography and PKI. I also build AI-integrated tooling with agents and MCP.",
  skills: [
    {
      group: "Languages",
      items: [
        { name: "Python", pro: true },
        { name: "C#", pro: true },
        { name: "C / C++" },
        { name: "JavaScript", pro: true },
        { name: "PowerShell", pro: true },
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
        { name: "FastMCP" },
      ],
    },
    {
      group: "Data & infrastructure",
      items: [
        { name: "SQL", pro: true },
        { name: "Data analysis & metrics", pro: true },
        { name: "Linux", pro: true },
        { name: "Nginx", pro: true },
        { name: "Ansible", pro: true },
        { name: "Git", pro: true },
        { name: "MongoDB" },
      ],
    },
    {
      group: "Security",
      items: [
        { name: "Application security", pro: true },
        { name: "PKI / certificate management", pro: true },
        { name: "Active Directory", pro: true },
        { name: "LDAP", pro: true },
      ],
    },
    {
      group: "AI-assisted development",
      items: [
        { name: "Agent development" },
        { name: "MCP servers (FastMCP)" },
      ],
      note: "Works daily with Claude Code, Cursor, ChatGPT, and Gemini.",
    },
  ],

  // --- Working principles ---------------------------------------------------
  // How I think about building software — engineering taste, not philosophy.
  // Shown near the bottom, after Experience.
  principles: {
    intro:
      "A few ideas that hold across everything I build, from production services to side projects.",
    items: [
      {
        title: "Fast and practical",
        body: "I like software that gets to the point. The best interfaces make the important actions obvious and avoid putting polish ahead of usefulness.",
      },
      {
        title: "Clear cause and effect",
        body: "Good tools should respond clearly to what the user does. Whether it is a dashboard, simulation, internal tool, or game system, the user should understand what changed and why.",
      },
      {
        title: "Correct and maintainable",
        body: "I care about systems that hold up in real use and stay clear enough for the next person to work on. A project is better when the core logic, structure, and tradeoffs are understandable.",
      },
    ],
  },
};
