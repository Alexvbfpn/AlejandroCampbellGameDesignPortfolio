document.addEventListener("DOMContentLoaded", () => {
    fetch("../header.html")
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
        })
        .catch(err => console.error(err));
});