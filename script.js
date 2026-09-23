/* =========================================================
   LUMINA DENTAL
   INTERACTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     PRELOADER
  ======================================================= */

  const preloader = document.querySelector(".preloader");

  window.addEventListener("load", () => {

    setTimeout(() => {
      preloader.classList.add("hide");
    }, 1400);

  });


  /* =======================================================
     CUSTOM CURSOR
  ======================================================= */

  const cursor = document.querySelector(".cursor");
  const cursorDot = document.querySelector(".cursor-dot");

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

  });


  function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  /* =======================================================
     CURSOR HOVER EFFECT
  ======================================================= */

  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, .choice, .gallery-item"
  );

  interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });

  });


  /* =======================================================
     NAVBAR SCROLL
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", updateNavbar);

  updateNavbar();


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll(".page");

  const navLinks =
    document.querySelectorAll(".nav-link");


  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            const id = entry.target.getAttribute("id");

            navLinks.forEach((link) => {

              link.classList.remove("active");

              if (
                link.getAttribute("href") === `#${id}`
              ) {
                link.classList.add("active");
              }

            });

          }

        });

      },
      {
        threshold: 0.35
      }
    );


  sections.forEach((section) => {

    sectionObserver.observe(section);

  });


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuButton =
    document.querySelector(".menu-btn");

  menuButton.addEventListener("click", () => {

    navbar.classList.toggle("menu-active");

    document.body.classList.toggle("menu-open");

  });


  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      navbar.classList.remove("menu-active");

      document.body.classList.remove("menu-open");

    });

  });


  /* =======================================================
     MAGNETIC BUTTON
  ======================================================= */

  const magneticButtons =
    document.querySelectorAll(".magnetic");


  magneticButtons.forEach((button) => {

    button.addEventListener("mousemove", (e) => {

      const rect =
        button.getBoundingClientRect();

      const x =
        e.clientX - rect.left - rect.width / 2;

      const y =
        e.clientY - rect.top - rect.height / 2;

      button.style.transform =
        `translate(${x * 0.15}px, ${y * 0.15}px)`;

    });


    button.addEventListener("mouseleave", () => {

      button.style.transform = "";

    });

  });


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const heroVisual =
    document.querySelector(".hero-visual");

  if (heroVisual) {

    document.addEventListener("mousemove", (e) => {

      const x =
        (window.innerWidth / 2 - e.clientX) / 60;

      const y =
        (window.innerHeight / 2 - e.clientY) / 60;

      heroVisual.style.transform =
        `translateY(-50%) translate(${x}px, ${y}px)`;

    });

  }


  /* =======================================================
     ENQUIRY FORM
  ======================================================= */

  const enquiryForm =
    document.querySelector("#enquiryForm");

  const successModal =
    document.querySelector(".success-modal");


  if (enquiryForm) {

    enquiryForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const formMessage =
        document.querySelector(".form-message");

      const name =
        document.querySelector("#name").value.trim();

      const phone =
        document.querySelector("#phone").value.trim();

      const email =
        document.querySelector("#email").value.trim();


      if (!name || !phone || !email) {

        formMessage.textContent =
          "Please complete the required fields.";

        return;

      }


      formMessage.textContent = "";

      successModal.classList.add("active");

      enquiryForm.reset();

    });

  }


  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  const closeButtons =
    document.querySelectorAll(".close-modal");


  closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

      successModal.classList.remove("active");

    });

  });


  successModal.addEventListener("click", (e) => {

    if (e.target === successModal) {

      successModal.classList.remove("active");

    }

  });


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      successModal.classList.remove("active");

      navbar.classList.remove("menu-active");

      document.body.classList.remove("menu-open");

    }

  });


  /* =======================================================
     IMAGE TILT
  ======================================================= */

  const galleryItems =
    document.querySelectorAll(".gallery-item");


  galleryItems.forEach((item) => {

    item.addEventListener("mousemove", (e) => {

      const rect =
        item.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) / rect.width;

      const y =
        (e.clientY - rect.top) / rect.height;

      const rotateX =
        (0.5 - y) * 5;

      const rotateY =
        (x - 0.5) * 5;

      item.style.transform =
        `perspective(800px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;

    });


    item.addEventListener("mouseleave", () => {

      item.style.transform = "";

    });

  });


  /* =======================================================
     SMOOTH HASH NAVIGATION
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (e) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      history.replaceState(
        null,
        "",
        targetId
      );

    });

  });


});
