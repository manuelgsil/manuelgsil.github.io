const scrollingFrame = document.getElementById('scrollingFrame');
let scrollInterval;

// Espera a que el iframe esté listo
window.addEventListener('message', (event) => {
    if (event.data === 'iframeReady') {
        scrollDown();
    }
});

// Función para realizar el scroll en el iframe
function scrollDown() {
    clearInterval(scrollInterval); // Limpia el intervalo previo si existe

    const iframeDocument = scrollingFrame.contentDocument || scrollingFrame.contentWindow.document;

    // Maneja los clics en los enlaces dentro del iframe
    iframeDocument.querySelectorAll('.gr_grid_book_container a').forEach((link) => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace

            const url = this.getAttribute('href');
            window.open(url, '_blank'); // Abre el enlace de Goodreads en una nueva pestaña
        });
    });

    if (!scrollInterval) {
        scrollInterval = setInterval(() => {
            scrollingFrame.contentWindow.scrollBy(0, 2); // Desplaza el contenido hacia abajo
            if (scrollingFrame.contentWindow.scrollY >= scrollingFrame.contentDocument.body.clientHeight - scrollingFrame.clientHeight) {
                clearInterval(scrollInterval);
            }
        }, 40); // Intervalo de tiempo para el desplazamiento
    }

    scrollingFrame.addEventListener('mouseenter', stopScrolling);
    scrollingFrame.addEventListener('mouseleave', resumeScrolling);
}

function stopScrolling() {
    clearInterval(scrollInterval);
}

function resumeScrolling() {
    if (!scrollInterval) {
        scrollDown();
    }
}