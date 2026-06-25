const menuButton = document.getElementById("menuButton");
const navbar = document.querySelector(".navbar");

if (menuButton && navbar) {
    menuButton.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (!header) {
        return;
    }

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (!backToTop) {
        return;
    }

    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const hiddenElements = document.querySelectorAll(
    ".project-card, .tech-card, .sobre-content, .expectation-card, .experience-card, .cert-card"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

if (themeToggle && themeIcon) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        themeIcon.className = isLight
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
}

window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");

        if (themeIcon) {
            themeIcon.className = "fa-solid fa-sun";
        }
    }
});

const heroProjectCount = document.getElementById("heroProjectCount");

if (heroProjectCount) {
    const projectCards = document.querySelectorAll(".projects-grid .project-card");
    const totalProjects = projectCards.length;
    const suffix = heroProjectCount.dataset.suffix || "projetos completos publicados";

    heroProjectCount.innerHTML = `${totalProjects} ${suffix}`;
}

const resumeModal = document.getElementById("resumeModal");
const openResumeModalButton = document.getElementById("openResumeModal");
const closeResumeModalButton = document.getElementById("closeResumeModal");

function closeResumeModal() {
    if (!resumeModal) {
        return;
    }

    resumeModal.hidden = true;
    document.body.classList.remove("modal-open");

    if (openResumeModalButton) {
        openResumeModalButton.focus();
    }
}

if (resumeModal && openResumeModalButton) {
    openResumeModalButton.addEventListener("click", () => {
        resumeModal.hidden = false;
        document.body.classList.add("modal-open");

        if (closeResumeModalButton) {
            closeResumeModalButton.focus();
        }
    });

    resumeModal.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement && event.target.hasAttribute("data-close-resume-modal")) {
            closeResumeModal();
        }
    });
}

if (closeResumeModalButton) {
    closeResumeModalButton.addEventListener("click", closeResumeModal);
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && resumeModal && !resumeModal.hidden) {
        closeResumeModal();
    }
});

function initializeProjectCarousel(carousel) {
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
    const previousButton = carousel.querySelector(".carousel-arrow--prev");
    const nextButton = carousel.querySelector(".carousel-arrow--next");

    if (!slides.length) {
        return;
    }

    let currentIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));

    if (currentIndex < 0) {
        currentIndex = 0;
    }

    const loadSlideImage = (index) => {
        const slide = slides[index];

        if (!slide) {
            return;
        }

        const image = slide.querySelector("img[data-src]");

        if (image) {
            image.src = image.dataset.src;
            image.removeAttribute("data-src");
        }
    };

    const updateCarousel = (nextIndex) => {
        currentIndex = (nextIndex + slides.length) % slides.length;

        slides.forEach((slide, index) => {
            slide.classList.toggle("is-active", index === currentIndex);
        });

        dots.forEach((dot, index) => {
            const isActive = index === currentIndex;

            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });

        loadSlideImage(currentIndex);
        loadSlideImage((currentIndex + 1) % slides.length);
    };

    loadSlideImage(currentIndex);
    loadSlideImage((currentIndex + 1) % slides.length);

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            updateCarousel(currentIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            updateCarousel(currentIndex + 1);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            updateCarousel(index);
        });
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            updateCarousel(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            updateCarousel(currentIndex + 1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].clientX;

        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < 45) {
            return;
        }

        if (swipeDistance > 0) {
            updateCarousel(currentIndex - 1);
        } else {
            updateCarousel(currentIndex + 1);
        }
    }, { passive: true });
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    initializeProjectCarousel(carousel);
});
