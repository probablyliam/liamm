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

  // --- Links ----------------------------------------------------------------
  // Contact goes through LinkedIn. No email or phone on the site, on purpose.
  social: {
    github: "https://github.com/probablyliam",
    linkedin: "https://linkedin.com/in/liam-maiorino",
  },

  // --- Projects -------------------------------------------------------------
  // Every project gets its own shareable page at /projects/<slug>.
  // They are shown in the order they are listed here.
  //
  //   --- card ---
  //   title, year, status   status is a short label, e.g. "Live" or "Unity demo"
  //   kind      the type of work, e.g. "Interactive data visualization"
  //   problem   the problem it solves (1 line)
  //   built     what you built: a string or an array of short points
  //   tech      tech tags
  //   cover     freeze-frame image for the card (path in /public)
  //   preview   OPTIONAL short muted clip that loops on the card
  //   accent    OPTIONAL { light, dark } colour for this project's page
  //
  //   --- detail page ---
  //   showcase     the finished result, shown first: { src, poster, caption }
  //   tagline      one-line summary under the title
  //   description  longer explanation in plain language
  //   features     "Highlights": strings, or { title, detail }
  //   abilities    OPTIONAL cards: { name, color, video, poster, blurb, feels, detail }
  //   build        OPTIONAL "How it's built" rows: { title, body, details, media | components }
  //   takeaways    OPTIONAL "What I learned" points
  //   links        any of: live, github (empty to hide)
  projects: [
    {
      id: 3,
      slug: "pq-oidc",
      title: "Quantum-Safe Login Scanner",
      year: "2026",
      status: "Live",
      kind: "TLS and sign-in security tool",
      // Page accent on the detail page: the green the app uses for "quantum-safe".
      accent: { light: "#0e6b4e", dark: "#5fcfa6" },
      problem:
        "A large enough quantum computer would break the public-key cryptography that most logins rely on. A site can move to post-quantum algorithms one piece at a time, and from the outside it is hard to tell which pieces it has moved.",
      built: [
        "A scanner with its own TLS 1.3 client that completes the handshake, including the hybrid ML-KEM groups, and reports what the server actually negotiated.",
        "Checks on the certificate and on the sign-in keys a provider publishes, shown as one verdict with the evidence underneath.",
        "A login lab that runs a real key exchange and real signatures in the browser, then lets you attack them with an ordinary or a quantum computer.",
        "Strict rules on which addresses the scanner will connect to, since anyone can type one in.",
      ],
      // --- MEDIA -------------------------------------------------------------
      // Assets live in /public/pq/. The clips are screen recordings of the
      // live site, each with a .jpg poster.
      cover: "/pq/cover.jpg",
      preview: "/pq/preview.mp4", // short, muted loop on the card
      showcase: {
        src: "/pq/hero.mp4",
        poster: "/pq/hero.jpg",
        caption: "Scanning a real sign-in service, then trying the same setup against an attacker in the login lab.",
      },
      tagline:
        "A scanner that checks whether a site's login is protected against quantum computers, and a lab that shows what an attacker could do where it is not.",
      description:
        "I work in cryptography, and I wanted a way to see how far a real site has moved to post-quantum algorithms. So I built a scanner that answers three questions about a login. If someone records the connection, can they read it later? Can someone pretend to be the site? Can someone fake a sign-in? Each answer comes from what the server sends and publishes, and the technical details are there for anyone who wants to check the work. The project started as an OpenID Connect provider that signs its tokens with ML-DSA, which is why the repo is called pq-oidc. That provider is still in the repo, and the scanner can scan it.",
      features: [
        { title: "Its own TLS client", detail: "Builds the ClientHello and decrypts the server's reply itself, so it sees exactly which group was negotiated, hybrid ones included." },
        { title: "Hybrid and post-quantum groups", detail: "X25519MLKEM768, the P-256 and P-384 hybrids, and ML-KEM on its own, each tested with a separate handshake." },
        { title: "A verdict, then the evidence", detail: "Three plain answers first. Every finding below is marked observed, inferred, or could not determine." },
        { title: "Reads the sign-in keys", detail: "Fetches the keys an OpenID Connect provider publishes, so the sign-in answer is not a guess." },
        { title: "Safe to point anywhere", detail: "Private, loopback, and cloud metadata addresses are refused, along with the usual ways around that." },
        { title: "Real cryptography in the lab", detail: "ML-KEM, ML-DSA, X25519, and ECDSA all run in the browser. Only the quantum computer is simulated." },
      ],
      build: [
        {
          title: "The scanner",
          body: "The scanner does not use a TLS library to connect. It builds its own ClientHello, completes the key exchange, and decrypts the server's side of the handshake so it can read the certificate and check the signature. When it says a server uses X25519MLKEM768, it means the scanner and the server derived the same secret with it.",
          details: [
            "The key schedule is tested against the RFC 8448 trace, and full handshakes are tested against local OpenSSL 3.5 servers in every supported group, with the Finished message verified.",
            "To find out which groups a server supports, the scanner sends one handshake per group and watches for a HelloRetryRequest. TLS 1.2 ECDHE and RSA key transport are recognised too.",
            "It only observes. Nothing is sent after the ClientHello, and it never signs in to anything.",
            "The hosted version runs inside a single Vercel Function. A scan runs in the request, streams its progress back, and is not stored. The same code also runs as a separate API and worker with Docker Compose or a Helm chart.",
          ],
          components: [
            { name: "Address policy", role: "Resolves each name once, checks the address, and pins the connection to it." },
            { name: "TLS observer", role: "One handshake per group, decrypted and verified." },
            { name: "Certificates", role: "Reads the chain the server sent and the signature it made in the handshake." },
            { name: "Sign-in keys", role: "Fetches the OpenID Connect metadata and the published key set." },
            { name: "Assessment", role: "Turns the findings into three answers and one verdict. There is no score." },
          ],
        },
        {
          title: "Login lab",
          body: "The lab lets you choose what a site uses for its key exchange, its certificate, and its sign-in token, then log in with a password you make up. After that you play the attacker. With an ordinary computer every attempt fails. With a quantum computer the classical parts fall one at a time, and each step of the attack is shown.",
          details: [
            "Every value is computed in the browser as you log in: X25519 and ML-KEM-768, the TLS 1.3 key schedule, AES-256-GCM, and ECDSA P-256 and ML-DSA-65 signatures. The key schedule is the same code the scanner uses on real handshakes.",
            "The quantum computer is simulated by handing the attacker the private key it would compute. Everything the attacker does with it afterwards is a real decryption or a real signature check, and it either works or it does not.",
            "The handshake in the lab is a simplified sketch of TLS 1.3, not an implementation of it.",
          ],
          media: { src: "/pq/lab.mp4", poster: "/pq/lab.jpg" },
        },
        {
          title: "Token checker",
          body: "Paste a JWT and it says whether a quantum computer could forge tokens like it. The token is read in the browser and never sent anywhere. It also recognises the classic attacks, such as a removed signature, edited claims, and algorithm confusion.",
          details: [
            "The signature can be checked against the issuer's published keys.",
            "The examples cover a typical RS256 token, a post-quantum one signed with ML-DSA-65, an encrypted one, and the tampered kinds.",
          ],
          media: { src: "/pq/token.mp4", poster: "/pq/token.jpg" },
        },
        {
          title: "Scanning addresses from strangers",
          body: "The scanner connects to whatever address a visitor types in, so the part that decides where it may connect got the most care. It only uses HTTPS on two ports. Every name is resolved once, the address is checked against the private, loopback, link-local, and metadata ranges, and the connection is pinned to that address. Redirects and discovered links go through the same checks.",
          details: [
            "IPv6 forms that carry an IPv4 address (IPv4-mapped, NAT64, and 6to4) are judged by the address inside them.",
            "The tests cover the usual bypasses: decimal and octal IPs, localhost variants, DNS rebinding, and redirects to the cloud metadata service.",
            "There are no accounts. Limits per visitor and per scanned site stand in for them, and everything has a size cap and a deadline.",
          ],
        },
      ],
      takeaways: [
        "The cost of post-quantum signatures is size, not speed. An ML-DSA-65 signature is 3,309 bytes, so the same ID token grew 8.8 times and no longer fit in a cookie. Browsers drop a cookie that large without any error.",
        "Key exchange is easier to move than signatures. A server can offer a hybrid ML-KEM group and fall back to the old one for clients that do not support it. A new signing key has to be understood by every app that checks it.",
        "The order of a migration matters. Switching an app to ML-DSA before its library supports it breaks every sign-in, so the new key has to be published next to the old one first and apps moved over one at a time.",
      ],
      tech: [
        "TypeScript",
        "Node.js",
        "React",
        "Vite",
        "TLS 1.3",
        "ML-KEM / ML-DSA",
        "OpenID Connect",
        "Vitest",
        "Docker",
        "Vercel",
      ],
      links: {
        live: "https://pq-oidc.vercel.app/",
        github: "https://github.com/probablyliam/pq-oidc",
      },
    },
    {
      id: 2,
      slug: "cursed-energy-trial",
      title: "Cursed Energy Trial",
      year: "2026",
      status: "Unity demo",
      kind: "Unity combat & physics systems demo",
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
          media: { src: "/cet/redshader.mp4", poster: "/cet/redshader.jpg" },
        },
        {
          title: "Animation pipeline",
          body: "The character is fully animated with Blender and Mixamo. It has walk, idle, jump, full 3D movement, strafing while aiming, and custom cast animations matched to the anime. You keep moving and strafing while an ability fires, so it stays responsive without feeling stiff.",
          details: [
            "The ability controller raises events when a cast starts and which colour it is. A small animation controller listens to those events and sets the animator parameters. The casting animation plays on the upper body while the legs keep walking, running, or standing on their own, so you can move and aim while a cast is going off.",
            "I used Blender for retargeting and the custom attack poses, and Unity's animator handles the blending at runtime.",
          ],
          media: { src: "/cet/blender.mp4", poster: "/cet/blender.jpg" },
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
          media: { src: "/cet/trial.mp4", poster: "/cet/trial.jpg" },
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
        github: "https://github.com/probablyliam/JJKDemo",
      },
    },
    {
      id: 1,
      slug: "imperial-lineage",
      title: "Imperial Lineage",
      year: "2026",
      status: "Live",
      kind: "Interactive data visualization",
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
        github: "https://github.com/probablyliam/emperor-project",
      },
    },
  ],

  // --- Experience -----------------------------------------------------------
  // Roles are listed as title, company, type, period, and location only.
  // The component supports an optional one-line `summary`, but this page is
  // public, so the specifics of the work stay off it.
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
  // Only list concrete technologies. A group can also carry a `note`, a short
  // line rendered under its items.
  skillsFocus:
    "Backend and security engineering: production APIs, data, and infrastructure, with a focus on cryptography and PKI. I also build AI-integrated tooling with agents and MCP.",
  skills: [
    {
      group: "Languages",
      items: [
        "Python",
        "C#",
        "JavaScript",
        "TypeScript",
        "PowerShell",
        "C / C++",
        "Java",
      ],
    },
    {
      group: "Web & APIs",
      items: [
        "Django",
        "Flask",
        "Express.js",
        "Gunicorn",
        "React",
        "Node.js",
      ],
    },
    {
      group: "Data & infrastructure",
      items: [
        "SQL",
        "Linux",
        "Docker",
        "GitHub Actions",
        "Ansible",
        "Nginx",
        "Git",
      ],
    },
    {
      group: "Security",
      items: [
        "Cryptography & key management",
        "PKI / certificate management",
        "TLS",
        "Post-quantum cryptography (ML-KEM, ML-DSA)",
        "OpenID Connect",
        "Active Directory",
        "LDAP",
      ],
    },
    {
      group: "AI-assisted development",
      items: [
        "MCP server & tool development",
        "LLM agent integration",
        "FastMCP",
      ],
    },
  ],
};
