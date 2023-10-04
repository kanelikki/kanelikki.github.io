const GetTheme = (function(){
    let themeSelector;
    window.addEventListener("load", function(){
        themeSelector = this.document.querySelector("#theme-selector");
        for(let i=0;i<ThemeNames.length;i++){
            const theme = ThemeNames[i];
            const option = document.createElement("option");
            option.value = i;
            option.textContent = theme;
            themeSelector.appendChild(option);
            if(i===0) option.setAttribute("selected", "selected");
        }
    });
    return () => themeSelector.value;
})();