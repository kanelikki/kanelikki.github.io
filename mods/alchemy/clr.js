const defaultBg = "slateblue";
const bg = "purple";
const defaultLine = "lightgrey";
const lineFrom = "red";
const lineTo = "blue";

const highlighter = (function () {
    let selectedKey = "";
    let selectedLines = [];
    let graph = null;
    let data = null;
    let box = null;

    return {
        init: function (d, g) {
            data = d;
            graph = g;
            box = document.getElementById("box");
        },
        highlight: function (id) {
            if(graph === null || data === null) throw "no graph/data found, set with init() first";
            this.hideTooltip();
            if (selectedKey !== "") {
                graph.updateNode(selectedKey, v => {
                    v.color = defaultBg;
                    return v;
                });
            }
            graph.updateNode(id, v => {
                v.color = bg;
                return v;
            });
            highlightLines(id);
            selectedKey = id;
        },
        showDetail: function(e) {
            const id = e.edge;
            const [x, y] = [e.event.x, e.event.y];
            if(!graph.getEdgeAttribute(id, "active")) {
                this.hideTooltip();
                return;
            }
            box.style.top=y+"px";
            box.style.left=x+"px";
            box.textContent="";
            box.removeAttribute("hidden");
            let frag = document.createDocumentFragment();
            for(const combo of graph.getEdgeAttribute(id, "combo")) {
                let line = document.createElement("p");
                let img1 = document.createElement("img");
                let img2 = document.createElement("img");
                img1.src = `./imgs/${combo[0]}.svg`;
                img2.src = `./imgs/${combo[1]}.svg`;
                img1.alt = data[combo[0]].n;
                img2.alt = data[combo[1]].n;
                line.appendChild(img1);
                line.appendChild(img2);
                frag.appendChild(line);
            }
            box.appendChild(frag);
        },
        hideTooltip: function() {
            box.setAttribute("hidden","");
        }
    }
    function highlightLines(id) {
        for (let line of selectedLines) {
            updateClr(line[0], line[1], defaultLine, true);
        }
        selectedLines = [];
        if (data[id].p) {
            for (const d of data[id].p) {
                updateClr(d[0], id, lineFrom);
                updateClr(d[1], id, lineFrom);
            }
        }
        if (data[id].c) {
            for (const d of data[id].c) {
                updateClr(id, d, lineTo);
            }
        }

        function updateClr(from, to, color, isClear = false) {
            if (isClear) {
                graph.updateEdge(from, to, v => {
                    v.color = color;
                    v.active = false;
                    return v;
                });
            }
            //create new to make top
            else {
                let attributes = graph.getEdgeAttributes(from, to);
                attributes.active = true;
                attributes.color = color;
                graph.dropEdge(from, to);
                graph.addEdge(from, to, attributes);
                selectedLines.push([from, to]);
            }
        }
    }
})();