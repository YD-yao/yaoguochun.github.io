// Nav scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
});
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinks.classList.remove("open");
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight,
                behavior: "smooth"
            });
        }
    });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(
    entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    }),
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
);
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
