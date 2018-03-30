(function() {

    var fullScreenElement = document.fullScreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

    var exitFullscreenFn = document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozCancelFullscreen ||
        document.msExitFullscreen;

    var requestFullscreenFn = Element.prototype.requestFullscreen ||
        Element.prototype.webkitRequestFullscreen ||
        Element.prototype.mozRequestFullScreen ||
        Element.prototype.msRequestFullscreen;


    var prompt = document.querySelector('.prompt');

    var animationLoop;
    var scrollingNow = false;

    var scrollStep = 3;
    var defaultSpeed = 30;
    var minimumSpeed = 10;
    var maximumSpeed = 60;
    var stepSpeed = 10;

    var KeyCode = {
      F: 70,
      H: 72,
      SPACE: 32,
      MINUS: 189,
      EQUALS: 187
    };

    function renderRequest() {
        window.requestAnimationFrame(render);
    }

    function render() {
        window.scrollBy(0, -scrollStep);
        scroll();
    }

    function scroll() {
        if (window.scrollY && scrollingNow) {
            animationLoop = setTimeout(renderRequest, 1000 / defaultSpeed);
        }
    }

    function pause() {
        window.clearTimeout(animationLoop);
        scrollingNow = false;
    }

    function start() {
        scrollingNow = true;
        scroll();
    }

    function toggle() {
        if (scrollingNow) {
            pause();
        } else {
            start();
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
        if (fullScreenElement) {
          exitFullscreenFn();
        } else {
          requestFullscreenFn.call(element);
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.metaKey || event.ctrlKey) {
            switch (event.keyCode) {
                case KeyCode.MINUS:
                    event.preventDefault();
                    resize(-0.1);
                break;
                case KeyCode.EQUALS:
                    event.preventDefault();
                    resize(+0.1);
                break;
            }
        } else {
            switch (event.keyCode) {
                case KeyCode.SPACE:
                    event.preventDefault();
                    toggle();
                break;
                case KeyCode.H:
                    event.preventDefault();
                    pause();
                    rewind();
                break;
                case KeyCode.MINUS:
                    if (defaultSpeed > minimumSpeed) {
                        defaultSpeed -= stepSpeed;
                        console.log(defaultSpeed);
                    }
                break;
                case KeyCode.EQUALS:
                    if (defaultSpeed < maximumSpeed) {
                        defaultSpeed += stepSpeed;
                        console.log(defaultSpeed);
                    }
                break;
                case KeyCode.F:
                    event.preventDefault();
                    fullscreen(prompt);
                break;
            }
        }
    });

    document.addEventListener('touchstart', toggle);

}());
