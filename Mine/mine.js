var arr;
var sizex=15;
var sizey=15;
var mines=10;
const FIELD_MIN=10;
const FIELD_MAX=50;
const MINE_MIN=10;
const MINE_MAX=200;
function ifValid(x=15,y=15,m=10){
if(isNaN(x)||isNaN(y)||isNaN(m)||(x*y)*0.8<=m||x<FIELD_MIN||y<FIELD_MIN||m<MINE_MIN||x>FIELD_MAX||y>FIELD_MAX||m>MINE_MAX){
	alert("Invalid value was found. Using Default Value");
	x=15;y=15;m=10;
}
	sizex=x;sizey=y;mines=m;
	init();
}
var field=document.querySelector('#field');
var tiles=field.getElementsByClassName('closed');//this is live...
var mindex=[];//where was the mine.
var marking=false;//if marking mode?
var count=null;
var box=false;
var minesum;
var miner=document.getElementById("miner");
var gameend=false;
marker.addEventListener('click',function(){
	if(marking!==true){
		marking=true;
		marker.innerHTML="USING<br>FLAG"
	}
	else{
		marker.innerHTML="USE<br>FLAG"
		marking=false;
	}
	marker.classList.toggle("markmode");
});
var switching=function(e){
	var x=this.dataset.x;
	var y=this.dataset.y;
	x=Number(x);//Dataset is string
	y=Number(y);
	if(x>=sizey || x<0 || y>=sizex || y<0 || !this.classList.contains("closed")) return;
	if(marking!==false){
		mark(0,x,y,this);
	}
	else{
		clicking(e,x,y,this);
	}
};
var clicking=function(e,x,y,elem){
	if(!elem || !elem.classList.contains("closed") || elem.classList.contains("marked")) return;
	clicked(elem);
	if(!count){
		var timer=document.getElementById("timer");
		var time=0;
		count=setInterval(function(){
			time++;
			timer.innerHTML=time;
		},1000);
	}
	if(arr[x][y]===0){
		let sum=0;
		for(i=0;i<3;i++){
			for(j=0;j<3;j++){
				let xpos=x-1+i;
				let ypos=y-1+j;
				if(xpos<sizey && xpos>=0 && ypos<sizex && ypos>=0)
					sum+=arr[xpos][ypos];
			}
		}
		if(sum===0){
			let elem1;
			for(let i=x-1;i<x+2;i++){
				for(let j=y-1;j<y+2;j++){
					if((i==x&&j==y)||i<0||j<0||i>=sizey||j>=sizex) continue;
					elem1=document.getElementById("p"+i+"x"+j);
					if(elem1!==null && elem1.classList.contains("closed") && !elem1.classList.contains("marked"))
						clicking(0,i,j,elem1);
				}
			}

		}
		else{
			elem.innerHTML=sum;
		}
		(tiles.length<=mines)?((gameend)?0:gameEnd(0)):0;
		//fixed multiple "congrats you won" error
	}
	else{
		gameEnd(1);
		elem.innerHTML='*';
	}
};
var mark=function(e,x,y,elem){
	x=Number(x);//Dataset is string
	y=Number(y);
	if(!elem.classList.contains('marked')){
		elem.addEventListener('click',switching);
		elem.removeEventListener('click',mark);
		miner.innerHTML=--minesum;
	}
	else{
		elem.addEventListener('click',switching);
		elem.removeEventListener('click',mark);
		miner.innerHTML=++minesum;
	}
	elem.classList.toggle('marked');
}
var init=function(){
field.style.width=sizex*45+'px';
field.style.height=sizey*45+'px';
gameend=false;
miner.innerHTML=mines;
minesum=mines;
field.innerHTML="";
document.body.classList.value="neutral";
mindex=[];
var newarray=function(xsize,ysize){
	var ar=new Array;
	var ar2=[];
	for(i=0;i<xsize;i++){
		for(j=0;j<ysize;j++){
			ar2[j]=0;
		}
		ar.push(ar2);
		ar2=[];
	}
	
	return ar;
}
arr=newarray(sizey,sizex);
for(i=0;i<mines;i++){
	let minep=minepos();
	mindex.push(minep);
	arr[minep[0]][minep[1]]=1;
}
var frag=document.createDocumentFragment();
for(i=0;i<sizey;i++){
	for(j=0;j<sizex;j++){
		let elem=document.createElement('div');
		elem.dataset.x=i;
		elem.dataset.y=j;
		elem.addEventListener('click',switching);
		elem.id="p"+i+"x"+j;//We need to find for zero-extension...
		elem.classList.add('closed');
		elem.addEventListener('mousemove',around);
		frag.appendChild(elem);
	}
}
field.appendChild(frag);
function minepos(){
	var x;var y;
	do{
		x=Math.floor(Math.random()*sizey);
		y=Math.floor(Math.random()*sizex);
	}while(arr[x][y]==1)
	return [x,y];
}
	clearInterval(count);
	count=null;
	document.getElementById("timer").innerHTML="";
	document.querySelector(".message").innerText="Ctrl to see the area. Alt to use flag.";
};
var around=function(e){
	if(!e || !e.ctrlKey) return;
	var x=this.dataset.x;
	var y=this.dataset.y;
	if(box) box.remove();
	var epos=document.getElementById('p'+x+'x'+y);
	if(!epos) return;
	box=document.createElement("div");
	box.classList.add('around');
	epos.appendChild(box);
}
document.addEventListener('keyup',function(e){
	if(!e.ctrlKey){
		if(box){
		box.remove();
		box=false;
		}
	}
	if(!e.altKey){
		if(marking===false) return;
		marker.classList.remove("markmode");
		marking=false;
	}
});
window.addEventListener('blur', function(e){//Alt+tab bug
	if(marking===false) return;
	marker.classList.remove("markmode");
	marking=false;
});
document.addEventListener("mouseout", function(e) {
		if(box){
		box.remove();
		box=false;
		}
});
document.addEventListener('keydown',function(e){
	if(e.ctrlKey) around();
	if(e.altKey){
		if(marking===true) return;
		marking=true;
		marker.classList.add("markmode");
	}
});
init();
function clicked(target){
	target.classList.remove('closed');
	target.removeEventListener('click',clicking);
}
function gameEnd(status){
	gameend=true;
	clearInterval(count);
	for(i=0;i<tiles.length;i++){
		tiles[i].removeEventListener('click',switching);
		tiles[i].removeEventListener('mousemove',around);
	 }
	var msgBox=document.querySelector(".message");
	if(status===0){
		alert('Congrats! You Won!');
		msgBox.innerText="You are the best."
		for(i=0;i<mindex.length;i++){
			let bomb=document.getElementById('p'+mindex[i][0]+'x'+mindex[i][1]);
			bomb.classList.add('marked');
		}
		document.body.classList.value="success";
	}
	else{
		alert('GAME OVER');
		msgBox.innerText="Oops X( Try Again?"
		for(i=0;i<mindex.length;i++){
			let bomb=document.getElementById('p'+mindex[i][0]+'x'+mindex[i][1]);
			bomb.classList.add('bomb');
			bomb.innerText='*';
		}

		document.body.classList.value="fail";
	}
}
