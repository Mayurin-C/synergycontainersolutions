// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form (NO Firebase): opens user's email app with prefilled email
document.getElementById("quoteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);

  // Change this later when you have an official email:
  const toEmail = "info@synergycontainersolutions.co.za"; // placeholder

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
