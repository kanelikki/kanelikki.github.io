//this code hack is unstable. If this does not work, try something like F5 or Ctrl+F5
const cooldown = 500;
const clickCooldown = 50;
const searchCooldown = 100;
const waitForTime = (time) => new Promise(a => setTimeout(a, time));
const waitForCoolDown = () => waitForTime(cooldown);
const clickManager = (function() {
    const newElemIndicator = document.getElementById("js-animation-new");
    let clicking = false;
    return {
        stopClick: ()=>clicking = false,
        dispatchClick: async ()=>{
            await waitForTime(clickCooldown);
            clicking = true;
            const interval = setInterval(function(){
                if(clicking) {
                    newElemIndicator.click();
                    for(const target of newElemIndicator.__vue__.$children) target.$el.click();
                }
                else {
                    clearInterval(interval);
                }
            }, clickCooldown);
        }
    }
})();

const playGame = (function() {
    /*
    const allElements = workspace.__vue__.$store.getters.elements;
    const allElementIds = new Set(workspace.__vue__.$store.getters.elementsIds);
    const allCombiData = workspace.__vue__.$store.getters.elementsList.reduce((a,b) =>{
            for(const p of b.parents) {
                const hash = makeCombiId(...p);
                if(!a[hash]) a[hash] = [b.id];
                else if(a[hash].indexOf(b)<0) a[hash].push(b.id);
            }
            return a;
        }, {});
        */
    const allFinals = new Set(workspace.__vue__.$store.getters.elementsList.filter(f => f.final).map(f => f.id));
    const totalProgress = new Set(workspace.__vue__.$store.getters.totalProgressElements);
    const lib = new Set(workspace.__vue__.$store.getters.library);
    const allPairs = workspace.__vue__.$store.getters.elementsList.reduce((a,b)=>{
        for(const p of b.parents) {
            registerPair(p[0], p[1], b.id);
            registerPair(p[1], p[0], b.id);
        }
        return a;
        function registerPair(key, val, id){
            if(!a[key]) a[key]={};
            if(a[key][val]===undefined) a[key][val] = [id];
            else a[key][val].push(id);
        }
    },{});
    
    workspace.__vue__.$store._actions.mixNew.push(e => registerItem(e.children));
    workspace.__vue__.$store._actions.progressNewBase.push(registerItem);
    return async function(){
        //more legit clear, but animation takes time
        //await workspace.__vue__.$store._actions.workspaceClearStart[0]();
        //popping because have to edit array
        clearSpace();
        let combi = findCombination();
        if(combi===null) {
            console.log("DONE!");
            return null;
        }
        let libIndex = await searchFor(combi[0]);
        if(libIndex < 0) throw "";
        drag(libIndex);
        libIndex = await searchFor(combi[1]);
        if(libIndex < 0) throw "";
        drag(libIndex);
        deletePair(...combi);
    }

    function findCombination() {
        for(const p1 of Object.keys(allPairs)) {
            if(lib.has(p1)) {
                for(const p2 of Object.keys(allPairs[p1])) {
                    if(lib.has(p2) && hasAnyNewChild(p1, p2))
                        return [p1, p2];
                }
            }
        }
        return null;
        function hasAnyNewChild(p1, p2) {
            for(const c of allPairs[p1][p2]) {
                if(!totalProgress.has(c)) return true;
            }
            return false;
        }
    }
    async function searchFor(id) {
        const obj = workspace.__vue__.$store.getters.elements[id];
        if(!obj) return -1;
        //console.log(obj.name, obj.id);
        await workspace.__vue__.$store._actions.searchHide[0]();
        await waitForCoolDown();
        let maxRetry = 10;
        for(let i=0;i<maxRetry;i++){
            let index = 0;
            await workspace.__vue__.$store._actions.search[0](obj.name);
            for(const child of library.__vue__.$children) {
                if(obj.id===child.element.id) {
                     return index;               
                } 
                index++;
            }
            await waitForTime(searchCooldown);
            console.log("retrying with ",obj);
        }
        //console.log("found nothing with ", obj);
        return -1;
    }
    function clearSpace() {
        let handler; //if handler is deleted, reaction doesn't work. legit move adds handler automatically
        while (workspace.__vue__.workspaceElements.length > 0) {
            const popped = workspace.__vue__.workspaceElements.pop();
            if (popped.elementId === "0") handler = popped;
        }
        if(handler) workspace.__vue__.workspaceElements.push(handler);
        while (workspace.__vue__.workspaceFinal.length > 0) {
            workspace.__vue__.workspaceFinal.pop();
        }
        while (workspace.__vue__.workspaceExhausted.length > 0) {
            workspace.__vue__.workspaceExhausted.pop();
        }
    }
    function registerItem(ids) {
        for(const id of ids) {
            totalProgress.add(id);
            if(!allFinals.has(id)) lib.add(id);
        }
    }
    function deletePair(p1, p2) {
        deleteOnePair(p1, p2);
        deleteOnePair(p2, p1);
        function deleteOnePair(one, two){
            if(allPairs[one][two]!==undefined){
                delete allPairs[one][two];
            }
        }
    }

    function makeCombiId(a, b) {
        return a + "#" + b;
    }
    function hasCombination(a, b) {
        let hash = makeCombiId(a, b);
        if(allCombiData[hash]!==undefined) {
            return hash;
        }
        hash = makeCombiId(b, a);
        if(allCombiData[hash]!==undefined) {
            return hash;
        }
        else return null;
    }
})();

const resume = () => {
    clickManager.stopClick();
    playGame();
}

workspace.__vue__.$store._actions.animationNewStart.push(clickManager.dispatchClick);
workspace.__vue__.$store._actions.animationNewEnd.push(resume);
workspace.__vue__.$store._actions.tutorialTextShow.push(workspace.__vue__.$store._actions.tutorialTextHide[0]);
playGame();

function drag(index) {
    const child = library.__vue__.$children[index];
    const listPos = child.$el.getBoundingClientRect();
    const startPos = {
        "x": listPos.x + 50, y: listPos.y + listPos.height / 2
    }
    const pos = {
        "x": 600, "y": 400
    }

    const evStart = {
        pageX: startPos.x, pageY: startPos.y, isDragging: true, cancelble: true,
        startEventType: "mousedown"
    }

    const ev = {
        pageX: pos.x, pageY: pos.y, isDragging: true, cancelble: true,
        startEventType: "mousedown"
    }
    child.draggable.dragStart(evStart, evStart);
    child.draggable.dragMove(ev, ev);
    child.draggable.dragEnd();
    const mouseEvent = {
        position: pos,
        simulated: false
    }
    //child.$store.getters.droppables.forEach(c =>{
    for(const c of workspace.__vue__.$children) {
        if(!c.element) continue;
        c.draggable.dragStart(ev, ev);
        c.draggable.dragMove(ev, ev);
        c.draggable.dragEnd(mouseEvent);
    }
}

/* debug
for(const asdf of Object.keys(workspace.__vue__.$store._actions)){
    workspace.__vue__.$store._actions[asdf].push(e=>console.log(asdf,e))
}
*/

//--- animationNewStart: Click
//and then event is ... nothing???????
//if progressNewBase is invoked, add more click amount? (ofc needs cooldown)

//animationNewStart <<-- newly discovered
//animationNewEnd <<--- all newly discovered list ends and resumed to game
//animationReset <<--- any time when being resumed to game, even cleaning workspace calls this
//tutorialTextShow, tutorialTextHide if you want to hide the text...


//---methods --//
//onAnimation: when first combi appears
//onContentHidden: anim before is hidden for next content
//onContentShow: more combi element discovered, NOT new base element revealed
//onNewBasehidden: more base element discovered
//showContent: called between elements display, also while displaying new base element, but NOT "new item revealed"
//--- for multiple elements, onContentHidden and onContentShow are called
//for new base elem, onAnimation (combination elem) --> onContentHidden (new item revealed) --> onNewBaseHidden

//so "ANIMATION_NEW_POP" looks like the event