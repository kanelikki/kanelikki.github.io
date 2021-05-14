window.onload = function(){
    const unopendColor = "#b3ffb9";
    const opendColor = "#e8b8a9";
    const visualButton = document.getElementsByClassName("button-visual")[0];
    let animating = false;
    const lid= document.getElementsByClassName("box-up")[0];
    const arm = [
        document.getElementsByClassName("robotarm-scalemanager0")[0],
        document.getElementsByClassName("robotarm-scalemanager1")[0],
        document.getElementsByClassName("robotarm-scalemanager2")[0],
    ];

    document.body.style.backgroundColor = unopendColor;

    //STEP 1. Open lid.
    openOrClose(lid,
        function(){
            arm[0].classList.add("anim-open-robot");
        },
        function(){
            lid.classList.remove("anim-open-lid");
            lid.classList.remove("anim-open-lid-reverse");

            animating = false;
        }
    );
    openOrClose(arm[0],
        function(){
            console.log("from arm0");
            arm[1].classList.add("anim-open-robot");
        },
        function(){
            arm[0].classList.remove("anim-open-robot-reverse");
            arm[0].classList.remove("anim-open-robot");

            lid.classList.add("anim-open-lid-reverse");
        }
    );
    openOrClose(arm[1],
        function(){
            console.log("from arm1");
            arm[2].classList.add("anim-open-robot");
        },
        function(){
            arm[1].classList.remove("anim-open-robot-reverse");
            arm[1].classList.remove("anim-open-robot");

            arm[0].classList.add("anim-open-robot-reverse");
        }
    )
    openOrClose(arm[2],
        function(){
            console.log("from arm2");
            visualButton.classList.remove("button-visual-clicked");
            document.body.style.backgroundColor = unopendColor;
            arm[2].classList.add("anim-open-robot-reverse");
        },
        function(){
            arm[2].classList.remove("anim-open-robot-reverse");
            arm[2].classList.remove("anim-open-robot");

            arm[1].classList.add("anim-open-robot-reverse");
        }
    )

    function openOrClose(elem, openAction, closeAction){
        elem.addEventListener("animationend", (e)=> {
            e.stopPropagation();
            if(e.animationName.slice(-4) === "open"){
                console.log(e.animationName);
                openAction();
            }
            else if(e.animationName.slice(-5) === "close"){
                console.log(e.animationName);
                closeAction();
            }
        });
    }

    document.querySelector(".button-hover").addEventListener("click",function(){
        if(animating) return;
        animating = true;
        visualButton.classList.add("button-visual-clicked");
        document.body.style.backgroundColor = opendColor;
        lid.classList.add("anim-open-lid");
    });
}