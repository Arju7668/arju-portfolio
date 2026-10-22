/* =====================================
   ARJU DEVI — PORTFOLIO JAVASCRIPT
===================================== */

// 1. Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu after clicking a navigation link
    navItems.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });

    // Close menu when clicking outside it
    document.addEventListener("click", function (event) {
        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        }
    });
}


// 2. Automatically Update Footer Year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// 3. Profile Photo Handling
const profileImage = document.getElementById("profileImage");
const imagePlaceholder = document.getElementById("imagePlaceholder");

function updateProfilePhoto() {
    if (!profileImage || !imagePlaceholder) {
        return;
    }

    if (profileImage.complete && profileImage.naturalWidth > 0) {
        profileImage.style.display = "block";
        imagePlaceholder.style.display = "none";
    } else {
        profileImage.style.display = "none";
        imagePlaceholder.style.display = "flex";
    }
}

if (profileImage) {
    profileImage.addEventListener("load", updateProfilePhoto);
    profileImage.addEventListener("error", updateProfilePhoto);

    updateProfilePhoto();
}


// 4. Highlight Active Navigation Link
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const currentSectionId = entry.target.id;

                    navItems.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + currentSectionId
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}


// 5. Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });
        }
    });
});


// 6. Reveal Sections as They Enter the Screen
const revealElements = document.querySelectorAll(
    ".section-heading, .about-main, .about-mini-card, " +
    ".skill-card, .project-card, .education-card, .contact-card"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal-ready");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("revealed");
    });
}

console.log("Arju Devi Portfolio initialized successfully!");