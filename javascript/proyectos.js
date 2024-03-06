const body = document.querySelector("body");
function establecertemaLocal() {
  const temaLocal = localStorage.getItem("tema");
  console.log("hola");
  if (temaLocal == "dark-theme") {
    body.classList.add("dark-theme");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  establecertemaLocal();
});
