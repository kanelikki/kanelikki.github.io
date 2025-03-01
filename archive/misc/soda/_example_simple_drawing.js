window.addEventListener("load", function(){
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    //resizing must not affect
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.addEventListener("mousedown", setDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    let isDrawing = false;
    let clientOld;
    function setDrawing(e) {
        isDrawing = true;
        clientOld = [e.pageX, e.pageY];
    }
    function draw(e) {
        if(!isDrawing) return;
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.moveTo(clientOld[0],clientOld[1]);
        ctx.lineTo(e.pageX, e.pageY);
        ctx.stroke();
        clientOld = [e.pageX, e.pageY];
    }
    function stopDrawing() {
        isDrawing = false;
    }
});