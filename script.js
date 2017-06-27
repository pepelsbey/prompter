(function() {

    var prompt = document.querySelector('.prompt');

    var animationLoop;
    var scrollingNow = false;
    var scrollStep = 2;

    function scroll() {
        if (window.scrollY) {
            window.scrollBy(0, -scrollStep);
            animationLoop = window.requestAnimationFrame(scroll);
            scrollingNow = true;
        }
    }

    function pause() {
        window.cancelAnimationFrame(animationLoop);
        scrollingNow = false;
    }

    function toggle() {
        if (scrollingNow) {
            pause();
        } else {
            scroll();
        }
    }

    function rewind() {
        window.scrollTo(0, document.body.clientHeight - window.innerHeight);
    }

    function resize(factor) {
        prompt.style.setProperty(
            '--size',
            parseFloat(
                prompt.style.getPropertyValue('--size')
            ) + factor
        );
    }

    function fullscreen(element) {
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        ) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            }
            if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
            if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
            if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.metaKey || event.ctrlKey) {
            switch (event.key) {
                case '-':
                    event.preventDefault();
                    resize(-0.1);
                break;
                case '=':
                    event.preventDefault();
                    resize(+0.1);
                break;
            }
        } else {
            switch (event.key) {
                case ' ':
                    event.preventDefault();
                    toggle();
                break;
                case '-':
                    if (scrollStep > 1) {
                        scrollStep--;
                    }
                break;
                case '=':
                    scrollStep++;
                break;
                case 'f':
                    event.preventDefault();
                    fullscreen(prompt);
                break;
                case 'ArrowLeft':
                case 'UIKeyInputLeftArrow':
                    event.preventDefault();
                    rewind();
                break;
                case 'ArrowRight':
                case 'UIKeyInputRightArrow':
                    event.preventDefault();
                    toggle();
                break;
            }
        }
    });

    document.addEventListener('touchstart', toggle);
    window.addEventListener('load', rewind);

}());
