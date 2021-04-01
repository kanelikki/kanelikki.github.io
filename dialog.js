(function(){
    const currentDate = new Date();
    const localStorageKey = "april-status-"+currentDate.getFullYear();
    let bg;
    let content;
    let text;
    if(currentDate.getMonth() === 3 && currentDate.getDate() === 1 && !localStorage.getItem(localStorageKey)){
        const frag = document.createDocumentFragment();
        bg = makeElement("dialog-background", frag);
        const win = makeElement("dialog-window", bg);
        makeElement("dialog-title", win, "h1").textContent = "We use crisps/chips on our website.";
        content = makeElement("dialog-content", win);
        makeElement("dialog-image", content);
        text = makeElement("dialog-text", content);
        text.innerHTML="We use crisps to improve your experience crispy on our website. "
        +"By tapping 'I agree', your chips are sent to us safely for our night snack. We don't use your crisps for our advertisement contents. "
        +"Instead, we can watch the advertisements on video streaming services with the crisp that you sent and some beers. "
        +"If you don't agree, you can select third-party crisp options by clicking 'Manage chips'. ";
        const bottom = makeElement("dialog-bottom", win);
        const manageButton = makeElement("dialog-button-manage", bottom);
        manageButton.textContent = "Manage chips";
        manageButton.addEventListener("click", goNextStep);
        const agreeButton = makeElement("dialog-button-agree", bottom);
        agreeButton.addEventListener("click", destroyWindow);
        agreeButton.textContent = "I Agree";
        window.addEventListener("load",
            function(){
                document.body.appendChild(frag);
            }
        , { once: true });
    }
    function goNextStep(){
        content.removeChild(text);
        const selectContent = makeElement("dialog-content", content);
        makeElement("dialog-head-small", selectContent).textContent = "Mandatory requirement";
        createButton("Potato", true);

        makeElement("dialog-head-small", selectContent).textContent = "Options";
        const foods = ["Sweet potato", "Apple", "Carrot", "Spinach", "Beetroot",
            "Rutabaga", "Parsnip", "Banana", "Leek", "Zucchini", "Radish", "Pumpkin", "Cabbage",
            "Eggplant", "Onion", "Mango", "Papaya", "Tomato", "Bell pepper"];

        for(const food of foods){
            createButton(food);
        }
        
        this.parentElement.removeChild(this);

        function createButton(label, mandatory = false) {
            const group = makeElement("dialog-selection", selectContent);
            const checkBox = makeElement("dialog-selection-button", group, "input");
            checkBox.type = "checkbox";
            if(mandatory){
                checkBox.checked = true;
                checkBox.disabled = "disabled";
            }
            makeElement("dialog-selection-lable", group, "span").textContent = label;
        }
    }
    function destroyWindow(){
        document.body.removeChild(bg);
        localStorage.setItem(localStorageKey, true);
    }
    function makeElement(className, appendTarget, elem = "div"){
        const element = document.createElement(elem);
        element.classList.add(className);
        appendTarget.appendChild(element);
        return element;
    }
})();