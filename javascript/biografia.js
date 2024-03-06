const scroller = document.querySelectorAll(".scroller");
const body = document.querySelector("body");
if (!window.matchMedia("(pefers-reduced-motion:reduce)").matches);
addAnimation();

function addAnimation() {
  scroller.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);
    const scrollerIner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerIner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerIner.appendChild(duplicatedItem);
    });
  });
}

const intereses = [
  { icono: "📊", nombre: "Análisis de Datos" },
  { icono: "📈", nombre: "Visualización de Datos" },
  { icono: "🌐", nombre: "Web Scraping" },
  { icono: "👾", nombre: "Hacking" },
  { icono: "🔐", nombre: "Seguridad Informática" },
  { icono: "👨‍💻", nombre: "Desarrollo Web" },
  { icono: "💾", nombre: "Bases de Datos" },
  { icono: "📜", nombre: "Historia" },
  { icono: "🧠", nombre: "Filosofía" },
  { icono: "🥦", nombre: "Vegan" },
  { icono: "🎨", nombre: "Diseño" },
  { icono: "💻", nombre: "Programación" },
  { icono: "📚", nombre: "Literatura" }
];

const listaIntereses = document.getElementById("lista-intereses");

intereses.forEach((interes) => {
  const li = document.createElement("li");
  li.innerHTML = `<span>${interes.icono}</span> <span class="hashtag">#${interes.nombre}</span>`;
  listaIntereses.appendChild(li);
});

function establecertemaLocal() {
  const temaLocal = localStorage.getItem("tema");
  if (temaLocal == "dark-theme") {
    body.classList.add("dark-theme");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  establecertemaLocal();
});