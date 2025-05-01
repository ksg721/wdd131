const themeSelect = document.querySelector("#mode");
const logo = document.querySelector("#logo")

function changeTheme() {
    const currentTheme = themeSelect.value;

    if (currentTheme === "dark") {
        document.body.classList.add("dark");
        logo.src = "/wdd131/imgs/byui-logo_white.png"
    }
    else {
        document.body.classList.remove("dark");
        logo.src = "/wdd131/imgs/byui-logo_blue.webp"

    }
}

themeSelect.addEventListener("change", changeTheme);
