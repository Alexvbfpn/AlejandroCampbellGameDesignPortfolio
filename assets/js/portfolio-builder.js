document.addEventListener("DOMContentLoaded", () => {

    //const container = document.getElementById("portfolio-grid");
    const grid = document.querySelector("#portfolio-grid");

    //if (!container) return;
    if (!grid) return;

    projects.forEach(project => {
        const item = document.createElement("div");
        item.className = `col-md-4 col-sm-6 col-xs-12 item-space portfolio-content portfolio-item isotope-item ${project.category}`;
        item.innerHTML = `
          <figure >
            <img src="${project.image}" alt="${project.title}">
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