const Sentence =  (function() {
    const WORD_TYPE = {
        SINGULAR:0,
        PLURAL:1,
        NONE:2
    }
    const vocals = ['a','i','e','o','u'];
    let wordList, actList, backgroundList, prefixList, occupationList;
    let hasError = false;
    const fetchData = url=> {
        let pr = fetch(url)
            .then(w => w.text())
            .then(w => convertToWordList(w))
            .catch(()=> hasError = true)
        promises.push(pr);
        return pr;
    }

    const convertToWordList = (rawList) => 
        rawList.split("\n").map(s => s.trim()).filter(s => s);
    const getRandom = (array) => 
        array[(Math.floor(Math.random()*array.length))];
    const getNounFromObject = (obj) => {
        let word = obj.word;
        if(Math.random()<0.2){
            word = getRandom(prefixList)+" "+obj.word;
        }
        else if(Math.random()<0.1){
            word = getRandom(occupationList)+" "+obj.word;
        }
        if(obj.type === WORD_TYPE.SINGULAR) {
            return `${((vocals.indexOf(word[0])<0)?"a":"an")} ${word}`
        }
        return word;
    }
    const getActionFromObject = function() {
        const obj = getRandom(wordList);
        const verb = (obj.type===WORD_TYPE.PLURAL)?" are ":" is ";
        let act = getRandom(actList)
        .replaceAll("{word}",getRandomFullNoun)
        .replaceAll("{background}", getRandomBg);
        return getNounFromObject(obj)+verb+act;
    }
    let promises = [];
    fetchData("word-gen/words.txt")
        .then(words => {
            wordList = words.map(w => {
                let wo = w.substring(1);
                switch(w[0]) {
                    case '+':
                        return {
                            word:wo,
                            type:WORD_TYPE.PLURAL
                        }
                    case '-':
                        return {
                            word:wo,
                            type:WORD_TYPE.SINGULAR
                        }
                    case '*':
                        return {
                            word:wo,
                            type:WORD_TYPE.NONE
                        }
                    default:
                        throw `error: invalid format found! : ${w}`;
                }
            });
        });
    fetchData("word-gen/verbs.txt").then(w => actList = w);
    fetchData("word-gen/background.txt").then(w => backgroundList = w);
    fetchData("word-gen/prefixes.txt").then(w => prefixList = w);
    fetchData("word-gen/occupations.txt").then(w => occupationList = w);
    function getRandomFullNoun() {
        return getNounFromObject(getRandom(wordList));
    }
    function getRandomBg() {
        return getRandom(backgroundList);
    }
    return {
        createAsync: async function() {
            await Promise.all(promises);
            if(hasError) return "Error while loading random words/sentences.";
            else return getActionFromObject();
        }
    }
})();