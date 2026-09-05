// ==============================
// MOBILE MENU
// ==============================

const menuBtn =
    document.getElementById("menuBtn");

const navbar =
    document.getElementById("navbar");


// Mobile menu open / close
menuBtn.addEventListener(
    "click",
    function () {

        navbar.classList.toggle("active");

    }
);


// ==============================
// CLOSE MENU AFTER CLICKING LINK
// ==============================

const navLinks =
    document.querySelectorAll(
        "#navbar a"
    );


navLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            navbar.classList.remove(
                "active"
            );

        }
    );

});


// ==============================
// LOCATION BUTTON
// ==============================

function showLocationMessage() {

    window.open(
        "https://www.google.com/maps/dir//24.5434938,81.2968568/@24.5433831,81.2968186,21z?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D",
        "_blank"
    );

}


// ==============================
// SCROLL ANIMATION
// ==============================

const cards =
    document.querySelectorAll(
        ".service-card, .why-card, .contact-card"
    );


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


// ==============================
// INITIAL CARD ANIMATION
// ==============================

cards.forEach(function (card) {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(25px)";

    card.style.transition =
        "all .6s ease";

    observer.observe(card);

});
