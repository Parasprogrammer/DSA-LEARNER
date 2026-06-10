export const topologicalSortConfig = {
  name: "Topological Sort",
  type: "graph",
  xpReward: 100,
  description: "Linearly orders the vertices of a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, vertex u comes before v.",
  complexity: { time: "O(V + E)", space: "O(V)" },
  code: `function topologicalSort(graph, numNodes) {
  let inDegree = new Array(numNodes).fill(0);
  let queue = [];
  let result = [];
  
  for (let u = 0; u < numNodes; u++) {
    for (let v of graph[u]) {
      inDegree[v]++;
    }
  }
  
  for (let i = 0; i < numNodes; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  while (queue.length > 0) {
    let curr = queue.shift();
    result.push(curr);
    
    for (let neighbor of graph[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  return result;
}`,
  generateStates: () => {
    const states = [];
    const nodes = [
      { id: '0', val: '0', x: 150, y: 50 },
      { id: '1', val: '1', x: 300, y: 50 },
      { id: '2', val: '2', x: 100, y: 150 },
      { id: '3', val: '3', x: 250, y: 150 },
      { id: '4', val: '4', x: 400, y: 150 },
      { id: '5', val: '5', x: 200, y: 250 }
    ];
    
    const initialEdges = [
      { id: '0-2', from: '0', to: '2', isDirected: true },
      { id: '0-3', from: '0', to: '3', isDirected: true },
      { id: '1-3', from: '1', to: '3', isDirected: true },
      { id: '1-4', from: '1', to: '4', isDirected: true },
      { id: '2-5', from: '2', to: '5', isDirected: true },
      { id: '3-5', from: '3', to: '5', isDirected: true }
    ];
    
    const adjList = {
      '0': ['2', '3'], '1': ['3', '4'], '2': ['5'], '3': ['5'], '4': [], '5': []
    };

    let edges = JSON.parse(JSON.stringify(initialEdges));
    let nodesState = JSON.parse(JSON.stringify(nodes));
    let inDegree = { '0': 0, '1': 0, '2': 1, '3': 2, '4': 1, '5': 2 };
    
    nodesState.forEach(n => { n.val = `${n.id} (In: ${inDegree[n.id]})`; });

    states.push({
      nodes: JSON.parse(JSON.stringify(nodesState)),
      edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: [], visitedNodes: [], pointers: {},
      activeLine: 6,
      log: "Calculated in-degrees for all nodes."
    });

    let queue = ['0', '1'];
    let result = [];
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodesState)),
      edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: ['0', '1'], visitedNodes: [], pointers: {},
      activeLine: 13,
      log: "Enqueued nodes '0' and '1' with 0 in-degree."
    });

    while (queue.length > 0) {
      let curr = queue.shift();
      result.push(curr);
      
      states.push({
        nodes: JSON.parse(JSON.stringify(nodesState)),
        edges: JSON.parse(JSON.stringify(edges)),
        activeNodes: [curr], visitedNodes: [...result], pointers: { curr },
        activeLine: 17,
        log: `Dequeued '${curr}' and added to result. Queue: [${queue.join(', ')}]`
      });

      for (let neighbor of adjList[curr]) {
        let edgeId = `${curr}-${neighbor}`;
        let targetEdge = edges.find(e => e.id === edgeId);
        if (targetEdge) targetEdge.isTraversed = true;
        
        inDegree[neighbor]--;
        nodesState.find(n => n.id === neighbor).val = `${neighbor} (In: ${inDegree[neighbor]})`;
        
        states.push({
          nodes: JSON.parse(JSON.stringify(nodesState)),
          edges: JSON.parse(JSON.stringify(edges)),
          activeNodes: [curr, neighbor], visitedNodes: [...result], pointers: { curr, neighbor },
          activeLine: 20,
          log: `Decremented in-degree of neighbor '${neighbor}' to ${inDegree[neighbor]}.`
        });

        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
          states.push({
            nodes: JSON.parse(JSON.stringify(nodesState)),
            edges: JSON.parse(JSON.stringify(edges)),
            activeNodes: [neighbor], visitedNodes: [...result], pointers: { curr },
            activeLine: 22,
            log: `In-degree of '${neighbor}' is 0. Enqueued!`
          });
        }
      }
    }
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodesState)),
      edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: [], visitedNodes: result, pointers: {},
      activeLine: 27,
      log: `Topological Sort complete! Order: [${result.join(', ')}]`
    });
    
    return states;
  }
};
