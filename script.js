(function() {

    var prompt = document.querySelector('.prompt');

    var animationLoop;

    var scrollingNow = false;
    var scrollStep = 2;

    var defaultSpeed = 30;
    var minimumSpeed = 10;
    var maximumSpeed = 60;
    var stepSpeed = 10;

	function renderRequest() {
		window.requestAnimationFrame(render);
	}

	function render() {
		window.scrollBy(0, -scrollStep);
		scrollingNow = true;
		scroll();
	}

    function scroll() {
        if (window.scrollY) {
            animationLoop = setTimeout(renderRequest, 1000 / defaultSpeed);
        }
    }

    function pause() {
        window.clearTimeout(animationLoop);
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
                case 'ArrowRight':
                case 'UIKeyInputRightArrow':
                    event.preventDefault();
                    toggle();
                break;
                case 'ArrowLeft':
                case 'UIKeyInputLeftArrow':
                    event.preventDefault();
                    pause();
                    rewind();
                break;
                case '-':
                    if (defaultSpeed > minimumSpeed) {
                        defaultSpeed -= stepSpeed;
                        console.log(defaultSpeed);
                    }
                break;
                case '=':
                    if (defaultSpeed < maximumSpeed) {
                        defaultSpeed += stepSpeed;
                        console.log(defaultSpeed);
                    }
                break;
                case 'f':
                    event.preventDefault();
                    fullscreen(prompt);
                break;
            }
        }
    });

    document.addEventListener('touchstart', toggle);

}());
