// Mobile menu, language preference and footer year.

const LANG_KEY = "lang";
const currentLang = document.body.dataset.lang;

function savedLanguage() {
  try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; }
}

function saveLanguage(lang) {
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage unavailable */ }
}

// First visit to the English page from a Portuguese-language browser: offer the Portuguese page.
if (currentLang === "en" && !savedLanguage()
    && navigator.language && navigator.language.toLowerCase().startsWith("pt")) {
  saveLanguage("pt");
  window.location.replace("pt/" + window.location.hash);
}

// Remember an explicit language choice.
document.querySelectorAll(".lang-switch a").forEach((link) => {
  link.addEventListener("click", () => saveLanguage(link.dataset.lang));
});

// Mobile menu.
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("main-nav");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
