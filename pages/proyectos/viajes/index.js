const json = [
  {
    id: 1,
    nombre: "Almería",
    coste_alojamiento: 12,
    coste_alimentacion: 22,
    imagen: "assets/img/almeria.jpg",
  },
  {
    id: 2,
    nombre: "Granada",
    coste_alojamiento: 143.2,
    coste_alimentacion: 22,
    imagen: "assets/img/granada.jpg",
  },
  {
    id: 3,
    nombre: "Sevilla",
    coste_alojamiento: 95.5,
    coste_alimentacion: 25,
    imagen: "assets/img/sevilla.jpg",
  },
  {
    id: 4,
    nombre: "Córdoba",
    coste_alojamiento: 75.8,
    coste_alimentacion: 20,
    imagen: "assets/img/cordoba.jpg",
  },
  {
    id: 5,
    nombre: "Málaga",
    coste_alojamiento: 135.6,
    coste_alimentacion: 30,
    imagen: "assets/img/malaga.jpg",
  },
  {
    id: 6,
    nombre: "Madrid",
    coste_alojamiento: 200.3,
    coste_alimentacion: 35,
    imagen: "assets/img/madrid.jpg",
  },
  {
    id: 7,
    nombre: "Barcelona",
    coste_alojamiento: 220.5,
    coste_alimentacion: 40,
    imagen: "assets/img/barcelona.jpg",
  },
];

/**
 * @return {HTML}
 *  Devuelve el html básico de la aplicacion:
 *  Contenedores generales y carrousel
 */
// FUNCIONES HTML
function generarHTML() {
  /*********  ESTRUCTURA **********************************************
   *                                                                  *
   * 1. CREAMOS LOS DISTINTOS ELEMENTOS QUE CONFORMARAN NUESTRA APP   *
   *    WRAP                                                          *
   *      HEADER -> h1                                                *
   *        SECTION (CARROUSEL / CONTENEDOR VIAJES)                   *
   *          contenedor de cards                                     *
   *              cards(destinos)                                     *
   *      SECTION (CONTENEDOR CALCULADORA)                            *
   *        H1                                                        *
   *        calculadora                                               *
   *        ciudades                                                  *
   *            (generarCiudades()).JS                                *
   *        coste total                                               *
   *          px2                                                     *
   *          button                                                  *
   *      FOOTER                                                      *
   * 2. Realizamos la anidacion necesaria en cada elemento            *
   * 3.  Generamos los destinos iterando en el  json                  *
   *                                                                  */
  // IMPORTANTE AÑADIR LOS NOMBRES CLASES DE CSS YA PREPARADOS
  // WRAPER
  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  let header = document.createElement("header");
  let headerH1 = document.createElement("h1");
  headerH1.textContent;
  let pHeaderH1 = document.createElement("p");
  pHeaderH1.textContent = "MGS 2024";
  headerH1.appendChild(pHeaderH1);
  header.appendChild(headerH1);
  wrapper.appendChild(header);
  // SECTION DESTINOS
  let sectionDestinosC = document.createElement("section");
  sectionDestinosC.classList.add("destinos");

  let carrousel = document.createElement("div");
  carrousel.classList.add("carrousel");
  sectionDestinosC.appendChild(carrousel);

  let botonAñadir = document.createElement("button");
  botonAñadir.setAttribute("id", "add");
  botonAñadir.textContent = "Añadir";
  sectionDestinosC.appendChild(botonAñadir);

  // LISTA DE PUNTOS
  let listaPuntos = document.createElement("ul");
  let puntoActivo = document.createElement("li");
  puntoActivo.classList.add("puntos", "activo");
  listaPuntos.appendChild(puntoActivo);
  // creamos el mismo numero de puntos que destinos disponibles

  for (let index = 0; index < 6; index++) {
    let punto = document.createElement("li");
    punto.classList.add("puntos");
    listaPuntos.appendChild(punto);
  }
  sectionDestinosC.appendChild(listaPuntos);

  // Creamos las cards del carrusel
  json.forEach((destino) => {
    // Crear el elemento div destino
    let divDestino = document.createElement("div");
    divDestino.classList.add("destino");
    divDestino.setAttribute(
      "id",
      `${destino.id}`
    ); /* Le añadimos el id, es importante para recoger su info */

    // Crear los elementos img, h1, p, span y button
    let img = document.createElement("img");
    let h1 = document.createElement("h1");
    let pAlojamiento = document.createElement("p");
    let pAlimentacion = document.createElement("p");
    let spanAlojamiento = document.createElement("span");
    let spanAlimentacion = document.createElement("span");

    // Asignamos los valores de los atributos del objeto JSON a los elementos correspondientes
    img.setAttribute("src", `${destino.imagen}`);
    img.setAttribute("alt", "imagen de " + `${destino.nombre}`);
    h1.textContent = destino.nombre;
    pAlojamiento.textContent = "Precio alojamiento ";
    spanAlojamiento.textContent = destino.coste_alojamiento + "€";
    pAlimentacion.textContent = "Precio alimentacion ";
    spanAlimentacion.textContent = destino.coste_alimentacion + "€";

    // Establecemos los atributos de datos para el elemento div destino
    divDestino.dataset.nombre = destino.nombre;
    divDestino.dataset.pAlojamiento = destino.coste_alojamiento;
    divDestino.dataset.pAlimentacion = destino.coste_alimentacion;
    // Terminamos añadiendo los elementos en el sitio correspondiente
    divDestino.appendChild(img);
    divDestino.appendChild(h1);
    pAlojamiento.appendChild(spanAlojamiento);
    pAlimentacion.appendChild(spanAlimentacion);
    divDestino.appendChild(pAlojamiento);
    divDestino.appendChild(pAlimentacion);

    // Agregar el div al contenedor
    carrousel.appendChild(divDestino);
  });

  wrapper.appendChild(sectionDestinosC);

  // SEGUNDA SECTION

  let sectionCalculadora = document.createElement("section");
  sectionCalculadora.classList.add("contenedor-calculadora");
  let encabezadoh1 = document.createElement("h1");
  encabezadoh1.textContent = "¡Elige tu destino!";
  sectionCalculadora.appendChild(encabezadoh1);

  let divCalculadora = document.createElement("div");
  divCalculadora.classList.add("calculadora");

  let contenedorCiudadesEscogidas = document.createElement("div");
  contenedorCiudadesEscogidas.classList.add("ciudades");
  let divCosteTotal = document.createElement("div");
  divCosteTotal.classList.add("coste-total");

  let parrafoAlimentacion = document.createElement("p");
  let spanTotalAlimentacion = document.createElement("span");
  spanTotalAlimentacion.setAttribute("id", "totalAlimentacion");
  parrafoAlimentacion.textContent = "Coste Alimentacion: ";
  parrafoAlimentacion.appendChild(spanTotalAlimentacion);

  let parrafoAlojamiento = document.createElement("p");
  let spanTotalAlojamiento = document.createElement("span");
  parrafoAlojamiento.textContent = "Coste Alojamiento: ";
  spanTotalAlojamiento.setAttribute("id", "totalAlojamiento");
  parrafoAlojamiento.appendChild(spanTotalAlojamiento);

  /* let botonCalcularCoste = document.createElement("button");
  botonCalcularCoste.setAttribute("id", "calcularCoste");
  botonCalcularCoste.textContent = "Calcular coste"; */

  divCosteTotal.appendChild(parrafoAlimentacion);
  divCosteTotal.appendChild(parrafoAlojamiento);

  //anexionamos en orden
  divCalculadora.appendChild(contenedorCiudadesEscogidas);
  divCalculadora.appendChild(divCosteTotal);
  /*   divCosteTotal.appendChild(botonCalcularCoste); */
  sectionCalculadora.appendChild(divCalculadora);
  wrapper.appendChild(sectionCalculadora);

  let footer = document.createElement("footer");
  let pFooter = document.createElement("p");
  pFooter.textContent = "MGS 2024";
  footer.appendChild(pFooter);
  wrapper.appendChild(footer);
  document.body.appendChild(wrapper);
}

function crearCiudadEscogida(arrinfoViaje) {
  // Creamos el div
  let ciudadEscogida = document.createElement("div");
  // le damos como id el nombre de destino, así podremos controlar que no se repitan
  ciudadEscogida.setAttribute("id", `${arrinfoViaje.nombre}`);
  // Añadimos todos los datos relacionados con la ciudad al dataset del elemento padre
  ciudadEscogida.dataset.pAlojamiento = arrinfoViaje.pAlojamiento;
  ciudadEscogida.dataset.pAlimentacion = arrinfoViaje.pAlimentacion;
  ciudadEscogida.dataset.nDias = "1"; // Inicializamos el número de días
  // Creamos el resto de elementos que vamos a anidar
  let encabezadoh3 = document.createElement("h3");
  // Generamos el contenido de los elementos a partir de los datos del dataset
  encabezadoh3.textContent = ciudadEscogida.getAttribute("id");
  // Anidamos el encabezado al contenedor ciudadEscogida
  ciudadEscogida.appendChild(encabezadoh3);
  // Creamos los elementos necesarios

  let divDatos = document.createElement("div");
  let pDias = document.createElement("p");
  let pCosteAlimentacion = document.createElement("p");
  let pCosteAlojamiento = document.createElement("p");
  let spanCosteAlimentacion = document.createElement("span");
  let spanCosteAlojamiento = document.createElement("span");
  let spanNumeroDias = document.createElement("span");

  spanCosteAlimentacion.setAttribute("id", "alimentacion");
  spanCosteAlojamiento.setAttribute("id", "alojamiento");
  spanNumeroDias.setAttribute("id", "dias");

  let botonRestarDias = document.createElement("button");
  botonRestarDias.setAttribute("id", "boton-restar");
  botonRestarDias.textContent = "➖";
  botonRestarDias.style.display = "none";

  let boton = document.createElement("button");
  boton.setAttribute("id", "remove");
  boton.addEventListener("click", handlerQuitar);
  // Le damos valor a los elementos
  pDias.textContent = "Días: ";

  spanNumeroDias.textContent = ciudadEscogida.dataset.nDias;
  pCosteAlimentacion.textContent = "Coste alimentación: ";
  spanCosteAlimentacion.textContent = ciudadEscogida.dataset.pAlimentacion;
  pCosteAlojamiento.textContent = "Coste alojamiento: ";
  spanCosteAlojamiento.textContent = ciudadEscogida.dataset.pAlojamiento;
  pCosteAlimentacion.appendChild(spanCosteAlimentacion);
  pCosteAlojamiento.appendChild(spanCosteAlojamiento);
  boton.textContent = "QUITAR";
  // Anexamos los elementos
  pDias.appendChild(spanNumeroDias);
  pDias.appendChild(botonRestarDias);

  divDatos.appendChild(pDias);
  divDatos.appendChild(pCosteAlimentacion);
  divDatos.appendChild(pCosteAlojamiento);
  ciudadEscogida.appendChild(divDatos);
  ciudadEscogida.appendChild(boton);
  ciudadEscogida.classList.add("ciudad-escogida");
  document.querySelector(".ciudades").appendChild(ciudadEscogida);
}

// FIN FUNCIONES HTML

generarHTML();
/*  Una vez generado nuestro HTML BASICO, seleccionamos 
aquellos elementos que necesitamos para dotar
a la pagina de cierto dinamismo 
*/
const puntos = document.querySelectorAll(".puntos");
const carrousel = document.querySelector(".carrousel");
const destinos = document.querySelectorAll(".destinos");
const botonAñadir = document.querySelector("#add");
const spanTotalAlimentacion = document.querySelector("#totalAlimentacion");
const spanTotalAlojamiento = document.querySelector("#totalAlojamiento");
const arrPuntos = Array.from(puntos); // lo convertimos a array para trabajar con las funciones predefinidas del obj ARRAY
let mensajeh1 = document.querySelector(".contenedor-calculadora > h1");

/* Logica carrousel
  
 1. Necesitamos multiplicar el numero total de elementos 
      que habrá por 100, en nuestro caso 7.
  2.  Este número habrá que aplicarlo como ancho al contenedor -> 700%
  3.  El ancho de cada elemento  dentro del carrousel será
      un width equivalente a 100 / entre el total de elementos -> 100 / 7 = 14,28
      // por comodidad el ancho de cada elemento ya está aplicado en el CSS

  4. En la lista que tenemos con la clase "puntos" añadimos eventos tipo click.
    Estos puntos nos sirven para navegar por las imagenes. Tendremos el mismo
    número de puntos que elementos.  
    Nos apoyaremos en las clases de CSS que hemos definido : PUNTOS ACTIVO

  5. iteramos sobre los puntos creando el evento y definiendo que una vez que se pulse
    se acceda a la propiedad transform y al atributo translateX
    Teniendo acceso al indice podremos calcular el % de movimiento que necesitamos
    para acceder al destino que corresponda.
  */
const porcentajeMovimientoX = -14.28; // Calculamos el valor una vez y lo almacenamos en una constante

let calcularTamañoCarrusel = json.length * 100;
carrousel.style.width = `${calcularTamañoCarrusel}%`;
arrPuntos.forEach((punto, indice) => {
  punto.addEventListener("click", () => {
    let calcularImagen = indice * porcentajeMovimientoX;
    carrousel.style.transform = `translateX(${calcularImagen}%)`;
    arrPuntos[indiceActivo()].classList.remove("activo"); // Eliminamos la clase activo del punto q esté activo previamente
    punto.classList.add("activo"); // y añadimos la clase activo solo al punto clickeado
  });
});

// logica botones
botonAñadir.addEventListener("click", handlerAñadirViaje);
/* let botonCalcularCoste = document.querySelector("#calcularCoste");
botonCalcularCoste.addEventListener("click", calcularCoste); */

/**
 * Esta funcion nos permite actualizar los datos de coste y en el dataset de la carta. 
 * @param {Elemento html} ciudad  elemento html sobre el cual trabajaremos. Recogemos su dataset para modificarlos
 * @param {obj jason} infoViaje obj que contiene la informacion que necesitamos de cada viaje (para restar y sumar)
 * @param {boolean} sumar  por defecto en true, para la llamada del evento añadirViaje. Anidamos dos formas de trabajar en esta funcion (Suma y resta)
 */
function actualizarDatos(ciudad, infoViaje, sumar = true) {
  let botonRestarDias = ciudad.querySelector("#boton-restar");
  let diasAcuales = parseInt(ciudad.dataset.nDias);
  let precioDiaAlojamiento = parseFloat(infoViaje.pAlojamiento);
  let precioDiaAlimentacion = parseFloat(infoViaje.pAlimentacion);
  let nDias = 0;
  let precioTotalAlimentacion;
  let precioTotalAlojamiento;
  // ocultamos boton si llega a 1
  if (sumar) {
    precioTotalAlojamiento = (
      parseFloat(ciudad.dataset.pAlojamiento) + precioDiaAlojamiento
    ).toFixed(2);
    precioTotalAlimentacion = (
      parseFloat(ciudad.dataset.pAlimentacion) + precioDiaAlimentacion
    ).toFixed(2);
    nDias = diasAcuales + 1;
  } else {
    precioTotalAlojamiento = (
      parseFloat(ciudad.dataset.pAlojamiento) - precioDiaAlojamiento
    ).toFixed(2);
    precioTotalAlimentacion = (
      parseFloat(ciudad.dataset.pAlimentacion) - precioDiaAlimentacion
    ).toFixed(2);
    nDias = diasAcuales - 1;
  }

  if (nDias == 1) {
    botonRestarDias.style.display = "none";
  } else {
    botonRestarDias.style.display = "block";
    botonRestarDias.addEventListener("click", handlerRestarDia);
  }
  // Actualizar los datos con los nuevos valores
  ciudad.dataset.pAlojamiento = precioTotalAlojamiento;
  ciudad.dataset.pAlimentacion = precioTotalAlimentacion;
  ciudad.dataset.nDias = nDias;

  ciudad.querySelector("#dias").textContent = nDias;
  ciudad.querySelector("#alojamiento").textContent = precioTotalAlojamiento;
  ciudad.querySelector("#alimentacion").textContent = precioTotalAlimentacion;
  calcularCoste();
}

/**
 * Funcion por la cual recogemos todas las ciudades que hay y actualizamos el coste total en los span correspondientes
 */
function calcularCoste() {
  let ciudadesEscogidas = document.querySelectorAll(".ciudad-escogida");
  let costeTotalAlojamiento = 0;
  let costeTotalAlimentacion = 0;

  if (ciudadesEscogidas != null) {
    ciudadesEscogidas.forEach((ciudad) => {
      costeTotalAlojamiento += parseFloat(ciudad.dataset.pAlojamiento);
      costeTotalAlimentacion += parseFloat(ciudad.dataset.pAlimentacion);
    });
    mensajeh1.textContent =
      ciudadesEscogidas.length > 0 ? "Calculando gastos..." : "¡Elige tu destino!";
  }

  spanTotalAlimentacion.textContent = costeTotalAlimentacion.toFixed(2);
  spanTotalAlojamiento.textContent = costeTotalAlojamiento.toFixed(2);
}
/**
 * Manejador de evento para el boton de añadir. Cogemos la carta según el indice que tenga activo en el carrousel y accedemos
 * a su dataset. Con ello creamos un objeto con la informacion
 * 
 * Tambien controlamos los duplicados (si existe, se suma)
 */
function handlerAñadirViaje() {
  let viajeSeleccionado = document.getElementById(`${indiceActivo() + 1}`); //con esto conseguimos el viaje segun su indice en el JSON
  const infoViaje = {
    nombre: viajeSeleccionado.dataset.nombre,
    pAlojamiento: viajeSeleccionado.dataset.pAlojamiento,
    pAlimentacion: viajeSeleccionado.dataset.pAlimentacion,
  };

  let ciudad = document.querySelector(`#${infoViaje.nombre}`);
  if (ciudad != null) {
    actualizarDatos(ciudad, infoViaje, true);
  } else {
    crearCiudadEscogida(infoViaje);
    calcularCoste();
  }
}

function handlerQuitar(e) {
  let boton = e.target;
  let cartaViaje = boton.parentElement; // accedemos al elemento padre, en este caso la carta q contiene la informacion
// agregamos una clase que nos permita añadirle una transicion y el borrado no sea tan brusco
  cartaViaje.classList.add("eliminando");
  // Esperamos a que termine la transición y luego eliminamos la carta
  cartaViaje.addEventListener("transitionend", function () {
    cartaViaje.remove();
    calcularCoste();
  });
}

function handlerRestarDia(e) {
  let boton = e.target;
  let carta = boton.closest(".ciudad-escogida"); // con closest puedo subir en la jerarquia buscando algo mas concreto
  let nombreDestino = carta.getAttribute("id");
  let infoViaje = obtenerCostes(nombreDestino);
  actualizarDatos(carta, infoViaje, false);
  calcularCoste();
}

/// FUNCIONES AUXILIARES
/**
 * 
 * @param {string} nombreDestino 
 * @returns  un objeto con la informacion del viaje extraida del json
 */
function obtenerCostes(nombreDestino) {
  const viajeEncontrado = json.find((viaje) => viaje.nombre == nombreDestino);
  arrinfoViaje = {
    pAlojamiento: viajeEncontrado.coste_alojamiento,
    pAlimentacion: viajeEncontrado.coste_alimentacion,
  };
  return arrinfoViaje;
}

/**
 *  funcion aux para averiguar cual es el indice activo.
 * @returns el indice activo
 */
function indiceActivo() {
  return arrPuntos.findIndex((punto) => punto.classList.contains("activo")); // le sumamos x q empieza en 0
}
