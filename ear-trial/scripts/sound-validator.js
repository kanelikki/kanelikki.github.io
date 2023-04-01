const getUploadedData = (function(){
    const fileElementMap = new Map();
    (async function () {
        await new Promise((res) => window.addEventListener("load", () => res()));
        const musicFiles = [...document.querySelectorAll(".music-file")];
        //you cannot change later by editing html
        let i=0;
        for (const file of musicFiles) {
            file.addEventListener("change", validate);
            const seconds = Number(file.dataset.seconds);
            if (isNaN(seconds)) throw "Invalid seconds " + file.dataset.seconds;
            fileElementMap.set(
                file,
                {
                    duration: seconds,
                    errorMessage: file.parentElement.querySelector(".music-error"),
                    index:i,
                    data: null
                }
            );
            i++;
        }
        const audioContext = new AudioContext();
        async function validate(e) {
            const element = e.target;
            if (element.files.length) {
                const file = element.files[0];
                const audioData = await audioContext.decodeAudioData(await file.arrayBuffer());
                const fileElementData = fileElementMap.get(element);
                if (!fileElementData) {
                    throw "Wrong caller of the function.";
                }
                const [duration, errorMessage] = [fileElementData.duration, fileElementData.errorMessage];
                if (audioData.duration < duration - 1
                    || audioData.duration > duration + 1) {
                    //show error message
                    errorMessage.textContent =
                        `duration doesn't match! expected ${duration}, result ${audioData.duration}, difference ${audioData.duration - duration}`;
                    errorMessage.removeAttribute("hidden");
                    fileElementData.data = null;
                    return;
                }
                fileElementData.data = audioData;
                errorMessage.setAttribute("hidden", "");
            }
            else {
                fileElementMap.get(element).data = null;
            }
        }
    })();
    function getCurrentData() {
        const iterator = fileElementMap.values();
        let result = [];
        for(const val of iterator){
            if(val.data === null) {
                return null;
            }
            result[val.index] = val.data;
        }
        return result;
    }
    return getCurrentData;
})();