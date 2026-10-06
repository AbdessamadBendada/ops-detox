# OPS DETOX™ — working website design

A navigable, interactive version of the high-fidelity homepage design, extended to
the full page set. This is a **working design**, not a production build: there is no
backend, no CMS and no analytics. Every form validates and responds in the browser,
but nothing is sent anywhere.

## Run it

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit <http://localhost:8000>. Everything is relative-path and self-contained —
no build step, no dependencies, no CDN.

## Pages

| File | Page |
|---|---|
| `index.html` | Homepage |
| `detox.html` | The DETOX / Work With Us — full service page, client wireframe order |
| `diagnostic.html` | OPS Detox Diagnostic™ — with a working demo of the audit |
| `about.html` | About Oscar de Grauw |
| `contact.html` | Contact — message form + booking-embed slot |
| `freebie.html` | Freebie opt-in (Startup Financial Model Template) |

## What actually works

- Real multi-page navigation; every CTA goes somewhere sensible.
- Mobile burger nav (drops under the sticky header, closes on tap and on resize).
- Seven-module popups — click any module card; closes on ✕, backdrop click or Escape,
  and returns focus to the card it came from.
- Noise / clarity switch on the closing block.
- All forms: required-field and email validation, inline errors, success state.
- Reveal-on-scroll, the hero entrance motion and the ticker, all respecting
  `prefers-reduced-motion`.
- **The diagnostic**: seven questions on a 1–5 scale, back navigation, progress bar,
  a clarity score, a module-level bar profile and the two weakest modules named.
  State lives in the browser only.
- Responsive from 390px up; skip link, focus rings, `aria-current`, labelled controls.

## What is placeholder, and why

Copy is the client's, locked and unedited — including the known typos in the
homepage problem paragraph. Three things on these pages are **not** client copy and
need replacing before anything goes live:

1. **Diagnostic questions and scoring** (`js/diagnostic.js`) — written to demonstrate
   the flow. Replace with the real instrument once the platform is chosen
   (Typeform / Scoreapp / custom). The page says so on-screen.
2. **Module popup bodies** — the popup shows the module name and its supplied tagline,
   then a note that the detail copy is still to come from the current website.
3. **Six value one-liners on the About page** — the six values are the client's; the
   one-line explanations under them are mine, as filler.

Still placeholder from the client's own side: trust-row logos, four testimonials,
contact details, legal links, and Oscar photography (the About/hero images are
campaign artwork, not portraits).

## Still to wire

- Booking platform (Calendly or meetergo) → the panel on `contact.html#book`.
  Every "Book the FREE DIAGNOSTIC" and "Let's talk" CTA already routes toward it.
- A form backend or email platform for the newsletter, contact and freebie forms.
- The actual Startup Financial Model Template file.
- Real legal pages behind the four footer links.

## Notes

- `assets/fonts/FormulaCondensed-Bold.otf` is the **trial** version of the typeface.
  A licensed copy is needed before launch.
- `css/site.css` is written expanded and sectioned, unlike the minified
  `high-fidelity-design/css/site.css` — same design system, meant to be edited.
