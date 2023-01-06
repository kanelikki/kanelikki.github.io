const errorMessage = (function(){
    let msgElement;
    window.addEventListener("load", () => msgElement = document.querySelector(".tr-error"));
    function showError(message){
        msgElement.removeAttribute("hidden");
        msgElement.textContent = message;
    }
    function hideError(){
        msgElement.setAttribute("hidden", "");
        msgElement.textContent = "";
    }
    return {
        show: showError,
        hide: hideError
    };
})();