window.addEventListener("load", ()=>{
    var canvas = document.querySelector("canvas");
    let imgTarget = document.querySelector("#image-input");
    var ctx = canvas.getContext('2d');
    let img = new Image();
    img.src = "./dalgona.jpg";
    img.onload = drawBase;
    let file = document.getElementById("input");
    file.addEventListener("change",function(ev){
        drawBase();
        let uploadedImage = ev.target.files[0];
        var reader  = new FileReader();
        reader.readAsDataURL(uploadedImage);
        reader.onloadend = function (e) {
            imgTarget.src = e.target.result;
            const maxSize = 500;
            imgTarget.onload = ()=>{
                let width = imgTarget.width;
                let height = imgTarget.height;
                if(width > height) {
                    height = maxSize * height / width;
                    width = maxSize;
                }
                else if(width < height) {
                    width = maxSize * width / height;
                    height = maxSize;
                }
                else {
                    width = maxSize;
                    height= maxSize;
                }
//------------------ opencv start
//from https://codepen.io/wallat/pen/yLymMey
                var src = cv.imread("image-input");
                var dst = new cv.Mat();
        
                cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
            
                cv.Canny(src, dst, 50, 100, 3, false);
                let temp = document.createElement("canvas");
                let tempCtx = temp.getContext('2d');
                ctx.filter = "blur(4px)";
                cv.imshow(temp, dst);
        
                ctx.globalCompositeOperation = "lighter";
                ctx.drawImage(temp, 202, 202, width, height);

                //add colour
                tempCtx.globalCompositeOperation = "darken";
                tempCtx.fillStyle = "#1b56ff";
                tempCtx.fillRect(0,0,temp.width, temp.height);
                //invert
                tempCtx.globalCompositeOperation = "difference";
                tempCtx.fillStyle = "white";
                tempCtx.fillRect(0,0,temp.width, temp.height);
                //draw
                ctx.filter = "blur(2px)";
                ctx.globalCompositeOperation = "multiply";
                ctx.drawImage(temp,202, 202, width, height);
                ctx.drawImage(temp,202, 202, width, height);
                ctx.drawImage(temp,202, 202, width, height);

                src.delete();
                dst.delete();
//------------------ opencv end
                //ctx.globalCompositeOperation = "lighter";
                //ctx.globalCompositeOperation = "source-over";
                //ctx.drawImage(imgTarget, 200, 200, width, height);
            }
            imgTarget.onerror = function(){
                alert("The format isn't right");
            }
           // Converted image is available here.
        }
    })
    function drawBase(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0,0);
    }
});