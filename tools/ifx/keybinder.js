const KeyBinder = (function(){
    const keyMap = new Map();
    function bindKey(key, func) {
        if(keyMap.has(key)) return;
        keyMap.set(key, func);
    }
    window.addEventListener("keydown", function(e) {
        if(!e.repeat && keyMap.has(e.key)) keyMap.get(e.key)();
    });
    return {
        add:bindKey
    }
})();