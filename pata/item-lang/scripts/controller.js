(async function () {
    await windowPromise;

    let groupElems = [...document.querySelectorAll(".tr-group")];
    let dataList = document.querySelector("#tr-data");
    let resultScreen = document.querySelector(".tr-result");
    let input = document.querySelector(".tr-input");
    let currentGroup;
    await languagePromise;

    document.querySelector(".tr-convert").addEventListener("click", () => {
        resultScreen.textContent = "";
        let from = languageData.from;
        let to = languageData.to;
        let ids = from[currentGroup][input.value];
        if (ids && Array.isArray(ids)) {
            errorMessage.hide();
            for (let id of ids) {
                let paragraph = document.createElement("p");
                paragraph.textContent = to[currentGroup][id];
                resultScreen.appendChild(paragraph);
            }
        }
        else errorMessage.show("input data is wrong!");
    });
    document.addEventListener("langswitch", () => setGroup(currentGroup));

    for (let groupElem of groupElems) {
        if (groupElem.checked) setGroup(groupElem.value);
        groupElem.addEventListener("change", e => {
            setGroup(e.target.value);
        });
    }
    function setGroup(group) {
        currentGroup = group;
        dataList.textContent = "";
        let frag = document.createDocumentFragment();
        let from = languageData.from;
        for (let dt of Object.keys(from[currentGroup])) {
            let elem = document.createElement("option");
            elem.textContent = dt;
            frag.appendChild(elem);
        }
        dataList.appendChild(frag);
    }
})();