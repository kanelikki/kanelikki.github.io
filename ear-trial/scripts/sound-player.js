const soundPlayer = (function () {
    let audioElement = null;
    window.addEventListener("load", ()=>audioElement = document.querySelector("#result-audio"));

    let offCtx;
    function createOffCtx(){
        offCtx = new OfflineAudioContext({
            numberOfChannels: 2,
            length: 44100 * (7+(SongSequence[0].length+SongSequence[1].length+SongSequence[2].length)*4),
            sampleRate: 44100,
        });
    }

    function play() {
        offCtx.startRendering().then(res => {
            audioElement.src = convertToWavUrl(res);
            audioElement.removeAttribute("hidden");
        });
    }

    function addSound(buffer, time, duration = -1, offset = 0) {
        let source = offCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(offCtx.destination);
        if(duration>0) {
            source.loop = true;
            source.start(time, offset, duration);
        }
        else {
            source.start(time);
        }
    }
    //-----------
    function addMusic(musicData, feverData) {
        let cursor = 8;
        addSound(musicData[0], 0, 8);
        addSound(musicData[1], 8, SongSequence[0].length*4);
        addLoopingMusicWithIntro(musicData[2],
            8+SongSequence[0].length*4, SongSequence[1].length*4);
        addLoopingMusicWithIntro(musicData[3],
            8+(SongSequence[0].length+SongSequence[1].length)*4, SongSequence[2].length*4-2);
        //they said, FEVER!!!!!!
        addSound(feverData,
            10+(SongSequence[0].length+SongSequence[1].length)*4);
        function addLoopingMusicWithIntro(buffer, start, duration){
            const audioLength = buffer.duration;
            if(audioLength >= duration){
                addSound(buffer, start, duration);
            }
            else {
                addSound(buffer, start);
                addSound(buffer, start+audioLength, duration-audioLength, 4);
            }
        }
    }
    function addCommands(drumData, songData) {
        let second = 6;
        let phase = 0;
        let playFever1 = false;
        for (const songCollection of SongSequence) {
            for (const song of songCollection) {
                if(phase===2) playFever1=!playFever1;
                addDrums(song, second);
                addSound(songData[song][phase+playFever1], second + 2);
                second += 4;
            }
            phase++;
        }
        function addDrums(song, offset) {
            const command = SongDrumMap[song];
            for (let i = 0; i < command.length; i++) {
                addSound(drumData[command[i]], offset + i * 0.5);
            }
        }
    }
    //-----------
    return {
        play: function (musicData, drumData, songData, feverData) {
            if(audioElement===null) return;
            createOffCtx();
            addMusic(musicData, feverData);
            addCommands(drumData, songData);
            play();
        }
    }
})();