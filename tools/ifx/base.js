(function(){
    const clrList = [
        //greyscales
        "#ffffff", "#cccccc", "#999999",
        "#666666", "#333333", "#000000",
        //red-orange-yellow
        "#ff8080", "#ff0000", "#7f0000",
        "#ffb380", "#ff6600", "#7f3300",
        "#ffff80", "#ffff00", "#7f7f00",
        //green-skyblue
        "#80ff80", "#00ff00", "#007f00",
        "#b3ffff", "#66ffff", "#337f7f",
        //blue-purple
        "#99ccff", "#3399ff", "#1947cf",
        "#b380ff", "#6600ff", "#33007f",
        //pink-teal-brown
        "#ff80ff", "#ff00ff", "#7f007f",
        "#80e6cc", "#00cc99", "#00664c",
        "#f7d7c4", "#8e562e", "#331900"
    ];
    const paletteElements = new Map();
    const pencilElements = new Map();
    window.addEventListener("load", function(){
        const wordElement = document.querySelector("#word");
        const wordShuffler = document.querySelector("#word-shuffle");
        paper = document.querySelector("#paper");
        initPalette();
        initLineWidth();
        resize();
        resetWord();
        wordShuffler.addEventListener("click", resetWord);
        document.addEventListener("timereset", initSetup);
        document.dispatchEvent(new CustomEvent("canvasready", {
            detail: {
                canvas: paper,
                ctx: paper.getContext("2d", { willReadFrequently: true })
            }
        }));
        async function resetWord() {
            wordElement.textContent = await Sentence.createAsync();
        }
    });
    function initSetup() {
        Drawer.setColour("#000000");
        Drawer.setStroke("10");
    }
    function resize(){
        if(!paper) return;
        const workspaceSize = paper.parentElement.getBoundingClientRect();
        const minSize = Math.min(workspaceSize.width, workspaceSize.height) - 10;
        paper.width = minSize;
        paper.height = minSize;
    }
    function initPalette() {
        const frag = document.createDocumentFragment();
        for(let clr of clrList) {
            const btn = document.createElement("button");
            btn.addEventListener("click", function(){
                Drawer.setColour(clr);
            });
            btn.style.backgroundColor = clr;
            btn.dataset.colour = clr;
            frag.appendChild(btn);
            paletteElements.set(clr, btn);
        }
        document.getElementById("palette").appendChild(frag);
        document.addEventListener("clrchanged", function(e){
            const oldC = e.detail.oldClr;
            const c = e.detail.clr;
            if(paletteElements.has(oldC)) {
                paletteElements.get(oldC).classList.remove("palette-selected");
            }
            if(paletteElements.has(c)) {
                paletteElements.get(c).classList.add("palette-selected");
            }
        });
    }
    function initLineWidth() {
        const btns = document.querySelectorAll("#pencils > button");
        for(const btn of btns) {
            const strokeSet = function(){
                Drawer.setStroke(btn.dataset.size);
            };
            btn.addEventListener("click", strokeSet);
            KeyBinder.add(btn.dataset.shortcut, strokeSet);
            pencilElements.set(btn.dataset.size, btn);
        }
        document.addEventListener("strokechanged", function(e){
            const oldW = e.detail.oldWidth;
            const w = e.detail.width;
            if(pencilElements.has(oldW)) {
                pencilElements.get(oldW).classList.remove("pencils-selected");
            }
            if(pencilElements.has(w)) {
                pencilElements.get(w).classList.add("pencils-selected");
            }
        });
    }
})();