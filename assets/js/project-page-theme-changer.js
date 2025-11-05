// project-page-theme-changer.js
document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".project-page");
    const buttons = document.querySelectorAll(".theme-btn");

    // Cargar tema guardado
    const savedTheme = localStorage.getItem("project-theme");
    if (savedTheme && savedTheme !== "default") {
        page.classList.add(savedTheme);
    }

    // Cambiar tema al hacer clic
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const theme = btn.dataset.theme;

            // Elimina cualquier clase de tema existente (sin tocar container/py-5)
            page.classList.remove("theme-blue", "theme-green", "theme-purple");

            // Aplica el nuevo tema si no es el default
            if (theme !== "default") {
                page.classList.add(theme);
            }

            // Guarda el tema seleccionado
            localStorage.setItem("project-theme", theme);
        });
    });
});