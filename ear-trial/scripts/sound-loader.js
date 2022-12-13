const soundLoader = (function(){
    const context = new OfflineAudioContext(2,44100*40,44100);
    const soundDataMap = new Map();
    const songData = (function(){
        const result = {}
        for(let songSymbol of Object.values(Song)){
            result[songSymbol] = new Array(4);
        }
        return result;
    })();
    async function loadDrumData() {
        const drumData = {
        }
        await Promise.all([
            loadSound("sounds/drums/pata.ogg", 'audio/ogg')
                .then(data => drumData[Drum.Pata]=data),
            loadSound("sounds/drums/pon.ogg", 'audio/ogg')
                .then(data => drumData[Drum.Pon]=data),
            loadSound("sounds/drums/chaka.ogg", 'audio/ogg')
                .then(data => drumData[Drum.Chaka]=data),
            loadSound("sounds/drums/don.ogg", 'audio/ogg')
                .then(data => drumData[Drum.Don]=data)
        ]);
        return drumData;
    }
    async function loadTheme(themeIndex){
        const index = Number(themeIndex);
        if(Number.isInteger(index)
            && index >= 0 && index < ThemeNames.length
            ) await loadSongData(ThemeNames[index]);
    }
    async function loadSongData(theme) {
        const isCommon = !theme;
        const promises = [];
        if(isCommon){
            //load commons.
            for(const key of CommonSongs){
                const value = SongSoundMap[key];
                for(let i=0;i<3;i++){
                    promises.push(
                        loadSound(`sounds/themes/@common/${value}-${i+1}.wav`)
                            .then(data => {
                                songData[key][i]=data;
                                if(i===2) songData[key][3] = data;
                            })
                    );
                }
            }
            //load non-commons.
            for(const key of NonCommonSongs){
                const value = SongSoundMap[key];
                promises.push(
                    loadSound(`sounds/themes/@common/${value}-1.wav`)
                        .then(data => songData[key][0]=data));
            }
        }
        else {
            for(const key of NonCommonSongs){
                const value = SongSoundMap[key];
                for(let i=1;i<4;i++){
                    promises.push(
                        loadSound(`sounds/themes/${theme}/${value}-${i}.wav`)
                            .then(data => songData[key][i]=data));
                }
            }
        }
        await Promise.all(promises);
    }
    async function loadSound(name, contentType) {
        if(soundDataMap.has(name)) return soundDataMap.get(name);

        let promise;
        if(!!contentType) promise = fetch(name);
        else promise = fetch(name, {headers:{ 'Content-Type': contentType }});

        const data = await promise
        .then(res => {
            if(!res.ok){
                throw res.status;
            }
            return res.arrayBuffer();
        })
        .then(res => context.decodeAudioData(res));
        soundDataMap.set(name, data);
        return data;
    }
    async function getSounds() {
        const drumData = await loadDrumData();
        const feverData = await loadSound("sounds/fever.wav");

        await loadSongData();
        return {
            DrumData: drumData,
            SongData: songData,
            FeverData: feverData,
            context : context
        }
    }
    return { getSounds : getSounds, loadTheme : loadTheme };
})();