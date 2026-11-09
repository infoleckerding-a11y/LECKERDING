# LECKERDING

German three-page website prototype for LECKERDING GmbH. All website files are in **dist/**. No build, database, third-party scripts, or package installation is required.

## Preview and edit

Download the repository using **Code → Download ZIP**, extract it, then open **dist/index.html**. Follow the navigation to browse all three pages. For HTTP testing, run `python -m http.server 8000 --directory dist` from the repository, then open `http://localhost:8000`.

| What to edit | File or folder |
| --- | --- |
| Home page | dist/index.html |
| Dishes, descriptions, dietary categories and declared allergens | dist/sortiment/index.html |
| Contact email and location inquiries | dist/kontakt/index.html |
| Layout, colours and responsive styles | dist/assets/site.css |
| Sortiment filters | dist/assets/site.js |
| Images and fonts | dist/assets/img and dist/assets/fonts |

The cards use three example dishes. When updating an allergen declaration, update the visible details and the corresponding data-allergens tokens together. The filter covers declared ingredients only. The contact buttons open a draft in the visitor’s email application.

## Host at IONOS from GitHub

1. Open [IONOS Deploy Now](https://www.ionos.de/hosting/deploy-now) and check the product and renewal price in your account. MyWebsite is a separate product.
2. Create a project **from an existing repository**. Connect the IONOS GitHub app to **infoleckerding-a11y/LECKERDING** and select branch **main**.
3. Choose a **static / plain HTML** project. Use the repository root as the working directory, leave build commands and dependencies empty, and enter **dist** as the publish or output directory.
4. Confirm the generated workflow in the wizard and open the IONOS-assigned preview URL. Check Home, Sortiment, Kontakt, fonts, meal photos, the filter combinations and the email draft on desktop and mobile. After linking, pushes to the configured branch deploy automatically.
5. Keep using the preview URL while reviewing. The custom domain can be assigned inside Deploy Now later. If the builder already uses it, check the current assignment with IONOS before releasing it. Record the current domain destination and keep a copy of any pages you need to restore.

### If you already have regular IONOS Webhosting

Upload the **contents of dist/** into a dedicated webspace folder via SFTP. Connect a test subdomain to that folder in Domains & SSL if your contract supports it. The chosen folder should contain index.html, assets/, kontakt/ and sortiment/ directly. This manual upload route requires another upload after each change. A MyWebsite-only plan does not offer direct webspace access.

### Before replacing the live builder site

The preview footer links to the current production Impressum and Datenschutzerklärung. Migrate these pages before switching the main domain. Review the existing URLs (including product information linked by QR codes), copy or redirect the pages you want to keep, and review the preview-only noindex meta tags on all three pages. Verify both leckerding.com and www.leckerding.com, HTTPS, and existing mail settings at cutover. The prototype contains no DNS changes or automatic deployment credentials.

[IONOS repository setup](https://docs.ionos.space/docs/from-repo/) · [Static sites and domains](https://docs.ionos.space/docs/deploy-static-sites/) · [Webspace and SFTP](https://www.ionos.de/hilfe/hosting/ftp-zugaenge-einrichten-und-verwalten/ftp/)

## Assets

Brand and food photography sourced from the LECKERDING [Images- repository](https://github.com/infoleckerding-a11y/Images-) and optimized for the web. The self-hosted Barlow Condensed and DM Sans fonts include their OFL notices in dist/assets/fonts/.
