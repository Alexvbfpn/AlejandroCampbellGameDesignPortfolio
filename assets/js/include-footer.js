document.addEventListener("DOMContentLoaded", () => {
    fetch("footer.html")
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el footer");
            return response.text();
        })
        .then(data =>
        {
            document.getElementById("footer-container").innerHTML = data;

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