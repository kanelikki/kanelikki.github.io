function hint(x=Math.floor(Math.random()*sizey),y=Math.floor(Math.random()*sizex)){
	var elem=document.getElementById("p"+x+"x"+y);
	if(!elem) return;
	if(mindex.find(a=>a[0]==x&&a[1]==y)!==undefined){ mark(null,x,y,elem); }
	else{ clicking(null,x,y,elem); }
}
function cheat(){//are you serious?
	for(let i=0;i<sizey;i++){
		for(let j=0;j<sizex;j++){
			hint(i,j);
		}
	}
}