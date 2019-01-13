'use strict';
fetch('https://api.github.com/repos/rnielikki/rnielikki.github.io/contents').then((response)=>response.json()).then(function(r){
	var menu=r.filter(x=>x.type==="dir").map(x=>x.path).filter(x=>x[0]!=='.');
	if(document.readyState!=="complete"){
		window.onload=setMenu(menu);
	}
	else setMenu(menu);
});
function setMenu(menu){
	var nav=document.getElementById("nav");
	var frag=document.createDocumentFragment();
	for(let m in menu){
		let txt=menu[m];
		txt=txt[0].toUpperCase()+txt.slice(1);
		let a=document.createElement("a");
		a.innerText=txt;
		a.href='./'+txt;
		frag.append(a);
	}
	nav.innerText="";
	nav.append(frag);
}
