# Ashish Gupta — Interactive Resume

Live site: https://agupta678.github.io/ashish-gupta-resume/

A single-page, interactive resume site built with plain HTML/CSS/JS (no build step, no frameworks). Includes:

- Animated hero with typing effect and gradient accents
- Scroll-triggered reveal animations and animated stat counters
- Filterable skills grid
- Timeline-style experience section
- Light/dark theme toggle (persisted via `localStorage`)
- Fully responsive layout

## Structure

- `index.html` — page markup/content
- `style.css` — design system + responsive layout
- `script.js` — interactions (theme toggle, reveal animations, counters, filters, nav)
- `assets/headshot.jpg` — profile photo
- `Ashish_Gupta_AI_PO_Resume.docx` — downloadable résumé

## Running locally

No build tools required — just serve the folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

Published via GitHub Pages from the `main` branch.
