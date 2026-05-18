// noCode Human — the free template directory.
//
// Every item is a free vibe-coded resource. Each `url` is a Polar free-checkout
// link (delivers the file + captures the email) — or, for finished apps, the
// app's own page.
//
// RACHEL: replace draft seed items with real ones. For each:
//   - set `url` to its Polar checkout link
//   - remove `draft: true`
//   - set `live: true`
// Mark exactly ONE item `featured: true` — that's "this week's free drop".

export type ItemType =
  | 'App'
  | 'App template'
  | 'Website template'
  | 'Tool'
  | 'Pack';

export type Item = {
  id: string;
  name: string;
  type: ItemType;
  tag: string;        // one line — what it is
  code: string;       // NCH catalog code
  accent: string;     // card accent
  url: string;        // Polar free-checkout link, or app page. '#' until ready
  live?: boolean;     // real, has a working url
  featured?: boolean; // this week's free drop — exactly one
  weekOf?: string;    // featured only, e.g. 'Week of May 18, 2026'
  desc?: string;      // featured only — longer blurb
  draft?: boolean;    // placeholder seed — replace before launch
};

export const items: Item[] = [
  // ---- THIS WEEK'S FREE DROP (featured) ----
  {
    id: 'drop',
    name: 'Indie SaaS Starter',
    type: 'App template',
    tag: 'A full SaaS skeleton — auth, billing, dashboard — ready to fork.',
    desc: 'Stop rebuilding the same boilerplate. Auth, Stripe billing, a dashboard shell and a clean component set — all wired up, all yours to rip apart.',
    code: 'NCH-021',
    accent: '#b6f24a',
    url: '#',
    weekOf: 'Week of May 18, 2026',
    featured: true,
    draft: true,
  },

  // ---- APPS (real, finished) ----
  { id: 'taptally',  name: 'Tap Tally',  type: 'App', tag: 'Pocket multi-counter for anything worth counting', code: 'NCH-001', accent: '#d8b98c', url: '/taptallypro', live: true },
  { id: 'maxxtoken', name: 'MaxxToken',  type: 'App', tag: 'AI token usage tracker for your Mac',             code: 'NCH-002', accent: '#8fd14a', url: '/maxxtoken',  live: true },

  // ---- DRAFT SEED — replace with real free resources ----
  { id: 'd03', name: 'Landing Page Kit',     type: 'App template',     tag: 'Hero, pricing, FAQ — a launch page in minutes',   code: 'NCH-003', accent: '#7cc6ff', url: '#', draft: true },
  { id: 'd04', name: 'Dashboard Starter',    type: 'App template',     tag: 'Sidebar, charts, tables — an admin shell',        code: 'NCH-004', accent: '#ff9f6b', url: '#', draft: true },
  { id: 'd05', name: 'Waitlist Page',        type: 'App template',     tag: 'Email capture page wired to a database',          code: 'NCH-005', accent: '#e7a64d', url: '#', draft: true },
  { id: 'd06', name: 'Portfolio Template',   type: 'Website template', tag: 'A clean one-page portfolio for builders',         code: 'NCH-006', accent: '#c8a9ff', url: '#', draft: true },
  { id: 'd07', name: 'Docs Site Template',   type: 'Website template', tag: 'Searchable docs with a sidebar nav',              code: 'NCH-007', accent: '#9be39b', url: '#', draft: true },
  { id: 'd08', name: 'Link-in-bio Template', type: 'Website template', tag: 'A personal links page you can theme fast',        code: 'NCH-008', accent: '#ff8fb1', url: '#', draft: true },
  { id: 'd09', name: 'Favicon Maker',        type: 'Tool',             tag: 'Generate every favicon size from one image',     code: 'NCH-009', accent: '#ffd166', url: '#', draft: true },
  { id: 'd10', name: 'Palette Generator',    type: 'Tool',             tag: 'Build accessible color palettes in seconds',     code: 'NCH-010', accent: '#86e6b0', url: '#', draft: true },
  { id: 'd11', name: 'Meta Tag Builder',     type: 'Tool',             tag: 'Open Graph + SEO tags, copy-paste ready',         code: 'NCH-011', accent: '#a9d6ff', url: '#', draft: true },
  { id: 'd12', name: 'Claude Skill Pack',    type: 'Pack',             tag: 'A starter set of Claude skills for builders',     code: 'NCH-012', accent: '#c6f24a', url: '#', draft: true },
  { id: 'd13', name: 'Marketing Prompts',    type: 'Pack',             tag: '40 prompts for landing copy, ads and emails',     code: 'NCH-013', accent: '#ffb37a', url: '#', draft: true },
  { id: 'd14', name: 'UI Asset Pack',        type: 'Pack',             tag: 'Icons, gradients and noise textures',             code: 'NCH-014', accent: '#b8a9ff', url: '#', draft: true },
  { id: 'd15', name: 'Prompt Pack: Dev',     type: 'Pack',             tag: 'Debugging and refactor prompts that work',        code: 'NCH-015', accent: '#7ce0d6', url: '#', draft: true },
];
