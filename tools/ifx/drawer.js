const Drawer = (function() {
    let lineWidth = 0;
    let clr = "";
    let lastClr = "";

    document.addEventListener("canvasready", function(e){
        const baseCanvas = e.detail.canvas;
        const baseCtx = e.detail.ctx;

        let pressing = false;
        let position = [-1, -1];

        baseCanvas.addEventListener("mousedown", setPress);
        window.addEventListener("mouseup", stopPress);
        baseCanvas.addEventListener("mousemove", draw);
        baseCanvas.addEventListener("mouseover", dropLine);
        baseCanvas.addEventListener("touchstart", setPressTouch);
        baseCanvas.addEventListener("touchend", stopPress);
        baseCanvas.addEventListener("touchmove", drawTouch);

        baseCtx.lineCap = "round";
        
        document.addEventListener("dragstart", e => e.preventDefault())
        document.addEventListener("drop", e => e.preventDefault())
        document.addEventListener("timereset", initCanvas);
        
        KeyBinder.add('c', function() {
            changeColour(lastClr);
        });
        function initCanvas() {
            baseCtx.fillStyle = "white";
            baseCtx.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
        }
        function setPress(e) {
           setPressXY(e.offsetX, e.offestY);
        }
        function setPressTouch(e) {
            e.preventDefault()
            const touchCoords = loadTouch(e);
            if(!touchCoords) return;
            setPressXY(touchCoords[0], touchCoords[1]);
        }
        function draw(e) {
            if(!pressing) return;
            drawXY(e.offsetX, e.offsetY);
        }
        function drawTouch(e) {
            if(!pressing) return;
            e.preventDefault()
            const touchCoords = loadTouch(e);
            if(!touchCoords) return;
            drawXY(touchCoords[0], touchCoords[1]);
        }
        function dropLine(e) {
            dropLineXY(e.offsetX, e.offsetY);
        }
        function loadTouch(e) {
            if(!e.touches || e.touches.length!==1) return false;
            let res = [
                e.touches[0].pageX - baseCanvas.offsetLeft,
                e.touches[0].pageY - baseCanvas.offsetTop
            ];
            return res;
        }
        function setPressXY(x, y) {
            if(pressing || History.ongoing) return;
            e.preventDefault();
            pressing = true;
            position[0]=-1;
            position[1]=-1;
            baseCtx.beginPath();
            baseCtx.lineWidth=lineWidth;
            baseCtx.strokeStyle = clr;
            setPosition(x, y);
            drawXY(x, y);
            Refresher.markAsDirty();
        }
        function drawXY(x, y) {
            if(!pressing) return;
            e.preventDefault();
            baseCtx.moveTo(position[0],position[1]);
            baseCtx.lineTo(x, y);
            baseCtx.stroke();
            setPosition(x, y);
        }
        function dropLineXY(x, y){
            if(pressing) setPosition(x, y);
        }
        function stopPress() {
            if(!pressing) return;
            History.save();
            pressing = false;
            setPosition(-1, -1);
        }
        function setPosition(x, y) {
            position[0]=x;
            position[1]=y;
        }
    });
    function changeStroke(newWidth) {
        if(lineWidth === newWidth) return;
        const oldWidth = lineWidth;
        lineWidth = newWidth;
        document.dispatchEvent(
            new CustomEvent("strokechanged", {
                detail: {
                    oldWidth: oldWidth,
                    width: newWidth
                }
            }))

    }
    function changeColour(newClr) {
        if(newClr === clr) return;
        lastClr = clr;
        clr = newClr;
        document.dispatchEvent(
            new CustomEvent("clrchanged", {
                detail: {
                    oldClr: lastClr,
                    clr: newClr
                }
            }))
    }
    return {
        setStroke: changeStroke,
        setColour: changeColour
    }
})();