// ==============================
// MOBILE MENU
// ==============================

const menuBtn =
    document.getElementById("menuBtn");

const navbar =
    document.getElementById("navbar");


menuBtn.addEventListener(
    "click",
    function () {

        navbar.classList.toggle("active");

    }
);


// Close menu after clicking link

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

    alert(
        "Google Maps location abhi add nahi ki gayi hai. Aap baad mein apni shop ka Maps link yahan add kar sakte hain."
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


cards.forEach(function (card) {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(25px)";

    card.style.transition =
        "all .6s ease";

    observer.observe(card);

});