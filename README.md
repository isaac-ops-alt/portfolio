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

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). Then set your domain in `site.url`.
