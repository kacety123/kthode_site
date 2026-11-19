const root = document.documentElement;
const savedTheme = localStorage.getItem("kris-site-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const themeButton = document.createElement("button");

root.dataset.theme = savedTheme || preferredTheme;
themeButton.className = "theme-toggle";
themeButton.type = "button";
themeButton.addEventListener("click", () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    localStorage.setItem("kris-site-theme", theme);
    updateThemeButton();
});

function updateThemeButton() {
    const isDark = root.dataset.theme === "dark";
    themeButton.textContent = isDark ? "Use light theme" : "Use dark theme";
    themeButton.setAttribute("aria-label", themeButton.textContent);
}

updateThemeButton();
document.querySelector("header")?.append(themeButton);

document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const button = dropdown.querySelector(".dropbtn");

    if (!button) return;

    button.addEventListener("click", () => {
        const isOpen = dropdown.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("is-open");
            button.setAttribute("aria-expanded", "false");
        }
    });

    dropdown.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            dropdown.classList.remove("is-open");
            button.setAttribute("aria-expanded", "false");
            button.focus();
        }
    });
});
