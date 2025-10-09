document.addEventListener("DOMContentLoaded", () => {

    const pathParts = window.location.pathname.split("/");
    const repoName = pathParts[1];
    const isLocal = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1");
    const basePath = isLocal ? "" : `/${repoName}`;
    const footerPath = `${basePath}/footer.html`;

    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el footer");
            return response.text();
        })
        .then(data =>
        {
            document.getElementById("footer").innerHTML = data;

            // Reejecuta los scripts del footer (si la plantilla lo necesita)
            const scripts = document.querySelectorAll("#footer-container script");
            scripts.forEach(oldScript => {
                const newScript = document.createElement("script");
                newScript.text = oldScript.text;
                document.body.appendChild(newScript);
                oldScript.remove();
            });
            document.dispatchEvent(new Event("footerLoaded"))
        })
        .catch(err => console.error(err));
});