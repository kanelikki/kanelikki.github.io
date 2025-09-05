# Document

## Add an element

> library.add(ID)

and then

> library.addAll()

will add an element to the workspace

## Showing/hiding an element

> library.hideAll()

will hide every element.

> library.show()

will show all elements you have.

> library.checkIfHideFinal()

Setting thing, this will show if final elements are hidden (NOT depleted since alchemy 1 doesn't support it).

## Sort mode

> library.sortByTime(), library.sortAlphabetically()

> library.sortMode

Variable. Only "alphabetically" and "time" are available. After changing, `library.refresh()` will apply the result.

## Check if already combined

> game.checkIfNotAlreadyDone()

Used for final checking, not sure what is the parameter & how does it work...

> game.history.parents

Contains all combination you have ever done. DOES NOT save duplicated combinations (which is in JSON file).

## Progress

> game.progress

All discovered elements' ID. Does NOT include base elements.

> game.progressWithoutFinal

All discovered elements' ID without base elements and finals.

> game.resetProgress()

Resets all the progresses.

## Data

> bases.base

ALL elements with all combinations.

> game.finalElements

List of final elements.


## Examples

> Earthquake (19) must be depleted after +earth, +sea, +ocean...

```js
Object.entries(bases.base).filter(e => {
    if(Array.isArray(e[1]) || !e[1].parents) return false;
    return e[1].parents.flat().indexOf(19)>-1
})
```

This code will return the Earthquake(19) combinations in format of:

```json
[
    [
        "111",
        {
            "parents": [
                [
                    10,
                    19
                ],
                [
                    9,
                    19
                ]
            ],
            "tags": [
                "water"
            ]
        }
    ],
    [
        "201",
        {
            "parents": [
                [
                    19,
                    3
                ]
            ]
        }
    ]
]
```

To get combinations only,

```js
/*
 * If alphabet scroll doesn't work, try searching and cancelling.
 * Searching should always work.
 * Doesn't always auto mark on workspace (But does mark when it's combination result).
 * Might need to call "library.refresh()" once more after this is fully runned...
 * This COUNTS hidden (special) combinations.
 * If you are not playing DLC, this shouldn't count DLC though.
 *  Sometimes dragging doesn't work... then refresh the page and apply this again
*/
const __allCombinations = Object.entries(bases.base).reduce((a,b) => {
    if(Array.isArray(b[1]) || !b[1].parents) return a;
    for(const comb of b[1].parents) {
        if(!a.some(c => isDupe(c, comb))) a.push(comb);
    }
    return a;
}, [])

function isDupe(a, b) {
    return ((a[0]===b[0] && a[1]===b[1]) || (a[1]===b[0] && a[0]===b[1]))
}

function hasAllCombis(id) {
    const comb = __allCombinations.filter(c => c[0] === id || c[1] === id);
    const historyComb = game.history.parents.filter(c => c[0] === id || c[1] === id)
    return comb.length <= historyComb.length
}
library.checkIfHideFinal = function(a) {
    const elemIndex = game.finalElements.indexOf(a);
    if(elemIndex < 0 && hasAllCombis(a)) {
        game.finalElements.push(a);
    }
    return !!settings.data.hideFinalElements && elemIndex !== -1
}
game.checkIfFinal = function(a) {
        var b, c, d, e = Object.keys(bases.base);
        for (b = 0,
        c = e.length; b < c; b++)
            if (bases.base[e[b]].hasOwnProperty("parents"))
                for (d = 0; d < bases.base[e[b]].parents.length; d++)
                    if (bases.base[e[b]].parents[d].indexOf(a) !== -1) {
                         const elemIndex = game.finalElements.indexOf(a);
                        if(elemIndex < 0 && hasAllCombis(a)) {
                            game.finalElements.push(a);
                            return !0;
                        }
                        return !1;
                    }
        return !0
    }
library.refresh(); //currently can't find better way than manual refresh...
```

Make sure the **"Hide final elements" is on**.