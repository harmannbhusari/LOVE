/* =====================================================
   PASSWORD
===================================================== */

const correctPassword = "02102002";


function checkPassword() {

    const input = document.getElementById("passwordInput");
    const message = document.getElementById("passwordMessage");

    if (input.value === correctPassword) {

        message.innerHTML = "Correct! Surprise unlocked 🎉";
        message.style.color = "#9cffb8";

        setTimeout(function () {
            goToPage(2);
        }, 800);

    } else {

        message.innerHTML = "Wrong password! Try again ❤️";
        message.style.color = "#ff8b8b";

        input.value = "";
        input.focus();
    }
}


/* =====================================================
   ENTER KEY FOR PASSWORD
===================================================== */

document
    .getElementById("passwordInput")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            checkPassword();
        }

    });


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function goToPage(pageNumber) {

    const video = document.querySelector(".birthday-video");

    // Pause video whenever we leave Page 4
    if (video && pageNumber !== 4) {
        video.pause();
        video.currentTime = 0;
    }

    // Hide all pages
    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
    });

    // Show requested page
    const nextPage =
        document.getElementById("page" + pageNumber);

    if (nextPage) {
        nextPage.classList.add("active");
    }

    // Start video when entering Page 4
    if (pageNumber === 4 && video) {
        video.currentTime = 0;

        video.play().catch(function() {
            // Browser autoplay restriction
        });
    }
}


/* =====================================================
   TAP ANYWHERE TO MOVE FORWARD
===================================================== */

document.addEventListener("click", function (event) {

    const activePage =
        document.querySelector(".page.active");


    if (!activePage) {
        return;
    }


    /* =========================
       PAGE 1
       Password controls this page
    ========================= */

    if (activePage.id === "page1") {
        return;
    }


    /* =========================
       PAGE 3
       Cake controls countdown
    ========================= */

    if (activePage.id === "page3") {

        if (event.target.closest(".cake-area")) {

            startCakeCountdown();

        } else {

            createManyHearts(8);
            showTapMessage();

        }

        return;
    }


    /* =========================
       PAGE 4
       Video controls should work
    ========================= */

    if (activePage.id === "page4") {

        if (event.target.closest(".birthday-video")) {
            return;
        }


        createManyHearts(10);
        showTapMessage();


        setTimeout(function () {

            goToPage(5);

        }, 600);


        return;
    }


    /* =========================
       PAGE 2
       Tap anywhere → Page 3
    ========================= */

    if (activePage.id === "page2") {

        createManyHearts(10);
        showTapMessage();


        setTimeout(function () {

            goToPage(3);

        }, 600);


        return;
    }


    /* =========================
       PAGE 5
       Stay on final page
    ========================= */

    if (activePage.id === "page5") {

        createManyHearts(10);
        showTapMessage();

        return;
    }

});


/* =====================================================
   VIDEO
===================================================== */

const video =
    document.querySelector(".birthday-video");


if (video) {

    video.addEventListener("click", function (event) {

        event.stopPropagation();

    });

}


/* =====================================================
   CAKE COUNTDOWN
===================================================== */

let countdownNumber = 3;

let cakeFinished = false;


function startCakeCountdown() {

    if (cakeFinished) {
        return;
    }


    const countdown =
        document.getElementById("countdown");


    countdownNumber--;


    countdown.textContent =
        countdownNumber;


    /*
       3 → 2 → 1 → 0
       On 0, all candles blow together.
    */

    if (countdownNumber === 0) {

        cakeFinished = true;

        blowAllCandles();

    }

}


/* =====================================================
   BLOW ALL CANDLES
===================================================== */

function blowAllCandles() {

    const candles =
        document.querySelectorAll(".candle");


    /* All 3 candles turn off together */

    candles.forEach(function (candle) {

        candle.classList.add("off");

    });


    /* Big heart burst */

    createManyHearts(40);


    /* Happy Birthday zoom */

    setTimeout(function () {

        const message =
            document.getElementById(
                "birthdayMessage"
            );


        message.classList.add("show");

    }, 300);


    /* Move to Page 4 */

    setTimeout(function () {

        goToPage(4);

    }, 3600);

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

const heartsContainer =
    document.getElementById(
        "hearts-container"
    );


const heartTypes = [
    "❤️",
    "💖",
    "💕",
    "💗",
    "💓",
    "💞",
    "💝"
];


function createHeart() {

    const heart =
        document.createElement("div");


    heart.className = "heart";


    heart.innerHTML =
        heartTypes[
            Math.floor(
                Math.random() *
                heartTypes.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (15 + Math.random() * 30) + "px";


    heart.style.animationDuration =
        (4 + Math.random() * 5) + "s";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(function () {

        heart.remove();

    }, 9000);

}


/* =====================================================
   CONTINUOUS HEARTS
===================================================== */

setInterval(function () {

    createHeart();

}, 450);


/* =====================================================
   CREATE MANY HEARTS
===================================================== */

function createManyHearts(number) {

    for (
        let i = 0;
        i < number;
        i++
    ) {

        setTimeout(function () {

            createHeart();

        }, i * 70);

    }

}


/* =====================================================
   ZOOMING I LOVE YOU MESSAGE
===================================================== */

function showTapMessage() {

    const oldMessage =
        document.querySelector(
            ".tap-love"
        );


    if (oldMessage) {
        oldMessage.remove();
    }


    const message =
        document.createElement("div");


    message.className =
        "tap-love";


    message.innerHTML =
        "I LOVE YOU ❤️";


    document.body.appendChild(
        message
    );


    setTimeout(function () {

        message.remove();

    }, 1600);

}