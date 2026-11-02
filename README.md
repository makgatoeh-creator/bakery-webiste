# Apex Bakery Website

The Apex Bakery website presents the bakery's products, story, and contact information in a welcoming, easy-to-navigate format. Its warm visual design, bakery photography, and responsive layout provide a polished experience across desktop and mobile devices.

**Live website:** [https://snazzy-cannoli-789af1.netlify.app](https://snazzy-cannoli-789af1.netlify.app)

## Website pages

- **Home** — Introduces Apex Bakery and highlights its freshly baked goods.
- **About Us** — Shares the bakery's story, mission, vision, team, and videos.
- **Services** — Showcases breads, custom cakes, and catering, with product search, category filters, and sorting.
- **Enquiry** — Provides a structured form for product, custom-order, and catering enquiries.
- **Contact Us** — Lists bakery contact details and locations, with a map and general contact form.

## Highlights

- Responsive layout with consistent navigation across all pages.
- Interactive product browsing and image galleries.
- Bakery photography and video content.
- Form fields with built-in validation and helpful input guidance.
- Search-engine-friendly canonical URLs, sitemap, and robots file.
- Security and browser-policy headers configured for Netlify.

## Performance

The Lighthouse screenshot records the website's audit results: **99 Performance**, **100 Accessibility**, **100 Best Practices**, and **100 SEO**.

[View the Lighthouse performance report](<./assets/Screenshot 2026-11-02 141752.png>)

These scores reflect the captured audit and may vary with the device, browser, and testing conditions.

## Technology

This is a static website built with HTML, CSS, and vanilla JavaScript. Each technology has a distinct role:

- **HTML** provides the website's structure and content, including page sections, navigation, product information, images, videos, and enquiry and contact forms.
- **CSS** controls the visual design and layout, including typography, colours, spacing, responsive behavior, and interactive visual states for different screen sizes.
- **JavaScript** adds client-side interactions, including product search, filtering and sorting, image galleries, map location selection, form validation, and other page enhancements.

The HTML pages connect to the shared stylesheet at `css/style.css` and script at `js/script.js`. The site requires no package manager or build step.

## Project structure

```text
apex-bakery-website/
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── _headers
├── README.md
├── assets/
│   ├── bakery-cake-display.jpeg
│   ├── bakery-interior.jpeg
│   ├── custom-cakes.jpeg
│   ├── sourdough-bread.jpeg
│   ├── white-loaves.jpeg
│   ├── wholewheat-loaves.jpeg
│   ├── WhatsApp Image 2026-10-29 at 14.17.09.jpeg
│   ├── WhatsApp Image 2026-10-29 at 14.17.10.jpeg
│   ├── WhatsApp Video 2026-10-29 at 08.54.28.mp4
│   ├── WhatsApp Video 2026-10-29 at 08.57.31.mp4
│   └── Screenshot 2026-11-02 141752.png
├── css/
│   └── style.css
└── js/
    └── script.js
```

The HTML files provide the website pages, `css/style.css` defines the presentation, and `js/script.js` powers interactive features. The `assets/` directory contains the images and videos used throughout the site. Netlify-specific headers, crawler guidance, and sitemap are maintained in `_headers`, `robots.txt`, and `sitemap.xml`.

## Run locally

Open `index.html` in a browser, or serve the project folder with any local static web server.

## Deployment

The site is configured for Netlify. Publish the project folder as the site’s deploy directory. The sitemap and `robots.txt` already use the live site URL listed above.
