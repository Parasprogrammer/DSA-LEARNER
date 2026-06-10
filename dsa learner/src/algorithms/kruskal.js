export const kruskalConfig = {
  name: "Kruskal's Algorithm (MST)",
  type: "graph",
  xpReward: 100,
  description: "Finds a Minimum Spanning Tree for a connected weighted graph by sorting edges and picking the smallest edges that don't form cycles.",
  complexity: { time: "O(E log E)", space: "O(V + E)" },
  code: `function kruskal(nodes, edges) {
  let mst = [];
  let dsu = new UnionFind(nodes.length);
  
  edges.sort((a, b) => a.weight - b.weight);
  
  for (let edge of edges) {
    if (dsu.find(edge.u) !== dsu.find(edge.v)) {
      dsu.union(edge.u, edge.v);
      mst.push(edge);
    }
  }
  return mst;
}`,
  generateStates: () => {
    const states = [];
    const nodes = [
      { id: '0', val: '0', x: 150, y: 50 },
      { id: '1', val: '1', x: 350, y: 50 },
      { id: '2', val: '2', x: 250, y: 150 },
      { id: '3', val: '3', x: 150, y: 250 },
      { id: '4', val: '4', x: 350, y: 250 }
    ];
    const allEdges = [
      { id: '0-1', from: '0', to: '1', weight: 2 },
      { id: '0-2', from: '0', to: '2', weight: 4 },
      { id: '1-2', from: '1', to: '2', weight: 1 },
      { id: '1-4', from: '1', to: '4', weight: 5 },
      { id: '2-3', from: '2', to: '3', weight: 3 },
      { id: '2-4', from: '2', to: '4', weight: 2 },
      { id: '3-4', from: '3', to: '4', weight: 6 }
    ];
    let edges = JSON.parse(JSON.stringify(allEdges));
    edges.sort((a, b) => a.weight - b.weight);

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(allEdges)),
      activeNodes: [], visitedNodes: [], pointers: {},
      activeLine: 5,
      log: "Edges sorted by weight."
    });

    let parent = { '0':'0', '1':'1', '2':'2', '3':'3', '4':'4' };
    const find = (i) => parent[i] === i ? i : (parent[i] = find(parent[i]));
    const union = (i, j) => { parent[find(i)] = find(j); };
    let mstEdges = [];
    let stateEdges = JSON.parse(JSON.stringify(allEdges));

    for (let edge of edges) {
      let targetEdge = stateEdges.find(e => e.id === edge.id);
      
      states.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(stateEdges)),
        activeNodes: [edge.from, edge.to], visitedNodes: [...mstEdges], pointers: {},
        activeLine: 7,
        log: `Testing edge ${edge.from}-${edge.to} with weight ${edge.weight}.`
      });

      if (find(edge.from) !== find(edge.to)) {
        union(edge.from, edge.to);
        mstEdges.push(edge.from, edge.to);
        targetEdge.isTraversed = true;
        
        states.push({
          nodes: JSON.parse(JSON.stringify(nodes)),
          edges: JSON.parse(JSON.stringify(stateEdges)),
          activeNodes: [edge.from, edge.to], visitedNodes: [...mstEdges], pointers: {},
          activeLine: 9,
          log: `Nodes ${edge.from} and ${edge.to} are in different components. Added to MST!`
        });
      } else {
        states.push({
          nodes: JSON.parse(JSON.stringify(nodes)),
          edges: JSON.parse(JSON.stringify(stateEdges)),
          activeNodes: [edge.from, edge.to], visitedNodes: [...mstEdges], pointers: {},
          activeLine: 8,
          log: `Nodes ${edge.from} and ${edge.to} already connected. Skipping to prevent cycle.`
        });
      }
    }

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(stateEdges)),
      activeNodes: [], visitedNodes: mstEdges, pointers: {},
      activeLine: 13,
      log: "Kruskal's Algorithm complete! MST formed."
    });
    
    return states;
  }
};
