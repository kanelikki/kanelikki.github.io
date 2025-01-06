(async function () {
  const winPromise = new Promise((resolve) => window.addEventListener("load", () => resolve()));
  const dataPromise = fetch("data.json").then(a => a.json());
  const categoryPromise = fetch("category.json").then(a => a.json());
  const descriptionPromise = fetch("description.json").then(a => a.json());
  await Promise.all([winPromise, dataPromise, categoryPromise, descriptionPromise]);
  const [data, category, description] = [await dataPromise, await categoryPromise, await descriptionPromise];

  const graph = new graphology.Graph();
  highlighter.init(data, graph);

  const minSize = 10;
  const maxSize = 25;
  const combiMax = Object.values(data).reduce((a,b)=>{
    if(!b.c) return a;
    else return (b.c.length>a)?b.c.length:a
  },0);
  const sizeMultiplier = (maxSize-minSize)/Math.sqrt(combiMax);
  for (var key of Object.keys(data)) {
    const current = data[key];
    const position = getPosition(key, current);
    let size = (current.c)?getSize(current.c.length):minSize;
    const nodeInfo = {
      label: current.n, x: position.x, y: position.y,
      //set source size to 10, and set size manually to 100 in sigma-node-image.cjs.prod.js, so can load as svg.
      //so the svg file must have 10x10 size to work properly
      type:'image', image:`./imgs/${key}.svg`,
      color: defaultBg,
      size: size
    };
    graph.addNode(key, nodeInfo);
  }
  for (var key of Object.keys(data)) {
    const current = data[key];
    if (current.c === undefined) continue; // final
    for (var next of current.c) {
      //let nextItem = data[next];
      const combo = getAllCombo(key, next);
      let edge = graph.addEdge(key, next, { size: combo.count, color: defaultLine, active:false, combo: combo.combo });
    }
  }
  const containerSize = document.getElementById("container").getBoundingClientRect();
  //will cost to draw it again so let it as is :)
  const circularPositions = randomLayout(graph, { ratio: [(containerSize.width/containerSize.height),1] });
  Sigma.utils.animateNodes(graph, circularPositions, { duration: 10, easing: "linear" })

  const renderer = new Sigma(graph, document.getElementById("container"), {
    scalingMode:"outside",
    enableEdgeEvents: true,
    defaultEdgeType: "straightNoArrow",
    nodeProgramClasses: {
      image: exportsNodeImg.NodeImageProgram
    },
    edgeProgramClasses: {
      straightNoArrow: Sigma.rendering.EdgeArrowProgram
    }
  });
  renderer.on("clickNode", ({ node }) => highlighter.highlight(node));
  renderer.on("clickEdge", e => highlighter.showDetail(e));
  renderer.on("downStage", e => highlighter.hideTooltip());
  renderer.on("wheelStage", e => highlighter.hideTooltip());
  renderer.on("wheelEdge", e => highlighter.hideTooltip());
  renderer.on("wheelNode", e => highlighter.hideTooltip());

  function getPosition(targetKey) {
    return {
      x: (targetKey % 60) * 280,
      y: Math.floor(targetKey / 60) * 480
    }
  }
  function getSize(len){
    return sizeMultiplier*Math.sqrt(len)+minSize;
  }
  function getAllCombo(fromKey, toKey) {
    let count = 0;
    let combo = [];
    for(const e of data[toKey].p) {
      let comboSize= (e[0]===fromKey) + (e[1]===fromKey);
      count+=comboSize;
      if(comboSize>0) combo.push(e);
    }
    return {
      combo:combo,
      count:count
    };
  }
  function makeSampleData(graph){
      graph.addNode("1", { label: "", x: 0, y: 30, size:40 });
      graph.addNode("2", { label: "", x: 50, y: 70, size:40 });
      graph.addNode("3", { label: "", x: 0, y: 40, size:40 });
      graph.addNode("4", { label: "", x: 50, y: 122, size:40 });

    let thickness = 16;
      graph.addEdge("1", "2", { size: thickness, color: defaultLine, active:false });
      graph.addEdge("2", "4", { size: thickness, color: defaultLine, active:false });
      graph.addEdge("3", "2", { size: thickness, color: defaultLine, active:false });
      graph.addEdge("4", "1", { size: thickness, color: defaultLine, active:false });
  }
})();