# Vysus Group homepage (private prospect demo)

One page: the vysusgroup.com homepage in a new skin. Look and motion after reckoner.com. Their logo, their font
(Suisse Int'l), their film and photographs, their copy, in their four brand colours.

## Run locally

`npm install`, then `npm run dev` (http://127.0.0.1:3040). `npm run build` and `npm start` for production.
`npm run typecheck` checks TypeScript. `npm run media` re-downloads and re-encodes every asset from the live site
(needs curl, ffmpeg, cwebp). `npm run links` checks every link on the running page against the live sitemap.

## The route

| Route | What it is |
| --- | --- |
| `/` | The homepage. The build also emits Next's own `/_not-found` and the generated `/icon.svg` (3 static outputs, 2 pages). |

There are no archive or detail pages. Every card, "more" and menu link points at its real URL on vysusgroup.com and
carries `target="_blank" rel="noopener"`.

## Page structure and content counts

| # | Section | Live homepage | This build | Notes |
| --- | --- | --- | --- | --- |
| 1 | Hero | statement + film | statement + film | live header film, bar field over it |
| 1 | Stats (in the hero's bottom bar) | 2 | 2 | 70GW, 2 million; count up on entry |
| 2 | Our Services | 7 + 1 photo | 7 + 1 photo | |
| 3 | Case studies | 1 banner + CTA + photo | statement + CTA + 4 case studies | client feedback: showcase real case studies instead of a banner. The four most recent from the live listing, with their own images, dates and categories |
| 4 | Who we are | statement + 4 links | statement + 4 links + film still | editorial split (client feedback: the boxed icon tiles felt dated) |
| 5 | News and insights | Announcement (1) + Featured (2) | 3 in one row | two live blocks merged; "More News" kept |
| 6 | Subscribe | 1 + CTA + photo | same | |
| 6 | Careers | (nav link only) | statement, 20+ Locations, 3 values, 2 CTAs, brand film | added on client request (6 Oct 2026): the visual call to action, content from careers.vysusgroup.com |
| 7 | Footer CTA + footer | 1 CTA, 4 socials, 7 links | same | the CTA ("Send us a message") joins the footer |

Nothing on the live homepage was cut. Two pairs were merged because they repeat a pattern: the stats band moved
into the hero's bottom bar (Reckoner puts its supporting copy there), and the two news blocks share one row.

The announcement's only image on the live site is a 350px portrait (Thomas Aas Saethre), so it is shown at its own
size on a Mist ground rather than stretched. The live "Power, Renewables & Transition" mega-menu heading has no page
(it links to `/#`), so in the menu it is a plain heading.

## Page height

| Width | Height | Viewports |
| --- | --- | --- |
| 1440 × 900 | 5,648px | 6.3 |
| 768 × 1024 | 6,929px | 6.8 |
| 375 × 812 | 6,263px | 7.7 |

The live homepage is 7,611px at 1440. The target was 6 to 8 viewports; with the careers panel it now sits inside that
range at every width. On phones the four
case studies are a swipeable strip, so they add one card's height, not four. Section padding is
`--space-section` (56 to 96px).

## Recon note (Phase 1, 4 Oct 2026)

All values below were read from the live pages with the browser tools (DOM, computed styles, `/dist/bundle.css?v1.4`, Reckoner's `style.css`, `main.js` and `front_page.js`).

### Live homepage: sections and item counts

| # | Live section | Items | Notes |
| --- | --- | --- | --- |
| 1 | Hero | 1 statement, 1 film | "We help our clients to optimise project development and asset performance. Solving challenges, managing risk and maximising returns" on a 75% Malmo Green panel over `/assets/engineering-1080.webm` (720 variant for ≤1280px) |
| 2 | Stats | 2 | 70GW (Survey & GeoEngineering, offshore wind), 2 million (asset assessments). Oslo Neon band |
| 3 | Our Services | 7 links + 1 photo | Asset Management; Energy transition and sustainability consulting services; HAZOP Assistant; Human factors (HF) and working environment; Nuclear; Risk Management; Survey & GeoEngineering. Photo: oil rig close-up |
| 4 | Case studies | 1 statement, 1 CTA, 1 photo | "Search and browse examples of our expertise delivering results" → /news-and-insights/case-studies |
| 5 | Who we are | 1 statement, 4 links | Naturally progressive... About us, Who we are, History, Mission and values. Malmo Green band |
| 6 | Subscribe | 1 statement, 1 CTA, 1 photo | "Technical papers, industry insights and latest news delivered to your inbox" → /subscribe |
| 7 | Announcement | 1 news card | Sale of Australia-based Grid and Power Systems business to Rennie Advisory, 11.08.2026 |
| 8 | Featured | 2 articles | Less Is More: Preventing Information Overload Through Human-Centred Design (13.03.2026); When Evidence Hides in Plain Sight (26.02.2026) |
| 9 | Footer CTA | 1 | "Send us a message. Have a question or need advice? Talk to one of our subject matter experts." → /contact |
| 10 | Footer | 4 socials, 7 links | LinkedIn, X/Twitter, YouTube, Instagram; About, Contact, Privacy notice, Cookies policy, Terms of use, Modern Slavery Policy Statement, Supplier Code of Conduct; "Copyright © Vysus Group 2026" |

Live page height at 1440: 7,611px. All 39 unique homepage destinations were checked against the 482 URLs in the sitemap index (`/sitemaps-1-sitemap.xml`, 10 child maps): every one resolves (careers lives on `careers.vysusgroup.com`).

### Brand

- **Logo:** a true vector exists in the page's sprite (`#sprite-icon-logo-original`, viewBox 812.1 × 117.9). Two parts:
  - **Mark** (Oslo Neon `#00E3A9`): two shapes, a slanted parallelogram stroke (the "V") and a half-circle "leaf" (`M83.4 59c-15.8 0-28.7-12.8-28.7-28.7 0-15.8 12.8-28.7 28.7-28.7V59z`).
  - **Wordmark** "Vysus Group" (Malmo Green `#005454`): one compound path, splittable into 10 letters.
  - Mono variants: `#sprite-icon-logo` (mark only, 22 × 24) and `#sprite-icon-logo-large` (200 × 29, `.logo-mark` class on the mark). Light (white) variant is the same paths filled white (the live site's `.mobile-white` class).
- **Favicon:** the mark, from the sprite.
- **Brand film:** `/assets/engineering-1080.webm` and `-720.webm` (offshore wind, refinery and plant footage). No poster on the live site, so a poster frame will be cut locally.
- **Fonts:** Suisse Int'l (Swiss Typefaces), self-hosted by the live site as separate families: Light (body), Regular (headings), Bold, plus italics (`/dist/*.woff2`).
- **Section icons:** line icons in the sprite (services, study, insights, globe, stats, sectors, news) in the live site's own style.

### Palette (confirmed 4 Oct 2026)

Named in the live stylesheet as `theme-*-color-*`:

| Token | Hex | Where it comes from |
| --- | --- | --- |
| Malmo Green | `#005454` | `.theme-background-color-malmo-green`: header, footer, dark buttons, wordmark |
| Oslo Neon | `#00E3A9` | `.theme-background-color-olso-neon`: the logo mark, stats band, footer CTA, selection |
| Ink | `#1D1D1B` | `.theme-color-black`: body text |
| Mist | `#EAEFF2` | computed light panel colour on the homepage (234, 239, 242) |

Plus white. The plum `#450E35` and navy `#05275E` in the CSS belong to other templates (SGC Power Engineering) and are left out.

### Real site structure

- **Primary nav:** Sectors (mega), Careers (careers.vysusgroup.com), HSEQ (/sustainability), News and Insights, About (mega), Get in touch (/contact), Search.
- **Sectors mega menu:** Infrastructure & Process Industries (Downstream Refining & Processing, Marine, Midstream Transmission, Petrochemicals, Pharmaceuticals); Power, renewables and transition (HAZOP Assistant, Energy transition and sustainability, Hydrogen and ammonia, Nuclear, Submarine cables); Upstream Oil & Gas (Decommissioning, Facilities, Asset Management).
- **Services:** the seven homepage links above.
- **About:** Who we are, History, Mission and values, Our global reach, Board of Directors, Senior Leadership Team, Career testimonials.
- **Footer groups:** About / Contact; legal (5 links); socials: linkedin.com/company/vysus-group, twitter.com/vysusgroup, YouTube channel UCyj64CFB-746TSejTTM4C0Q, instagram.com/vysus_group.

### Reference: reckoner.com (look and motion)

- **Hero:** full-screen dark field (Merlot `#3B1515`), a generative SVG bar chart behind it whose bars swell toward the cursor (maxDistance 200px, scaleY 1 to 1.05, fill-opacity 0.1 to 0.3, lerp 0.1), each column group bobbing y ±16px (4s `power1.inOut`, stagger amount 6, yoyo). Paths fade in on load (1.25s, stagger 0.01, `power1.out`). Headline Geist 110px / 400 / line-height 1 / -0.03em, bottom row: short copy left, two square buttons right.
- **Type scale (1440):** h1 display 110px (`--fsh1_display: 6.875em` on a 16px base), h2 statement 32px / 1.1 / -0.02em, h3 22px / 1.2 / -0.02em, body 14 to 16px. Base is `1.111vw`.
- **Rhythm:** sections 140px top padding, site padding 50px; mobile 80px / 20px. (The brief caps this at 96px, so the scale will be compressed.)
- **Components:** square buttons (no radius) with `background-color, border-color, color 0.5s ease`; label with a small square glyph; bordered cards (1px Sand) whose background shifts to Ivory on hover while the inner button turns Merlot and the card's line icon starts animating; nav as a frosted segmented pill, siblings dim to 0.4 on hover (0.5s `power1.out`).
- **Motion:** plain `new Lenis()` on the GSAP ticker with `lagSmoothing(0)`; reveals are opacity 0 → 1 with y 0.25rem → 0, 0.85s `power3.out`, triggered at `5% bottom`; card groups stagger 0.1 from y 1.5em. No continuous background recolour: the hero is dark, the rest is light, so no blended backdrop is needed (the header still reads the colour behind it).

## How it works

- **Content** (`lib/content.ts`): every string and URL, verbatim from the live site. `lib/logo.ts` and
  `lib/sprite.ts` are generated by `scripts/logo.mjs` from the live SVG sprite.
- **Scenes:** sections declare `data-scene="dark|light"`. Reckoner does not recolour continuously (its dark hero
  cuts to a light page), so there is no blended backdrop. Each section carries its own ground: Malmo Green for the
  hero, Who we are and the footer; white and Mist for the rest. The header reads the scene under it every frame and
  cross-fades its colours with Reckoner's 0.5s `ease`.
- **Smooth scroll** (`components/Motion.tsx`, `lib/scroll.ts`): `new Lenis()` with its defaults (as Reckoner), on the
  GSAP ticker, `lagSmoothing(0)`, synced with ScrollTrigger. Anchor links go through Lenis. The preloader and menu
  stop it.
- **Link guard** (Motion): a capture-phase click and auxclick handler stops every non-`#` link from leaving the page
  (demo rule). The hrefs stay real, so the link check still verifies them.
- **Easing:** four curves, defined once as CSS variables in `app/globals.css` and read into GSAP CustomEases by
  `lib/ease.ts`: `--ease-out` (power3.out), `--ease-soft` (power1.out), `--ease-sway` (power1.inOut), `--ease-menu`
  (power2.out). Buttons and hovers use Reckoner's `0.5s ease`.

### Reveal vocabulary

All moves play once, use `power3.out` at Reckoner's 0.85s, and run at 0.75× inside `[data-late]` (News, Subscribe,
footer).

| `data-reveal` | Used on | Move |
| --- | --- | --- |
| `head` | statements | the whole phrase fades and rises 0.5em |
| `text` | paragraphs | words rise out of a mask, 0.006s apart |
| `label` | labels, buttons | fade and rise 0.25rem (Reckoner's `data-reveal="text"`) |
| `cards` | service rows, case studies, Who-we-are links, news cards | batched, rise 1.5em, 0.1s apart (Reckoner's `.about_blocks`) |
| `image` | photographs | clip opens from the bottom over 1.2s; the `<img data-parallax>` drifts ±5% (10% travel) |

Per-character work (the hero headline's word mask with a tighter stagger, the count-up) lives only in the hero.

### Preloader (`components/Preloader.tsx`)

The Vysus mark is two shapes, a slanted stroke and a half-leaf, beside a one-piece wordmark. So the build follows
how the logo reads: the stroke rises from its foot, the leaf grows out of its flat edge, then the wordmark wipes on
left to right. After a hold, the lock-up glides into the header logo position while the Malmo curtain (the hero's
opening colour) fades. One timeline, 1.8s: build 0.10 to 1.15, hold to 1.30, exit 1.30 to 1.80. Handover fires at
1.30: `is-loading` comes off `<html>`, `data-intro="done"` is set, Lenis starts and `intro:done` is dispatched. The
hero's entrance (film fade, headline words, bottom bar, count-up), the header and the bar field all wait for it.

It plays once per tab session (`sessionStorage["vysus-intro"]`). It is skipped with reduced motion, hidden by
`<noscript>`, and finished by a 2.6s failsafe if the tab is throttled. It never waits for assets.

Measured (headless Chrome, 1440): the handover lands 1.47s after navigation starts and the preloader is gone by 1.9s.
The curtain and hero are both `rgb(0, 84, 84)`. A wheel event during the build leaves `scrollY` at 0.

### The copied interaction: Reckoner's hero bar field (`components/BarField.tsx`, `lib/bars.ts`)

Rebuilt from `front_page.js` and the `.home_bg` markup and CSS:

- 103 stepped "spindle" bars on a 1440 × 810 viewBox, 23.45 units apart, on a 67-unit row grid, in pairs climbing a
  diagonal (generated from a fixed seed, since Reckoner ships them as static paths)
- the load fade: opacity 0 to 1, 1.25s, stagger 0.01, power1.out
- the cursor: per frame, each bar lerps (0.1) toward scaleY 1.05 at the cursor's x, falling off linearly to 1 at
  200px, with fill-opacity 0.1 to 0.3; it scales about the SVG centre (`transform-box: view-box`); off at ≤992px
- the drift: each column group yoyos y -16 to 16, 4s power1.inOut, staggered across 6s, repeating

Verified side by side: with the cursor at x=720, fill-opacity reads 0.28 on the nearest bar and falls through
0.25, 0.18, 0.11 to 0.10 at 200px out, matching Reckoner's formula. Palette swap: Linen bars on Merlot become Oslo
Neon on Malmo Green. Unlike Reckoner, the loop pauses while the hero is off screen.

### Hero

The live header film (`/assets/engineering-1080.webm`, 22s), re-encoded to H.264 (1440 and 960 wide, chosen by
`<source media>`), muted, looping, with a pause control in the bottom bar. It pauses off screen and stays paused
under reduced motion. The local poster is cut from its first frame. A Malmo gradient deepens toward the type for
legibility; it is not a tint.

### Header and menu

There is no bar or box: the lock-up, the live primary links (sibling dim to 40%, 0.5s power1.out, desktop only),
"Get in touch" and the Menu toggle. The header hides on scroll down and returns on scroll up. The menu is
full-screen Malmo with the live mega menus (Sectors with its three groups, Services, About), "On this page" and
"More". It uses Reckoner's mobile-menu timeline: the panel fades 0.5s, then items rise 0.5em, 0.25s each, spread
over 0.25s. The same timeline reverses out. Focus is trapped inside, Esc closes the menu and focus returns to the
toggle (checked with the keyboard only).

### Components after Reckoner

- `.btn`: square buttons with 14px labels and 0.5s colour transitions. Solid is Neon, turning Malmo on hover. Glass
  has a white/15% outline and tint is white/10%; both fill white on hover.
- Section labels: Reckoner's `.brow` type (uppercase, letter-spaced), as plain text. The glowing square glyph was
  removed after client feedback (5 Oct 2026).
- Service rows: `.str_block`, a 1px rule with a Mist hover, where the Neon square turns Malmo.
- News: `.ins_block`, with a left rule and an underline that retracts on hover.
- Footer: two halves split by a 1px rule.

## Typography

Suisse Int'l, self-hosted from the live site's own files: Light for body, Regular for headings, labels and buttons.
Bold is loaded but unused. Statements are 32px / 1.1 / -0.02em, item titles 22px / 1.2 / -0.02em, labels and
buttons 14px, all from Reckoner's scale. The hero is 56px: Reckoner's 110px display is for four words, and the Vysus
statement has 22.

## Palette

Malmo Green `#005454`, Oslo Neon `#00E3A9`, Ink `#1D1D1B`, Mist `#EAEFF2`, plus white. Rules, glows, focus rings and
overlays use only these, sometimes at an alpha.

## Private demo settings

- `robots` is `noindex, nofollow` in `app/layout.tsx`. There is no sitemap.
- PostHog (EU) and the 25/50/75/100 `scroll_depth` events are in `lib/posthog.ts` and injected in `<head>`. The key
  can be overridden with `NEXT_PUBLIC_POSTHOG_KEY`. Surveys are disabled, so no visible UI is added.
- No em or en dashes anywhere in the rendered page (checked on the built HTML).

## Images

All from vysusgroup.com, downloaded by `scripts/media.sh` at the largest size the live srcset offers:

| File | Live source |
| --- | --- |
| hero film and poster | `/assets/engineering-1080.webm`, `-720.webm` |
| `services.webp` | homepage services photo (oil rig close up) |
| `case-*.webp` | the four most recent case studies' listing images (/news-and-insights/case-studies) |
| `who.webp` | a still from the hero film at 16s |
| `careers.mp4`, `careers-poster.jpg` | the careers site's header film (`/assets/header-v3.mp4`, 48s, the brand chevrons) |
| `subscribe.webp` | homepage subscribe photo (inbox on a phone) |
| `news-*.webp` | the three homepage news images |
| `public/brand/*.svg`, `app/icon.svg` | the vector logo in the homepage's SVG sprite |

Photography is shown in natural colour at 85% saturation, with no duotone.

## Feedback round 1 (5 Oct 2026)

- "Don't like this square thing": the glowing square beside every section label is gone, as are the small squares
  in the news meta. Labels are plain uppercase text.
- "Could you showcase some of the case studies rather than it be a banner?": Case studies now shows the four most
  recent live case studies as photo-led cards (date, category, title, the live summary line), with "Our case
  studies" beside the statement. Four columns at desktop, 2 × 2 on tablet, a swipeable strip on phones.
- "This feels very dated" (the Who-we-are tiles): rebuilt as an editorial split. The statement and the four links
  are a clean hairline list on the left, and a still from the Vysus film is on the right. The tiles and line icons
  were removed (and `scripts/logo.mjs` no longer extracts the sprite icons).

## Feedback round 2 (6 Oct 2026)

"Could we add a careers section similar to one of the approved templates... make the call to action slightly more
visual... the box can expand or decrease as we get to that point."

- New Careers section (`components/home/Careers.tsx`) between News and Subscribe. It is one large panel playing the
  careers site's own film (Malmo chevrons sweeping in Oslo Neon), with the copy on its dark left half: "Our global
  reach enables Vysus Group to offer opportunities across the world.", 20+ Locations, the three values (Trust,
  Partnership, Passion), and "View Vacancies" plus "Career testimonials".
- The box expands on approach: `data-grow`, the scrubbed move from the approved Voltwise build. The panel scales
  from 92% to 100% while its top travels from the bottom of the screen to 30% down (measured 0.926 → 0.966 → 1).
  It is skipped under reduced motion.
- The film is muted, loops, starts only when the panel is in view, pauses off screen and under reduced motion, and
  has its own pause button.
- The header probe now takes the innermost scene, so the dark panel inside the white section is read correctly.

## Verification (4 Oct 2026, re-run 6 Oct 2026)

- `npm run typecheck` and `npm run build` pass. Static outputs: `/`, `/_not-found`, `/icon.svg`.
- Headless Chrome at 375, 768 and 1440: no horizontal scroll, no console errors, no broken images, every reveal
  target visible after scrolling. The same holds with reduced motion, where there is no Lenis and no preloader, all
  content shows and the film stays paused.
- `npm run links`: 52 unique destinations, all 200 and all in the live sitemap (careers is its own subdomain). Every
  outbound link has new-tab and noopener set, and every `#` link has a target.

