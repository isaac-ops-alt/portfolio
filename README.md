# Isa'ac Mvodo — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS. Every page is statically generated.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit the content

All content lives in `src/data/` — you rarely need to touch the components.

| File | What's in it |
|---|---|
| `src/data/site.ts` | Name, intro, **email, LinkedIn, GitHub**, domain, CV path |
| `src/data/work.ts` | Selected Work cards + full case studies (`/work/<slug>`) |
| `src/data/profile.ts` | Experience, education, tech stack, events, notes |

Before going live:

1. Add your email in `src/data/site.ts` (empty values are hidden on the site).
2. To update your CV, replace the PDF in `public/` (path set in `src/data/site.ts`).
3. Add case-study screenshots to `public/images/work/` and list them in each project's `evidence` array.
4. Rewrite each event `takeaway` in your own words.

## Motion

Motion is native CSS plus a few small client components — no animation library. It is driven by data attributes, so new content picks it up without touching the CSS (`src/app/globals.css`):

| Attribute | Effect |
|---|---|
| `data-reveal` | Fades and rises in when scrolled into view. `data-reveal="clip"` unmasks an image instead. Delay with `style={{ "--reveal-delay": "120ms" }}`. |
| `data-stagger` | Children of a revealed list cascade in; give each child `style={{ "--i": index }}`. |
| `<SplitWords text="…" />` | Inside a revealed heading, each word rises from behind its baseline. |
| `data-scramble` | Monospace text "decrypts" the first time it is seen. |
| `data-spotlight` + `spotlight-card` / `spotlight-grid` | A glow follows the cursor (mouse only). |
| `data-magnetic` | A call-to-action leans toward the cursor. |

Route changes use React's `<ViewTransition>`: a project's icon and title morph between its card and its case study, and pages slide forward or back. Everything respects `prefers-reduced-motion`, and the scroll-linked effects (parallax, timeline fill, reading progress) are progressive enhancements that only run where the browser supports scroll-driven animations.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). Then set your domain in `site.url`.
