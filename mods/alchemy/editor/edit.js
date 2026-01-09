//example
//workspace.__vue__.$store.getters.elements[11].parents[3][0]='99'
//workspace.__vue__.$store.getters.elements[2].children[workspace.__vue__.$store.getters.elements[2].children.indexOf('11')] = '9'
//workspace.__vue__.$store.getters.elements[9].parents.push(['2','2'])

/*
 * EVERYTHING MUST BE STRING!
*/

function addCombination(target, p1, p2) {
  addChildToParents([p1, p2], target);
  workspace.__vue__.$store.getters.elements[target].parents.push([p1, p2])
}
function removeCombination(target, p1, p2) {
  const pNew = [p1, p2];
  const res = workspace.__vue__.$store.getters.elements[target].parents.findIndex(p => isCombinationMatch(p, pNew));
  if(res < 0) return false;
  workspace.__vue__.$store.getters.elements[target].parents.splice(res, 1);
  removeChild(p1, target);
  removeChild(p2, target);
  return true;
}
/*
 * working code. I'm just lazy
 *
function modifyCombinationByChildren(target, oldArr, newArr) {
  const res = workspace.__vue__.$store.getters.elements[target].parents
      .findIndex(p => (p[0]===oldArr[0] && p[1]===oldArr[1]) || (p[0]===oldArr[1] && p[1]===oldArr[0]));
  if(res < 0) return false;
  const par = workspace.__vue__.$store.getters.elements[target].parents[res]
  par[0] = newArr[0];
  par[1] = newArr[1];
  removeChild(oldArr[0], target)
  if(oldArr[0]!==oldArr[1]) removeChild(oldArr[1], target);
  addChildToParents(newArr, target);
  return true;
}
function modifyCombinationByResult() {

}
*/
function addChildToParents(parentArr, target) {
  pushIfNotDupe(parentArr[0]);
  if(parentArr[0]!==parentArr[1])  pushIfNotDupe(parentArr[1]);
  function pushIfNotDupe(parent) {
    const elems = getParentByIndex(parent).children;
    if(elems.indexOf(target) < 0) elems.push(target)
  }
}
function removeChild(parent, child) {
  //MUST CHECK if parent still makes combi
  const childParent = getParentByIndex(child).parents;
  if(!!childParent && childParent.some(p => p[0]===parent || p[1]=== parent)) return;
  const par = getParentByIndex(parent);
  const childIndex = getChildIndex(par, child);
  if(childIndex < 0) return;
  par.children.splice(childIndex, 1);
}
function getChildIndex(parent, child) {
  if(!parent) return -1;
  return parent.children.indexOf(child.toString())
}
function getParentByIndex(parent) {
   return workspace.__vue__.$store.getters.elements[parent];
}
function isCombinationMatch(combi1, combi2) {
  return (combi1[0]===combi2[0] && combi1[1]===combi2[1]) || (combi1[0]===combi2[1] && combi1[1]===combi2[0]);
}
//pressure, changes from air+air to water+water.
//just swapping might increase performance, but it's not my interest now
addCombination("7", "1","1");
removeCombination("7", "4","4");
removeCombination("511", "1","1");

//reload history so library can get back to the new combination
library.__vue__.$store._actions.historyReload[0]()
//TODO: clean workspace, maybe
//at this point does this matter idk