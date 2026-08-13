# Gleimi De Jesus — Four Winds IT Portfolio

A single-page marketing portfolio built with plain HTML, CSS, and JS. No build step — works straight on GitHub Pages.

## File structure

```
index.html              Page structure
css/styles.css           All styling (the "Ledger" visual direction)
js/script.js              Carousel, gallery, lightbox, nav logic — and your content data
assets/collateral/       5 collateral JPGs (carousel)
assets/gallery/          9 social/merch JPGs (gallery)
assets/case-study/       Case study image + the "Full Story" PDF
```

## Swapping in your real content

You will only ever need to edit **`js/script.js`** and drop files into **`assets/`**. Never touch the HTML or CSS to update content.

### 1. Collateral carousel (5 pieces)
Open `js/script.js`, find the `COLLATERAL` array near the top:

```js
const COLLATERAL = [
  { file: "assets/collateral/collateral-1.jpg", title: "One-Pager", sub: "Service overview", tag: "Sales" },
  ...
];
```

For each item: replace `file` with your real JPG's path (drop the JPG into `assets/collateral/` first), and update `title`, `sub` (short description), and `tag` (shows as a small label on the card — keep it to one or two words).

### 2. Gallery (9 pieces)
Same idea, in the `GALLERY` array:

```js
const GALLERY = [
  { file: "assets/gallery/gallery-1.jpg", tag: "Social" },
  ...
];
```

Drop your JPGs into `assets/gallery/`, point `file` at each, and set `tag` to whatever category fits (`Social`, `Merch`, `Rebrand`, etc. — these are just labels, use what makes sense).

Tip: images of different heights look best here — the gallery is a masonry layout, so mixing portrait and landscape shots is intentional, not a bug.

### 3. Case study
In `index.html`, find the `<section class="section" id="case-study">` block:
- Swap `assets/case-study/website-facelift.jpg` for your real image
- Edit the headline, lede paragraph, and the three bullet points (problem / approach / result)
- Replace `assets/case-study/full-story-placeholder.pdf` with your real case study PDF or exported slideshow (same filename, or update the `href` and the `download` attribute in the "Full Story" button)

### 4. Header / footer
- Your name is already set as "Gleimi De Jesus" in the header
- Update the placeholder email in the footer (`you@example.com`) to your real contact

## Deploying to GitHub Pages

1. Create a new GitHub repo (public)
2. Push everything in this folder to the repo root (`index.html` should sit at the top level, not inside a subfolder)
3. In the repo, go to **Settings → Pages**
4. Under "Build and deployment," set **Source** to "Deploy from a branch," branch `main`, folder `/ (root)`
5. Save — your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two

## Notes on the build

- **Carousel**: click a side document to bring it into focus, click the focused one (or hit "Preview") to open it full-size, arrow keys and swipe both work
- **Nav**: the top bar tracks which section you're in (underline + counter in the corner) and shows a thin scroll-progress line under the header
- Everything respects `prefers-reduced-motion` for accessibility
- All current images are placeholders generated to match the layout — swap them out before publishing
