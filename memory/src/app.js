// app.js
// ///////////// IMPORTANT FOR READABILLITY /////////////////////////////////
///////////////////////SET TABSTOP=4 ///////////////////////////////////////
'use strict';
//---	*	Prevents editing class (cheating) in console	*	---//
//---	*	And consts too, can't be used outside			*	---//
(function(){
console.log("%cDON'T CHEAT","background-color:#000;color:#fff;padding:0.5em;");
//some enums.
const CARDS_PER_COLUMN=2;
const CARDS_PER_ROW=3;
const LEVELS=4;
const MAX_STORAGE=10;
const CARD_INVISIBLE="oi-aperture";//classList :)
const GAME_STATE={
    NO_TURNED_CARD:0,
    ONE_TURNED_CARD:1,
    TWO_TURNED_CARDS:2,
    GAME_OVER:3
};
const CARD_STATE={
    IN_GAME:0,
    OPENED:1
};//"enums"
const TURN_INVISIBLE_DELAY=700;
const LOCALE="fi-FI";
const AUDIO_RES={
	FLIP:new Audio('res/flip.wav'),
	UNFLIP:new Audio('res/unflip.wav'),
	COMBO:new Audio('res/combo.wav'),
	RIGHT:new Audio('res/right.wav')
}
const DATE=Symbol("date");
var MUTED=false;
const SOUND_ICON={true:"oi-volume-high",false:"oi-volume-off"};
//By the way, No need to make class in this case.
const MemoryCard=class{
    constructor(id, gameController){
        this.id=id;
	    this.element=document.getElementById("card-"+id);
	    this.span=this.element.getElementsByTagName("span")[0];
        this.gameController=gameController;
        this.iconClass="";
        this.state=CARD_STATE.IN_GAME;
		this.bindedOnclick=this.onClickHandler.bind(this);
		this.promise=new Promise(()=>0);//promise for solving the animation bug
    }
    onClickHandler(e){
       if(this.gameController.state===GAME_STATE.TWO_TURNED_CARDS) return;
	    //Removed EventListener :)
	    if(this.state===CARD_STATE.IN_GAME){
                //alert("The id: "+this.id);
                this.gameController.turnCard(this.id);
        }
    }
    turnVisible(){
		(MUTED)?0:AUDIO_RES.FLIP.cloneNode().play();
	    //I PREFER classList.
	    this.span.classList.remove(CARD_INVISIBLE);
        this.span.classList.add(this.iconClass);
        this.element.classList.add("animated","flipInX");
		this.state=CARD_STATE.OPENED;
	//this.span.classList.remove("flipInX");
    }
    turnInvisible(){
		(MUTED)?0:AUDIO_RES.UNFLIP.cloneNode().play();
        this.element.classList.remove("flipInX");
        this.element.classList.add("flipOutX");
		this.promise=new Promise((resolve,reject)=>{
				//NOTE: ANIMATIONEND IS WORKING DRAFT
			this.element.addEventListener("animationend",()=>{
				this.span.classList.remove(this.iconClass);
				this.element.classList.remove("animated","flipOutX")
				this.span.classList.add(CARD_INVISIBLE);
				resolve();
			},{once:true});
		});
		this.state=CARD_STATE.IN_GAME;
    }
    /*turnGameOver(){
        this.span.className+=" animated flipOutX";
        this.span.className=CARD_INVISIBLE[0]+" "+CARD_INVISIBLE[1];+" animated flipInX";
    }*/
    getIconClass(){
        return this.iconClass;
    }
    setIconClass(icon){
        this.iconClass=ICONNAMES[icon];
    }
}
const MemoryGame=class{ //Try ES6 Class. Good point: Error if you don't use new. supports "extends" (inherit)
    constructor(cardsPerColumn,cardsPerRow,level){
		if((cardsPerColumn-cardsPerRow)%2===0){
			alert("cards value not suitable, one must be odd and other must be even");
		}
        this.cardsPerColumn=cardsPerColumn;
        this.cardsPerRow=cardsPerRow;
        this.nbrOfCards=cardsPerColumn*cardsPerRow;
		if(this.nbrOfCards%2!==0 || this.nbrOfCards<=0){ alert("Error: No odd cards/invalid cards allowed"); throw("Number of Cards ERROR");}
        this.cards=[];
        this.firstCard=undefined;
        this.secondCard=undefined;
        this.playTime=-1;
        this.playTimeHandler;
        this.flipTime=0;
        this.state=GAME_STATE.NO_TURNED_CARD;
		this.foundCards=0;
		this.combo=0;
		this.maxLevel=level;
		this.nowLevel=1;
    }
    initialize(){
	//As a human, I can do some mistakes...
        this.createDivs();
        this.setEventListeners();
        this.setIconClassToCards();
		Dialog.init();
    }
	init_levelup(){
		this.nowLevel++;
        this.nbrOfCards=(++this.cardsPerColumn)*(++this.cardsPerRow);
		this.foundCards=0;
        this.state=GAME_STATE.NO_TURNED_CARD;
        this.firstCard=undefined;
        this.secondCard=undefined;
		this.combo=0;
        this.cards=[];
        this.createDivs();
        this.setEventListeners();
        this.setIconClassToCards();
	}
    getNUICI(x){
        for(let i=0;i<this.nbrOfCards;i++){
            let n=(x+i)%this.nbrOfCards;
            if(this.cards[n].getIconClass()=="")
                return n;
        }
        throw("Error");//should not reach
    }
    setIconClassToCards(){
        var x, y;
        var icon;
        for(let i=0;i<this.nbrOfCards/2;i++){
            //why.
            //icon=Math.floor(Math.random()*ICONNAMES.length);
            x=Math.floor(Math.random()*this.nbrOfCards);
            y=Math.floor(Math.random()*this.nbrOfCards);
            //something getindex blahblah... /very long name
            x=this.getNUICI(x);
            this.cards[x].setIconClass(i);
            y=this.getNUICI(y);
            this.cards[y].setIconClass(i);
            //console.log("icon:"+ICONNAMES[i]+" set to "+x+" and "+y);
        }
    }
    setEventListeners(){
        for(let i=0;i<this.nbrOfCards;i++){
            let cardId=i;
            let a=this.cards[i]=new MemoryCard(cardId,this);
            a.element.addEventListener("click",a.bindedOnclick);
        }
		if(this.nowLevel===1){
			document.getElementById("muter").addEventListener("click",function(){
				MUTED=!MUTED;
				this.classList.add(SOUND_ICON[!MUTED]);
				this.classList.remove(SOUND_ICON[MUTED]);
			});
		}
    }
    createRow(id){
        var divRow;
        divRow=document.createElement("div");
        divRow.id="row-"+id;
        divRow.classList.add("row");
        return divRow;
    }
    createCard(id){
        var divCard;
        divCard=document.createElement("div");
        divCard.id="card-"+id;
        divCard.classList.add("col-sm");
        divCard.classList.add("card");
        return divCard;
    }
    createCardBody(id){
        var divCardBody;
        divCardBody=document.createElement("div");
        divCardBody.classList.add("card-body");
        return divCardBody;
    }
    createDivs(){
		document.getElementById("game-field").innerText="";
		document.getElementById("progress-bar").style.width=0;
        document.getElementById("play-time").innerText=0;
		document.getElementById("level").innerText=this.nowLevel+"/"+this.maxLevel;
        var cardId=0;
        var rowElement;
        var cardElement;
        var cardBodyElement;
        var iconElement;
        var frag=document.createDocumentFragment();
//this is not C, you don't need var i,j outside of the block;
//use let in for loops. It's good for you.
        for(let i=0;i<this.nbrOfCards/this.cardsPerRow;i++){
            rowElement=this.createRow(i);
            for(let j=0;j<this.cardsPerRow;j++){
                cardId=(j + (i*this.cardsPerRow));
                cardElement=this.createCard(cardId);
                cardBodyElement=this.createCardBody();
                iconElement=this.createIcon(cardId);
                cardBodyElement.appendChild(iconElement);
                cardElement.appendChild(cardBodyElement);
                rowElement.appendChild(cardElement);
            } 
            frag.appendChild(rowElement);
        }
        document.getElementById("game-field").appendChild(frag);
	document.getElementById("turn-count").innerText=this.flipTime;
    }
    createIcon(cardId){
        var iconSpan=document.createElement("span");
        iconSpan.id="span-"+cardId;
        iconSpan.classList.add("oi");
        iconSpan.classList.add(CARD_INVISIBLE);
        return iconSpan;
    }
    setPlayTime(){
        if(this.state==GAME_STATE.GAME_OVER) return;
        var clock=function(){
            document.getElementById("play-time").innerText=++this.playTime;
        };
        this.playTimeHandler=setInterval(clock.bind(this),1000);
    }
    turnCard(id){
       if(this.playTime===-1){
			this.playTime=0;
           this.setPlayTime();
       }
       switch(this.state){
            case GAME_STATE.NO_TURNED_CARD:
                this.firstCard=this.cards[id];
                this.firstCard.turnVisible();
                this.state=GAME_STATE.ONE_TURNED_CARD;
                break;
            case GAME_STATE.ONE_TURNED_CARD:
				if(id === this.firstCard.id) break;
                this.state=GAME_STATE.TWO_TURNED_CARDS;
				document.getElementById("turn-count").innerText=++this.flipTime;
				this.secondCard=this.cards[id];
				this.secondCard.turnVisible();
                //this.state=this.flipTime>1?GAME_STATE.NO_TURNED_CARD:GAME_STATE.GAME_OVER;
				if(this.firstCard.getIconClass()!==this.secondCard.getIconClass()){
					//PROBLEM: IF CLICK TOO FAST SETTIMEOUT NOT WORKING
					//SOLVED WITH THIS.PROMISEDONE FLAG...
					setTimeout(function(){
						this.firstCard.turnInvisible();
						this.secondCard.turnInvisible();
						Promise.all([this.firstCard.promise,this.secondCard.promise]).then(()=>{
							this.state=GAME_STATE.NO_TURNED_CARD;
							this.firstCard.promise=new Promise(()=>0);
							this.secondCard.promise=new Promise(()=>0);
						});
					}.bind(this),TURN_INVISIBLE_DELAY);
					   /*if(this.state===GAME_STATE.GAME_OVER){
						this.gameEnd(false);
					   }*/
					this.combo=0;
				}
			else{
				
				(MUTED)?0:AUDIO_RES.RIGHT.cloneNode().play();
				this.combo++;
				if(this.combo>1){
					this.displayCombo(this.combo);
				}
				this.firstCard.element.classList.add("card-done");
				this.secondCard.element.classList.add("card-done");
				this.firstCard.element.removeEventListener("click",this.firstCard.bindedOnclick);
				this.secondCard.element.removeEventListener("click",this.secondCard.bindedOnclick);
				this.foundCards+=2;
				document.getElementById("progress-bar").style.width=(this.foundCards*100/this.nbrOfCards)+"%";
				if(this.foundCards===this.nbrOfCards){
					this.state=GAME_STATE.GAME_OVER;
					this.gameEnd();
					break;
				}
				this.state=GAME_STATE.NO_TURNED_CARD;
			}
			break;
			case GAME_STATE.TWO_TURNED_CARDS:
			break;//do nothing
            default://GAMEOVER
                //alert("game over");
		//this.RemoveEvents();
                break;
       }
    }
	displayCombo(coms){
		(MUTED)?0:AUDIO_RES.COMBO.cloneNode().play();
		var showCombo=document.createElement("div");
		showCombo.classList.add("progress-combo");
		showCombo.innerHTML=coms+" Combo!";
		showCombo.addEventListener("animationend",showCombo.remove,{once:true});
		document.getElementById("progress").appendChild(showCombo);
	}
    gameEnd(){
		if(this.nowLevel!==this.maxLevel){
				this.init_levelup();
		}
		else{
        	clearInterval(this.playTimeHandler);
			Dialog.setScore(this.playTime,this.flipTime);
		}
    }
}
const Dialog={
	"modalBox":document.getElementById("highScoreModal"),
	"init":function(){
		//Button init
		var btns=this.modalBox.getElementsByTagName("button");
		//Object.prototype.foo=something ruins for...in lol.
		for(let i=0;i<btns.length;i++){
			btns[i].addEventListener("click",this.clickEvent);
		}
		this.init=()=>0;//this init can be called only once.
	},
	"setScore":function(playTime,flipTime){
		this.modalBox.style.display="block";
		score.addScore(playTime,flipTime);
	},
	"clickEvent":function(mBox){
		if(this.dataset.dismiss==="modal"){
			Dialog.modalBox.style.display="none";
		}
		if(this.dataset.replay==="Replay"){
			memoryGame=new MemoryGame(CARDS_PER_COLUMN,CARDS_PER_ROW,LEVELS);
			memoryGame.initialize();
		}
	}
}
const score={	
	"entries":function(by="score"){
		var sortRule=function(x,y,by){
			if(x[by]===y[by]) return x[DATE]-y[DATE];
			if(by!=="score")
				return x[by]-y[by];
			else
				return y[by]-x[by];
		}
		return Object.entries(localStorage).map(k=>{let x=JSON.parse(k[1]);x[DATE]=k[0];return x;}).sort((x,y)=>sortRule(x,y,by));
	},
	"addScore":function(playTime,flipTime){
		//this detects isNaN too
		//No need after IIFE lol but...
		if(!(playTime>0)){
			alert("unfair play detected");
			return;
		}
		var d=new Date();
		var resScore=Math.round(10000000/(playTime+flipTime));
		document.getElementById("player-score-now").innerText=resScore;
		document.getElementById("player-date-now").innerText=d.toLocaleString(LOCALE);
		//toString. I don't want array
		let scoreKey=d.getTime().toString();
		localStorage.setItem(scoreKey,`{"playTime": ${playTime}, "flipTime": ${flipTime}, "score":${resScore}}`);
		//localStorage.setItem(scoreKey,playTime);
		//If I remove low scores...
		while(localStorage.length>MAX_STORAGE){
			let ent=this.entries();
			localStorage.removeItem(ent[ent.length-1][DATE]);
		}
		this.getScore(scoreKey);
	},
	"getScore":function(scoreKey,by="score"){
		//class player-score-highlight
		let entry=this.entries();
		for(let i=0;i<3;i++){
				let scoreElem=document.getElementById("player-score-"+(i+1));
				if(entry[i]!==undefined){
					scoreElem.innerText=entry[i][by];
					document.getElementById("player-date-"+(i+1)).innerText=(new Date(Number(entry[i][DATE]))).toLocaleString(LOCALE);
					(entry[i][DATE]!==scoreKey)?scoreElem.classList.remove("player-score-highlight"):scoreElem.classList.add("player-score-highlight");
				}
				else{ scoreElem.innerText="-"; }
				//Average, For school assignment...
				//document.getElementById("player-score-a").innerText=(entry.map((x)=>Number(x[1])).reduce((x,y)=>x+y)/entry.length).toFixed(2);
		}
		this.updateRank();
	},
	"updateRank":function(scoreKey,by="score"){
		let RankList=document.getElementById("RankList");
		RankList.innerHTML="";
		let entry=this.entries();
		let Frag=document.createDocumentFragment();
		let keys=Object.keys(entry[0]);
		let tr=document.createElement("tr");
		keys.map(k=>{
			let th=document.createElement("th");
			th.innerText=k;
			tr.appendChild(th);
		});
		Frag.appendChild(tr);
		for(let i=0;i<entry.length;i++){
			let tr=document.createElement("tr");
			keys.map(k=>{
				let td=document.createElement("td");
				td.innerText=entry[i][k];
				tr.appendChild(td);
			});
			Frag.appendChild(tr);
			
		}
		RankList.appendChild(Frag);
	}
}
var memoryGame=new MemoryGame(CARDS_PER_COLUMN,CARDS_PER_ROW,LEVELS);
memoryGame.initialize();
})();
