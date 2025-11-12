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
      <li><strong>Position</strong>: ${project.roles}</li>
      <li><strong>Platforms</strong>: ${project.platforms}</li>
      <li><strong>Studio</strong>: ${project.studio}</li>
      <li><strong>Year</strong>: ${project.year}</li>
      <li><strong>Project URL</strong>: <a href="${project.storePage}" target="_blank" rel="noopener noreferrer">${project.title} Store Page</a></li>
    `;
    }

    // 📝 DESCRIPCIÓN
    const descBox = document.querySelector(".portfolio-description p");
    if (descBox) {
        descBox.textContent = project.description;
    }
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

    // 🧪 EMOJI en el título o encabezado
    if (titleElement && project.emoji) {
        titleElement.textContent = `${project.emoji} ${project.title}`;
    }

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

        if (!shadow || !divider) {
            console.warn("❌ No se encontraron los elementos .section-divider-shadow o .section-divider");
            return;
        }

        if (!project.dividerShape) {
            console.warn("⚠️ Este proyecto no tiene definida la propiedad dividerShape");
            return;
        }

        //console.log("✅ Aplicando divider:", project.dividerShape);


        // Clean previous classes (any "divider-*")
        shadow.classList.forEach(cls => {
            if (cls.startsWith("divider-")) shadow.classList.remove(cls);
        })
        divider.classList.forEach(cls => {
            if (cls.startsWith("divider-")) divider.classList.remove(cls);
        });

        // Aplly new divider shape
        shadow.classList.add(project.dividerShape);
        divider.classList.add(project.dividerShape);

    }

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
