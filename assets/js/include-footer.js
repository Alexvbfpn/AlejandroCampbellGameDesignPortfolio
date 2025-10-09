document.addEventListener("DOMContentLoaded", () => {

    const depth = window.location.pathname.split("/").length - 2;
    const prefix = depth > 0 ? "../".repeat(depth) : "";
    const footerPath = `${prefix}footer.html`;

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