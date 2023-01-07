let languageData = {
    from:null, to:null
}
let languagePromise = (async function () {
    const langs = {
        "Europe":{
            "uk":"English (UK)",
            "it":"Italian",
            "de":"Deutsch",
            "sp":"Spanish",
            "fr":"French",
            "nl":"Dutch",
            "pt":"Portuguese",
            "pl":"Polish",
            "ru":"Russian"
        },
        "America":{
            "us":"English (US)",
            "ns":"Spanish",
            "nf":"French",
            "np":"Portuguese"
        },
        "Asia":{
            "au":"English (AU)",
            "jp":"Japanese",
            "kr":"Korean",
            "cn":"Chinese"
        }
    }
    const langIndexes = Object.values(langs).reduce((asdf, aaa)=>{asdf.push(...Object.keys(aaa)); return asdf;}, []);
    let dataMap = new Map();
    const fromDefault = "uk";
    const toDefault = "us";

    await windowPromise;
    (function(){
        let btn = document.querySelector(".tr-convert");
        addElements(".tr-lang-from", fromDefault, async e => {
            languageData.from = (await loadData(e.target.value)).from;
        })
        addElements(".tr-lang-to", toDefault, async e => {
            languageData.to = (await loadData(e.target.value)).to;
        });
        function addElements(elemName, defaultValue, event) {
            let elem = document.querySelector(elemName);
            let frag = document.createDocumentFragment();
            for(let [groupLabel, langGroup] of Object.entries(langs)) {
                let optGroup = document.createElement("optgroup");
                optGroup.label = groupLabel;
                for(let [langCode, langName] of Object.entries(langGroup)) {
                    let opt = document.createElement("option");
                    opt.value = langCode;
                    opt.textContent = `${langName}, ${groupLabel}`;
                    if(langCode === defaultValue){
                        opt.setAttribute("selected","")
                    }
                    optGroup.appendChild(opt);
                }
                frag.appendChild(optGroup);
            }
            elem.appendChild(frag);
            elem.addEventListener("change", async e =>{
                btn.enabled = false;
                await event(e);
                document.dispatchEvent(new CustomEvent("langswitch"));
                btn.enabled = true;
            });
        }
    })();
    languageData.from = (await loadData(fromDefault, true)).from;
    languageData.to = (await loadData(toDefault, true)).to;

    async function loadData(language, firstLoad = false) {
        if (langIndexes.indexOf(language) < 0) {
            errorMessage.show("unsupported language");
            return;
        }
        if(!firstLoad) errorMessage.hide();
        if (!dataMap.get(language)) {
            var fetched = await fetch(`data/${language}/result.json`, {
                headers:{
                    "Content-Type": "utf-8"
                }
            }).then(r => r.json());
            dataMap.set(language, {
                "to": fetched,
                "from": convertBack(fetched)
            });
        }
        return dataMap.get(language);
    }

    function convertBack(jsonData) {
        let result = {};
        for (let groupKey of Object.keys(jsonData)) {
            result[groupKey] = convertBackEach(jsonData[groupKey]);
        }
        return result;
        function convertBackEach(json) {
            let res = {};
            for (let key of Object.keys(json)) {
                let value = json[key];
                if (res[value]) {
                    res[value].push(key);
                }
                else {
                    res[value] = [key];
                }
            }
            return res;
        }
    }
})();