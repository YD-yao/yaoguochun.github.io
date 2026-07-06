// ========== Cursor Detection ==========
if (window.matchMedia("(pointer: fine)").matches) {
    document.documentElement.classList.add("has-pointer");
}
﻿// ========== Particle Network ==========
const canvas = document.getElementById("particleCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouseX = -1000, mouseY = -1000;
    const COUNT = 60;
    const CONNECTION_DIST = 150;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2 + 1
        });
    }

    document.addEventListener("mousemove", e => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    document.addEventListener("mouseleave", () => { mouseX = -1000; mouseY = -1000; });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                p.vx += dx / dist * 0.02;
                p.vy += dy / dist * 0.02;
            }
            const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (spd > 0.8) { p.vx = (p.vx / spd) * 0.8; p.vy = (p.vy / spd) * 0.8; }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(129, 140, 248, 0.4)";
            ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const opacity = (1 - dist / CONNECTION_DIST) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ========== Typewriter Effect ==========
const typewriterEl = document.getElementById("typewriter");
if (typewriterEl) {
    const text = "AI 产品经理 · 工程师背景";
    let i = 0;
    typewriterEl.innerHTML = '<span class="cursor-blink">|</span>';
    function typeNext() {
        if (i < text.length) {
            typewriterEl.innerHTML = text.substring(0, i + 1) + '<span class="cursor-blink">|</span>';
            i++;
            setTimeout(typeNext, 60 + Math.random() * 40);
        } else {
            typewriterEl.innerHTML = text + '<span class="cursor-blink" style="opacity:0.4">|</span>';
        }
    }
    setTimeout(typeNext, 800);
}

// ========== Cursor Glow ==========
const cursorGlow = document.getElementById("cursorGlow");
if (cursorGlow) {
    let cx = -150, cy = -150;
    document.addEventListener("mousemove", e => { cx = e.clientX; cy = e.clientY; });
    function updateCursor() {
        cursorGlow.style.left = cx + "px";
        cursorGlow.style.top = cy + "px";
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
}

// ========== Nav Scroll Effect ==========
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ========== Mobile Nav ==========
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

// ========== Smooth Scroll ==========
document.querySelectorAll("a[href^=\u0023]").forEach(anchor => {
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

// ========== Scroll Reveal ==========
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

// ========== Animated Counters ==========
const counters = document.querySelectorAll(".stat-counter");
const counterObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const step = Math.max(1, Math.floor(target / 40));
                let current = 0;
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(interval);
                    } else {
                        el.textContent = current;
                    }
                }, 40);
                counterObserver.unobserve(el);
            }
        });
    },
    { threshold: 0.5 }
);
counters.forEach(c => counterObserver.observe(c));

// ========== Animated Skill Bars ==========
const skillBars = document.querySelectorAll(".skill-bar-fill");
const barObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const width = el.dataset.width || "0";
                el.style.width = width + "%";
                barObserver.unobserve(el);
            }
        });
    },
    { threshold: 0.3 }
);
skillBars.forEach(bar => barObserver.observe(bar));

// ========== 3D Tilt Cards ==========
const tiltCards = document.querySelectorAll(".tilt-card");
tiltCards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    });
});
