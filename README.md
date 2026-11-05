# LEON — Static Fashion Storefront

A frontend-only fashion storefront concept built with HTML, CSS, and vanilla
JavaScript. It demonstrates a branded shopping interface with category
browsing, product cards, quick views, product details, a client-side cart,
theme switching, responsive navigation, and editorial video sections.

## Features

- Responsive storefront layout with desktop and mobile navigation.
- Product catalogue with category filtering.
- Product quick-view and detail views.
- In-memory shopping cart with item count and total.
- Light/dark theme toggle.
- Simple weight-based size-suggestion demo (not an AI model).
- Editorial image and video sections.
- Countdown display for a promotional drop.

## Run locally

No build step or package installation is required. From this directory, run:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. A local HTTP server is recommended so that
media and browser features load consistently.

## Important demo limitations

This is a frontend prototype, not a production e-commerce system. It has no
backend, database, inventory service, real user authentication, order
management, or payment gateway. The cart exists only in browser memory and is
cleared when the page reloads. The account and checkout screens are explicitly
labelled as demos; they do not collect passwords or card details and do not
process orders or payments.

Product names, descriptions, and prices are illustrative interface content,
not a live catalogue or offer.

## Project files

- `index.html` — page structure and storefront content.
- `styles.css` — responsive layout, theme, and visual styling.
- `app.js` — product data, navigation, filters, cart, and UI interactions.
- `images/` — product, editorial, and optimized video assets.

## Media assets

The image and video assets were present in the supplied project archive. Their
original source and licensing details were not included. Confirm that you have
permission to redistribute each asset before using this repository publicly
or commercially. The four video files were re-encoded to H.264 at up to 720p
with audio removed to reduce repository size and improve web delivery.

## Local asset check

```bash
python3 tests/check-assets.py
node --check app.js
```
