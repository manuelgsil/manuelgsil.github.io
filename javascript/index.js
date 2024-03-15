const botonSwitch = document.querySelector("#switch");
const body = document.querySelector("body");
const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function detectarPreferenciaColor() {
  if (darkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (event.matches) {
        //dark theme
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        //light theme
        document.documentElement.setAttribute("data-theme", "light");
      }
    });
}

function establecertemaLocal() {
  const temaLocal = localStorage.getItem("tema");
  if (temaLocal == "dark-theme") {
    body.classList.add("dark-theme");
    botonSwitch.checked = true; // Marcamos el switch si el tema guardado es oscuro
  }
}

// Establecer el tema guardado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  establecertemaLocal();
});

// Manejador de evento para cambiar el tema y guardar la preferencia en el localStorage
botonSwitch.addEventListener("click", () => {
  if (botonSwitch.checked) {
    // Agregar la clase "dark-theme" al elemento body
    body.classList.add("dark-theme");
    localStorage.setItem("tema", "dark-theme"); // Guardar tema en localStorage
  } else {
    // Remover la clase "dark-theme" del elemento body
    body.classList.remove("dark-theme");
    localStorage.removeItem("tema"); // Eliminar tema guardado del localStorage
  }
});
