window.addEventListener("load", function () {
    const canvas = document.querySelector("#draw");
    const ctx = canvas.getContext("2d");
    const img = document.querySelector("img");
    let imgOffset;
    // img size adjusting img
    (function(){
        let imgRect = img.getBoundingClientRect();
        if(imgRect>window.innerWidth*0.5){
            img.width = window.innerWidth * 0.5; //shouldn't be affected by resizing
            imgRect = img.getBoundingClientRect();
        }
        imgOffset = {
            x:imgRect.width * 0.2,
            y:imgRect.height * 0.8,
        }
    })();
    //draw baking soda
    (function (canvas, ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const arrSize = canvas.width * canvas.height * 4;
        const arr = new Uint8ClampedArray(arrSize);
        for (let i = 0; i < arrSize; i += 4) {
            arr[i] = 255;
            arr[i + 1] = 255;
            arr[i + 2] = 255;
            if (ifPaint(i)) {
                arr[i + 3] = 0;
            }
            else {
                arr[i + 3] = 180;
            }
        }
        ctx.putImageData(new ImageData(arr, canvas.width, canvas.height), 0, 0);
        function ifPaint(fac) {
            return Math.random() >= 0.5;
        }
    })(canvas, ctx);
    //resizing must not affect
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    ctx.globalCompositeOperation = "destination-out";
    document.addEventListener("mousedown", e=>setDrawing(e,e));
    document.addEventListener("touchstart", e=>setDrawing(e, e.touches[0]));
    document.addEventListener("mousemove", e=>draw(e, e));
    document.addEventListener("touchmove", e=>draw(e, e.touches[0]));
    document.addEventListener("mouseleave", stopDrawing);
    document.addEventListener("touchcancel", stopDrawing);
    document.addEventListener("touchleave", stopDrawing);
    document.addEventListener("mouseup", stopDrawing);
    document.addEventListener("touchend", stopDrawing);
    let isDrawing = false;
    let clientOld;
    function setDrawing(e, env) {
        e.preventDefault();
        isDrawing = true;
        clientOld = [env.pageX, env.pageY];
    }
    function draw(e, env) {
        e.preventDefault();
        if (!isDrawing) return;
        ctx.lineWidth = 100;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(clientOld[0], clientOld[1]);
        ctx.lineTo(env.pageX, env.pageY);
        ctx.stroke();
        clientOld = [env.pageX, env.pageY];
        img.style.transform = `translate(${env.pageX - imgOffset.x}px, ${env.pageY - imgOffset.y}px)`
    }
    function stopDrawing(e) {
        e.preventDefault();
        isDrawing = false;
    }
});