export const dijkstraConfig = {
  name: "Dijkstra's Shortest Path",
  type: "graph",
  xpReward: 100,
  description: "Finds the shortest path from a starting node to all other nodes in a weighted graph using a Priority Queue.",
  complexity: { time: "O(E log V)", space: "O(V)" },
  code: `function dijkstra(graph, start) {
  let distances = {};
  let pq = new PriorityQueue();
  let visited = new Set();
  
  distances[start] = 0;
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    let { node: curr, priority: dist } = pq.dequeue();
    if (visited.has(curr)) continue;
    
    visited.add(curr);
    
    for (let edge of graph[curr]) {
      let neighbor = edge.to;
      let newDist = dist + edge.weight;
      
      if (distances[neighbor] === undefined || newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.enqueue(neighbor, newDist);
      }
    }
  }
}`,
  generateStates: () => {
    const states = [];
    
    const nodes = [
      { id: 'A', val: 'A', x: 100, y: 150 },
      { id: 'B', val: 'B', x: 250, y: 50 },
      { id: 'C', val: 'C', x: 250, y: 250 },
      { id: 'D', val: 'D', x: 400, y: 50 },
      { id: 'E', val: 'E', x: 400, y: 250 },
      { id: 'F', val: 'F', x: 550, y: 150 }
    ];
    
    const initialEdges = [
      { id: 'A-B', from: 'A', to: 'B', weight: 4 },
      { id: 'A-C', from: 'A', to: 'C', weight: 2 },
      { id: 'B-C', from: 'B', to: 'C', weight: 1 },
      { id: 'B-D', from: 'B', to: 'D', weight: 5 },
      { id: 'C-D', from: 'C', to: 'D', weight: 8 },
      { id: 'C-E', from: 'C', to: 'E', weight: 10 },
      { id: 'D-E', from: 'D', to: 'E', weight: 2 },
      { id: 'D-F', from: 'D', to: 'F', weight: 6 },
      { id: 'E-F', from: 'E', to: 'F', weight: 2 }
    ];
    
    const adjList = {
      'A': [{ to: 'B', weight: 4 }, { to: 'C', weight: 2 }],
      'B': [{ to: 'C', weight: 1 }, { to: 'D', weight: 5 }, { to: 'A', weight: 4 }],
      'C': [{ to: 'B', weight: 1 }, { to: 'D', weight: 8 }, { to: 'E', weight: 10 }, { to: 'A', weight: 2 }],
      'D': [{ to: 'E', weight: 2 }, { to: 'F', weight: 6 }, { to: 'B', weight: 5 }, { to: 'C', weight: 8 }],
      'E': [{ to: 'F', weight: 2 }, { to: 'D', weight: 2 }, { to: 'C', weight: 10 }],
      'F': [{ to: 'E', weight: 2 }, { to: 'D', weight: 6 }]
    };

    let edges = JSON.parse(JSON.stringify(initialEdges));
    let nodesState = JSON.parse(JSON.stringify(nodes));
    nodesState.forEach(n => { n.val = `${n.id} (∞)`; });

    states.push({
      nodes: JSON.parse(JSON.stringify(nodesState)),
      edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: [], visitedNodes: [], pointers: {},
      activeLine: 2,
      log: "Graph initialized. All distances are infinity."
    });

    let distances = { 'A': 0 };
    nodesState.find(n => n.id === 'A').val = 'A (0)';
    let pq = [{ node: 'A', priority: 0 }];
    let visited = new Set();
    let visitedNodesArr = [];

    states.push({
      nodes: JSON.parse(JSON.stringify(nodesState)),
      edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: ['A'], visitedNodes: [], pointers: {},
      activeLine: 7,
      log: "Start node 'A' distance set to 0 and added to Priority Queue."
    });

    while (pq.length > 0) {
      pq.sort((a, b) => a.priority - b.priority);
      let { node: curr, priority: dist } = pq.shift();
      
      states.push({
        nodes: JSON.parse(JSON.stringify(nodesState)),
        edges: JSON.parse(JSON.stringify(edges)),
        activeNodes: [curr], visitedNodes: [...visitedNodesArr], pointers: { curr },
        activeLine: 10,
        log: `Dequeued '${curr}' with distance ${dist} from Priority Queue.`
      });

      if (visited.has(curr)) continue;
      
      visited.add(curr);
      visitedNodesArr.push(curr);

      for (let edge of adjList[curr]) {
        let neighbor = edge.to;
        
        let edgeId = `${curr}-${neighbor}`;
        let edgeIdRev = `${neighbor}-${curr}`;
        let targetEdge = edges.find(e => e.id === edgeId || e.id === edgeIdRev);
        if (targetEdge && !targetEdge.isTraversed) {
           targetEdge.isTraversed = true;
           states.push({
             nodes: JSON.parse(JSON.stringify(nodesState)),
             edges: JSON.parse(JSON.stringify(edges)),
             activeNodes: [curr, neighbor], visitedNodes: [...visitedNodesArr], pointers: { curr, neighbor },
             activeLine: 16,
             log: `Evaluating edge ${curr} -> ${neighbor} with weight ${edge.weight}.`
           });
        }
        
        let newDist = dist + edge.weight;
        let oldDist = distances[neighbor] === undefined ? Infinity : distances[neighbor];
        
        if (newDist < oldDist) {
          distances[neighbor] = newDist;
          pq.push({ node: neighbor, priority: newDist });
          nodesState.find(n => n.id === neighbor).val = `${neighbor} (${newDist})`;
          
          states.push({
             nodes: JSON.parse(JSON.stringify(nodesState)),
             edges: JSON.parse(JSON.stringify(edges)),
             activeNodes: [neighbor], visitedNodes: [...visitedNodesArr], pointers: { curr, neighbor },
             activeLine: 20,
             log: `Found shorter path to ${neighbor}! Updated distance to ${newDist} and enqueued.`
           });
        }
      }
    }
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodesState)),
      edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: [], visitedNodes: visitedNodesArr, pointers: {},
      activeLine: 24,
      log: "Priority Queue is empty. Dijkstra's Algorithm complete!"
    });
    
    return states;
  }
};
