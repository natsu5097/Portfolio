# Mani's Portfolio — Enhanced

[![Live Site](https://img.shields.io/website-up-down-green-red/https/natsu5097.github.io/Portfolio.svg)](https://natsu5097.github.io/Portfolio/)

This repository contains a static portfolio site for Mani. I added several enhancements to make it a full single-page portfolio:

- New sections: **Services**, **Skills**, **Projects**, **Education**, **Experience**, **Contact** and **Footer**
- Mobile-friendly navigation with a toggle button
- Smooth scrolling and scroll-spy to highlight current section
- Animated skill progress bars (on scroll)
- Project detail modal
- Contact form with client-side validation (no backend by default)
- Improved SEO meta tags and favicon
- `script.js` / `script.min.js` for interactive behavior and `style.css` / `style.min.css` updated for new layout (minified versions included)

Quick notes:
- To enable actual contact submissions, set the `data-endpoint` attribute on the contact form (`#contactForm`) to your Formspree endpoint (example below) or another backend endpoint.

  <form id="contactForm" data-endpoint="https://formspree.io/f/your-id"> ...</form>

- I added a placeholder `resume.pdf` and a `resume.html` page. Replace `resume.pdf` in the repo with your official PDF to enable a proper download.

- I added a GitHub Pages workflow at `.github/workflows/pages.yml`. When you push to `main`, GitHub Action will publish the repo to GitHub Pages (verify Pages settings in the repository to use the `gh-pages` branch or the Action-created deployment).

How to preview locally:
- Open `index.html` in a browser or use a static server like `live-server`, `http-server`, or VS Code Live Preview.

Performance improvements included:
- Added preload hint for the main stylesheet and several preconnect hints for CDNs.
- Preloaded the hero image to improve Largest Contentful Paint (LCP) and reduce visual shifts.
- Added width/height attributes and lazy-loading/decoding hints for images to reduce CLS and improve LCP.
- Lottie animations are lazy-loaded only when the hero enters view to avoid blocking the initial render.

Would you like me to set up and test a real Formspree integration (you can provide your form id), or continue improving the design and animations? 👇