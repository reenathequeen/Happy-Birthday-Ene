/* =====================================================
   SETTINGS
===================================================== */

/*
   THIS IS THE PIN ENE WILL ENTER.
*/

const correctPin = "100726";


/* =====================================================
   VARIABLES
===================================================== */

let enteredPin = "";

let currentPage = 1;

const totalPages = 6;


/* =====================================================
   ELEMENTS
===================================================== */

const pinScreen =
    document.getElementById("pinScreen");

const website =
    document.getElementById("website");

const pinDots =
    document.querySelectorAll("#pinDots span");

const pinError =
    document.getElementById("pinError");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const pageNumber =
    document.getElementById("pageNumber");

const birthdayVideo =
    document.getElementById("birthdayVideo");


/* =====================================================
   PIN
===================================================== */

function addNumber(number) {

    if (enteredPin.length >= correctPin.length) {
        return;
    }

    enteredPin += number;

    updatePinDots();

}


/* =====================================================
   DELETE PIN NUMBER
===================================================== */

function deleteNumber() {

    enteredPin =
        enteredPin.slice(0, -1);

    pinError.textContent = "";

    updatePinDots();

}


/* =====================================================
   UPDATE PIN DOTS
===================================================== */

function updatePinDots() {

    pinDots.forEach((dot, index) => {

        if (index < enteredPin.length) {

            dot.classList.add("filled");

        } else {

            dot.classList.remove("filled");

        }

    });

}


/* =====================================================
   CHECK PIN
===================================================== */

function checkPin() {

    if (enteredPin === correctPin) {

        unlockWebsite();

    } else {

        pinError.textContent =
            "Wrong pin... try again ♡";

        enteredPin = "";

        updatePinDots();

    }

}


/* =====================================================
   UNLOCK WEBSITE
===================================================== */

function unlockWebsite() {

    pinScreen.style.opacity = "0";

    setTimeout(() => {

        pinScreen.style.display = "none";

        website.classList.remove("hidden");

        music.volume = 0.45;

        music.play().catch(() => {

            console.log(
                "Music could not autoplay."
            );

        });

        showPage(1);

    }, 700);

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageNumberToShow) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(
            "page" + pageNumberToShow
        );


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    currentPage = pageNumberToShow;


    pageNumber.textContent =
        String(currentPage).padStart(2, "0")
        + " / "
        + String(totalPages).padStart(2, "0");


    /*
       If we leave the video page,
       stop the video.
    */

    if (birthdayVideo && currentPage !== 4) {

        birthdayVideo.pause();

        birthdayVideo.muted = false;

        birthdayVideo.volume = 1;

    }

}


/* =====================================================
   NEXT PAGE
===================================================== */

function nextPage() {

    /*
       If we are leaving the video page,
       this button press is a REAL user interaction.

       Therefore the phone should allow us
       to restart the background music here.
    */

    if (currentPage === 4) {

        if (birthdayVideo) {

            birthdayVideo.pause();

        }


        music.volume = 0.45;


        music.play().then(() => {

            musicButton.textContent = "♫";

        }).catch(() => {

            console.log(
                "Music could not resume."
            );

        });

    }


    if (currentPage < totalPages) {

        showPage(currentPage + 1);

    }

}


/* =====================================================
   MUSIC BUTTON
===================================================== */

function toggleMusic() {

    if (music.paused) {

        music.play().then(() => {

            musicButton.textContent = "♫";

        }).catch(() => {

            console.log(
                "Music could not play."
            );

        });

    } else {

        music.pause();

        musicButton.textContent = "🔇";

    }

}


/* =====================================================
   RESTART WEBSITE
===================================================== */

function restartWebsite() {

    if (birthdayVideo) {

        birthdayVideo.pause();

        birthdayVideo.currentTime = 0;

    }


    currentPage = 1;

    showPage(1);


    /*
       Restart music because the user
       pressed the restart button.
    */

    music.volume = 0.45;

    music.play().then(() => {

        musicButton.textContent = "♫";

    }).catch(() => {

        console.log(
            "Music could not resume."
        );

    });


    window.scrollTo(0, 0);

}


/* =====================================================
   VIDEO STARTS
===================================================== */

if (birthdayVideo) {

    birthdayVideo.addEventListener(
        "play",
        function() {

            /*
               Stop background music when
               the video starts.
            */

            music.pause();

            musicButton.textContent = "🔇";

        }
    );


    /* =================================================
       VIDEO PAUSED
    ================================================= */

    birthdayVideo.addEventListener(
        "pause",
        function() {

            /*
               DO NOT automatically start music here.

               On phones, browsers may block this because
               the pause event itself is not considered
               a direct user interaction.

               The Birthday Wishes button will restart it.
            */

        }
    );


    /* =================================================
       VIDEO ENDS
    ================================================= */

    birthdayVideo.addEventListener(
        "ended",
        function() {

            /*
               Do not automatically start music here
               because mobile browsers can block it.

               If she presses Birthday Wishes,
               nextPage() will restart the music.
            */

        }
    );

}


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            pinScreen.style.display !== "none"
            &&
            /^[0-9]$/.test(event.key)
        ) {

            addNumber(event.key);

        }


        if (
            pinScreen.style.display !== "none"
            &&
            event.key === "Backspace"
        ) {

            deleteNumber();

        }


        if (
            pinScreen.style.display !== "none"
            &&
            event.key === "Enter"
        ) {

            checkPin();

        }

    }
);