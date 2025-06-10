const History = (function(){
    let ctx = null;
    let size = [-1, -1];
    let undoQueue = [];
    let redoQueue = [];
    const maximum = 10;
    let performing = false;
    let lastImgData = null;
    document.addEventListener("canvasready", function(e) {
        ctx = e.detail.ctx;
        size[0] = e.detail.canvas.clientWidth;
        size[1] = e.detail.canvas.clientHeight;
        ctx.fillStyle="white";
        ctx.fillRect(0,0,size[0],size[1]);
        lastImgData = ctx.getImageData(0, 0, size[0], size[1]);
        document.querySelector("#undo").addEventListener("click", undoHistory);
        document.querySelector("#redo").addEventListener("click", redoHistory);
        KeyBinder.add('z', undoHistory);
        KeyBinder.add('x', redoHistory)
    });
    document.addEventListener("timereset", resetHistory)
    function saveHistory() {
        if (!ctx || performing) return;
        performing = true;
        const imgData = ctx.getImageData(0, 0, size[0], size[1]);
        if (lastImgData != null) {
            if (undoQueue.length >= maximum) {
                for (let i = 1; i < maximum; i++) {
                    undoQueue[i - 1] = undoQueue[i];
                }
                undoQueue[maximum - 1] = lastImgData;
            }
            else {
                undoQueue.push(lastImgData);
            }
        }
        if(redoQueue.length > 0) redoQueue = [];
        lastImgData = imgData;
        performing = false;
    }
    function undoHistory() {
         useHistory(undoQueue, redoQueue);
    }
    function redoHistory() {
        useHistory(redoQueue, undoQueue);
    }
    function useHistory(fromQueue, toQueue) {
        if(performing || !ctx || fromQueue.length < 1) return;
        lastImgData = ctx.getImageData(0, 0, size[0], size[1]);
        performing = true;
        const imgData = fromQueue.pop();
        toQueue.push(lastImgData);
        ctx.putImageData(imgData, 0, 0);
        lastImgData = imgData;
        performing = false;
    }
    function resetHistory() {
        undoQueue.length = 0;
        redoQueue.length = 0;
        ctx.fillStyle="white";
        ctx.fillRect(0,0,size[0],size[1]);
        lastImgData = ctx.getImageData(0, 0, size[0], size[1]);
    }
    return {
        save: saveHistory,
        get ongoing() { return performing; }
    }
})();