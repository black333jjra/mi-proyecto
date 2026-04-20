// ==== MENÚ RESPONSIVE ====
const menuToggle = document.getElementById("menu-toggle");
const navbarLinks = document.getElementById("navbar-links");
const menuOverlay = document.getElementById("menu-overlay");
const closeMenu = document.getElementById("close-menu");
const navLinks = document.querySelectorAll('.navbar a');

function openMenu() {
  navbarLinks.classList.add("active");
  menuOverlay.classList.add("active");
  menuToggle.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenuFn() {
  navbarLinks.classList.remove("active");
  menuOverlay.classList.remove("active");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeMenuFn);
menuOverlay.addEventListener("click", closeMenuFn);

navLinks.forEach(link => {
  link.addEventListener("click", closeMenuFn);
});

// ==== AÑO AUTOMÁTICO ====
document.getElementById("year").textContent = new Date().getFullYear();

// Idiomas del sistema
const cacheIdiomas = {};

async function cargarIdioma(lang) {
  if (cacheIdiomas[lang]) {
    aplicarIdioma(cacheIdiomas[lang], lang);
    return;
  }

  const res = await fetch(`idiomas/${lang}.json`);
  const textos = await res.json();
  cacheIdiomas[lang] = textos;

  aplicarIdioma(textos, lang);
}

function aplicarIdioma(textos, lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.innerHTML = textos[el.dataset.i18n];
  });

  document.querySelectorAll("meta[data-i18n]").forEach(meta => {
    meta.setAttribute("content", textos[meta.dataset.i18n]);
  });

  document.documentElement.lang = lang;
}

function setIdioma(lang) {
  localStorage.setItem("idioma", lang);
  cargarIdioma(lang);
}

document.getElementById("lang").addEventListener("change", e => {
  setIdioma(e.target.value);
});

const guardado = localStorage.getItem("idioma");
const nav = navigator.language.slice(0,2);
const soportados = ["es","pt","en"];

const inicial = guardado ?? (soportados.includes(nav) ? nav : "es");
cargarIdioma(inicial);
document.getElementById("lang").value = inicial;

// Botones del carrusel //
const carousel = document.querySelector('.carousel');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

const card = document.querySelector('.card');
const cardWidth = card.offsetWidth + 20;

function updateButtons() {
  prevBtn.classList.toggle('disabled', carousel.scrollLeft === 0);
  nextBtn.classList.toggle('disabled', carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth);
};

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: card.offsetWidth, behavior: 'smooth' });
  setTimeout(updateButtons, 200);
});

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -card.offsetWidth, behavior: 'smooth' });
  setTimeout(updateButtons, 200); // esperar animación
});

carousel.addEventListener('scroll', updateButtons);

// inicialización
updateButtons();