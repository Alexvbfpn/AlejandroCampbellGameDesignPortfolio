document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main.project-theme");
    if (!main) return;

    const theme = [...main.classList].find(cls =>!["main", "project-theme", "default"].includes(cls));
    if (!theme) return;

    applyProjectTheme(theme)

    //endregion DYNAMIC DIVIDERS END
});

function applyProjectTheme(theme) {

    // Encuentra el proyecto correspondiente
    const project = projects.find(p => p.theme === theme);
    if (!project) {
        console.warn("No se encontró un proyecto para el tema:", theme);
        return;
    }

    // 🧾 TÍTULOS
    const titleElement = document.querySelector(".page-title h1");
    const breadcrumbCurrent = document.querySelector(".breadcrumbs .current");
    if (titleElement) titleElement.textContent = project.title;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = project.title;

    // 🧠 PORTFOLIO INFO
    const infoBox = document.querySelector(".portfolio-info ul");
    if (infoBox) {
        infoBox.innerHTML = `
      <li><strong>Category</strong>: ${project.category}</li>
      <li><strong>Genre</strong>: ${project.genre}</li>
      <li><strong>Position</strong>: ${project.roles}</li>
      <li><strong>Platforms</strong>: ${project.platforms}</li>
      <li><strong>Studio</strong>: ${project.studio}</li>
      <li><strong>Year</strong>: ${project.year}</li>
      <li><strong>Project URL</strong>: <a href="${project.storePage}" target="_blank" rel="noopener noreferrer">${project.title} Store Page</a></li>
    `;
    }

    // 📝 DESCRIPCIÓN
    /*
    const descBox = document.querySelector(".portfolio-description p");
    if (descBox) {
        descBox.textContent = project.description;
    }
     */


    //region --- 🎥 TRAILER ---
    const trailerFrame = document.querySelector(".video-showcase iframe");
    const trailerHeader = document.querySelector(".video-showcase h2");
    if (trailerFrame) {
        if (project.trailerURL) {
            // Transición suave al cambiar el vídeo
            trailerFrame.classList.add("fade-out");
            setTimeout(() => {
                trailerFrame.src = project.trailerURL;
                trailerFrame.classList.remove("fade-out");
                trailerFrame.classList.add("fade-in");
            }, 300); // tiempo de fade out
        } else {
            // Si no hay trailer, se oculta toda la sección
            const videoSection = document.querySelector(".video-showcase");
            if (videoSection) videoSection.style.display = "none";
        }
    }
    trailerHeader.textContent = `${project.title} Trailer`

    setTimeout(() => trailerFrame.classList.remove("fade-in"), 600);

    //endregion TRAILER

    //region --- DYNAMIC BULLET LIST SYMBOLS (EMOJIS OR IMAGE) ---

    // 🧪 EMOJI en el título o encabezado
    if (titleElement && project.emoji) {
        titleElement.textContent = `${project.emoji} ${project.title}`;
    }

    // 📌 ICONOS DINÁMICOS DE LISTA (pero controlados desde HTML)
    document.querySelectorAll(".custom-project-list").forEach(ul => {
        const forced = ul.dataset.iconType; // "image" o undefined

        if (forced === "image") {
            // Modo imagen
            if (project.listIconImage) {
                ul.style.setProperty("--list-image", `url("${project.listIconImage}")`);
            }
            ul.style.removeProperty("--list-icon");
        } else {
            // Modo emoji
            const emoji = project.emoji || "•";
            ul.style.setProperty("--list-icon", `"${emoji}"`);
            ul.style.removeProperty("--list-image");
        }
    });
    /* OLD
    document.querySelectorAll(".custom-project-list").forEach(ul => {

        const type = ul.dataset.iconType; // "image", "emoji" o undefined

        if (type === "image") {
            // Forzar imagen
            if (project.listIconImage) {
                ul.style.setProperty("--list-image", `url("${project.listIconImage}")`);
            }
            ul.style.setProperty("--list-icon", "''");
            return;
        }

        // Si type === "emoji" o si no hay type → usar emoji
        if (project.emoji) {
            ul.style.setProperty("--list-icon", `'${project.emoji}'`);
        }

        // limpiar imagen por si acaso
        ul.style.removeProperty("--list-image");
    });
     */

    //endregion emojis

    //region --- DYNAMIC DIVIDERS ---

    const dividerWrapper = document.querySelector(".section-divider-wrapper");

    if (!dividerWrapper) {
        console.warn("❌ No se encontró .section-divider-wrapper en el DOM");
        return;
    }

    if(dividerWrapper && project.dividerShape) {
        // Select the classes or html regions we want to change its divider class
        const shadow = dividerWrapper.querySelector(".section-divider-shadow");
        const divider = dividerWrapper.querySelector(".section-divider");

        if (!shadow && !divider) {
            console.warn("❌ No se encontraron los elementos .section-divider-shadow o .section-divider");
            return;
        }

        if (!project.dividerShape) {
            console.warn("⚠️ Este proyecto no tiene definida la propiedad dividerShape");
            return;
        }

        //console.log("✅ Aplicando divider:", project.dividerShape);
        // Clean previous classes (any "divider-*")
        divider.classList.forEach(cls => {
            if (cls.startsWith("divider-")) divider.classList.remove(cls);
        });

        // Aplly new divider shape
        divider.classList.add(project.dividerShape);

        if(!shadow) return;

        // Aplly new divider shadow shape
        shadow.classList.add(project.dividerShape);
        // Clean previous classes (any "divider-*")
        shadow.classList.forEach(cls => {
            if (cls.startsWith("divider-")) shadow.classList.remove(cls);
        })

    }

    //endregion DYNAMIC DIVIDERS

    /*
    // 🖼️ CARRUSEL DE IMÁGENES
    const swiperWrapper = document.querySelector(".portfolio-details-slider .swiper-wrapper");
    if (swiperWrapper && project.gallery?.length) {
        swiperWrapper.innerHTML = project.gallery
            .map(img => `<div class="swiper-slide"><img src="../${img}" alt="${project.title}"></div>`)
            .join("");
    }
     */

    /*
        // Reinit Swiper (si ya estaba inicializado por main.js)
        if (typeof Swiper !== "undefined") {
            new Swiper(".init-swiper", {
                loop: true,
                speed: 600,
                autoplay: { delay: 5000 },
                slidesPerView: "auto",
                pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
            });
        }
    */

}

// Ejemplo: botones de cambio de tema
document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;
        applyProjectTheme(theme);
    });
});

/* --- DISCARDED NEW CARRUSEL ---
    // 🖼️ CARRUSEL DE IMÁGENES
    const swiperWrapper = document.querySelector(".portfolio-details-slider .swiper-wrapper");
    if (swiperWrapper && project.gallery?.length) {
        swiperWrapper.innerHTML = project.gallery
            .map(img => `<div class="swiper-slide"><img src="../${img}" alt="${project.title}"></div>`)
            .join("");

        // Inicializar Swiper después de crear los slides
        if (typeof Swiper !== "undefined") {
            new Swiper(".portfolio-details-slider.init-swiper", {
                loop: true,
                speed: 600,
                slidesPerView: "auto",
                autoplay: { delay: 5000 },
                pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                    clickable: true,
                },
                observer: true,
                observeParents: true,
            });
        }
    }
    /*
    // Reinit Swiper (si ya estaba inicializado por main.js)
    if (typeof Swiper !== "undefined") {
        new Swiper(".init-swiper", {
            loop: true,
            speed: 600,
            autoplay: { delay: 5000 },
            slidesPerView: "auto",
            pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
        });
    }*/
