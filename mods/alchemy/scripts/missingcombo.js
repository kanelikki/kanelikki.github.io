//This finds all combinations that does exist but you didn't make it yet.
//The order is reversed (first-alphabet in last-place) for convinience.

const allCombis = workspace.__vue__.$store.getters.elementsList.map(a=>a.parents).flat().map(a=>({key: a[0]+"#"+a[1], value: a}))
const founds = new Set(Object.keys(workspace.__vue__.$store.getters.historyMap));
const result = allCombis.filter(d=>!founds.has(d.key)).reduce((a,b)=>{
    if(a[b.key]===undefined){
        a[b.key] = b.value;
    }
    return a;
},{});

console.log(Object.values(result));