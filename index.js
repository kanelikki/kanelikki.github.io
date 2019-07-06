(function(){
    const modal=document.querySelector(".modal-bg");
    document.querySelector(".header").addEventListener("click",()=>{
        modal.style.display="flex";
    });
    document.querySelector(".form-button-close").addEventListener("click",()=>{
        modal.style.display
        modal.style.display="none";
    });
})();