(function(){
    document.addEventListener("canvasready", function() {
        const timeDisplay = document.querySelector("#timer");
        const resetButton = document.querySelector("#reset");
        resetButton.addEventListener("click", resetCounter);
        let time = 0;
        let interval = null;
        document.dispatchEvent(
            new CustomEvent("timereset")
        );
        startCounter();
        function startCounter(){
            interval = setInterval(function(){
                time++;
                if(time > 3600) {
                    clearInterval(interval);
                }
                else updateDisplayTime(time);
            },1000);
        }
        function stopCounter(){
            if(interval!==null) {
                clearInterval(interval);
                document.dispatchEvent(
                    new CustomEvent("timereset")
                );
            }
            time=0;
            updateDisplayTime(0);
            interval = null;
        }
        function resetCounter() {
            stopCounter();
            startCounter();
        }
        function updateDisplayTime(time) {
            timeDisplay.textContent =
            `${Math.floor(time/60).toString().padStart(2, "0")}`
            +`:${(time%60).toString().padStart(2,"0")}`;
        }
    })
})();