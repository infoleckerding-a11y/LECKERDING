# LECKERDING™ — Brand website (review branch)

Responsive bilingual corporate website for **LECKERDING™**, a brand of **LECKERDING GmbH**, Berlin. This branch expands the original three-page static prototype. All public files are in `dist/`; no Node build or external script dependencies are needed.

## Pages

| German | English | Purpose |
| --- | --- | --- |
| `dist/index.html` | `dist/en/index.html` | Brand-led home, the food concept, interactive use cases, steps, partnership models, 3-month pilot, FAQs |
| `dist/sortiment/index.html` | `dist/en/sortiment/index.html` | Example meals, name/category/allergen-exclusion filters |
| `dist/kontakt/index.html` | `dist/en/kontakt/index.html` | Location enquiry, email and WhatsApp, self-hosted contact QR code |
| `dist/impressum/index.html` | `dist/en/impressum/index.html` | Legal notice |
| `dist/datenschutzerklaerung/index.html` | `dist/en/datenschutzerklaerung/index.html` | Privacy information |
| `dist/agb/index.html` | `dist/en/agb/index.html` | Original terms migrated as a **draft**, legal review required |

Legal pages are **footer-only** on every page. Other existing live builder URLs have static compatibility redirects to the nearest relevant new section.

## Design / features

- Beige (#faf8ef), dark green (#202e25), leaf green (#415b3a), sage green (#d9e6a8); square borders and controls.
- Existing optimized food/machine/mascot assets; mascot displayed with `object-fit: contain`. The favicon, header and footer use the complete LECKERDING logo.
- Locally hosted fonts and QR code; no analytics, advertising cookies, remote fonts or embedded WhatsApp scripts.
- DE and EN authored pages and language selector.
- Interactive 3-step vending demo, site-type selector, partnership model selector, FAQs and food filters.
- Floating WhatsApp messaging panel on all pages. The contact form opens the visitor's email client or WhatsApp with a prefilled message; it **does not silently send or store messages**.
- Privacy preferences are available from the footer settings button. The chat opens on first visit and remembers a dismissal within the current tab.

## Location enquiries and editorial pages

The IONOS preview is linked to this review branch. Home and Standortlösungen present six venue types with enquiry links that preselect the relevant site type. FAQ contains 27 questions in each language. The blog includes three paired articles. Use the visible homepage video link to reach the 28-second machine demonstration.

The service-area map estimates a 75-minute one-way drive from Warschauer Straße 59A. Road-network estimates from OSRM cover 1,369 grid points plus 23 town centres and exclude live traffic. The map is clipped to Berlin and Brandenburg. Map attribution is displayed on the map and linked beneath it.

## Preview locally

Open `dist/index.html` directly, or run:

```bash
python -m http.server 8000 --directory dist
```

Visit `http://localhost:8000/` and `http://localhost:8000/en/`. Check navigation, contact generation, chat links, QR, language toggle, filter controls and mobile layout.

## Deployment

**Do not merge until reviewed.** The original `main` branch remains the IONOS deployment source. When ready, merge the PR and verify IONOS Deploy Now's configured publish directory is `dist` with no build command. Take a backup of the IONOS builder pages before attaching the production domain and verify email/DNS records remain unchanged. This PR does not modify DNS.

For launch, remove the preview-only `noindex` directive from the 24 content pages listed in `dist/sitemap.xml`. Keep compatibility redirects excluded. Canonical and hreflang URLs point to the intended www.leckerding.com domain. Submit the sitemap in Search Console after cutover. Confirm legacy links, canonical URL redirects, both `www` and apex domain, HTTPS and cookie functionality. The static redirects are not HTTP 301s; for SEO, configure proper redirects in the hosting environment.

## Important publication checks

1. **Terms:** The live AGB contained incomplete online shop language. The German draft preserves all section topics but **condenses** some payment/provider passages; obtain a suitable legally reviewed version for vending sales and B2B placement before going live. The English AGB is an explanatory overview, **not** a binding full translation.
2. **Privacy:** Verify final IONOS hosting logs, retention, any additional cookies/processors and the precise legal wording. The visitor's WhatsApp message opens in an external client; no chat backend is installed.
3. **Product declarations:** The 3 meals and declared allergens reflect the previous prototype examples; verify against current supplier packaging before using for QR-code customer disclosures. These examples are **not** a complete regulatory allergen catalogue.
4. **WhatsApp:** Confirm +49 155 11546761 is WhatsApp-enabled. QR destination is `https://wa.me/4915511546761`.
5. **Images:** Confirm commercial usage rights for the images in the original repository.

## Edit locations

- `dist/assets/redesign.css`: responsive styling and colors
- `dist/assets/redesign.js`: interactions, contact generator and privacy choices
- `dist/{index.html,sortiment/index.html,kontakt/index.html}`: German content
- `dist/en/`: English content
- `dist/assets/img/whatsapp-qr.svg`, `dist/assets/img/favicon.svg`: self-hosted icons
