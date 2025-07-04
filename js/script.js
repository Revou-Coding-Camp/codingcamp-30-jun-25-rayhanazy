// Background Slideshow for Hero
const hero = document.getElementById("hero");
const heroImages = ["img/img6.jpg", "img/img7.png"];

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

// Efek ketik judul
const heroTitle = document.getElementById("hero-title");
const userInput = document.getElementById("username");
const heroDesc = document.getElementById("hero-desc");

const titleAfter = ", WELCOME TO MY PORTFOLIO WEBSITE";
const descText =
  "An Informatics Engineering student who is passionate about web development and design, I enjoy creating innovative solutions and exploring new technologies to improve user experience.";

let titleIndex = 0;
let descIndex = 0;

// Fungsi update lebar box sesuai teks/placeholder
function updateWidth() {
  const text =
    userInput.textContent || userInput.getAttribute("data-placeholder");

  const span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.style.whiteSpace = "nowrap";
  span.style.fontWeight = "bold";
  span.style.fontSize = window.getComputedStyle(userInput).fontSize;
  span.style.fontFamily = window.getComputedStyle(userInput).fontFamily;
  span.textContent = text;

  document.body.appendChild(span);
  const width = span.getBoundingClientRect().width;
  document.body.removeChild(span);

  userInput.style.width = `${width + 16}px`;
}

// Fungsi efek ketik judul setelah nama
function updateTitleWithTyping(name) {
  if (titleIndex <= titleAfter.length) {
    heroTitle.innerHTML =
      `HI <span class="editable">${name}</span>` +
      titleAfter.substring(0, titleIndex);
    titleIndex++;
    setTimeout(() => updateTitleWithTyping(name), 50);
  } else {
    heroTitle.classList.remove("typewriter");
    heroTitle.classList.add("no-caret");
    setTimeout(startDescTyping, 300);
  }
}

// Fungsi efek ketik deskripsi
function startDescTyping() {
  if (descIndex < descText.length) {
    heroDesc.textContent += descText.charAt(descIndex);
    descIndex++;
    setTimeout(startDescTyping, 25);
  }
}

// Event: deteksi Enter dan jalankan efek
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const name = userInput.innerText.trim().toUpperCase();
    if (name !== "") {
      userInput.blur();
      updateTitleWithTyping(name);
    }
  }
});

// Event: update lebar saat input/fokus/blur
userInput.addEventListener("input", updateWidth);
userInput.addEventListener("focus", updateWidth);
userInput.addEventListener("blur", updateWidth);

// Inisialisasi lebar saat load
updateWidth();

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

// Change header style on scroll
window.addEventListener("scroll", function () {
  document
    .querySelector("header")
    .classList.toggle("scrolled", window.scrollY > 10);
});
