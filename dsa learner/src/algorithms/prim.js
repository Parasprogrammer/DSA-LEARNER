export const primConfig = {
  name: "Prim's Algorithm (MST)",
  type: "graph",
  xpReward: 100,
  description: "Finds a Minimum Spanning Tree by starting from an arbitrary node and greedily adding the cheapest edge that connects the tree to a new node.",
  complexity: { time: "O(E log V)", space: "O(V + E)" },
  code: `function prim(graph, start) {
  let mst = [];
  let visited = new Set();
  let pq = new PriorityQueue();
  
  visited.add(start);
  for (let edge of graph[start]) {
    pq.enqueue(edge, edge.weight);
  }
  
  while (!pq.isEmpty()) {
    let edge = pq.dequeue();
    if (visited.has(edge.to)) continue;
    
    visited.add(edge.to);
    mst.push(edge);
    
    for (let nextEdge of graph[edge.to]) {
      if (!visited.has(nextEdge.to)) {
        pq.enqueue(nextEdge, nextEdge.weight);
      }
    }
  }
  return mst;
}`,
  generateStates: () => {
    const states = [];
    const nodes = [
      { id: 'A', val: 'A', x: 150, y: 50 },
      { id: 'B', val: 'B', x: 350, y: 50 },
      { id: 'C', val: 'C', x: 250, y: 150 },
      { id: 'D', val: 'D', x: 150, y: 250 },
      { id: 'E', val: 'E', x: 350, y: 250 }
    ];
    const initialEdges = [
      { id: 'A-B', from: 'A', to: 'B', weight: 2 },
      { id: 'A-C', from: 'A', to: 'C', weight: 4 },
      { id: 'B-C', from: 'B', to: 'C', weight: 1 },
      { id: 'B-E', from: 'B', to: 'E', weight: 5 },
      { id: 'C-D', from: 'C', to: 'D', weight: 3 },
      { id: 'C-E', from: 'C', to: 'E', weight: 2 },
      { id: 'D-E', from: 'D', to: 'E', weight: 6 }
    ];
    
    const adjList = {
      'A': [{to: 'B', weight: 2, id: 'A-B'}, {to: 'C', weight: 4, id: 'A-C'}],
      'B': [{to: 'A', weight: 2, id: 'A-B'}, {to: 'C', weight: 1, id: 'B-C'}, {to: 'E', weight: 5, id: 'B-E'}],
      'C': [{to: 'A', weight: 4, id: 'A-C'}, {to: 'B', weight: 1, id: 'B-C'}, {to: 'D', weight: 3, id: 'C-D'}, {to: 'E', weight: 2, id: 'C-E'}],
      'D': [{to: 'C', weight: 3, id: 'C-D'}, {to: 'E', weight: 6, id: 'D-E'}],
      'E': [{to: 'B', weight: 5, id: 'B-E'}, {to: 'C', weight: 2, id: 'C-E'}, {to: 'D', weight: 6, id: 'D-E'}]
    };

    let edges = JSON.parse(JSON.stringify(initialEdges));
    let nodesState = JSON.parse(JSON.stringify(nodes));
    let visited = new Set(['A']);
    let visitedNodesArr = ['A'];
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodesState)),
      edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: ['A'], visitedNodes: ['A'], pointers: {},
      activeLine: 5,
      log: "Started at node 'A'."
    });

    let pq = [];
    for (let edge of adjList['A']) {
      pq.push({ from: 'A', to: edge.to, weight: edge.weight, edgeId: edge.id });
    }
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodesState)),
      edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: ['A'], visitedNodes: ['A'], pointers: {},
      activeLine: 8,
      log: "Enqueued edges connected to 'A' into Priority Queue."
    });

    while (pq.length > 0) {
      pq.sort((a, b) => a.weight - b.weight);
      let currEdge = pq.shift();
      
      states.push({
        nodes: JSON.parse(JSON.stringify(nodesState)),
        edges: JSON.parse(JSON.stringify(edges)),
        activeNodes: [currEdge.from, currEdge.to], visitedNodes: [...visitedNodesArr], pointers: {},
        activeLine: 11,
        log: `Dequeued smallest edge ${currEdge.from}-${currEdge.to} (Weight: ${currEdge.weight}).`
      });

      if (visited.has(currEdge.to)) {
        states.push({
          nodes: JSON.parse(JSON.stringify(nodesState)),
          edges: JSON.parse(JSON.stringify(edges)),
          activeNodes: [currEdge.from, currEdge.to], visitedNodes: [...visitedNodesArr], pointers: {},
          activeLine: 13,
          log: `Node '${currEdge.to}' is already in the MST. Skipping edge.`
        });
        continue;
      }
      
      visited.add(currEdge.to);
      visitedNodesArr.push(currEdge.to);
      edges.find(e => e.id === currEdge.edgeId).isTraversed = true;
      
      states.push({
        nodes: JSON.parse(JSON.stringify(nodesState)),
        edges: JSON.parse(JSON.stringify(edges)),
        activeNodes: [currEdge.to], visitedNodes: [...visitedNodesArr], pointers: {},
        activeLine: 16,
        log: `Added edge ${currEdge.from}-${currEdge.to} to the MST!`
      });
      
      for (let nextEdge of adjList[currEdge.to]) {
        if (!visited.has(nextEdge.to)) {
          pq.push({ from: currEdge.to, to: nextEdge.to, weight: nextEdge.weight, edgeId: nextEdge.id });
        }
      }
      
      states.push({
        nodes: JSON.parse(JSON.stringify(nodesState)),
        edges: JSON.parse(JSON.stringify(edges)),
        activeNodes: [currEdge.to], visitedNodes: [...visitedNodesArr], pointers: {},
        activeLine: 20,
        log: `Enqueued new edges connected to '${currEdge.to}'.`
      });
    }

    states.push({
      nodes: JSON.parse(JSON.stringify(nodesState)),
      edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: [], visitedNodes: visitedNodesArr, pointers: {},
      activeLine: 24,
      log: "Prim's Algorithm complete! MST formed."
    });
    
    return states;
  }
};
