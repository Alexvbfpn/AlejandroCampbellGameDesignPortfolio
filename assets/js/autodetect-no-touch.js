document.addEventListener("DOMContentLoaded", () => {
    if (!('ontouchstart' in window)) {
        document.documentElement.classList.add('no-touch');
    }
});