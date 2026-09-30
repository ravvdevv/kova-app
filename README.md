# KOVA

<p align="center">
  <img src="assets/banner.webp" alt="KOVA: Free forever. Fully offline. Your data is yours." width="720">
</p>

<p align="center">
  <strong>A strength log built for the gym floor.</strong><br>
  No accounts. No ads. No tracking. No internet required.
</p>

---

KOVA is a **free strength training app for Android** built around one idea:

> **Your workout data should belong to you.**

Log your training, track your progress, build routines, and understand your strength without handing your workout history to a server.

KOVA is built with Flutter and is closed source. Android 7.0+ ships today, with iOS 15+ and Wear OS 3+ in development.

---

## Training

**Tap a muscle. Start training.**

Choose your focus from an interactive front-and-back body map. KOVA builds a session around it, then lets you adjust everything set by set.

* Reps, weight, RPE and RIR
* Warm-up, working, drop and failure sets
* Supersets
* Previous-set performance while training
* Plate calculation based on your available plates
* Rest timer with custom alarm sounds
* Rest alarms that work with the screen off
* Sessions that survive a device reboot
* Routines that can be grouped, reordered and scheduled
* Equipment-aware training through **Places**

Whether you're training at home, in a gym, or outside, KOVA only suggests exercises that match the equipment you actually have.

---

## Track Progress

**Your progress comes from your training, not vanity metrics.**

KOVA turns your logged sets into useful feedback:

* Training volume
* Weekly goals
* Training streaks
* Personal records
* GitHub-style activity heatmap
* Strength curves
* Estimated 1RM
* 30-day muscle distribution
* Bodyweight tracking
* 10 body measurements
* Progress photo timeline
* Muscle-map progress timeline
* Levels and 20 medals
* Shareable progress cards

Prefer not to take progress photos? Your training history can generate a **muscle-map timeline** instead.

---

## 500+ Exercises

A built-in exercise library with:

* 500+ exercises
* Animations
* Step-by-step instructions
* Muscle filters
* Equipment filters
* Difficulty filters
* Search
* Favourites
* Custom exercises
* Custom exercise photos, GIFs and videos

You can also keep a **training journal** with notes, photos and videos organized on a calendar.

---

## Built-in Tools

KOVA includes tools for the boring math humans apparently refuse to do themselves:

* 1RM calculator
* Plate calculator
* BMI calculator
* Calorie & macro calculator
* Body-fat calculator
* Warm-up calculator
* 5 home-screen widgets

---

## Your Data. Your Phone.

KOVA is designed to keep your data under your control.

### Import

Import your training history from:

* Hevy
* Strong
* Lyfta
* FitNotes
* openGym
* CSV

### Export

Export your data as:

* CSV
* Full ZIP backups
* Uploaded media included in backups

Backups can be imported back into KOVA.

You can also delete everything from the app with a single action.

---

## Privacy by Design

**KOVA does not need the internet to work.**

There are:

* No analytics SDKs
* No advertising SDKs
* No accounts
* No cloud requirement
* No tracking
* No network code

KOVA does **not request Android's `INTERNET` permission**.

Your training data stays on your device. There is no built-in mechanism for workout data to be uploaded to a remote server.

The ten permissions KOVA does request are all local, and nine of them exist so the rest timer and the live session behave correctly. The full list, with the reason for each, is on the privacy section of the project website.

---

## Screens

|                                                                                                                                         |                                                                                                            |                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="assets/screens/01-home.webp" alt="Home dashboard showing today's routine, weekly volume, sets, PRs and activity" width="190"> | <img src="assets/screens/03-train.webp" alt="Interactive front and back body map" width="190">             | <img src="assets/screens/04-session.webp" alt="Live training session with set table, previous performance and rest timer" width="190"> |
| **Today**                                                                                                                               | **Body Map**                                                                                               | **Live Session**                                                                                                                       |
| <img src="assets/screens/02-progress.webp" alt="Progress dashboard with volume, bodyweight, consistency and totals" width="190">        | <img src="assets/screens/05-history.webp" alt="Training history" width="190">                              | <img src="assets/screens/06-library.webp" alt="Exercise library with search and filters" width="190">                                  |
| **Progress**                                                                                                                            | **History**                                                                                                | **Exercise Library**                                                                                                                   |
| <img src="assets/screens/07-routines.webp" alt="Routines organized and scheduled by weekday" width="190">                               | <img src="assets/screens/09-notes.webp" alt="Training journal with notes, photos and video" width="190">   | <img src="assets/screens/10-places.webp" alt="Places configured for home, gym and park equipment" width="190">                         |
| **Routines**                                                                                                                            | **Journal**                                                                                                | **Places**                                                                                                                             |
| <img src="assets/screens/11-body.webp" alt="Muscle-map progress timeline" width="190">                                                  | <img src="assets/screens/12-profile.webp" alt="Profile showing levels, medals and share card" width="190"> | <img src="assets/screens/08-settings.webp" alt="Settings including units, themes, language, export and deletion" width="190">          |
| **Muscle Timeline**                                                                                                                     | **Profile**                                                                                                | **Settings**                                                                                                                           |

---

## Install

<p align="center">
  <img src="assets/store/01-hero.webp" alt="KOVA store card showing free forever, fully offline and your data is yours" width="230">
  <img src="assets/store/02-train.webp" alt="KOVA store card showing muscle-based training" width="230">
  <img src="assets/store/03-rest.webp" alt="KOVA store card showing automatic rest timer" width="230">
</p>

<p align="center">
  <img src="assets/store/04-progress.webp" alt="KOVA store card showing training progress" width="230">
  <img src="assets/store/05-library.webp" alt="KOVA store card showing 500+ exercises" width="230">
  <img src="assets/store/06-privacy.webp" alt="KOVA store card showing privacy and offline operation" width="230">
</p>

### Android

**Android 7.0+**

* **GitHub Releases:** https://github.com/ravvdevv/kova-app/releases

### Coming

* iOS 15+
* Wear OS 3+

There is no desktop build, and none is planned.

---

## Working on this site

```
node dev-server.cjs          # http://localhost:8080
node tests/check-claims.cjs  # verify the site's numbers against the screenshots
```

Both run on a bare Node install. No dependencies, no build step.

`dev-server.cjs` exists because Vercel resolves `/hevy-alternative` to
`hevy-alternative.html` (`cleanUrls` in `vercel.json`) and a plain static server
does not, which makes every internal link 404 in local preview while working
fine in production.

`tests/check-claims.cjs` fails when the site states a number the screenshots
contradict. Every number that shipped wrong on this page looked correct in the
markup and was only wrong relative to the phone image printed beside it, so a
reviewer reading HTML could not see it. The values it checks live in
`tests/facts.json` with the screenshot each came from; update both when you
re-capture a screen.

### Known app bug

`assets/screens/02-progress.webp` shows the label **"2 of 6 this week"** next to a
heatmap where all 84 cells are lit, including all 7 in the final week. The app is
miscounting the week. It is baked into the Flutter UI, so it cannot be fixed from
this repository, and the site itself states no competing figure. Fix it in the app
and re-capture the screenshot.

---

## Technical

KOVA is built with **Flutter**.

**Package:** `com.kova.app`

**Supported languages:** 16

**Units:** kg / lb

**Themes:** Light / Dark

---

## Credits

Special thanks to **InlitX**.

Exercise illustrations are provided by [Workout Guide](https://github.com/bryllim/workout-guide) by Bryl Lim, based on [Everkinetic](https://github.com/everkinetic/data), and are licensed under **CC BY-SA 4.0**.

KOVA uses **Nunito**, licensed under the [SIL Open Font License](assets/fonts/Nunito-OFL.txt).

---

## License

KOVA is closed source and free to use. It is not open source, and no source code is published.

The bundled artwork and fonts keep their own licences, listed under Credits above.
