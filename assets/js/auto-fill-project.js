document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main.project-theme");
    if (!main) return;

    const theme = [...main.classList].find(cls =>!["main", "project-theme", "default"].includes(cls));
    if (!theme) return;

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
      <li><strong>Category</strong>: Video Game</li>
      <li><strong>Studio</strong>: ${project.studio}</li>
      <li><strong>Year</strong>: ${project.year}</li>
      <li><strong>Position</strong>: ${project.roles}</li>
      <li><strong>Project URL</strong>: <a href="${project.storePage}" target="_blank" rel="noopener noreferrer">${project.title} Store Page</a></li>
    `;
    }

    // 📝 DESCRIPCIÓN
    const descBox = document.querySelector(".portfolio-description p");
    if (descBox) {
        descBox.textContent = project.description;
    }

    // 🖼️ CARRUSEL DE IMÁGENES
    const swiperWrapper = document.querySelector(".portfolio-details-slider .swiper-wrapper");
    if (swiperWrapper && project.gallery?.length) {
        swiperWrapper.innerHTML = project.gallery
            .map(img => `<div class="swiper-slide"><img src="../${img}" alt="${project.title}"></div>`)
            .join("");
    }

    // 🧪 EMOJI en el título o encabezado
    if (titleElement && project.emoji) {
        titleElement.textContent = `${project.emoji} ${project.title}`;
    }

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
});