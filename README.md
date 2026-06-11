# Robinson's Irish Pub — Landing Page (v2)

Built by brand-site-builder + ui-ux-pro-max. Static HTML + Tailwind CDN. Single-page.

## Preview locally

Open `index.html` directly in a browser, or run a local server:
```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Brand

| Token | Hex | Usage |
|-------|-----|-------|
| Irish Green | `#1B5E38` | Sections, badges, accents |
| Pub Gold | `#C49A35` | CTAs, highlights, hover |
| Background | `#0A0A0A` | Page bg, nav, footer |
| Surface | `#141414` | Cards, sticky nav |
| Cream | `#F0E6C8` | Headings, body copy |
| Muted | `#A89070` | Subtitles, metadata |

**Fonts:** Playfair Display (headings) + Inter (body) via Google Fonts  
**Icons:** Lucide (via unpkg CDN)  
**Style:** Dark Elegance — moody Irish pub atmosphere  
**Sources:** Instagram @robinsons_pub (profile + posts) · Google Maps data

## Placeholders to replace before going live

- [ ] **Hero background image** (`hero-bg` CSS class) — the Instagram CDN URL will expire.
      Download the image locally and reference it as `background-image: url('images/hero.jpg')`.
- [ ] **About section image** — same expiry issue with the Instagram CDN URL in the `<img>` tag.
- [ ] **Gallery images** — 4 placeholder cells need real photos; the 2 real CDN images will also expire.
- [ ] **Logo** in navbar and footer — the Instagram profile picture CDN URL expires too.
      Download the logo and save it as `images/logo.jpg`.
- [ ] **Google Maps Get Directions link** — currently links to a search query.
      Replace with the direct Google Maps place URL once you've claimed the listing.
- [ ] **Contact phone number** — add to footer if/when available.
- [ ] **Google Maps embed** — replace the map placeholder div with an official embed iframe.

## Deploy: GitHub → Netlify

```bash
# 1. From inside the robinsons-pub-2/ folder
git init
git add .
git commit -m "Robinson's Pub landing page"

# 2. Create GitHub repo and push (requires gh CLI)
gh repo create robinsons-pub --public --source=. --remote=origin --push
#   OR via GitHub UI: create repo, then:
#   git remote add origin https://github.com/<you>/robinsons-pub.git
#   git push -u origin main

# 3. Deploy on Netlify
#   Option A (instant): drag-drop this folder at https://app.netlify.com/drop
#   Option B: connect GitHub repo at https://app.netlify.com
#             Publish directory: "."  |  Build command: (leave empty)
```
