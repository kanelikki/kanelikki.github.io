'use strict';
const STATE = {
	NO_MINE:0, //000
	MINE:1, //001
	FLAGGED:2, //010
	OPENED:4 //100
}
var minemap;
var mineset=new Set();
var mineinfo = {
	sizex: 15,
	sizey: 15,
	mines: 50
};
var field = document.querySelector('#field');
var tiles = field.getElementsByClassName('closed');//this is live...
var marking = false;//if marking mode?
var count = null;
var minesum;
var miner = document.getElementById("miner");
var gameend = false;
marker.addEventListener('click', function () {
	if (marking !== true) {
		marking = true;
		marker.innerHTML = "USING<br>FLAG"
	}
	else {
		marker.innerHTML = "USE<br>FLAG"
		marking = false;
	}
	marker.classList.toggle("markmode");
});
var clickEvent = function (e) { // call only with event.
	//BECAUSE JAVASCRIPT. "THIS" IS ELEMENT.
	var x = this.dataset.x;
	var y = this.dataset.y;
	x = Number(x);//Dataset is string
	y = Number(y);
	if (x >= mineinfo.sizey || x < 0 || y >= mineinfo.sizex || y < 0) return;
	switch (e.which) {
		case 1: //left
			if (marking !== false) {
				mark(x, y);
			}
			else {
				open(x, y);
			}
			break;
		case 2: //middle
			around(x, y);
			break;
		case 3: //right
			mark(x, y);
			break;
	}
};
var open = function (x, y) {
	if(!minemap[x] || !minemap[x][y]) return;
	let elem=minemap[x][y].element;
	if (!elem || minemap[x][y].value > 1) return;
	elem.classList.remove('closed');
	//elem.removeEventListener('click', open);
	minemap[x][y].value|=STATE.OPENED;
	if (!count) {
		firstSet(x, y);
		var timer = document.getElementById("timer");
		var time = 0;
		count = setInterval(function () {
			time++;
			timer.innerHTML = time;
		}, 1000);
	}
	if (minemap[x][y].value%2 === STATE.NO_MINE) {
		let sum=getAroundSum(x, y, (value)=>value%2);
		//OK, let me use recursion :3
		//didn't use getAround, it works a little bit other way...
		if (sum === 0) {
			for (let i = x - 1; i < x + 2; i++) {
				for (let j = y - 1; j < y + 2; j++) {
					if ((i == x && j == y) || i < 0 || j < 0 || i >= mineinfo.sizey || j >= mineinfo.sizex) continue;
					if (minemap[i][j].value< 2)
						open(i, j);
				}
			}
		}
		else {
			elem.innerHTML = sum;
		}
		(tiles.length <= mineinfo.mines) ? ((gameend) ? 0 : gameEnd(0)) : 0;
		//fixed multiple "congrats you won" error
	}
	else {
		gameEnd(1);
		elem.innerHTML = '*';
	}
};
var around = function (x, y) {
	if(!(minemap[x][y].value&STATE.OPENED)) return;
	let elem=minemap[x][y].element;
	let sum=getAroundSum(x, y, (value)=>value&STATE.FLAGGED);
	if(sum/2===Math.floor(elem.innerText)){
		getAround(x, y, (_x, _y) => open(_x, _y));
	}
};
//avoiding reputation
var getAround=function(x, y, callback){
	let sum=0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			let xpos = x - 1 + i;
			let ypos = y - 1 + j;
			callback(xpos, ypos);
		}
	}
	return sum;
}
var getAroundSum=function(x, y, sumCondition){
	let sum=0;
	getAround(x, y, (_x, _y) => {
		if(((minemap[_x] || 0)[_y] || 0))
		sum += sumCondition(minemap[_x][_y].value);
	});
	return sum;
}
var openAround=function(x, y, openCondition){

}
var mark = function (x, y) {
	if(minemap[x][y].value&STATE.OPENED) return;
	let elem=minemap[x][y].element;
	if (!(minemap[x][y].value&STATE.FLAGGED)) {
		miner.innerText = --minesum;
	}
	else {
		miner.innerText = ++minesum;
	}
	minemap[x][y].value^=STATE.FLAGGED;
	elem.classList.toggle('marked');
}
var setMineInfo=function(x, y, m){
	const FIELD_MIN = 10;
	const FIELD_MAX = 50;
	const MINE_MIN = 10;
	const MINE_MAX = 200;
	mineinfo.sizex=x;
	mineinfo.sizey=y;
	mineinfo.mines=m;
	if (isNaN(x) || isNaN(y) || isNaN(m) || (x * y) * 0.8 <= m || x < FIELD_MIN || y < FIELD_MIN || m < MINE_MIN || x > FIELD_MAX || y > FIELD_MAX || m > MINE_MAX) {
		alert("Invalid value was found. Using Default Value");
		x = 15; y = 15; m = 50;
	}
	mineinfo.sizex=x;
	mineinfo.sizey=y;
	mineinfo.mines=m;
	init();
}
var init = function () {
	let x = mineinfo.sizex;
	let y = mineinfo.sizey;
	let m = mineinfo.mines;
	field.style.width = x * 45 + 'px';
	field.style.height = y * 45 + 'px';
	gameend = false;
	miner.innerText = m;
	minesum = m;
	field.innerHTML = "";
	document.body.classList.value="neutral";
	mineset.clear();
	minemap=(function makemap(xsize, ysize) {
		var ar = new Array(xsize);
		var ar2 = new Array(ysize);
		for (let i = 0; i < xsize; i++) {
			for (let j = 0; j < ysize; j++) {
				ar2[j] = {
					value:0,
					element:null
				};
			}
			ar[i] = ar2;
			ar2 = new Array(ysize);
		}
		return ar;
	})(y,x);
	var frag = document.createDocumentFragment();
	for (let i = 0; i < y; i++) {
		for (let j = 0; j < x; j++) {
			let elem = document.createElement('div');
			elem.dataset.x = i;
			elem.dataset.y = j;
			elem.addEventListener('click', clickEvent);
			elem.addEventListener('auxclick', clickEvent);
			minemap[i][j].element = elem;
			elem.classList.add('closed');
			frag.appendChild(elem);
		}
	}
	field.appendChild(frag);
	clearInterval(count);
	count = null;
	document.getElementById("timer").innerHTML = "";
	document.querySelector(".message").innerText = "Right click to use flag. Middle click to open the area (if all mines marked).";
};
var firstSet=function(x, y){
	for (let i = 0; i < mineinfo.mines; i++) {
		let minep = minepos();
		minemap[minep[0]][minep[1]].value = STATE.MINE;
		mineset.add([minep[0],minep[1]]);
	}
	function minepos() {
		var _x; var _y;
		do {
			_x = Math.floor(Math.random() * mineinfo.sizey);
			_y = Math.floor(Math.random() * mineinfo.sizex);
		} while (minemap[_x][_y].value == STATE.MINE || (_x===x && _y===y));
		return [_x, _y];
	}
}
var gameEnd=function(status) {
	gameend = true;
	clearInterval(count);
	for (let i = 0; i < minemap.length; i++) {
		minemap[i].map((elem)=>{
			elem.element.removeEventListener('click', clickEvent);
			elem.element.removeEventListener('auxclick', clickEvent);
		});
	}
	var msgBox = document.querySelector(".message");
	if (status === 0) {
		alert('Congrats! You Won!');
		msgBox.innerText = "You are the best.";
		miner.innerText = 0;
		mineset.forEach(value=>{
			let bomb=minemap[value[0]][value[1]].element;
			if(!bomb.classList.contains("marked")){
				bomb.classList.add("marked");
			}
		});
		document.body.classList.value = "success";
	}
	else {
		alert('GAME OVER');
		msgBox.innerText = "Oops X( Try Again?"
		miner.innerText = "X";
		mineset.forEach(value=>{
			let bomb=minemap[value[0]][value[1]].element;
			bomb.classList.add('bomb');
			bomb.innerText = '*';
		});
		document.body.classList.value = "fail";
	}
};
(function(info){
	document.oncontextmenu=()=>false;
	init(info);
})(mineinfo);