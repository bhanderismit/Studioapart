# Studioapart — Resident App

A high-fidelity, fully interactive prototype of a **resident app for international
students in short-term university housing**. Built as a dependency-free
single-page HTML/React experience with a warm, editorial visual identity.

The demo follows **Lena Voss**, on day 47 of a 180-day winter-semester stay in
Studio 4B at Haslangstraße 12, Ingolstadt — a student at Technische Hochschule
Ingolstadt. All resident data is fictional.

> ⚠️ **Proprietary.** This is not open-source. The design and code are published
> for evaluation and portfolio purposes only. See **[Licensing](#-licensing)**.

---

## 🔗 Live demo

GitHub Pages serves `index.html` from the repository root:

**https://bhanderismit.github.io/Studiapart/**

> An internet connection is required — React, Babel, and the Lucide icon library
> load at runtime from public CDNs.

---

## ✨ Feature tour

| Screen | What it does |
| --- | --- |
| **Home** | Editorial day-counter, live building pulse, and an **Up Next** card that surfaces the single most important next action (RSVP'd event → booking → rent → suggestions). |
| **Ask Magda** | A live AI concierge (via `window.claude.complete`) that answers building & city questions in the building manager's voice. |
| **Rent** | Line-item breakdown, SEPA autopay, month-by-month payment history. |
| **Inbox** | Building announcements alongside the resident's own maintenance tickets; search opens on tap (keyboard never auto-triggers). |
| **Maintenance** | Report → track a ticket through *received → on it → sorted* with a live thread. |
| **Booking** | Facility map with live slot availability and current reservations. |
| **Stay** | Resident QR pass, documents, lease timeline, and preferences. |
| **Dark mode** | The entire experience carries through light and dark themes. |

Wrapped in an iOS-style device frame with a bottom tab bar and a central
quick-action button.

---

## 🗂 Repository structure

```
index.html                  → the app · GitHub Pages entry point (open this)
Studioapart-print.html      → paginated print / PDF version (one screen per page)
Studioapart-slides.html     → 1920×1080 landscape slide layout (for PPTX export)
colors_and_type.css         → design foundations: color + type tokens
LICENSE                     → proprietary license (all rights reserved)
.gitignore

src/
  ├─ ios-frame.jsx          → iOS device frame
  ├─ primitives.jsx         → shared UI: icons, app bar, tab bar, sheets,
  │                           Up Next card, AI concierge
  ├─ Home.jsx               → home dashboard
  ├─ Tabs.jsx               → Inbox, Booking, Stay screens
  ├─ Detail.jsx             → event / ticket detail screens
  ├─ Extras.jsx             → settings, passes, and other sheets
  ├─ Hub.jsx, Pages.jsx     → supporting screens
  ├─ tweaks-panel.jsx       → in-design tweak controls
  ├─ data.js                → mock data (resident, rent, events, facilities…)
  └─ styles.css             → application styles

assets/                     → logo marks (home glyph, light + on-navy)
fonts/                      → Inter & Plus Jakarta Sans (self-hosted) + OFL.txt
```

---

## ▶️ Running it locally

No build step, no `npm install`. All `.jsx` / `.js` is transpiled in the browser
by Babel Standalone. Because the app self-hosts fonts and loads scripts, serve
the folder over HTTP rather than opening the file directly:

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Any static server works (`npx serve`, VS Code Live Server, etc.).

---

## 🎨 Design system

- **Palette** — deep navy `#0e2233` + mustard orange `#ff7236` on warm paper
  `#f4f0ea`. A disciplined two-color system held throughout.
- **Type** — Plus Jakarta Sans for display/editorial moments, Inter for data and
  body. Small-caps eyebrows.
- **Logo** — a geometric **home** mark (pitched roof + doorway) reflecting
  *Studio + apartment*; light and on-navy variants live in `/assets`.
- **Tone** — editorial and warm. No gradient orbs, no glassmorphism — type,
  hierarchy, and color do the work.

Tokens are exposed as CSS custom properties (`--us-navy-*`, `--us-mustard-*`,
`--us-font-display`, …) in `colors_and_type.css`.

---

## 📤 Exports

- **PDF** — open `Studioapart-print.html` and print to PDF (each screen on its
  own page).
- **PPTX** — `Studioapart-slides.html` is a 1920×1080 presentation layout of the
  key screens.

---

## 🧱 Tech

Plain HTML · React 18 (UMD) · Babel Standalone · Lucide icons · vanilla CSS.
No bundler and nothing to install.

---

## 📄 Licensing

This project is **proprietary — all rights reserved**. It is **not** licensed for
reuse. You may view it in a browser for evaluation; you may **not** copy, fork,
modify, redistribute, or create derivative or "inspired-by" works from the code
or the design without prior written permission. Full terms are in
**[`LICENSE`](./LICENSE)**.

The bundled fonts are the exception: **Inter** and **Plus Jakarta Sans** remain
under the **SIL Open Font License 1.1** (see [`fonts/OFL.txt`](./fonts/OFL.txt)).
React, ReactDOM, Babel, and Lucide load from CDNs under their own MIT licenses.

© 2026 Smit Bhanderi. All rights reserved. "Studioapart", its logo, and its
visual identity are protected trade dress.
