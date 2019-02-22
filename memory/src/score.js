//Since all client side data can be edited, I decieded not to care much about the cheating issue.
const score={	
	"addScore":function(playTime,flipTime,cards){
		//Not (condition) covers isNaN too.
		if(!(playTime>0) || !(cards>0) || !(flipTime>=cards/2)){
			alert("unfair play detected");
			return;
		}
		//alert(`playTime: ${playTime}, flipTime: ${flipTime}`);
		var d=new Date();
		//In case of website admin change the card sizes / or for multi difficulty, stores cards data.
		localStorage.setItem(d.getTime().toString(),`{"playTime": ${playTime}, "flipTime": ${flipTime}, "score":${Math.round(10000000/(playTime+flipTime))}, "cards":${cards}}`);
			this.getScore();
	},
	"getScore":function(){
			let lol=localStorage.length;
			//for in... can be ruined with weird prototype settings :/
			for(let i=0;i<lol;i++){
				let k=localStorage.key(i);
				console.log(JSON.parse(localStorage[k]));
			}
	}
}
