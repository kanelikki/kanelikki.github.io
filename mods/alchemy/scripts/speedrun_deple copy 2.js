//--- simple registration --//
//Registering Event. CALL ONLY ONCE.
workspace.__vue__.$store._actions.mixNew.push(e => new Promise(() => decide(e)));
workspace.__vue__.$store._actions.progressNewBase.push(e => new Promise(() => decideNewBase(e)));

const transformRegex = new RegExp(/0px, (-?[0-9]+)px, 0px/);
const all = workspace.__vue__.$store.getters.elementsIds;
const allCombiData = workspace.__vue__.$store.getters.elementsList.reduce((a,b) =>{
    for(const p of b.parents) {
        const hash = makeCombiId(...p);
        if(!a[hash]) a[hash] = [b.id];
        else if(a[hash].indexOf(b)<0) a[hash].push(b.id);
    }
    return a;
}, {});
const allCombinations = workspace.__vue__.$store.getters.elementsList.map(a=>a.parents).flat().map(a=>makeCombiId(...a));
const stat = {
    get created(){
        return workspace.__vue__.$store.getters.totalProgressElements;
    },
    get historyMap() {
        return workspace.__vue__.$store.getters.historyMap;
    },
    get createdCombinations(){
        return Object.keys(workspace.__vue__.$store.getters.historyMap);
    },
    get notCreated(){
        return all.filter(a=>stat.created.indexOf(a)<0);
    },
    get notCreatedCombinations(){
        return allCombinations.filter(d=>!stat.createdCombinations.has(d));
    },
    get centerIndex() {
        const centerPos = library.__vue__.lastY + screen.height/2 - 100;
        const centerId = library.__vue__.$children.reduce((a,b)=>{
            const aVal = +a.$el.style.transform.match(transformRegex)[1];
            const bVal = +b.$el.style.transform.match(transformRegex)[1];
            if(isNaN(aVal) && isNaN(bVal)) throw "";
            else if(isNaN(aVal)) return b;
            else if(isNaN(bVal)) return a;
            return (Math.abs(aVal-centerPos)<Math.abs(bVal-centerPos))?a:b;
        }).element.id;
        const lib = workspace.__vue__.$store.getters.library;
        return lib.indexOf(centerId);
    },
    get library() {
        return workspace.__vue__.$store.getters.library;
    },
    get sortedLibrary() {
        const lib = workspace.__vue__.$store.getters.library;
        const centerIndex = stat.centerIndex;
        //reversing order so later first in same distance
        return [...lib].reverse().sort((a,b) => sortFromCenter(lib, a, b, centerIndex));
    },
    get currentLibrary() {
        return library.__vue__.
            $children.filter(c =>{ 
                const y = +c.$el.style.transform.match(transformRegex)[1];
                if(isNaN(y)) return false;
                return y > library.__vue__.lastY + 100 && y < (library.__vue__.lastY + screen.height - 200);
            })
            .sort((c,d)=>c.element.name.localeCompare(d.element.name))
            .map(a=>a.element.id)
    },
    get workspace() {
        return workspace.__vue__.$store.getters.workspaceElements.map(a=>a.elementId);
    },
    getObject : function(id) {
        return workspace.__vue__.$store.getters.elementById(id);
    },
    getName : function(id) {
        return stat.getObject(id).name;
    }
};
const highPriorities = new Set([
    //steel because metal and steel reactions can be paired a lot. Thus organic matter must have priority aswell.
    "40", "626",
    //container if exists, because many are depleted with container
    //same goes to big, small, philosophy, idea
    "683", "607", "616", "661", "304",
    //medusa and robot because a lot of human reaction
    //tool is just tool... has so many reactions.
    //and glass because glass clears planets. Thus, the sand must be important aswell.
    "141", "422", "53", "32", "28"
]);
const orderMap = (function(){
    const elemList = workspace.__vue__.$store.getters.elementsList;
    const baseOrder = elemList
    .map(a => [...new Set(a.parents.flat())]).reduce((a,b) => {
        for(const id of b) {
            /*
            if(highPriorities.has(b)) {
                a.set(b, 0);
                return a;
            }
            */
            if(!a.has(id)) {
                a.set(id,  0);
            }
            a.set(id, a.get(id)+1);
        }
        return a;
    },new Map());
    const finalOrder = new Map([...baseOrder]);
    const avgChildLength = elemList.reduce((a,b)=>(b.children)?(a+b.children.length):a,0)/elemList.length;
    for(let key of baseOrder.keys()) {
        const val = baseOrder.get(key);
        const obj = stat.getObject(key);
        for(const c of obj.children) {
            const current = finalOrder.get(c);
            finalOrder.set(c, current+(c.length-avgChildLength));
        }
    }
    return finalOrder;
})();

decide({children: [], parents: []});


function decide(e) {
    const workspace = [...stat.workspace, ...e.children];
    for(const p of e.parents){
        let index = workspace.indexOf(p);
        if(index >=0 ) {
            workspace.splice(index,1);
        }
    }
    if(!isFoundExhaust(workspace, stat.currentLibrary, stat.sortedLibrary))
        console.log("nothing else found!");
}
function decideNewBase(e) {
    const workspace = [...stat.workspace, ...e];
    if(!isFoundExhaust(workspace, stat.currentLibrary, stat.sortedLibrary))
        console.log("nothing else found!");
}

function isFound(workspace, currentLib, lib, algorithm = null) {
    const algo = (algorithm===null)?
        ((n, center) => getCenterDistance(n[0], n[1], center)):algorithm;
    if(isFoundEach(lib, lib)) return true;
    return false;
    function isFoundEach(comp1, comp2) {
        const nextMove = decideNextDiscovery(comp1, comp2, algo);
        if(nextMove!==null) {
            console.log(stat.getName(nextMove[0])+ " + " + stat.getName(nextMove[1]));
            return true;
        }
        return false;
    }
}
function isFoundExhaust(workspace, currentLib, lib) {
    /*
    if(workspace[0]) {
        if(isFoundEach(workspace, workspace)) return true;
        if(isFoundEach(workspace, currentLib)) return true;
    }
    */
    if(isFoundEach(lib, lib)) return true;
    //discovery search
    return isFound(workspace, currentLib, lib, setPriority);

    function isFoundEach(comp1, comp2) {
        const nextMove = decideNextExhaust(comp1, comp2);
        if(nextMove!==null) {
            console.log(stat.getName(nextMove[0])+ " + " + stat.getName(nextMove[1]));
            return true;
        }
        return false;
    }
    function setPriority(val) {
        const hash = makeCombiId(...val);
        const ids = allCombiData[hash];
        if(!ids) return -9999;
        let result = 0;
        for(const id of ids) {
            if(stat.created.indexOf(id) < 0) result+=orderMap.get(id);
        }
        return result;
    }
}

function decideNextExhaust(lib1, lib2){
    const center = stat.centerIndex;
    const combis = lib1.reduce((a,b) => {
        for(const c of lib2) a.push([b, c]);
        return a;
    } ,[]).sort((a,b) =>
            getCenterDistance(a[0], a[1], center)
               - getCenterDistance(b[0], b[1], center));

    for(elem of combis) {
        const combi = hasCombination(...elem);
        if(combi !== null && stat.historyMap[combi] === undefined) {
            for(const el of allCombiData[combi]) {
                if(stat.created.indexOf(el) >= 0) return elem;
                else if(stat.getObject(el).final) return elem;
            }
        }
    }
    return null;
}

//for discovery
function decideNextDiscovery(lib1, lib2, sortAlgo) {
    const center = stat.centerIndex;
    const combis = lib1.reduce((a,b) => {
        for(const c of lib2) a.push([b, c]);
        return a;
    } ,[]).sort((a,b) => sortAlgo(a, center) - sortAlgo(b, center));
    for(elem of combis) {
            const combi = hasCombination(...elem);
        if(hasCombination(...elem) !== null) {
            if(combi !== null && stat.createdCombinations.indexOf(combi) < 0) {
                for(let d of allCombiData[combi]) {
                    if(stat.created.indexOf(d) <0) return elem;
                }
            }
        }
    }
    return null;
}

function makeCombiId(a, b) {
    return a + "#" + b;
}

function hasCombination(a, b) {
    let hash = makeCombiId(a, b);
    if(allCombinations.indexOf(hash)>=0) {
        return hash;
    }
    hash = makeCombiId(b, a);
    if(allCombinations.indexOf(hash)>=0) {
        return hash;
    }
    else return null;
}

function sortFromCenter(lib, a, b, centerIndex) {
    return Math.abs(lib.indexOf(a) - centerIndex) - Math.abs(lib.indexOf(b) - centerIndex);
}
function getCenterDistance(val1, val2, center){
    return Math.abs(val1-center) + Math.abs(val2-center);
}