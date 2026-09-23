document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       LOADER
    ========================= */

    const loader = document.querySelector(".loader");

    window.addEventListener("load", function () {

        setTimeout(function () {

            if (loader) {
                loader.classList.add("hide");
            }

        }, 800);

    });



    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton = document.querySelector(".mobile-menu");

    const header = document.querySelector(".header");


    if (menuButton) {

        menuButton.addEventListener("click", function () {

            header.classList.toggle("menu-open");

        });

    }


    document.querySelectorAll(".nav a").forEach(function (link) {

        link.addEventListener("click", function () {

            header.classList.remove("menu-open");

        });

    });



    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        }, {

            threshold: 0.15

        });


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });



    /* =========================
       ANIMATED STATISTICS
    ========================= */

    const counters =
        document.querySelectorAll("[data-number]");


    const counterObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;


                const element = entry.target;

                const target =
                    parseFloat(element.dataset.number);

                const isDecimal =
                    target % 1 !== 0;

                const duration = 1600;

                const startTime = performance.now();


                function updateCounter(currentTime) {

                    const progress =
                        Math.min(
                            (currentTime - startTime) /
                            duration,
                            1
                        );


                    const eased =
                        1 - Math.pow(1 - progress, 4);


                    const current =
                        target * eased;


                    if (isDecimal) {

                        element.textContent =
                            current.toFixed(1);

                    } else {

                        element.textContent =
                            Math.floor(current)
                            .toLocaleString();

                    }


                    if (progress < 1) {

                        requestAnimationFrame(updateCounter);

                    } else {

                        element.textContent =
                            isDecimal
                                ? target.toFixed(1)
                                : target.toLocaleString();

                    }

                }


                requestAnimationFrame(updateCounter);

                counterObserver.unobserve(element);

            });

        }, {

            threshold: .7

        });


    counters.forEach(function (counter) {

        counterObserver.observe(counter);

    });



    /* =========================
       ENQUIRY FORM
    ========================= */

    const enquiryForm =
        document.querySelector("#enquiryForm");


    if (enquiryForm) {

        enquiryForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const message =
                    document.querySelector("#formMessage");


                message.innerHTML = `

                    <div style="
                        margin-top:20px;
                        padding:16px;
                        background:#eaf5ff;
                        color:#0757a7;
                        font-size:12px;
                        font-weight:700;
                    ">

                        Thank you.
                        Your enquiry has been received.
                        Our patient coordinator will contact
                        you shortly.

                    </div>

                `;


                enquiryForm.reset();

            }
        );

    }



    /* =========================
       GALLERY FILTER
    ========================= */

    const filterButtons =
        document.querySelectorAll(".filter");


    const galleryItems =
        document.querySelectorAll(".gallery-item");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {


            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            const filter =
                button.dataset.filter;


            galleryItems.forEach(function (item) {

                if (
                    filter === "all" ||
                    item.classList.contains(filter)
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });

        });

    });



    /* =========================
       PREMIUM IMAGE TILT
    ========================= */

    document
        .querySelectorAll(".service-card, .gallery-item")
        .forEach(function (card) {


            card.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (event.clientX - rect.left)
                        / rect.width
                        - .5;


                    const y =
                        (event.clientY - rect.top)
                        / rect.height
                        - .5;


                    card.style.transform =
                        `
                        perspective(900px)
                        rotateX(${y * -2}deg)
                        rotateY(${x * 2}deg)
                        scale(1.01)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform = "";

                }
            );

        });



    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    let lastScroll = 0;


    window.addEventListener(
        "scroll",
        function () {

            const currentScroll =
                window.scrollY;


            if (currentScroll > 30) {

                header.style.boxShadow =
                    "0 10px 40px rgba(0,40,80,.06)";

            } else {

                header.style.boxShadow = "none";

            }


            lastScroll = currentScroll;

        }
    );

});
