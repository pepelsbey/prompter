const playPauseKey = 'Enter';
const speedUpKey = 'ArrowRight';
const slowDownKey = 'ArrowLeft';
const fullScreenKey = 'f';
const backHomeKey = 'h';
const stepChange = 0.1;

const requestFullscreen =
    Element.prototype.requestFullscreen ||
    Element.prototype.webkitRequestFullscreen;

let animationLoop;
let scrollingNow = false;
let scrollStep = 1.15;
let fullScreenKeys = {};

function scrollScript() {
    window.scrollBy({
        left: 0,
        top: -scrollStep,
    });

    if (window.scrollY && scrollingNow) {
        animationLoop = requestAnimationFrame(scrollScript);
    }
}

function playPauseScroll() {
    if (scrollingNow) {
        pauseScroll();
    } else {
        playScroll();
    }
}

function playScroll() {
    scrollingNow = true;
    scrollScript();
}

function pauseScroll() {
    cancelAnimationFrame(animationLoop);
    scrollingNow = false;
}

function slowDown() {
    let newStep = scrollStep - stepChange;

    if (newStep > 0) {
        scrollStep = newStep;
    }
}

function speedUp() {
    let newStep = scrollStep + stepChange;

    scrollStep = newStep;
}

function rewindScript() {
    window.scrollTo({
        top: document.body.clientHeight - window.innerHeight,
        left: 0,
    });
}

function enterFullScreen() {
    requestFullscreen.call(document.documentElement);
    screen.orientation.lock('landscape-primary');
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case playPauseKey:
            event.preventDefault();
            playPauseScroll();
        break;
        case speedUpKey:
            event.preventDefault();
            speedUp();
        break;
        case slowDownKey:
            event.preventDefault();
            slowDown();
        break;
        case backHomeKey:
            event.preventDefault();
            pauseScroll()
            rewindScript();
        break;
        case fullScreenKey:
            event.preventDefault();
            enterFullScreen();
        break;
    }
});

document.addEventListener('DOMContentLoaded', rewindScript);
