# Dr. Samir Ghoraba — website

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Yarn.
Animation: `motion` (scroll reveals, layout transitions), `lenis` (smooth scroll), `embla-carousel` (testimonials).

## Run

```bash
yarn install
yarn dev            # http://localhost:3000
yarn build && yarn start
```

## Deploy (Vercel)

Import the GitHub repo in Vercel — it detects Next.js and Yarn, no extra config needed.
Under **Settings → Environment Variables** add `INQUIRY_WEBHOOK_URL` (see below), then redeploy.

## Where things live

| What                                                  | Where                      |
| ----------------------------------------------------- | -------------------------- |
| All homepage copy, links, phone numbers, testimonials | `src/data/site.ts`         |
| Sections (hero, results, services, …)                 | `src/components/sections/` |
| Header, menu, footer, floating buttons                | `src/components/layout/`   |
| Shared UI (glass button, carousel, reveals)           | `src/components/ui/`       |
| Images & video                                        | `public/media/`            |
| Colours, glass styles, form controls                  | `src/app/globals.css`      |

## Before going live

- **Display font.** The old site served a Fontspring _demo_ build of "quichesans",
  which is not licensed for production, so it is not included. Headings currently
  use Marcellus. After buying a webfont licence, put the file at
  `public/fonts/quichesans-regular.woff2` and uncomment the `@font-face` block at the
  top of `src/app/globals.css`.
- **Contact forms.** Set `INQUIRY_WEBHOOK_URL` (see `.env.example`) to any endpoint that
  accepts a JSON POST (Zapier/Make, Formspree, CRM, email function). Without it the
  forms show a "please call / WhatsApp us" message instead of a false success.
- **Hero video.** `public/media/video/` holds compressed copies (13 MB / 5.5 MB) of a
  video the old site loaded from `land-clinic.com`. Confirm the practice owns it.
- **Inner pages.** Links to About, Gallery, Patient services, For Surgeons, Blogs, FAQs,
  Request a Consultation, the blog posts and the `/ar/ /fr/ /es/ /zh-hans/` language
  versions keep the old URLs but those pages are not built yet (they 404). Those links
  have `prefetch={false}` so Next.js doesn't re-request the missing pages on every
  scroll — remove it once a page exists to get instant navigation back.

## Performance notes

- Judge speed with `yarn build && yarn start`, not `yarn dev` — dev mode runs React's
  slower development build and is noticeably laggier.
- Looping effects pause while off screen: the hero video, the celebrity photo track,
  the logo strip and the map pins (`PauseOffscreen`, `useInView`). They resume before
  they scroll back into view.
- Glass blur: the `glass-light` / `glass-dark` utilities currently render the blur only
  in Safari. The CSS build keeps just the `-webkit-` line of the pair, which Chrome,
  Edge and Firefox ignore. To blur everywhere, delete the two
  `-webkit-backdrop-filter` lines in `globals.css` (the build re-adds the prefix for
  Safari). Expect a GPU cost on scroll, especially on phones.

Easy lemon squizy
