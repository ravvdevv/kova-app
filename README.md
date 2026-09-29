# kova-landing

Static site for [kova.app](https://kova.app). Three HTML pages, two stylesheets, no framework,
no build step, no tracking, no third-party requests. Open `index.html` or serve the folder.

---

## What KOVA is

KOVA is a strength log for the gym floor. It is a Flutter app for Android (iOS in
development), published as `com.kova.app` under GPL-3.0, and it is free with no paid tier.

**Training.** Pick your focus on an interactive body map, front and back, and the session is
built around what you tapped, then edited set by set. Reps, weight, RPE or RIR, set types
(warm-up, working, drop set, to failure), supersets, plates per side worked out from the kit
you own, and a rest timer with your own alarm sound that fires with the screen off. A live
session survives a reboot. Routines can be grouped, reordered and scheduled per weekday, and
"places" only offers exercises that match the equipment at home, in the gym or in the park.

**Progress.** Volume, streak, weekly goal ring and personal records, a GitHub-style activity
heatmap, strength curves with estimated 1RM, a 30-day muscle split, a progress photo timeline
(or the same timeline drawn as a muscle map, for anyone who would rather not photograph
themselves), bodyweight plus ten body measurements, levels, 20 medals and a share card.

**Exercises and tools.** 500+ exercises with animation and step-by-step instructions, search
and filters by muscle, equipment and level, favourites and your own exercises, custom photo,
GIF or video art per exercise, a training journal on a calendar, six calculators (1RM, plates,
BMI, calories and macros, body fat, warm-up) and five home-screen widgets.

**Your data.** Export to CSV or a full ZIP backup with the media you uploaded, and import it
back. Import history from Hevy, Strong, Lyfta, FitNotes, openGym or any CSV. 16 languages,
light and dark themes, kg or lb, and a delete-everything button in one tap.

**Privacy, which is the whole point.** KOVA ships with no analytics, no advertising SDK and
no network code, so Android's `INTERNET` permission is never requested. There is no
mechanism for training data to leave the phone. The permissions it does ask for, and why, are
spelled out on the privacy section of the site and in the app.

---

## Screenshots

All twelve app screens, straight from the device, in `assets/screens/`. These are the page's
image-search surface, so `robots.txt` deliberately allows them.

| | | |
|---|---|---|
| ![Home](assets/screens/01-home.webp) | ![Body map](assets/screens/03-train.webp) | ![Live session](assets/screens/04-session.webp) |
| Today — routine, volume, PRs | Focus picker, front and back | Set table, rest timer |
| ![Progress](assets/screens/02-progress.webp) | ![History](assets/screens/05-history.webp) | ![Library](assets/screens/06-library.webp) |
| Volume, bodyweight, heatmap | Logged sessions by date | Search and filters |
| ![Routines](assets/screens/07-routines.webp) | ![Journal](assets/screens/09-notes.webp) | ![Places](assets/screens/10-places.webp) |
| Reorderable, schedulable | Calendar, notes, photos | Equipment per location |
| ![Muscle timeline](assets/screens/11-body.webp) | ![Profile](assets/screens/12-profile.webp) | ![Settings](assets/screens/08-settings.webp) |
| Progress without photos | Levels, medals, share card | Units, theme, export |

### Store listing

The six cards that ship with the release, in `assets/store/`. No stock photography, no
borrowed devices.

| | |
|---|---|
| ![Hero](assets/store/01-hero.webp) | ![Body map](assets/store/02-train.webp) |
| Free Forever, Fully offline, Yours | Tap the muscle, get the session |
| ![Rest timer](assets/store/03-rest.webp) | ![Progress](assets/store/04-progress.webp) |
| Tick the set, the timer rings itself | Progress read from your own sets |
| ![Library](assets/store/05-library.webp) | ![Privacy](assets/store/06-privacy.webp) |
| 500+ exercises, animated | No account, no internet, no smoke |

### Social card

`assets/banner.webp` (2048×1152, 89 KB) is the `og:image` and `twitter:image` on every page.
Keep its dimensions in sync with the `og:image:width`/`height` meta tags.

---

## Assets

Everything is self-hosted. Nothing is fetched from a CDN at runtime.

| Path | What it is | Size |
|---|---|---|
| `assets/banner.webp` | Social card, 2048×1152. `og:image` on every page. | 89 KB |
| `assets/icon.png` | App icon, opaque. Favicon and Apple touch icon. | 72 KB |
| `assets/logo.webp` | Wordmark and header mark, transparent. The one used in markup. | 13 KB |
| `assets/logo.png` | Same mark as PNG. Source only, not referenced by the pages. | 27 KB |
| `assets/screens/01…12-*.webp` | 12 app screenshots, 400×860 (progress is 352×760) | 37–66 KB each |
| `assets/store/01…06-*.webp` | 6 store listing cards, 1008×2048 to 1152×2352 | 66–89 KB each |
| `assets/fonts/Nunito-*.ttf` | Four weights: 400, 600, 800, 900 | 129 KB each |
| `assets/fonts/Nunito-OFL.txt` | SIL Open Font License, covers all four weights | 4 KB |

About 1.8 MB total, of which 521 KB is fonts. All raster imagery is WebP (q82), converted
from the PNG sources in the app repo.

**Attribution.** Exercise illustrations come from
[Workout Guide](https://github.com/bryllim/workout-guide) by Bryl Lim, based on
[Everkinetic](https://github.com/everkinetic/data), CC BY-SA 4.0 — credited in the page footer
and in `llms.txt`. Nunito is SIL OFL. The site code is GPL-3.0.

---

## Getting started

Nothing to install and nothing to build. Serve the folder:

```bash
npx serve .          # or: python -m http.server 8080
```

Then edit the HTML and reload. `styles.css` and `script.js` are the only two files the landing
page loads; open the browser console, not a bundler.

Deploy:

```bash
npx vercel deploy --prod
```

---

## Layout

```
index.html              the landing page
hevy-alternative.html   comparison page, Hevy-focused
strong-alternative.html comparison page, Strong-focused
article.css             prose, table and comparison styles; shared by both comparison pages
styles.css              design system: tokens, reset, nav, sections, print
script.js               reveal, counters, heatmap, rest timer, draggable rail
404.html                not-found page, noindex
llms.txt                plain-text summary for LLM crawlers
robots.txt              crawler instructions + sitemap pointer
sitemap.xml             the three kova.app URLs
vercel.json             headers + cache rules
```

The comparison pages load `styles.css` then `article.css`, and neither loads `script.js`.
Reveal animation is opt-in per class, so article pages simply don't opt in — no article content
can be left invisible if JavaScript fails.

---

## Contributing

Worth doing here: copy and content corrections, accessibility fixes, performance work, a new
comparison page for a competitor that isn't covered yet, translations, and honest corrections
to the comparison tables.

A few things to know before you open a PR:

- **A new page** means a new `.html` at the root, `styles.css` + `article.css` in the head,
  and a `<link rel="canonical">` using the clean path (see below). Add it to `sitemap.xml`,
  link it from `index.html`, and cross-link the other comparison pages.
- **New images** go in `assets/screens/` or `assets/store/`, WebP, with `width`/`height`
  attributes to avoid layout shift and descriptive `alt` text. Decorative images get `alt=""`.
- **Don't reach for a colour.** The site is monochrome by design; see House rules.
- **The comparison tables describe other people's apps.** Change those cells only from the
  developer's own site or store listing, and bump the stated read date in the page's source
  note. If a figure isn't published, the cell says "Not published" rather than guessing.

---

## SEO notes

Decisions that are load-bearing, so they don't get "tidied" away:

- `robots.txt` allows `/assets/` on purpose. The screenshots, store cards and `banner.webp`
  are the image search surface and the `og:image` source; a blanket `Disallow: /assets/` hides
  all of them. Only `/assets/fonts/` is skipped.
- `sitemap.xml` lists `kova.app` URLs only. A sitemap may not contain cross-host entries, and
  one entry causes the whole file to be rejected. The GitHub and F-Droid pages this site links
  out to stay in the page body.
- `vercel.json` sets `cleanUrls: true`, so `hevy-alternative.html` is served at
  `/hevy-alternative`. The sitemap and every internal link use the clean path, and cross-page
  links are absolute (`/styles.css`, `/#train`).
- The schema block is one `@graph` per page, not several loose scripts. The homepage declares
  `SoftwareApplication`, `SoftwareSourceCode`, `Person` and `FAQPage`; the comparison pages add
  `Article` and `BreadcrumbList`. **Keep every `FAQPage` question and answer in sync with the
  visible `<summary>` blocks** — a schema entry with no visible counterpart, or a visible
  question missing from the schema, is a manual-action risk.
- `operatingSystem` says `Android` only. iOS is in development and is described in prose, not
  asserted in structured data.
- `og:image:width`/`height` are `2048`/`1152`, the real dimensions of `banner.webp`.
- The `/fonts/(.*)` cache header was removed: fonts live under `/assets/fonts/` and were
  already covered by the `/assets/(.*)` rule.

### The comparison pages

They share `article.css` and the same table, sourced from the same places, and cross-link in
both directions. **Update a free-tier figure, price or exercise count in both, or they start
contradicting each other.**

Each one also names where KOVA is the wrong choice — `hevy-alternative.html` has a section
by that name, and `strong-alternative.html` leads with "Where Strong is better than everything
here" as its first `h2`. That is deliberate, and it is the reason these pages are worth linking
anywhere. A vendor-written comparison that never argues against itself is worthless to the
forums where this audience actually decides.

---

## House rules

- Dark only. The app is dark-first; there is no light theme here on purpose.
- Strictly black and white. No accent colour, no grey with a hue — every surface, border and
  muted tone is white at some alpha over pure black. The heatmap ramps through white opacity,
  and store badges are forced monochrome with `grayscale(1) invert(1)`.
- No analytics, no fonts from a CDN, no third-party requests. Self-host and keep it that way.
- Display type is Nunito 900 with tight tracking; the hero's last line is a tracked-out
  uppercase tag. Everything else is 400/600.
- Screenshots and store cards are WebP (q82) converted with ffmpeg from `docs/screenshots` in
  the app repo; the PNG sources stay untouched there.
