(function () {
    window.addEventListener("load", function () {
        let canvas = document.querySelector("#bg");
        let ctx = canvas.getContext("2d");

        //--particle
        let particleImage = new Image();
        particleImage.src = "icon/star.png";
        ctx.imageSmoothingEnabled = false;
        //init ctx
        function clear() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        //-- particle setting
        const particleCount = 200;
        const particleSize = 100;

        //--particles
        const particles = new Array(particleCount);
        for (let i = 0; i < particleCount; i++) {
            particles[i] = new particleUnit(i);
        }
        setInterval(function () {
            clear();
            for (var particle of particles) {
                particle.draw();
            }
        }, 250);
        //--- resizing
        resize();
        window.addEventListener("resize", resize);
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        //--one particle
        function particleUnit(delay) {
            let alpha;
            let x, y;
            let fadingIn = false;
            let ended = true;
            let currentDelay = 0;
            let thisDelay = delay;
            let rotation = Math.random();
            function setPos() {
                currentDelay = 0;
                rotation = Math.random();
                alpha = 0;
                ended = false;
                fadingIn = true;
                [x, y] = getPosition();
            }
            this.draw = function () {
                if (ended) {
                    currentDelay++;
                    if (thisDelay == currentDelay) setPos();
                }
                if (fadingIn) {
                    alpha += 0.1;
                    if (alpha >= 1) {
                        alpha = 1;
                        fadingIn = false;
                    }
                }
                else {
                    alpha -= 0.1;
                    if (alpha <= 0) {
                        alpha = 0;
                        ended = true;
                    }
                }
                ctx.globalAlpha = alpha;
                rotation += 0.5;
                ctx.setTransform(alpha, 0, 0, alpha, x, y);
                ctx.rotate(rotation);
                ctx.drawImage(particleImage, -alpha * particleSize * 0.5, -alpha * particleSize * 0.5, particleSize, particleSize);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
        function getPosition() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            return [x,y];
        }
    });
})();