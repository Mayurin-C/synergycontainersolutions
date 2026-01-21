// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal animation
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Page transition overlay
const overlay = document.getElementById("pageTransition");

function showOverlay() {
  if (!overlay) return;
  overlay.classList.add("show");
}
function hideOverlay() {
  if (!overlay) return;
  overlay.classList.remove("show");
}

// Smooth page transition for internal links (your site pages)
document.querySelectorAll("a[href]").forEach(a => {
  const href = a.getAttribute("href");
  if (!href) return;

  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const isAnchor = href.startsWith("#");

  // Only animate transitions for internal page navigation (e.g. containers.html)
  if (!isExternal && !isAnchor) {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      nav?.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");

      showOverlay();
      setTimeout(() => {
        window.location.href = href;
      }, 380);
    });
  }
});

// Hide overlay when page loads (nice feel)
window.addEventListener("pageshow", () => {
  setTimeout(() => hideOverlay(), 80);
});

// Contact form (mailto)
const quoteForm = document.getElementById("quoteForm");
quoteForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(quoteForm);
  const toEmail = "info@synergycontainersolutions.co.za"; // update later

  const subject = encodeURIComponent("Quote Request - Synergy Container Solutions");
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\n` +
    `Email: ${data.get("email")}\n` +
    `Phone: ${data.get("phone")}\n` +
    `Location (Gauteng): ${data.get("location")}\n` +
    `Container Type: ${data.get("type")}\n\n` +
    `Message:\n${data.get("message")}\n`
  );

  window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
});
