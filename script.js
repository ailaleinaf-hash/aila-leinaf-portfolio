// Personnalisation rapide : remplace ces deux valeurs par tes coordonnées.
const CONTACT_EMAIL = "ailaleinaf@gmail.com";
const WHATSAPP_NUMBER = "2290156965655"; // indicatif + numéro, sans + ni espaces

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const savedTheme = localStorage.getItem("aila-theme");
if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
updateThemeButton();

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("aila-theme", root.dataset.theme);
  updateThemeButton();
});
function updateThemeButton() {
  const light = root.dataset.theme === "light";
  themeIcon.textContent = light ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", light ? "Activer le thème sombre" : "Activer le thème clair");
  document.querySelector('meta[name="theme-color"]').content = light ? "#f4f7fc" : "#070b14";
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  menuToggle.textContent = open ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  menuToggle.textContent = "☰";
}));

// Animation d'apparition au défilement, avec solution de repli.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// WhatsApp : numéro configuré pour AILA LEINAF.
const whatsappLink = document.getElementById("whatsappLink");
whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;

// GitHub Pages ne fournit pas de serveur de formulaire. Ce formulaire prépare
// un e-mail prérempli dans l'application de messagerie de la personne.
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");
  if (!name || !email || !message) {
    status.textContent = "Merci de remplir tous les champs.";
    return;
  }
  const subject = encodeURIComponent(`Message du portfolio — ${name}`);
  const body = encodeURIComponent(`Nom : ${name}\nE-mail : ${email}\n\nMessage :\n${message}`);
  status.textContent = "Ton application de messagerie va s'ouvrir pour envoyer le message.";
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
