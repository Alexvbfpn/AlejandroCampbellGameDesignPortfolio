document.addEventListener("DOMContentLoaded", () => {

    // Detectar la carpeta base del sitio (funciona local y en GitHub Pages)
    const pathParts = window.location.pathname.split("/");
    const repoName = pathParts[1]; // en Pages: "AlejandroCampbellGameDesignPortfolio"
    const isLocal = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1");

    // Construimos la URL base dependiendo de si estamos en local o en Pages
    const basePath = isLocal ? "" : `/${repoName}`;

    // Ruta absoluta al header
    const headerPath = `${basePath}/header.html`;

    fetch(headerPath)
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el header");
            return response.text();
        })
        .then(data =>
        {
            document.getElementById("header-container").innerHTML = data;

            // Reejecuta los scripts del header (si la plantilla lo necesita)
            const scripts = document.querySelectorAll("#header-container script");
            scripts.forEach(oldScript => {
                const newScript = document.createElement("script");
                newScript.text = oldScript.text;
                document.body.appendChild(newScript);
                oldScript.remove();
            });
            document.dispatchEvent(new Event("headerLoaded"))

            const homeLink = document.getElementById("home-link");

            if (homeLink) {
                const path = window.location.pathname;
                const isHomePage =
                    path.endsWith("index.html") ||
                    path === "/" ||
                    path === "/AlejandroCampbellGameDesignPortfolio/";

                homeLink.setAttribute("href", isHomePage ? "#hero" : "/AlejandroCampbellGameDesignPortfolio/index.html");
            }

        })
        .catch(err => console.error(err));
});