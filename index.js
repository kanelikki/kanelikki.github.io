addEventListener("load",function(){
    const contents = document.querySelector(".intro-slide");
    const children = [...contents.children];
    let currentIndex = 0;
    let reservedIndex = 1;
    let __timeoutId = -1;
    let transitionDone = true;
    contents.style.left="0%";
    let currentElement = children[currentIndex];
    currentElement.style.display="block";
    const SLIDE_COUNT = contents.childElementCount;
    const NEXT_SLIDE_TIME = 5000;
    contents.after(createNavigator());
    setTimeout(()=>slide(reservedIndex),NEXT_SLIDE_TIME);
    //
    function createNavigator(){
        let frag = document.createDocumentFragment();
        let navigator = document.createElement("div");
        navigator.classList.add("intro-nav");
        for(let i=0;i<SLIDE_COUNT;i++){
            let item = document.createElement("div");
            item.addEventListener("click", ()=>slide(i));
            navigator.appendChild(item);
        }
        frag.appendChild(navigator);
        return frag;
    }
    function slide(position){
        if(!transitionDone || position == currentIndex || position<0 || position >= SLIDE_COUNT) return;
        transitionDone = false;
        clearTimeout(__timeoutId);
        let nextElement = children[position];
        contents.appendChild(nextElement);
        nextElement.style.display="block";
        contents.classList.add("intro-slide-trans")
        contents.style.left="-100%";
        contents.addEventListener("transitionend", ()=>{
            contents.classList.remove("intro-slide-trans");
            currentElement.style.display="none";
            contents.style.left="0%";
            currentIndex = position;
            currentElement = children[position];
            reservedIndex = (currentIndex+1)%SLIDE_COUNT;
            __timeoutId = setTimeout(()=>slide(reservedIndex),NEXT_SLIDE_TIME);
            transitionDone = true;
        }, { once: true });
    }
})