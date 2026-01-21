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

// Section reveal animation
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Page-like transitions when clicking nav links
const overlay = document.getElementById("pageTransition");

function playTransitionThenScroll(targetId) {
  // Close mobile nav
  nav?.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");

  // Show overlay
  if (overlay) overlay.classList.add("show");

  // After overlay covers screen, scroll to section
  setTimeout(() => {
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Hide overlay
    setTimeout(() => {
      if (overlay) overlay.classList.remove("show");
    }, 450);
  }, 350);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    if (href.startsWith("#")) {
      e.preventDefault();
      playTransitionThenScroll(href);
      history.pushState(null, "", href);
    }
  });
});

// Contact form (mailto for now)
const quoteForm = document.getElementById("quoteForm");
quoteForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(quoteForm);

  // Replace this later with your real email
  const toEmail = "info@synergycontainersolutions.co.za";

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
