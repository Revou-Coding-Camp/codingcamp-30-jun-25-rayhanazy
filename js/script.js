// Background Slideshow for Hero
const hero = document.getElementById("hero");
const heroImages = ["img/img2.jpg", "img/img1.jpg"];

let heroIndex = 0;

function changeHeroBackground() {
  const img = new Image();
  img.src = heroImages[heroIndex];
  img.onload = () => {
    hero.style.backgroundImage = `url('${img.src}')`;
    heroIndex = (heroIndex + 1) % heroImages.length;
  };
}

changeHeroBackground();
setInterval(changeHeroBackground, 3000);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll(".navbar a").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
});

// Tutup navbar saat nav-link diklik
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navbar.classList.remove("active");
  });
});

// Optional: Scroll highlight active link
const links = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  const fromTop = window.scrollY;
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (
      section.offsetTop <= fromTop + 80 &&
      section.offsetTop + section.offsetHeight > fromTop + 80
    ) {
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// Tutup navbar saat scroll halaman
window.addEventListener("scroll", () => {
  hamburger.classList.remove("active");
  navbar.classList.remove("active");
});

// Tutup navbar saat klik di luar
document.addEventListener("click", (e) => {
  const isClickInsideNavbar =
    navbar.contains(e.target) || hamburger.contains(e.target);
  if (!isClickInsideNavbar) {
    hamburger.classList.remove("active");
    navbar.classList.remove("active");
  }
});
