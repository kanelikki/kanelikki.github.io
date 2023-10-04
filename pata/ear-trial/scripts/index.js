var playing = false;
var loaded = false;
let audios = {};
let ctx = new AudioContext();
let offCtx = new OfflineAudioContext({
    numberOfChannels: 2,
    length: 44100 * 40,
    sampleRate: 44100,
    });
Promise.all([
    loadDrum("pata"),
    loadDrum("pon"),
    loadDrum("chaka"),
    loadDrum("don")
]).then(()=>loaded = true);
function loadDrum(drumName){
    return fetch(`sounds/drums/${drumName}.ogg`)
    .then(res => {
        if(!res.ok){
            throw res.status;
        }
        return res.arrayBuffer();
    })
    .then(res => ctx.decodeAudioData(res))
    .then(res => audios[drumName] = res);
}

function play() {
    if(!loaded) return;
    playing = true;
    //playOnTime("sounds/3.wav");
    loadCommand(["pata", "pata", "pata", "pon"], 2);
    loadCommand(["pon", "pon", "pata", "pon"], 6);
    loadCommand(["chaka", "chaka", "pata", "pon"], 10);
    offCtx.startRendering().then(res=>{
        let src = ctx.createBufferSource();
        src.buffer = res;
        src.connect(ctx.destination);
        src.start();
        ctx.resume();
        console.log(ctx);
        console.log(src);
    })
    function loadCommand(command, time){
        for(let i=0;i<command.length;i++) {
            playDrum(command[i], time+i*0.5);
        }
        function playDrum(drumName, time) {
            let source = offCtx.createBufferSource();
            source.buffer = audios[drumName];
            source.connect(offCtx.destination);
            source.start(time);
        }
    }
}