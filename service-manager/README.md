# Service Manager — React Frontend

## Overview
Service Manager is a React frontend demonstrating a services grid, blog listing, blog details and a contact page. The app uses local JSON for demo; it can be switched to WordPress REST API (headless) or converted to a WordPress theme.

## Tech
- React 18 + Vite
- React Router v6
- Axios
- Optional WordPress headless integration or theme conversion

## Quick start (local)
1. Clone repo
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:5173`

## Switch to WordPress (HEADLESS)
1. Set environment variables:
   - `VITE_MODE=WP`
   - `VITE_WP_BASE=https://your-wp-site.com`
   - `VITE_RECAPTCHA_SITEKEY=your_site_key`
2. Ensure WordPress CPT `services` is registered with `show_in_rest => true`.
3. Deploy.

## Convert to WordPress theme
1. Copy React markup and styles into `wp-content/themes/service-manager`.
2. Create templates: `front-page.php`, `page-services.php`, etc.
3. Use `WP_Query` to retrieve posts and CPT.

## Security
- Demo: CSP meta tag in `index.html`.
- Production: set server headers (CSP, X-Frame-Options, X-Content-Type-Options, HSTS).
- reCAPTCHA: site key stored in env vars; secret key validated server-side in production.

## Files of interest
- `src/pages/Services.jsx`
- `src/pages/Blog.jsx`
- `src/pages/BlogDetails.jsx`
- `src/pages/Contact.jsx`
- `src/data/services.json` / `blogs.json`

## Deliverables
- GitHub repo (this repo)
- Live demo: (deploy on Vercel/Netlify and paste URL here)
- If using WP headless: WP admin URL and instructions (do not share credentials publicly)
- SQL dump: `services_wp_dump.sql` (if created)

## Notes
- For production, validate reCAPTCHA tokens server-side via Google's verification endpoint.
- Add strict CSP and remove `'unsafe-inline'` by using nonces for inline scripts.
