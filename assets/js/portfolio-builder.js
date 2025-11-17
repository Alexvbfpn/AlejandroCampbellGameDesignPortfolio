document.addEventListener("DOMContentLoaded", () => {

    //const container = document.getElementById("portfolio-grid");
    const grid = document.querySelector("#portfolio-grid");

    //if (!container) return;
    if (!grid) return;

    projects.forEach(project => {
        const item = document.createElement("div");
        item.className = `col-md-4 col-sm-6 col-xs-12 item-space portfolio-content portfolio-item isotope-item ${project.categoryFilter}`;
        item.innerHTML = `
          <figure>
            <img src="${project.coverImage}" alt="${project.title}">
            <div class="portfolio-info">
              <h4>${project.year}</h4>
              <span class="studio">${project.studio}</span>
              <figcaption>
                <h3>${project.title}</h3>
                <span>${project.roles}</span>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="button">Take a look</a>
              </figcaption>
            </div>
          </figure>
        `;
        grid.appendChild(item);
        
        //container.insertAdjacentHTML("beforeend", html);
    });

    // 🔹 Reinicializa Isotope después de añadir los elementos
    const iso = new Isotope(grid, {
        itemSelector: ".portfolio-item",
        layoutMode: "masonry"
    });

    // Esperar a que las imágenes carguen antes de hacer el layout
    imagesLoaded(grid, () => {
        iso.layout();
    });

    //PARA FUNCIONAMIENTO DE CAJAS EN MOBILE
    enableMobilePortfolioBehavior();

    // 🔹 Configura los filtros
    const filters = document.querySelectorAll("#portfolio-filters li");
    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            filters.forEach(b => b.classList.remove("filter-active"));
            btn.classList.add("filter-active");

            const filterValue = btn.getAttribute("data-filter");
            iso.arrange({filter: filterValue});
        });
    });



    // 🔹 Reinicia Glightbox (para que reconozca los nuevos elementos)
    GLightbox({ selector: ".glightbox" });



});

function enableMobilePortfolioBehavior(mode = 'A') {
    // mode: 'A' = tap abre/ciierra overlay
    //       'B' = 1º tap abre, 2º tap en la misma navega
    //       'C' = tap navega directamente (pero cerramos previos)
    const MOBILE_MODE = mode; // puedes llamarla con enableMobilePortfolioBehavior('B') si quieres

    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) return; // no interferir con desktop (hover)

    let lastFigure = null;

    function closeAll() {
        // quitar clase de figures y de portfolio-item por si se puso en cualquiera de los dos
        document.querySelectorAll('.cs-hover').forEach(el => el.classList.remove('cs-hover'));
        lastFigure = null;
    }

    // Delegación: un solo listener en el padre
    grid.addEventListener('click', (ev) => {
        const btn = ev.target.closest('a.button');
        if (btn) {
            // Si se ha pulsado el botón "Take a look" -> abrir y evitar burbujeo
            ev.preventDefault();
            ev.stopPropagation();
            window.open(btn.href, '_blank'); // _self si prefieres misma pestaña
            return;
        }

        const item = ev.target.closest('.portfolio-item');
        if (!item) return; // click fuera de items

        const fig = item.querySelector('figure') || item; // por si la estructura varía
        const link = item.querySelector('a.button') ? item.querySelector('a.button').href : null;
        const isOpen = fig.classList.contains('cs-hover');

        // Si queremos modo C (navega directamente)
        if (MOBILE_MODE === 'C') {
            if (link) {
                closeAll();
                window.open(link, '_blank');
                return;
            } else {
                // fallback: toggle visual
                if (isOpen) {
                    fig.classList.remove('cs-hover');
                    item.classList.remove('cs-hover');
                    lastFigure = null;
                } else {
                    closeAll();
                    fig.classList.add('cs-hover');
                    item.classList.add('cs-hover');
                    lastFigure = fig;
                }
                return;
            }
        }

        // MODO B: 1º abre, 2º tap en misma tarjeta -> navega
        if (MOBILE_MODE === 'B') {
            if (isOpen) {
                if (link) {
                    closeAll();
                    window.open(link, '_blank');
                    return;
                } else {
                    fig.classList.remove('cs-hover');
                    item.classList.remove('cs-hover');
                    lastFigure = null;
                    return;
                }
            } else {
                // abrir la tarjeta (cerrando previamente cualquier otra)
                closeAll();
                fig.classList.add('cs-hover');
                item.classList.add('cs-hover');
                lastFigure = fig;
                return;
            }
        }

        // MODO A: toggle simple (abrir/cerrar)
        if (MOBILE_MODE === 'A') {
            if (isOpen) {
                // si ya está abierta, cerrarla
                fig.classList.remove('cs-hover');
                item.classList.remove('cs-hover');
                lastFigure = null;
            } else {
                // cerramos cualquier otra abierta y abrimos ésta
                closeAll();
                fig.classList.add('cs-hover');
                item.classList.add('cs-hover');
                lastFigure = fig;
            }
            return;
        }
    });

    // clic fuera del grid -> cerrar
    document.addEventListener('click', (ev) => {
        if (!ev.target.closest('.portfolio-item')) closeAll();
    });

    // por si quieres depurar: (descomenta para logs)
    grid.addEventListener('click', () => console.log('click delegación'));
}


/*
function enableMobilePortfolioBehavior() {
    // MODOS: 'A' = tocar abre/cierrar overlay (solo overlay)
    //        'B' = 1º tap abre overlay, 2º tap navega al link
    //        'C' = tocar navega directamente al link (pero igual cerramos overlays previos)
    const MOBILE_MODE = 'A'; // cambia aquí a 'A' o 'B' si quieres otro comportamiento

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) return; // sólo aplicar en pantallas táctiles (evita interferir con hover de escritorio)

    const items = Array.from(document.querySelectorAll('.portfolio-item'));
    let lastFigure = null;

    // helper: cerrar cualquier overlay abierto
    const closeAll = () => {
        document.querySelectorAll('.cs-hover').forEach(el => el.classList.remove('cs-hover'));
        lastFigure = null;
    };

    items.forEach(item => {
        const fig = item.querySelector('figure');
        const btn = item.querySelector('a.button'); // "Take a look"
        const link = btn ? btn.href : null;

        // Asegúrate de que el botón abra el proyecto y NO propague el click al figure
        if (btn) {
            btn.addEventListener('click', (ev) => {
                ev.stopPropagation();       // evita que el figure reciba el click
                // abre en nueva pestaña (cambia a '_self' si prefieres misma pestaña)
                window.open(btn.href, '_blank');
            });
        }

        // click/tap sobre la figura
        fig.addEventListener('click', (ev) => {
            // cerramos cualquier tarjeta abierta distinta antes de hacer nada
            if (lastFigure && lastFigure !== fig) {
                lastFigure.classList.remove('cs-hover');
                lastFigure = null;
            }

            if (MOBILE_MODE === 'C') {
                // OPCIÓN C: navegar directamente al link y asegurarnos de cerrar previos
                // (si no hay link, togglear overlay como fallback)
                if (link) {
                    // importante prevenir comportamientos por defecto si hay <a> internos
                    ev.preventDefault();
                    closeAll(); // garantizamos que todo esté cerrado
                    window.open(link, '_blank');
                    return;
                }
                // fallback: si no hay link, abrir overlay
                fig.classList.toggle('cs-hover');
                lastFigure = fig.classList.contains('cs-hover') ? fig : null;
                return;
            }

            if (MOBILE_MODE === 'B') {
                // OPCIÓN B: 1º tap abre overlay, 2º tap sobre la misma figura -> navegar
                if (fig.classList.contains('cs-hover')) {
                    // ya abierto -> navegamos (si hay link)
                    if (link) {
                        ev.preventDefault();
                        window.open(link, '_blank');
                        return;
                    } else {
                        // si no hay link, cerramos
                        fig.classList.remove('cs-hover');
                        lastFigure = null;
                        return;
                    }
                } else {
                    // abrir overlay
                    ev.preventDefault();
                    fig.classList.add('cs-hover');
                    lastFigure = fig;
                    return;
                }
            }

            if (MOBILE_MODE === 'A') {
                // OPCIÓN A: tocar abre/cierra overlay (sin navegar)
                ev.preventDefault();
                const nowOpen = fig.classList.toggle('cs-hover');
                lastFigure = nowOpen ? fig : null;
                return;
            }
        });
    });

    // Cerrar overlays si se toca fuera del grid (opcional, UX más natural)
    document.addEventListener('click', (ev) => {
        // si el clic no está dentro de un .portfolio-item, cerramos todo
        if (!ev.target.closest('.portfolio-item')) {
            closeAll();
        }
    });
}
*/
