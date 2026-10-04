/* =====================================================
   SETTINGS
===================================================== */

/*
   THIS IS THE PIN ENE WILL ENTER.

   Change 111111 to whatever PIN you want.
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


function deleteNumber() {

    enteredPin =
        enteredPin.slice(0, -1);

    pinError.textContent = "";

    updatePinDots();

}


function updatePinDots() {

    pinDots.forEach((dot, index) => {

        if (index < enteredPin.length) {

            dot.classList.add("filled");

        } else {

            dot.classList.remove("filled");

        }

    });

}


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
   UNLOCK
===================================================== */

function unlockWebsite() {

    pinScreen.style.opacity = "0";

    setTimeout(() => {

        pinScreen.style.display = "none";

        website.classList.remove("hidden");

        /*
           Start the background music after
           the user has interacted with the PIN.
        */

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

    const video =
        document.getElementById("birthdayVideo");
    birthdayVideo.muted = false;
    birthdayVideo.volume = 1;


    if (currentPage !== 4 && video) {

        video.pause();

    }

}


/* =====================================================
   NEXT PAGE
===================================================== */

function nextPage() {

    if (currentPage < totalPages) {

        showPage(currentPage + 1);

    }

}


/* =====================================================
   MUSIC
===================================================== */

function toggleMusic() {

    if (music.paused) {

        music.play();

        musicButton.textContent = "♫";

    } else {

        music.pause();

        musicButton.textContent = "🔇";

    }

}


/* =====================================================
   RESTART
===================================================== */

function restartWebsite() {

    const video =
        document.getElementById("birthdayVideo");


    if (video) {

        video.pause();

        video.currentTime = 0;

    }


    currentPage = 1;

    showPage(1);

    window.scrollTo(0, 0);

}


/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        /*
           Numbers can be typed on the keyboard
           while entering the PIN.
        */

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
