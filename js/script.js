// MENU MOBILE

const menuButton = document.getElementById("menuButton");
const navbar = document.querySelector(".navbar");

menuButton.addEventListener("click", () => {

    navbar.classList.toggle("active");

});

// HEADER AO ROLAR

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

// BOTÃO TOPO

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300) {

        backToTop.style.display = "block";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ANIMAÇÃO AO SCROLL

const hiddenElements = document.querySelectorAll(
    ".project-card, .tech-card, .sobre-content, .experience-card, .cert-card"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

hiddenElements.forEach((el) => {

    el.classList.add("hidden");

    observer.observe(el);

});

// LINK ATIVO NO MENU

// MODO CLARO / ESCURO

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    themeIcon.className =
        isLight
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

});

// CARREGA TEMA SALVO

window.addEventListener("load", () => {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        themeIcon.className =
            "fa-solid fa-sun";

    }

});