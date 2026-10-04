/* =====================================================
   SETTINGS
===================================================== */

/*
   THIS IS THE PIN ENE WILL ENTER.

   Change 100726 to whatever PIN you want.
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


        /*
           Start background music after
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


    /* =================================================
       VIDEO + BACKGROUND MUSIC
    ================================================= */

    if (birthdayVideo && currentPage !== 4) {

        /*
           Stop the video when leaving
           the video page.
        */

        birthdayVideo.pause();

        birthdayVideo.muted = false;

        birthdayVideo.volume = 1;


        /*
           Start the background music again.
        */

        if (music.paused) {

            music.play().catch(() => {

                console.log(
                    "Music could not resume."
                );

            });

        }

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
   MUSIC BUTTON
===================================================== */

function toggleMusic() {

    if (music.paused) {

        music.play().catch(() => {

            console.log(
                "Music could not play."
            );

        });

        musicButton.textContent = "♫";

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


    /*
       Make sure background music
       continues from the current position.
    */

    if (music.paused) {

        music.play().catch(() => {

            console.log(
                "Music could not resume."
            );

        });

    }


    currentPage = 1;

    showPage(1);

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
               Stop the background music
               while the video is playing.
            */

            if (!music.paused) {

                music.pause();

            }

        }
    );


    /* =================================================
       VIDEO PAUSED
    ================================================= */

    birthdayVideo.addEventListener(
        "pause",
        function() {

            /*
               Start the background music again
               when the video is paused.
            */

            if (music.paused) {

                music.play().catch(() => {

                    console.log(
                        "Music could not resume."
                    );

                });

            }

        }
    );


    /* =================================================
       VIDEO ENDS
    ================================================= */

    birthdayVideo.addEventListener(
        "ended",
        function() {

            /*
               Start the background music again
               when the video finishes.
            */

            if (music.paused) {

                music.play().catch(() => {

                    console.log(
                        "Music could not resume."
                    );

                });

            }

        }
    );

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


        /*
           Backspace deletes a PIN number.
        */

        if (
            pinScreen.style.display !== "none"
            &&
            event.key === "Backspace"
        ) {

            deleteNumber();

        }


        /*
           Enter checks the PIN.
        */

        if (
            pinScreen.style.display !== "none"
            &&
            event.key === "Enter"
        ) {

            checkPin();

        }

    }
);
