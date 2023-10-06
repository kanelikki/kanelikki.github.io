const loadPromise = 
    new Promise(res=>window.addEventListener(
        "load", res
    ));
(async function () {
    const [classData, equipData, setSkills] = await Promise.all(
        [await loadData("res/class.json"),
        await loadData("res/equipment.json"),
        await loadList("res/setskill.txt")]
    )
    async function loadData(addr) {
        return await (await fetch(addr)).json();
    }
    async function loadList(addr) {
        return (await (await fetch(addr)).text())
            .split("---")
            .map(d => d.split("\n").map(t=>t.trim()).filter(t=>t));
    }
    //-- gui stuff
    await loadPromise;
    const builds = [...document.querySelectorAll("#builds li")].map(b => {
        return {
            body: b,
            label: b.querySelector("b"),
            equip: b.querySelector("span")
        }
    });
    const skillBuilds = [...document.querySelectorAll("#setskills li")].map(b => {
        return {
            body:b,
            slot:b.querySelector("span")
        }
    });
    const rarityMap = {
        "default":"eq-default",
        "enchants":"eq-enchants",
        "unique":"eq-unique",
        "super-unique":"eq-superunique",
        "ultimate":"eq-ultimate",
    }
    const units = [...document.getElementsByName("unit")];
    const enchants = [...document.getElementsByName("rarity")];
    const error = document.querySelector("#error p");
    document.querySelector("#roll-submit").addEventListener("submit",function(e){
        e.preventDefault();
        getBuild();
    })
    for(build of builds) {
        build.body.querySelector("button").addEventListener("click", reroll);
    }
    for(build of skillBuilds) {
        build.body.querySelector("button").addEventListener("click", reroll2);
    }
    let currentEquips;
    let currentSkills;
    let isUberhero;
    
    //on event-----------
    function getBuild() {
        const className = getSelectedClass();
        const enchantNames = getSelectedEnchants();
        if(!className || enchantNames.length<1) {
            writeError("please select class name and enchants");
            return;
        }
        hideError();
        displayAllBuild(className,enchantNames);
    }
    function reroll(e) {
        const index = e.target.dataset.index;
        if(!currentEquips || index >= currentEquips.length) return;
        updateEquipmentDisplay(
            e.target.parentNode.querySelector("span"),
            randomizeOne(currentEquips[index], getSelectedEnchants())
        );
    }
    function reroll2(e) {
        const index = e.target.dataset.index;
        let oldSkill = currentSkills[index];
        let newSkill;
        do {
            newSkill = getRandomFromArray(getSetSkillLists());
        } while (newSkill != oldSkill && currentSkills.indexOf(newSkill)>-1);
        currentSkills[index] = newSkill;
        e.target.parentNode.querySelector("span").textContent = newSkill;
    }
    //ui-----------------
    function displayAllBuild(className,filter) {
        let index = 0;
        const cl = classData[className];
        const data = randomizeAll(cl,filter);
        for(build of builds) {
            if(index < data.length && data[index]){
                build.label.textContent = cl[index];
                updateEquipmentDisplay(build.equip, data[index]);
                build.body.removeAttribute("hidden");
            }
            else{
                build.body.setAttribute("hidden","");
            }
            index++;
        }
        const skillSlots = cl.skills;
        index=0;
        let results=getSetSkills(skillSlots);
        for(build of skillBuilds) {
            if(index < skillSlots){
                build.slot.textContent = results[index];
                build.body.removeAttribute("hidden");
            }
            else{
                build.body.setAttribute("hidden","");
            }
            index++;
        }
    }
    function getSelectedClass() {
        for(var unit of units) {
            if(unit.checked) {
                let selected = unit.dataset.class;
                if(selected=="guardira") {
                    if(Math.random()>=0.5) selected = "guardira2"
                }
                return selected;
            }
        }
    }
    function getSelectedEnchants() {
        const result = [];
        for(var enc of enchants) {
            if(enc.checked) result.push(enc.dataset.enc);
        }
        return result;
    }
    function updateEquipmentDisplay(element, data) {
        element.textContent = data.name;
        element.className = "";
        element.classList.add(rarityMap[data.rarity]);
    }
    //logic---------------
    function randomizeAll(cl,filter) {
        currentEquips = [];
        const results = [];
        if(!cl || !Array.isArray(cl.equip)) {
            writeError("Not a valid class.");
            return;
        }
        isUberhero = cl.uberhero;
        const eq = cl.equip;
        for(equipArray of eq) {
            currentEquips.push(equipArray);
            results.push(randomizeOne(equipArray,filter));
        }
        return results;
    }
    function randomizeOne(eq,filter) {
        const equip = equipData[getRandomFromArray(eq)];
        if(!equip || !Array.isArray(equip)) {
            writeError("Please put valid equipment array");
            return;
        }
        return getRandomFromArray(equip.filter(q => filter.indexOf(q.rarity)>-1));
    }
    function getRandomFromArray(array) {
        return array[Math.floor(Math.random()*array.length)];
    }
    function getSetSkills(slot) {
        currentSkills = [];
        let rollResult;
        for(let i=0;i<slot;i++){
            do {
                rollResult = getRandomFromArray(getSetSkillLists());
            } while(currentSkills.indexOf(rollResult)>-1);
            currentSkills.push(rollResult);
        }
        return currentSkills;
    }
    function getSetSkillLists() {
        return isUberhero?setSkills[0]:setSkills[1];
    }
    //Error handling------------
    function hideError() {
        error.setAttribute("hidden","");
    }
    function writeError(text){
        error.removeAttribute("hidden");
        error.textContent = text;
    }
})();