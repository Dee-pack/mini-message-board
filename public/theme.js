const root = document.documentElement;
const button = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");

button.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
        localStorage.setItem("theme", next);
    } catch (e) { }
});