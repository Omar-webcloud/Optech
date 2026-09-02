/**
 * Single source of truth for all site content.
 *
 * Every section of the landing page and every case study reads from here, so
 * copy changes never require touching component code. Types are exported so
 * the components stay strictly typed against the data shape.
 */

export const site = {
  name: "Optech Labs",
  tagline: "Web development & product design studio",
  domain: "optechlabs.com",
  url: "https://optechlabs.com",
  email: "hello@optechlabs.com",
  phone: "+1 (415) 555-0142",
  calendly: "#contact",
  founded: 2017,
  locations: ["San Francisco", "Lisbon", "Singapore"],
  social: [
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
} as const;

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/work" },
  { label: "Why Optech", href: "/#why" },
  { label: "FAQ", href: "/#faq" },
] as const;

/* -------------------------------------------------------------------------- */
/*  A. Hero                                                                    */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Web development & UI/UX, engineered for outcomes",
  headline: ["Ship the product", "your roadmap keeps", "postponing."],
  headlineAccentIndex: 2,
  sub: "Optech Labs is a senior product studio for founders and SaaS teams. We design and build revenue-critical web products — and hand them over in weeks, not quarters.",
  primaryCta: { label: "Book a 20-min call", href: "#contact" },
  secondaryCta: { label: "See the work", href: "/work" },
  reassurance: [
    "Fixed scope, fixed price",
    "First build in 14 days",
    "Senior engineers only",
  ],
  // Live "telemetry" strip rendered under the hero visual.
  telemetry: [
    { label: "Avg. Lighthouse", value: "98" },
    { label: "Avg. time to launch", value: "6 wks" },
    { label: "Client retention", value: "94%" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  B. Trust                                                                   */
/* -------------------------------------------------------------------------- */

export const stats = [
  {
    value: "140+",
    label: "Products shipped",
    detail: "Across SaaS, fintech, health and commerce since 2017.",
  },
  {
    value: "$310M",
    label: "Client funding raised",
    detail: "Seed through Series C, on sites and products we built.",
  },
  {
    value: "6 wks",
    label: "Median launch",
    detail: "From kickoff call to production traffic.",
  },
  {
    value: "94%",
    label: "Clients who return",
    detail: "Most engagements turn into long-term partnerships.",
  },
] as const;

/** Wordmark-style logos, drawn as text so there are no fake brand assets. */
export const clients = [
  "NORTHWIND",
  "LUMEN HEALTH",
  "ATLAS",
  "VERVE",
  "HELIOGRAPH",
  "PARSEC",
  "KESTREL",
  "MERIDIAN",
  "SOLSTICE",
  "AURORA LABS",
] as const;

/* -------------------------------------------------------------------------- */
/*  C. Services                                                                */
/* -------------------------------------------------------------------------- */

export type Service = {
  id: string;
  title: string;
  blurb: string;
  deliverables: readonly string[];
  timeline: string;
  icon: IconName;
};

export const services: readonly Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    blurb:
      "Production Next.js builds that stay fast under real traffic and real content.",
    deliverables: ["Next.js / React", "Headless CMS", "API & integrations"],
    timeline: "4–10 weeks",
    icon: "code",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    blurb:
      "Interfaces designed around the decision a user is actually trying to make.",
    deliverables: ["User flows", "Hi-fi UI", "Prototypes"],
    timeline: "3–6 weeks",
    icon: "layers",
  },
  {
    id: "product-design",
    title: "Product Design",
    blurb:
      "Zero-to-one product definition — scope it small, prove it, then scale it.",
    deliverables: ["Discovery sprint", "MVP scope", "Design system"],
    timeline: "2–5 weeks",
    icon: "compass",
  },
  {
    id: "conversion",
    title: "Conversion Engineering",
    blurb:
      "Landing pages and funnels rebuilt against analytics, not against taste.",
    deliverables: ["Funnel audit", "A/B testing", "Analytics wiring"],
    timeline: "2–4 weeks",
    icon: "trend",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  D. Process                                                                 */
/* -------------------------------------------------------------------------- */

export const process = [
  {
    step: "Discovery",
    duration: "Week 1",
    summary:
      "We pressure-test the goal, the users and the constraints — then write the scope we'll be held to.",
    outputs: ["Scope document", "Fixed quote", "Success metrics"],
  },
  {
    step: "Design",
    duration: "Weeks 2–3",
    summary:
      "Flows first, pixels second. You review real screens in a live prototype, not a slide deck.",
    outputs: ["User flows", "Hi-fi screens", "Component library"],
  },
  {
    step: "Development",
    duration: "Weeks 3–6",
    summary:
      "Built in public on a staging URL you can open any day of the week. Weekly demos, no black box.",
    outputs: ["Staging build", "Weekly demos", "QA checklist"],
  },
  {
    step: "Launch",
    duration: "Week 6+",
    summary:
      "We deploy, monitor and hand over documented code — plus 30 days of post-launch support.",
    outputs: ["Production deploy", "Handover docs", "30-day support"],
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  E. Work / case studies                                                     */
/* -------------------------------------------------------------------------- */

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  sector: string;
  year: string;
  services: readonly string[];
  image: string;
  imageAlt: string;
  /** Average colour of the mockup — used as an LQIP-style blur placeholder. */
  tint: string;
  problem: string;
  solution: string;
  results: readonly { value: string; label: string }[];
  stack: readonly string[];
  duration: string;
  /** Long-form narrative for the detail page. */
  narrative: readonly { heading: string; body: string }[];
  quote?: { text: string; name: string; role: string };
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "northwind-freight",
    client: "Northwind",
    title: "A freight ops console that replaced 14 spreadsheets",
    sector: "Logistics SaaS",
    year: "2025",
    services: ["Product Design", "Web Development"],
    image: "/work/northwind-freight.webp",
    imageAlt:
      "Northwind freight operations dashboard showing live shipment volume, an active shipment timeline and a route map",
    tint: "#111417",
    problem:
      "Dispatchers ran a $40M freight book out of spreadsheets and three disconnected tools. Nobody could answer 'where is this load right now' without four phone calls.",
    solution:
      "We ran a two-week discovery with real dispatchers, then designed and shipped a single operations console: live shipment state, exception-first alerting and a route map that updates as telematics arrive.",
    results: [
      { value: "-63%", label: "Time to locate a load" },
      { value: "3.4×", label: "Loads handled per dispatcher" },
      { value: "11 wks", label: "Discovery to production" },
    ],
    stack: ["Next.js", "PostgreSQL", "WebSockets", "Mapbox"],
    duration: "11 weeks",
    narrative: [
      {
        heading: "The real problem was not the tooling",
        body: "Northwind assumed they needed a better spreadsheet. Sitting with dispatchers for two days showed the actual failure: information arrived in four channels and none of them agreed. We reframed the brief from 'build a dashboard' to 'establish one source of truth for load state', which changed what we built and what we deliberately left out.",
      },
      {
        heading: "Exception-first, not data-first",
        body: "A dispatcher does not want 8,452 shipments. They want the eleven that are about to breach SLA. The console leads with exceptions and pushes healthy loads into a collapsed timeline, so the screen only escalates what needs a human decision today.",
      },
      {
        heading: "Built to survive a bad network day",
        body: "Freight yards have poor connectivity, so every mutation is queued optimistically and reconciled on reconnect. The interface never blocks on the network — it shows the pending state and resolves it silently.",
      },
    ],
    quote: {
      text: "We stopped hiring dispatchers to keep up with volume. The console absorbed the growth instead — that was never on the brief, but it is what happened.",
      name: "Dana Whitfield",
      role: "VP Operations, Northwind",
    },
  },
  {
    slug: "lumen-health",
    client: "Lumen Health",
    title: "Cutting patient booking abandonment by more than half",
    sector: "Digital Health",
    year: "2025",
    services: ["UI/UX Design", "Conversion Engineering"],
    image: "/work/lumen-health.webp",
    imageAlt:
      "Lumen Health appointment booking interface with a progress stepper, month calendar and time-slot selection",
    tint: "#f2f1ee",
    problem:
      "68% of patients abandoned the booking flow before confirming. The form asked for insurance details before it ever showed an available appointment time.",
    solution:
      "We inverted the flow — show availability first, collect details last — and rebuilt the calendar for one-thumb use. Insurance capture moved to a post-confirmation step that patients complete at 4× the rate.",
    results: [
      { value: "-54%", label: "Booking abandonment" },
      { value: "+38%", label: "Completed appointments" },
      { value: "AA", label: "WCAG 2.2 conformance" },
    ],
    stack: ["Next.js", "TypeScript", "FHIR API", "Vitest"],
    duration: "7 weeks",
    narrative: [
      {
        heading: "Asking for value before giving any",
        body: "The original flow front-loaded every difficult question — insurer, member ID, referral status — before a patient knew whether a suitable time even existed. Session recordings showed the drop-off happening on that first screen, not at payment.",
      },
      {
        heading: "Availability as the hook",
        body: "The rebuilt flow opens on a calendar with real, bookable times. Commitment increases once a patient has claimed a slot, so the paperwork that used to repel them now completes after the appointment is already held.",
      },
      {
        heading: "Accessibility was a requirement, not a pass",
        body: "Healthcare demands it. Every state is keyboard reachable, the calendar announces changes to screen readers, and contrast was verified against WCAG 2.2 AA on all interactive states — not just the default ones.",
      },
    ],
    quote: {
      text: "Optech questioned the order of our questions. That single change did more for bookings than the two redesigns we paid for before it.",
      name: "Dr. Priya Raman",
      role: "Chief Product Officer, Lumen Health",
    },
  },
  {
    slug: "atlas-ledger",
    client: "Atlas",
    title: "A design system that unified nine fintech surfaces",
    sector: "Fintech",
    year: "2024",
    services: ["Product Design", "Web Development"],
    image: "/work/atlas-ledger.webp",
    imageAlt:
      "Atlas design system documentation showing colour tokens, a type scale specimen and a component gallery",
    tint: "#0e0f12",
    problem:
      "Nine product surfaces built by four teams had drifted into nine different button styles, three type scales and no shared accessibility baseline.",
    solution:
      "We built a token-driven design system with a documented component library, then migrated the two highest-traffic surfaces ourselves to prove the path for the rest of the org.",
    results: [
      { value: "-41%", label: "UI code duplication" },
      { value: "2.8×", label: "Faster feature delivery" },
      { value: "9", label: "Surfaces unified" },
    ],
    stack: ["React", "Design Tokens", "Storybook", "Figma"],
    duration: "14 weeks",
    narrative: [
      {
        heading: "Systems fail on adoption, not design",
        body: "Atlas had attempted a design system before; it died in a Figma file nobody opened. We treated adoption as the deliverable — the system shipped with codemods, migration guides and two reference surfaces already converted.",
      },
      {
        heading: "Tokens as the contract",
        body: "Every colour, space and type decision is a token consumed identically by Figma and code. When the brand shifted mid-project, the change propagated in a single pull request instead of a nine-team coordination effort.",
      },
      {
        heading: "Accessibility baked into the primitives",
        body: "Focus states, contrast ratios and target sizes are properties of the components themselves, so teams building on the system inherit compliance rather than re-litigating it each sprint.",
      },
    ],
    quote: {
      text: "The migration guide mattered more than the components. It is the reason the system is actually in production on nine surfaces instead of two.",
      name: "Marcus Feld",
      role: "Director of Engineering, Atlas",
    },
  },
  {
    slug: "verve-supply",
    client: "Verve",
    title: "Rebuilding a storefront around a 1.2s LCP budget",
    sector: "Commerce",
    year: "2024",
    services: ["Web Development", "Conversion Engineering"],
    image: "/work/verve-supply.webp",
    imageAlt:
      "Verve ecommerce collection page with an editorial product grid and a filter panel",
    tint: "#f5f4f0",
    problem:
      "A 6.4-second mobile load time was costing Verve roughly a third of its paid traffic before the first product image ever appeared.",
    solution:
      "We rebuilt the storefront on Next.js with a hard performance budget enforced in CI, streamed the product grid, and moved filtering to the server so the first paint carries real merchandise.",
    results: [
      { value: "1.2s", label: "Mobile LCP" },
      { value: "+29%", label: "Conversion rate" },
      { value: "+52%", label: "Organic sessions" },
    ],
    stack: ["Next.js", "Shopify API", "Edge Cache", "Playwright"],
    duration: "9 weeks",
    narrative: [
      {
        heading: "A budget the build could not exceed",
        body: "We set a 1.5s LCP budget on a throttled 4G profile and wired it into CI. Any pull request that regressed the budget failed before review, which turned performance from a launch-week scramble into a daily constraint.",
      },
      {
        heading: "Server-side filtering, shareable URLs",
        body: "Filters became real URLs rendered on the server. Shoppers can share a filtered collection, search engines can index it, and the client ships far less JavaScript because the grid never re-filters in the browser.",
      },
      {
        heading: "Images treated as the main payload",
        body: "Product photography is the product. Every image is served as AVIF/WebP at device-appropriate sizes with explicit dimensions, eliminating layout shift while cutting image weight by roughly 70%.",
      },
    ],
    quote: {
      text: "Same traffic, same ad spend, a third more revenue. The only variable that changed was the site itself.",
      name: "Sofia Marchetti",
      role: "Founder, Verve",
    },
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  F. Why choose us                                                           */
/* -------------------------------------------------------------------------- */

export type IconName =
  | "code"
  | "layers"
  | "compass"
  | "trend"
  | "bolt"
  | "shield"
  | "eye"
  | "target"
  | "handoff"
  | "people";

export const differentiators: readonly {
  title: string;
  body: string;
  icon: IconName;
}[] = [
  {
    title: "Senior people only",
    body: "The people in your kickoff call write the code. We do not staff juniors against your budget and call it a team.",
    icon: "people",
  },
  {
    title: "Fixed scope, fixed price",
    body: "You approve a written scope and a number before we start. No hourly drift, no surprise invoice in week nine.",
    icon: "shield",
  },
  {
    title: "Shipped in weeks",
    body: "Median engagement reaches production in six weeks. Momentum is a feature — long projects quietly lose their sponsors.",
    icon: "bolt",
  },
  {
    title: "Business metrics first",
    body: "We instrument what the work is supposed to move, then report against it. Design opinions lose to data.",
    icon: "target",
  },
  {
    title: "Nothing behind a curtain",
    body: "A live staging URL from week one and a demo every Friday. You never wait for a reveal.",
    icon: "eye",
  },
  {
    title: "Yours at handover",
    body: "Documented code, your repository, your infrastructure. No proprietary lock-in and no retainer required to keep it running.",
    icon: "handoff",
  },
];

/* -------------------------------------------------------------------------- */
/*  G. Testimonials                                                            */
/* -------------------------------------------------------------------------- */

export const testimonials = [
  {
    quote:
      "We had been quoted six months by two agencies. Optech scoped it down to what actually mattered and had us in production in seven weeks. The scope document alone was worth the engagement.",
    name: "Dana Whitfield",
    role: "VP Operations",
    company: "Northwind",
    initials: "DW",
    metric: "Live in 7 weeks",
  },
  {
    quote:
      "They challenged the brief on day one — politely, with evidence. That conversation is the reason our booking numbers moved instead of just our visual design.",
    name: "Dr. Priya Raman",
    role: "Chief Product Officer",
    company: "Lumen Health",
    initials: "PR",
    metric: "-54% abandonment",
  },
  {
    quote:
      "The handover was the most professional I have seen in eleven years of buying agency work. Documented, tested, and our team was productive in it within a week.",
    name: "Marcus Feld",
    role: "Director of Engineering",
    company: "Atlas",
    initials: "MF",
    metric: "9 surfaces unified",
  },
  {
    quote:
      "Same traffic, same ad spend, a third more revenue. I have stopped describing Optech as a design cost and started treating them as growth spend.",
    name: "Sofia Marchetti",
    role: "Founder",
    company: "Verve",
    initials: "SM",
    metric: "+29% conversion",
  },
  {
    quote:
      "Weekly demos meant there was never a moment of surprise. By launch day we had already seen and shaped every screen in the product.",
    name: "Tobias Lund",
    role: "Co-founder",
    company: "Parsec",
    initials: "TL",
    metric: "Zero scope disputes",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  H. FAQ                                                                     */
/* -------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "What does a project typically cost?",
    a: "Most engagements land between $18k and $85k. A conversion-focused landing page or marketing site usually starts around $18k; a full product build with design, development and launch support typically runs $45k–$85k. You receive a fixed quote after discovery — before any build work begins — and that number does not move unless you change the scope in writing.",
  },
  {
    q: "How quickly can you start, and how long will it take?",
    a: "We typically start within two weeks and run one to two engagements at a time so nothing is queued behind another client. Landing pages ship in two to four weeks, full product builds in six to twelve. You get a dated timeline in the scope document, and we report against it every week.",
  },
  {
    q: "How does communication actually work?",
    a: "A shared Slack channel with your team, a live staging URL from week one, and a demo every Friday. You always have a working link to open — you never wait until the end of a phase to see progress.",
  },
  {
    q: "What happens if I want changes mid-project?",
    a: "Two revision rounds are built into every design phase. Small refinements are simply part of the work. If a change alters the agreed scope, we quote it separately before doing anything, so the original budget stays predictable.",
  },
  {
    q: "Do we own the code and the design files?",
    a: "Completely, on final payment. Code lives in your repository from day one, deployed to your infrastructure, with your Figma files handed over. No proprietary platform, no license fee, no dependency on us to keep it running.",
  },
  {
    q: "What if we already have a designer or an in-house team?",
    a: "That is common and often ideal. We can take design through to build, extend your team on development only, or run a discovery sprint that your team executes. We adapt to how your team already works instead of imposing our process on it.",
  },
  {
    q: "What support do we get after launch?",
    a: "Thirty days of post-launch support is included with every build — bug fixes, small adjustments and monitoring. After that you can continue on a lightweight monthly retainer or take it fully in-house with the handover documentation. Roughly two-thirds of clients choose to keep working with us.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  J. Lead capture                                                            */
/* -------------------------------------------------------------------------- */

export const projectTypes = [
  "Marketing site / landing page",
  "Web app or SaaS product",
  "UI/UX design only",
  "Design system",
  "Conversion / performance audit",
  "Something else",
] as const;

export const budgetRanges = [
  "Under $20k",
  "$20k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
] as const;
