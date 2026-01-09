const EXT_choco = (function () {
    let canvasChoco;
    let canvasChocoMask;
    let customChocoLayer;
    let pickerTypes;
    let pickerClrWrapper;
    let fileUploadWrapper;
    const imageList = [];
    const imageListMask = [null];
    let ready = false;
    let width, height;
    let applyingClr = false;
    let applyingImg = false;
    let img = new Image;
    const reader = new FileReader();
    const hideElement = el => el.setAttribute("hidden", "");
    const showElement = el => el.removeAttribute("hidden");
    function loadImage(url, arr, index) {
        return new Promise(rsv => {
            const img = new Image;
            img.src = "imgs/" + url + ".png";
            img.onload = () => {
                arr[index] = img;
                rsv(img);
            }
        })
    }
    function drawPremade(img, targetCanvas) {
        targetCanvas.clearRect(0, 0, width, height);
        if (!img) return;
        targetCanvas.drawImage(img, width - img.width, 0);
    }
    function applyClr(clr, ignoreRendering = false) {
        if ((applyingImg || applyingClr) && !ignoreRendering) return;
        applyingClr = true;
        canvasChocoMask.globalCompositeOperation = "source-in";
        canvasChocoMask.fillStyle = clr;
        canvasChocoMask.fillRect(0, 0, width, height);
        canvasChocoMask.globalCompositeOperation = "source-over";
        applyingClr = false;

    }
    return {
        init: async function (chocolateLayer, chocolateOverLayer, fabricLayer) {
            if (ready) return;
            ready = true;
            const cv = chocolateLayer.canvas;
            canvasChoco = chocolateLayer;
            canvasChocoMask = chocolateOverLayer;
            customChocoLayer = fabricLayer;
            const fabricElement = new fabric.Image("");
            width = cv.width;
            height = cv.height;
            pickerTypes = document.getElementById("picker-type");
            const pickers = pickerTypes.querySelectorAll("input");
            const pickerClr = document.getElementById("picker-choco-clr");
            pickerClrWrapper = document.getElementById("picker-choco-clr-wrapper");
            fileUploadWrapper = document.getElementById("picker-choco-file-wrapper");
            const fileUploader = document.getElementById("picker-choco-file");
            loadImageFabric();
            for (const picker of pickers) {
                picker.addEventListener("change", function (e) {
                    if (applyingClr || applyingImg) return;
                    applyingImg = true;
                    const index = e.target.value;
                    switch (index) {
                        case "0":
                            fabricElement.visible = false;
                            hideElement(pickerClrWrapper);
                            hideElement(fileUploadWrapper);
                            fabricLayer.renderAll();
                            break;
                        case "1":
                        case "2":
                            fabricElement.visible = false;
                            showElement(pickerClrWrapper);
                            hideElement(fileUploadWrapper);
                            fabricLayer.renderAll();
                            break;
                        default:
                            fabricElement.visible = true;
                            hideElement(pickerClrWrapper);
                            showElement(fileUploadWrapper);
                            fabricLayer.renderAll();
                            break;
                    }
                    drawPremade(imageList[index], canvasChoco);
                    drawPremade(imageListMask[index], canvasChocoMask);
                    applyClr(pickerClr.value, true);
                    applyingImg = false;
                })
            }
            fileUploadWrapper.addEventListener("change", e => {
                const file = e.target.files[0];
                if (!file || !file.type || !file.type.startsWith('image/')) {
                    return;
                }
                reader.readAsDataURL(file);
                reader.addEventListener("load", e => {
                    img.src = e.target.result;
                });
            })
            pickerClr.addEventListener("change", e => applyClr(e.target.value))
            await Promise.all([
                loadImage("faz_01", imageList, 0),
                loadImage("faz_02", imageList, 1),
                loadImage("faz_03", imageList, 2),
                loadImage("faz_02_msk", imageListMask, 1),
                loadImage("faz_03_msk", imageListMask, 2)
            ]);
            function loadImageFabric() {
                return new Promise(rsv => {
                    img.onload = () => {
                        fabricElement.setElement(img);
                        //scaleToHeight is broken...
                        fabricElement.scale(height/img.height);
                        fabricElement.top = height/2;
                        fabricElement.left = width - fabricElement.getScaledWidth()/2;
                        fabricElement.setCoords();
                        customChocoLayer.add(fabricElement);
                        rsv(img);
                        customChocoLayer.renderAll();
                    }
                })
            }

        }
    }
})();