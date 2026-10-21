import type { AdditionalWork, EarlierExperience, Experience, Profile, Project } from '../types/portfolio';

export const profile: Profile = {
  name: 'Carlos Manuel González',
  shortName: 'Carlos Manuel',
  title: 'AI Software Engineer',
  email: 'cmglezpdev@gmail.com',
  location: 'Mexico',
  description: 'I build backend services, payment systems, and full-stack SaaS products, including AI-powered applications with agentic workflows. I care about scalable systems, software architecture, and system design. I use coding agents in my daily development workflow. B.Sc. in Computer Science.',
  portrait: '/images/profile/carlos-manuel.webp',
  socials: [
    { label: 'GitHub', url: 'https://github.com/cmglezpdev' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/cmglezpdev/' },
    { label: 'X / Twitter', url: 'https://twitter.com/cmglezpdev' },
  ],
};

export const experience: Experience[] = [
  {
    company: 'AOShield Solutions',
    logo: '/images/companies/aoshield.webp',
    period: { start: '2026-09' },
    current: true,
    context: 'Healthcare software · Canada',
    roles: [{
      title: 'Full-stack Developer',
      period: { start: '2026-09' },
      description: 'Developing healthcare software for a Canadian client, working primarily on the C# / .NET Core API and related React and TypeScript interfaces in an Azure-hosted environment.',
      points: [
        'Modernizing legacy API workflows across multiple entities to use the platform\'s shared claims-based authorization patterns.',
        'Shipping fixes and refactoring application services and shared packages used across the API and frontend.',
        'Participating in planning and code reviews, with API and frontend changes integrated into production.',
      ],
      tags: ['C#', '.NET Core', 'React', 'TypeScript', 'Azure'],
    }],
  },
  {
    company: 'Dara Services',
    logo: '/images/companies/dara.webp',
    period: { start: '2023-10', end: '2026-09' },
    current: false,
    roles: [
      {
        title: 'Software Engineer · Technical Lead',
        period: { start: '2026-01', end: '2026-09' },
        description: 'Led development of a new multi-tenant agency platform, built from scratch as a modular monolith with NestJS and React.',
        points: [
          'Initially coordinated five developers across backend, web, and mobile, defining tasks, reviewing code, and directing architecture. Later took ownership of full-stack implementation as the team became smaller.',
          'Designed and implemented modules for operations, products, commerce, ai agents, flight-ticket records, and customer communications across WhatsApp, Instagram and Messenger, with agency-scoped data and configurable business workflows.',
          'Built AI agents with Vercel AI SDK and AI Gateway, including model selection, business tools, document retrieval, and external MCP connections. Added tool approvals, structured results in chat, and usage and cost tracking.',
          'Built scheduled agents for recurring tasks and automated workflows within the platform.',
          'Implemented configurable roles and attribute-based permission conditions shared by API requests and agent tools. Translated supported conditions into database query filters.',
          'Configured self-hosted deployment with Docker and Dokploy, automated image delivery through CI/CD, and integrated AWS S3 document storage using CDK.',
          'Built observability with Grafana, Prometheus, and Loki, including application logs and dashboards for infrastructure, API performance, and AI usage.',
        ],
        tags: ['TypeScript', 'NestJS', 'React', 'PostgreSQL', 'Redis', 'Modular monolith', 'AI agents', 'AWS S3', 'Self-hosted', 'Docker', 'Dokploy', 'CI/CD', 'Grafana'],
        caseStudy: '/work/dara-platform/',
      },
      {
        title: 'Backend Software Engineer',
        period: { start: '2023-10', end: '2026-01' },
        description: 'Built backend services for an earlier microservices platform supporting remittances, commerce, and customer communications.',
        points: [
          'Built a remittance backend with Supabase and PostgreSQL processing up to 9,000 monthly transactions. Implemented payment-state tracking, idempotent partner requests, and delivery and settlement records.',
          'Developed a multi-provider payment gateway with a common integration layer for Stripe, Openpay, NMI, and Elavon.',
          'Designed and maintained domain microservices for CRM, commerce, mobile recharges, identity, payments, and customer support across WhatsApp, Instagram, and Messenger.',
          'Implemented backend services with NestJS, PostgreSQL, Redis, and RabbitMQ, and worked on .NET services with GraphQL. Delivered Docker-based services on self-hosted infrastructure alongside product and engineering teams.',
          'During the transition, optimized Docker images and CI pipelines, reducing typical build times by approximately 60% and lowering GitHub Actions costs.',
        ],
        tags: ['TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Supabase', '.NET', 'GraphQL', 'RabbitMQ', 'Microservices', 'Docker', 'Self-hosted', 'Payments'],
      },
    ],
  },
];

export const earlierExperience: EarlierExperience[] = [
  {
    company: 'DasMex',
    logo: '/images/companies/dasmex.webp',
    title: 'Full-stack Developer',
    period: { start: '2023-08', end: '2023-11' },
    description: 'Built full-stack features for Biomas, a pet management and services platform.',
    points: [
      'Developed Next.js interfaces and NestJS backend API routes for platform products and services.',
      'Integrated MercadoPago and PayPal into checkout and payment workflows.',
      'Built scheduling, job management, and service listings for veterinary and animal care professionals, working on new platform capabilities.',
    ],
    tags: ['Next.js', 'NestJS', 'TypeScript', 'GraphQL', 'MercadoPago', 'PayPal'],
  },
  {
    company: 'NTSprint',
    logo: '/images/companies/ntsprint.webp',
    title: 'Software Engineer Intern',
    period: { start: '2023-02', end: '2023-03' },
    description: 'Maintained a real estate web application during a two-month internship.',
    points: [
      'Updated ASP.NET Web Forms interfaces, fixed frontend defects, and wrote SQL queries for data retrieval and database maintenance.',
      'Worked with designers and developers in a Scrum team.',
    ],
    tags: ['C#', 'ASP.NET Web Forms', 'SQL Server'],
  },
];

export const projects: Project[] = [
  {
    slug: 'nativo',
    name: 'Nativo',
    category: 'Personal product',
    headline: 'Practice English with your own texts, browser-generated audio, and writing feedback.',
    summary: 'An English-learning app that turns pasted texts into reading lessons with audio generated locally in the browser, contextual vocabulary, and idiom detection. A writing editor provides corrections you can accept or reject.',
    status: 'In active development',
    visual: 'nativo',
    images: [
      { src: '/images/projects/nativo/read-lesson.webp', description: 'Nativo reading view with audio playback and contextual vocabulary definitions.' },
      { src: '/images/projects/nativo/lesson-library.webp', description: 'Nativo lesson library with imported texts and generated audio.' },
      { src: '/images/projects/nativo/writing.webp', description: 'Nativo writing editor with grammar suggestions to accept or reject.' },
    ],
    featured: true,
    tags: ['Full-stack', 'Applied AI', 'Text-to-speech', 'Language learning', 'Stripe'],
    links: [{ label: 'Visit Nativo', url: 'https://soundlikenative.com' }],
    sourceNote: 'Private source code',
    overview: 'Nativo brings reading, listening, vocabulary, and writing practice into one application. You choose the material: a passage from a book, an article, or any text you want to study. A speech model downloaded into the browser generates the audio locally.',
    howItWorks: [
      'Create a lesson by pasting its content and adding a title, description, and optional source information. Generate its audio to listen to the lesson or individual sentences while reading in sentence or page view. The generated audio is saved for later playback.',
      'Words are highlighted according to how well you know them. Select a word or phrase to see its contextual meaning and pronunciation, hear it aloud, or add a note. Mark words as ignored or assign a familiarity level; known words stop being highlighted. An optional English-level setting initializes familiar vocabulary from earlier levels so common words do not clutter the reading view. You can also reveal a Spanish translation.',
      'Expression detection is optional. Run it on a lesson to identify and save phrasal verbs and idioms for study. For writing practice, create a document and use Check to review grammar and coherence feedback, accepting or rejecting individual corrections.',
    ],
    decisions: [
      { title: 'Paste content directly', text: 'I chose copy and paste rather than automatic article scraping. It gives the user control over the exact passage and avoids unreliable extraction and formatting across different websites.' },
      { title: 'Detect expressions, then validate their context', text: 'I split lesson text into chunks and extract idioms and phrasal verbs in separate calls. A second stage validates each candidate against the surrounding text to reduce false positives. Accepted and rejected results are stored for review, and I use reference examples and a comparison script to evaluate changes.' },
    ],
  },
  {
    slug: 'linkseek',
    name: 'Linkseek',
    category: 'Personal product',
    headline: 'Save, organize, and find links with their notes and related resources.',
    summary: 'A bookmark manager with editable page details, collections, tags, notes, and related links. It fetches available page metadata when you add a URL.',
    status: 'Working product',
    visual: 'linkseek',
    images: [
      { src: '/images/projects/linkseek/library.webp', description: 'Linkseek bookmark library with search and nested collections.' },
      { src: '/images/projects/linkseek/bookmark-details.webp', description: 'Linkseek bookmark details with tags, related links, and notes.' },
      { src: '/images/projects/linkseek/import-links.webp', description: 'Linkseek import dialog for saving multiple links into collections.' },
      { src: '/images/projects/linkseek/landing-page.webp', description: 'Linkseek landing page introducing the bookmark manager.' },
    ],
    featured: true,
    tags: ['Full-stack', 'Bookmark management', 'Product development'],
    links: [{ label: 'Visit Linkseek', url: 'https://linkseek.app' }],
    sourceNote: 'Private source code',
    overview: 'Linkseek is a bookmark manager for collecting web resources and keeping the context that makes them useful. Alongside each URL, you can store a title, description, image, and notes, then organize it in a collection or connect it to related links.',
    howItWorks: [
      'After signing up, paste a URL to add a bookmark. Linkseek fetches the page and tries to retrieve its title, description, favicon, and social preview image. You can edit the details before saving and add your own notes.',
      'Use collections and tags to organize your library, and search to find saved resources. Related links connect individual bookmarks without requiring them to belong to the same collection.',
    ],
    decisions: [],
  },
  {
    slug: 'openwhispr-proxy',
    name: 'OpenWhispr Proxy',
    category: 'Open-source tool',
    headline: 'Connect OpenWhispr to Vercel AI Gateway and track your dictation usage.',
    summary: 'A local proxy that adapts OpenWhispr\'s audio transcription requests for Vercel AI Gateway and routes transcript cleanup through the same service. Includes a usage dashboard, SQLite request history, and a prebuilt Docker image.',
    status: 'Open source',
    visual: 'proxy',
    images: [
      { src: '/images/projects/openwhispr-proxy/banner.webp', description: 'OpenWhispr Proxy routes voice requests through an AI Gateway and tracks usage.' },
      { src: '/images/projects/openwhispr-proxy/dashboard.webp', description: 'OpenWhispr Proxy dashboard with request filters, usage charts, costs, and request history.' },
    ],
    featured: true,
    tags: ['Backend', 'AI integration', 'NestJS', 'Docker', 'SQLite'],
    links: [{ label: 'View source', url: 'https://github.com/cmglezpdev/openwhispr-proxy' }],
    sourceNote: 'Public source code',
    overview: 'OpenWhispr Proxy lets OpenWhispr use Vercel AI Gateway for audio transcription and transcript cleanup. It runs locally between the application and the gateway, adapting the audio API format and recording usage for both audio and text requests.',
    howItWorks: [
      'Run the proxy and configure OpenWhispr to send requests to it. The proxy maps the incoming parameters to the gateway\'s API and returns responses in the format OpenWhispr expects. A prebuilt Docker image is available through GitHub Container Registry, so you can run it without building the image yourself.',
      'Each request is recorded in SQLite. The dashboard shows recorded costs, audio duration, activity over time, and usage by model. A searchable request table supports filters such as date range, operation, model, and cost, so you can inspect transcription and text-cleanup activity in one place.',
      'Open `/dashboard` on your local proxy address to explore the dashboard.',
    ],
    decisions: [
      { title: 'Adapt the existing client requests', text: 'I inspected the endpoints, parameters, and response formats OpenWhispr uses and implemented the corresponding routes in NestJS with the Vercel AI SDK. Text requests already work with the gateway\'s OpenAI-compatible API; the audio transcription format is the compatibility gap the proxy handles.' },
      { title: 'Keep request history locally', text: 'I added SQLite to retain per-request usage and cost records, then built a dashboard over that history. Docker volume persistence keeps the records between container restarts.' },
    ],
  },
  {
    slug: 'dara-platform',
    format: 'case-study',
    name: 'Dara agency platform',
    category: 'Professional work · Dara Services',
    headline: 'A multi-tenant platform with shared business modules and configurable AI agents.',
    summary: 'Engineering decisions behind Dara\'s agency platform: a modular monolith, shared contracts, AI tools with user-level permissions, and a smaller set of supported models.',
    status: 'Small early-user rollout',
    visual: 'agents',
    images: [],
    featured: false,
    tags: ['TypeScript', 'NestJS', 'React', 'Modular monolith', 'AI agents', 'Access control'],
    links: [],
    sourceNote: 'Selected architecture and implementation decisions',
    overview: 'Dara\'s earlier platform was built for the company\'s own operations. Its roles, integrations, and commerce workflows assumed a single business. The new product would let independent agencies subscribe to business modules and manage their own organizations. That required rethinking the domain, authentication, and data boundaries.',
    problem: 'I designed the application architecture and worked across the NestJS backend and React frontend. With a shrinking team, a limited infrastructure budget, and pressure to ship an MVP, I prioritized simpler deployment and shared code. The existing business assumptions made adapting the old system less practical than starting a new product.',
    contributions: [
      'Built business modules, organization-scoped permissions, and agent interfaces with tools, document retrieval, external MCP connections, and usage tracking.',
      'Set up self-hosted deployment and CI/CD. Moved image builds to GitHub Actions to avoid competing with the running application for server resources.',
    ],
    decisions: [
      { title: 'Keep module boundaries without separate services', text: 'The earlier microservices added communication and deployment overhead. I chose a modular monolith so a smaller team could operate one backend. Modules owned their data and interacted through contracts, dependency injection, or events. The trade-off was enforcing those boundaries inside a shared codebase. Reviews caught cross-module dependencies, including AI-generated ones, that needed refactoring. I used explicit development rules and code review to keep one module from reaching directly into another\'s repositories.' },
      { title: 'Share contracts and client logic across applications', text: 'I organized the API, web, and mobile applications in a Turborepo monorepo. Shared Zod schemas supplied validation and types; shared services and hooks handled API calls and client logic. The web used these packages first, and the mobile administration app reused them as development began. This reduced duplicated logic and made corrections reusable. TypeScript caught incompatible type changes, while shared runtime validation kept constraints consistent. Keeping the code together also gave coding agents context across application boundaries.' },
      { title: 'Run agent tools through existing business services', text: 'Agents helped users query several modules without navigating each screen. During early use, a flight-business user asked for upcoming flights and records awaiting payment confirmation. Tools reused the same services as the ordinary interface. Each tool could run directly, request approval, or be disabled. Approval allowed the tool to execute; the backend still checked the acting user\'s permissions. If that user lacked permission, the operation failed and the agent received the error. This kept business authorization in the backend while letting users control which actions an agent could attempt.' },
      { title: 'Support a smaller, tested set of models', text: 'Offering more models also meant supporting differences in tool-calling capabilities, provider requirements, cost, and behavior. I narrowed the list to models I had manually tested with the agents, using public comparisons to help select candidates. This made compatibility easier to check with the time available. Those were practical manual checks, not a formal quality-evaluation system. Supporting another model meant checking it before enabling it.' },
    ],
    outcome: 'The platform had roughly three months of production use before I left, with a small group of early customers and direct onboarding. Flights saw real use; operations and interactive agents had limited adoption. Recurring agents remained experimental and were tested internally.',
    next: 'I would start with a narrower MVP. Configurable permission conditions anticipated future needs but took substantial effort to implement and verify, while few were used. I would keep entity-and-action permissions and add conditional rules as concrete workflows required them. Faster implementation with AI did not remove the need to validate demand or limit complexity.',
  },
];

export const additionalWork: AdditionalWork[] = [
  { name: 'Veta', description: 'Extracts YouTube video and playlist transcripts and prepares prompts for an AI agent to turn them into timestamped learning notes.', tag: 'CLI · Developer tooling', url: 'https://github.com/cmglezpdev/veta' },
  { name: 'QR Generator', description: 'A free QR-code generator with configurable styles and no account required. Shared publicly, with feedback from people using it.', tag: 'Web tool · QR codes', url: 'https://qr-generator.linkseek.app/' },
  { name: 'AWS & Terraform lab', description: 'Hands-on AWS and Terraform exercises with deployment tests, architecture diagrams, and notes on service choices.', tag: 'Cloud · Learning projects', url: 'https://github.com/cmglezpdev/terraform-aws-lab' },
  // { name: 'System design lab', description: 'A URL-shortener experiment exploring load testing, caching, and PostgreSQL replication.', tag: 'Backend · Learning project', url: 'https://github.com/cmglezpdev/link-shortener-scalability-lab' },
  { name: 'Supabase contribution', description: 'Fixed permissions in the SQL example for the automatic embeddings guide.', tag: 'Documentation · Merged', url: 'https://github.com/supabase/supabase/pull/35600' },
];
