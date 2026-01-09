window.addEventListener("load", function () {
    fabric.disableStyleCopyPaste = true;
    const canvasBg = getCtx("chocolate-bg");
    const canvasFg = new getCtx("chocolate-fg");
    const canvasOver = new fabric.Canvas("chocolate-over", { selection: false });
    const canvasShades = getCtx("chocolate-shades");
    const canvasChoco = getCtx("chocolate-premade");
    const canvasChocoMask = getCtx("chocolate-premade-over");
    const canvasResult = getCtx("chocolate-render-result");
    const width = canvasOver.width;
    const height = canvasOver.height;
    const img = new Image;
    const reader = new FileReader();
    let wasGradient = false;
    let currentBgImg = null;

    const bgPickers = {
        clr: {
            type:"colour",
            radio: document.getElementById("picker-bg1"),
            container: document.getElementById("bg-type1"),
            picker: document.getElementById("picker-bg-clr")
        },
        grd: {
            type:"gradient",
            radio: document.getElementById("picker-bg2"),
            container: document.getElementById("bg-type2"),
            picker: [
                document.getElementById("picker-bg-gr1"),
                document.getElementById("picker-bg-gr2")
            ]
        },
        file: {
            type:"file",
            radio: document.getElementById("picker-bg3"),
            container: document.getElementById("bg-type3"),
            picker: document.getElementById("picker-bg-file")
        },
    };
    const containers = Object.values(bgPickers).map(a => a.container);

    const loading = document.getElementById("loading-message");
    const content = document.getElementById("content");
    let bgImg;
    let rendering = false;
    Promise.all([
        getImage("back", setBgClr)
            .then(im => {
                bgImg = im;
                bgPickers.clr.picker.addEventListener("change", setBgClr);
                bgPickers.grd.picker[0]
                    .addEventListener("change", setBgGradient);
                bgPickers.grd.picker[1]
                    .addEventListener("change", setBgGradient);
                bgPickers.file.picker
                    .addEventListener("change", e => loadUploadedImg(e, rs => setBgImg(rs)));
                bgPickers.clr.radio
                    .addEventListener("change", () => toggleContainers(bgPickers.clr));
                bgPickers.grd.radio
                    .addEventListener("change", () => toggleContainers(bgPickers.grd));
                bgPickers.file.radio.addEventListener("change", () => toggleContainers(bgPickers.file));
                toggleContainers(bgPickers.clr);
            }),
        loadImage("back-shade", canvasShades),
        loadImage("front", canvasFg),
        loadImage("faz_01", canvasChoco),
        new Promise(loaded => {
            if(!WebFont) {
                document.getElementById("loading-error-message")
                    .textContent =
                    "Failed to load Webfont. Check if tracking is blocked. Using default fallback font.";
                document.getElementById("loading-error-font").removeAttribute("hidden");
                loaded();
            }
            else {
                 WebFont.load({
                    google: {
                        families: ['Figtree']
                    },
                    inactive: () => {
                        document.getElementById("loading-error-font").removeAttribute("hidden");
                        loaded();
                    },
                    active: function () {
                        loaded();
                    }
                })
            }
        }).then(() => {
            const prodName = new fabric.IText('TUOREHIIVA', {
                fontFamily: 'Figtree, Sans-serif',
                fontWeight: 600,
                textAlign: 'center',
                fontSize: 21,
                fill: '#c7a46c',
                charSpacing: 100,
                height: 500,
                top: 276,
                left: 528,
                lockMovementX: true,
                lockMovementY: true
            })
            const prodSubnameSv = new fabric.IText('Färsk jäst', {
                fontFamily: 'Figtree, Sans-serif',
                fontWeight: 300,
                textAlign: 'center',
                fontSize: 15,
                fill: '#c7a46c',
                charSpacing: 57,
                top: 297,
                left: 528,
                lockMovementX: true,
                lockMovementY: true
            })
            const prodSubnameEn = new fabric.IText('Fresh yeast', {
                fontFamily: 'Figtree, Sans-serif',
                fontWeight: 300,
                textAlign: 'center',
                fontSize: 15,
                fill: '#c7a46c',
                charSpacing: 48,
                top: 315,
                left: 528,
                lockMovementX: true,
                lockMovementY: true
            })
            canvasOver.add(prodName);
            canvasOver.add(prodSubnameSv);
            canvasOver.add(prodSubnameEn);
            deleteControls(prodName);
            deleteControls(prodSubnameSv);
            deleteControls(prodSubnameEn);
            //setPositionByOrigin does not work with pointer event none. IDK WHY... is this bug?
            prodName.set("top", prodName.top - prodName.height * .5)
            prodName.setCoords();
            prodName.on('changed', e =>
                prodName.setPositionByOrigin(new fabric.Point(528, 276), 'center', 'bottom')
            )
            loadImageFabric("imgs/hiiva.png", canvasOver, 180, 720);
            canvasOver.renderAll();
            function deleteControls(obj) {
                obj.setControlsVisibility({
                    tl: false,
                    tr: false,
                    br: false,
                    bl: false,
                    ml: false,
                    mt: false,
                    mr: false,
                    mb: false,
                    mtr: false
                })
                obj.on('selected', o => o.target.enterEditing())
            }
        }),
        EXT_choco.init(canvasChoco, canvasChocoMask, canvasOver)
    ]).then(() => {
        content.removeAttribute("hidden");
        loading.setAttribute("hidden", "")
        document.getElementById("render-button").addEventListener("click", render);
        document.getElementById("picker-img")
            .addEventListener("change", e => loadUploadedImg(e, rs => img.src = rs));
    });
    function loadImage(url, targetCanvas) {
        return getImage(url, im => targetCanvas.drawImage(im, width - im.width, 0));
    }
    function getImage(url, callback) {
        const img = new Image;
        img.src = "imgs/" + url + ".png";
        return new Promise(rsv => {
            img.onload = () => {
                callback(img);
                rsv(img);
            }
        })
    }
    function loadImageFabric(fullUrl, targetCanvas, top, left) {
        img.src = fullUrl;
        const f = new fabric.Image("", { top: top, left: left });
        return new Promise(rsv => {
            img.onload = () => {
                f.setElement(img);
                f.scale(0.5 * height / img.height);
                targetCanvas.add(f);
                rsv(img);
                canvasOver.renderAll();
            }
        })
    }
    function loadUploadedImg(ev, callback) {
        const file = ev.target.files[0];
        if (!file || !file.type || !file.type.startsWith('image/')) {
            return;
        }
        reader.readAsDataURL(file);
        reader.addEventListener("load", e => callback(e.target.result), { once: true });
    }

    function setBgClr() {
        const clr = bgPickers.clr.picker.value;
        canvasBg.fillStyle = clr;
        canvasBg.fillRect(0, 0, width, height);
    }
    function setBgGradient() {
        const clr1 = bgPickers.grd.picker[0].value;
        const clr2 = bgPickers.grd.picker[1].value;
        const grad = canvasBg.createLinearGradient(width / 2, 0, width, height);
        grad.addColorStop(0, clr1);
        grad.addColorStop(1, clr2);
        canvasBg.fillStyle = grad;
        canvasBg.fillRect(width / 2, 0, width, height);
    }
    function setBgImg(url) {
        if (wasGradient) setBgGradient();
        else setBgClr();
        currentBgImg = url;
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const pattern = canvasBg.createPattern(img, "repeat");
            canvasBg.fillStyle = pattern;
            canvasBg.fillRect(width / 2, 0, width, height);
        };
    }
    function toggleContainers(showType) {
        const toShow = showType.container;
        switch(showType.type) 
        {
            case "colour":
                setBgClr();
                wasGradient = false;
                break;
            case "gradient":
                setBgGradient();
                wasGradient = true;
                break;
            default:
                if(!!currentBgImg) {
                    setBgImg(currentBgImg);
                }
                break;
        }
        for (const cont of containers) {
            if (cont === toShow) {
                cont.removeAttribute("hidden");
            }
            else {
                cont.setAttribute("hidden", "");
            }
        }
    }

    function getCtx(canvasName) {
        return document.getElementById(canvasName).getContext("2d");
    }
    function render() {
        if (rendering) return;
        rendering = true;
        canvasResult.clearRect(0, 0, width, height);
        canvasResult.drawImage(canvasBg.canvas, 0, 0);
        canvasResult.drawImage(canvasFg.canvas, 0, 0);
        canvasResult.drawImage(canvasOver.toCanvasElement(), 0, 0);
        canvasResult.drawImage(canvasShades.canvas, 0, 0);
        canvasResult.drawImage(canvasChoco.canvas, 0, 0);
        canvasResult.globalCompositeOperation = "multiply"
        canvasResult.drawImage(canvasChocoMask.canvas, 0, 0);
        canvasResult.globalCompositeOperation = "destination-in";
        canvasResult.drawImage(bgImg, 0, 0);
        canvasResult.globalCompositeOperation = "source-over";
        rendering = false;
    }
});