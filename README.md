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
- Floating WhatsApp messaging panel on all pages. The contact form submits through an external FormSubmit endpoint after explicit acknowledgment; one-time activation of the recipient email is required.
- Privacy preferences are available from the footer settings button. The WhatsApp panel opens only upon user interaction.

## Location enquiries and editorial pages

The IONOS preview is linked to this review branch. Home and Standortlösungen present six venue types with enquiry links that preselect the relevant site type. FAQ contains 27 questions in each language. The blog includes three paired articles. Use the visible homepage video link to reach the 28-second machine demonstration.

The original, self-hosted regional map (dist/assets/img/service-area-75.svg) is shown on the homepage and Standortlösungen page. It is accompanied by a clear orientation-only caption: the displayed area is not a fixed boundary, and LECKERDING reviews enquiries across Berlin and Brandenburg individually. The map retains its original visual labels and attribution.

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
4. **Photography and artwork:** LECKERDING confirms that all currently used website images are its own brand assets and that no stock images are in use. The homepage now uses the previously included locally hosted machine illustration (assets/img/automat.webp) while a new image is prepared.
5. **WhatsApp:** Confirm +49 155 11546761 is WhatsApp-enabled. QR destination is `https://wa.me/4915511546761`.
6. **Image management:** Only use approved LECKERDING-owned original artwork or photography in future updates; maintain a record of originals and attribution where relevant.

## Edit locations

- `dist/assets/redesign.css`: responsive styling and colors
- `dist/assets/redesign.js`: interactions, contact generator and privacy choices
- `dist/{index.html,sortiment/index.html,kontakt/index.html}`: German content
- `dist/en/`: English content
- `dist/assets/img/whatsapp-qr.svg`, `dist/assets/img/favicon.svg`: self-hosted icons

## Contact form service (must activate before external launch)

The German and English location-enquiry pages now POST to `https://formsubmit.co/ajax/info@leckerding.com` through JavaScript with a non-JavaScript fallback to `https://formsubmit.co/info@leckerding.com`. The site requires name, email and explicit form-transmission acknowledgment; a telephone number is required when WhatsApp is the preferred reply method. A honeypot field is provided and external reCAPTCHA is disabled to avoid loading additional tracking on the contact page. Form responses are surfaced inline with an honest accepted/error state; delivery is not asserted without a provider acknowledgement.

**One-time activation:** Open the deployed contact page, send one low-sensitivity test enquiry, then confirm the activation message FormSubmit sends to `info@leckerding.com` (including the spam folder). Until that confirmation, enquiries are not delivered to the destination mailbox. Do not put personal visitor data into the form before activation and privacy review. Verify the provider's current retention, cross-border transfer terms and relevant GDPR processing agreements before public launch. The service is third-party; no backend secrets are committed to GitHub.

If you need full control and European processing, the alternative is a PHP/SMTP backend on an IONOS Deploy Now **PHP** project with server-side spam protection and credentials in deployment secrets. The current Deploy Now project is static and does **not** execute PHP scripts.

## November 2026 usability and content revision

- Fixed desktop dropdown disappearing when moving the pointer off the trigger: the menu closes only after leaving the full header/panel, with a 350 ms grace period, and desktop clicks hold the menu open. Mobile click, keyboard Escape, outside click and keyboard focus remain supported.
- Reinstated the locally held regional map on both the German and English home/location pages, without the overly specific driving-time statement in nearby text.
- Restored the previous larger home-page vending machine illustration from the existing first-generation local asset.
- Expanded all six Standortlösungen scenarios in German and English using the original site's audience-specific messages, with three scannable takeaways in each panel.
- Ownership clarification supplied by LECKERDING: current published imagery is company-owned, not stock imagery. No externally hosted image or new stock asset was added.
