/* ===================================================================
   CONTENT — edit these arrays to swap in your real files.
   Just replace "file" with the path to your JPG and update the text.
=================================================================== */

const COLLATERAL = [

   { file: "assets/collateral/Collateral-1.jpg", title: "Sales Resource", sub: "Prospect Resource Title page", tag: "Sales" },
    { file: "assets/collateral/Collateral-1.1.jpg", title: "Sales Resource", sub: "Prospect Resource Preview", tag: "Sales" },
    { file: "assets/collateral/Collateral-1.2.jpg", title: "Sales Resource", sub: "Prospect Resource Preview", tag: "Sales" },
    { file: "assets/collateral/Collateral-1.3.jpg", title: "Sales Resource", sub: "Prospect Resource Preview", tag: "Sales" },
  { file: "assets/collateral/Collateral-2.jpg", title: "One-Pager", sub: "Service Overview", tag: "Sales" },
  { file: "assets/collateral/Collateral-3.jpg", title: "Resource", sub: "Document Template", tag: "Long form Content" },
  { file: "assets/collateral/Collateral-4.jpg", title: "Resource", sub: "Document Template", tag: "Long form Content" },
  { file: "assets/collateral/Collateral-5.jpg", title: "Co-Branded", sub: "Solution Page", tag: "Sales" },
];

const GALLERY = [
  { file: "assets/gallery/gallery-1.jpg", tag: "Co-Branding" },
  { file: "assets/gallery/gallery-2.png", tag: "Social" },
  { file: "assets/gallery/gallery-3.png", tag: "Social" },
  { file: "assets/gallery/gallery-4.png", tag: "Merch" },
  { file: "assets/gallery/gallery-5.png", tag: "Merch" },
  { file: "assets/gallery/gallery-6.jpg", tag: "Merch" },
  { file: "assets/gallery/gallery-7.jpg", tag: "Social" },
  { file: "assets/gallery/gallery-8.jpg", tag: "Rebrand" },
  { file: "assets/gallery/gallery-9.jpg", tag: "Social" },
];

/* ===================================================================
   CAROUSEL
=================================================================== */
(function initCarousel() {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const carousel = document.getElementById("carousel");
  const currentEl = document.getElementById("carouselCurrent");
  const totalEl = document.getElementById("carouselTotal");
  const titleEl = document.getElementById("carouselTitle");
  const subEl = document.getElementById("carouselSub");
  const previewBtn = document.getElementById("previewBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  let focusIndex = 0;
  const n = COLLATERAL.length;

  totalEl.textContent = String(n).padStart(2, "0");

  // build items
  COLLATERAL.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "carousel-item";
    el.dataset.index = i;
    el.innerHTML = `
      <span class="carousel-item-tag">${item.tag}</span>
      <img src="${item.file}" alt="${item.title} — ${item.sub}" loading="lazy">
    `;
    el.addEventListener("click", () => {
      if (Number(el.dataset.index) === focusIndex) {
        openLightbox(item.file, item.title);
      } else {
        setFocus(Number(el.dataset.index));
      }
    });
    track.appendChild(el);
  });

  const items = Array.from(track.children);

  function positionFor(offset) {
    const map = { "-2": "left2", "-1": "left1", "0": "focus", "1": "right1", "2": "right2" };
    return map[String(offset)] || "hidden";
  }

  function render() {
    items.forEach((el, i) => {
      let offset = i - focusIndex;
      // wrap-around shortest path
      if (offset > n / 2) offset -= n;
      if (offset < -n / 2) offset += n;
      el.dataset.pos = positionFor(offset);
    });
    const item = COLLATERAL[focusIndex];
    currentEl.textContent = String(focusIndex + 1).padStart(2, "0");
    titleEl.textContent = item.title;
    subEl.textContent = item.sub;
    downloadBtn.href = item.file;
    downloadBtn.setAttribute("download", item.title.replace(/\s+/g, "-").toLowerCase());
  }

  function setFocus(i) {
    focusIndex = ((i % n) + n) % n;
    render();
  }

  prevBtn.addEventListener("click", () => setFocus(focusIndex - 1));
  nextBtn.addEventListener("click", () => setFocus(focusIndex + 1));

  previewBtn.addEventListener("click", () => {
    const item = COLLATERAL[focusIndex];
    openLightbox(item.file, item.title);
  });

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") setFocus(focusIndex - 1);
    if (e.key === "ArrowRight") setFocus(focusIndex + 1);
  });

  // basic swipe support
  let touchStartX = null;
  track.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) setFocus(focusIndex + (dx < 0 ? 1 : -1));
    touchStartX = null;
  });

  render();
})();

/* ===================================================================
   GALLERY
=================================================================== */
(function initGallery() {
  const grid = document.getElementById("galleryGrid");
  GALLERY.forEach((item) => {
    const el = document.createElement("div");
    el.className = "gallery-item";
    el.innerHTML = `
      <img src="${item.file}" alt="${item.tag} piece" loading="lazy">
      <span class="gallery-tag">${item.tag}</span>
    `;
    el.addEventListener("click", () => openLightbox(item.file, item.tag));
    grid.appendChild(el);
  });
})();

/* ===================================================================
   LIGHTBOX
=================================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

/* ===================================================================
   NAV — scrollspy, active underline, index counter, progress bar
=================================================================== */
(function initNav() {
  const sections = ["collateral", "gallery", "case-study"].map((id) => document.getElementById(id));
  const navLinks = Array.from(document.querySelectorAll(".nav a"));
  const counterCurrent = document.getElementById("counterCurrent");
  const progress = document.getElementById("headerProgress");

  function onScroll() {
    // active section
    let activeIndex = -1;
    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) activeIndex = i;
    });

    navLinks.forEach((link, i) => {
      link.classList.toggle("is-active", i === activeIndex);
    });

    counterCurrent.textContent = String(activeIndex + 1).padStart(2, "0");

    // scroll progress
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = pct + "%";
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
