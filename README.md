# kova-landing

Static landing page for KOVA, the offline gym log. The app source is private, so nothing here
links to it: this repository is the public face and the distribution point. The release with
the signed APK lives here too, which is what every download button on the site points at.

No framework, no build step, no analytics, no fonts from a CDN, no third-party requests. Open
`index.html` or serve the folder.

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

## Pages

| URL | File | What it is |
|---|---|---|
| `/` | `index.html` | The landing page: hook, four feature sections, privacy proof, screen rail, store listing, FAQ |
| `/hevy-alternative/` | `hevy-alternative.html` | How KOVA compares to Hevy, no account needed |
| `/strong-alternative/` | `strong-alternative.html` | The same comparison against Strong |

`vercel.json` sets `cleanUrls: true`, so those pages are served without `.html`. Link to the
clean form.

## Layout

```
index.html               the page
styles.css               one stylesheet, dark only
article.css              prose, table and comparison styles for the two comparison pages
script.js                scroll reveal, nav state, progress line, counting stats,
                         consistency heatmap, and the screenshot rail (drag, arrow keys,
                         prev/next buttons, live position counter)
404.html                 not-found page
llms.txt                 plain-text summary for LLM crawlers
robots.txt               sitemap pointer
sitemap.xml              canonical URLs
vercel.json              headers + cache rules
assets/
  screens/               12 app screenshots (from the app repo's docs/screenshots/mock)
  store/                 6 store listing cards (from docs/screenshots/store/en)
  fonts/                 Nunito (SIL OFL, see Nunito-OFL.txt)
  logo.png / logo.webp   the K gem, keyed to a transparent background
  icon.png               app icon, opaque, used as the favicon
  banner.webp            social card and the hero banner
```

## SEO notes

Decisions that are load-bearing, so they don't get "tidied" away:

- `robots.txt` allows `/assets/` on purpose. The screenshots, store cards and `banner.webp`
  are the page's image search surface and the `og:image` source; a blanket
  `Disallow: /assets/` hides all of them from crawlers. Only `/assets/fonts/` is skipped.
- `sitemap.xml` lists `kova.app` URLs only. A sitemap may not contain cross-host entries, one
  does and the whole file is rejected, so the GitHub release and store pages stay in the page
  body as outbound links.
- The `<title>` carries the category ("Free Offline Gym Log. No Internet Permission."). The
  hero hook ("No account. No cloud. Just lifts.") is deliberately short and carries no
  category, so the page and the search snippet say complementary things.
- `og:image:width`/`height` are `2048`/`1152`, the real dimensions of `banner.webp`.
- The schema block is one `@graph`, not several loose scripts. It declares
  `SoftwareApplication`, `SoftwareSourceCode`, `Person` and `FAQPage`. Keep the FAQ
  `Question`/`Answer` text in sync with the visible `<details>`, or drop them.
- `operatingSystem` says `Android` only. iOS is in development and is described in prose, not
  asserted in structured data.
- There is no `#get` section and no sticky download bar. The download lives in the hero and in
  the footer, and both point at the releases of this repository.
- The two comparison pages share `article.css` and one table, and they cross-link in both
  directions. **If you update a free-tier figure, price or exercise count, update both** or
  they start contradicting each other, which is the fastest way to lose a reader's trust.

## Source of truth

Screenshots, store cards, fonts and the feature copy come from the app repository, which is
private; the store description is `fastlane/metadata/android/en-US/full_description.txt` in
there. When the app changes, re-copy the assets into `assets/` rather than editing them here.
Screenshots and store cards are WebP (q82) converted with ffmpeg; the PNG sources stay
untouched in the app repository.

## Commands

```bash
# local preview
npx serve .              # or: python -m http.server 8080

# deploy
npx vercel deploy --prod

# cut a site release
git tag v1.0.1 && git push --tags origin
gh release create v1.0.1 --title "v1.0.1" --generate-notes
```

## House rules

- Dark only. The app is dark-first; there is no light theme here on purpose.
- Strictly black and white. No accent colour, no grey with a hue: every surface, border and
  muted tone is white at some alpha over pure black. The heatmap ramps through white opacity,
  and the store badges are forced monochrome with `grayscale(1) invert(1)`.
- Display type is Nunito 900 with tight tracking, set uppercase in the hero hook with the last
  line scaled up. The sub-line is sentence case, the small label is uppercase with wide
  tracking. Everything else is 400/600.
- No analytics, no fonts from a CDN, no third-party requests. Self-host and keep it that way.
- No em dashes in user-facing copy. If a sentence needs a break, use a full stop.
- Never link the private app repository from anything in here.
