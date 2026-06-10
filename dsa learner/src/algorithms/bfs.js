export const bfsConfig = {
  name: "Breadth-First Search",
  type: "graph",
  xpReward: 50,
  description: "BFS explores a graph level by level, radiating outwards from the starting node. It uses a Queue to keep track of nodes to visit next.",
  complexity: {
    time: "O(V + E)",
    space: "O(V)"
  },
  code: `function bfs(graph, start) {
  let queue = [start];
  let visited = new Set([start]);
  
  while (queue.length > 0) {
    let curr = queue.shift();
    console.log("Visited:", curr);
    
    for (let neighbor of graph[curr]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
  generateStates: () => {
    const states = [];
    
    // Undirected Graph Setup
    const nodes = [
      { id: 'A', val: 'A', x: 300, y: 50 },
      { id: 'B', val: 'B', x: 200, y: 150 },
      { id: 'C', val: 'C', x: 400, y: 150 },
      { id: 'D', val: 'D', x: 100, y: 250 },
      { id: 'E', val: 'E', x: 300, y: 250 },
      { id: 'F', val: 'F', x: 500, y: 250 }
    ];
    
    const initialEdges = [
      { id: 'A-B', from: 'A', to: 'B' },
      { id: 'A-C', from: 'A', to: 'C' },
      { id: 'B-D', from: 'B', to: 'D' },
      { id: 'B-E', from: 'B', to: 'E' },
      { id: 'C-F', from: 'C', to: 'F' }
    ];
    
    const adjList = {
      'A': ['B', 'C'],
      'B': ['A', 'D', 'E'],
      'C': ['A', 'F'],
      'D': ['B'],
      'E': ['B'],
      'F': ['C']
    };

    states.push({
      nodes,
      edges: JSON.parse(JSON.stringify(initialEdges)),
      activeNodes: [],
      visitedNodes: [],
      pointers: {},
      activeLine: 2,
      log: "Graph initialized. Preparing to start BFS from node 'A'."
    });

    let queue = ['A'];
    let visited = new Set(['A']);
    let edges = JSON.parse(JSON.stringify(initialEdges));
    let visitedNodesArr = [];

    states.push({
      nodes, edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: ['A'],
      visitedNodes: Array.from(visited),
      pointers: {},
      activeLine: 3,
      log: "Enqueued 'A'. Marked 'A' as visited."
    });

    while (queue.length > 0) {
      let curr = queue.shift();
      visitedNodesArr.push(curr);
      
      states.push({
        nodes, edges: JSON.parse(JSON.stringify(edges)),
        activeNodes: [curr],
        visitedNodes: visitedNodesArr,
        pointers: { curr },
        activeLine: 6,
        log: `Dequeued '${curr}'. Current queue: [${queue.join(', ')}]`
      });

      for (let neighbor of adjList[curr]) {
        // Highlight edge
        let edgeId = `${curr}-${neighbor}`;
        let edgeIdRev = `${neighbor}-${curr}`;
        let targetEdge = edges.find(e => e.id === edgeId || e.id === edgeIdRev);
        
        if (targetEdge && !targetEdge.isTraversed) {
           targetEdge.isTraversed = true;
           states.push({
             nodes, edges: JSON.parse(JSON.stringify(edges)),
             activeNodes: [curr, neighbor],
             visitedNodes: visitedNodesArr,
             pointers: { curr, neighbor },
             activeLine: 9,
             log: `Checking neighbor '${neighbor}' of '${curr}'.`
           });
        }

        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          
          states.push({
             nodes, edges: JSON.parse(JSON.stringify(edges)),
             activeNodes: [neighbor],
             visitedNodes: Array.from(visited),
             pointers: { curr },
             activeLine: 12,
             log: `'${neighbor}' has not been visited. Marking as visited and enqueuing.`
           });
        } else {
           states.push({
             nodes, edges: JSON.parse(JSON.stringify(edges)),
             activeNodes: [curr],
             visitedNodes: Array.from(visited),
             pointers: { curr },
             activeLine: 10,
             log: `'${neighbor}' was already visited. Skipping.`
           });
        }
      }
    }

    states.push({
      nodes, edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: [],
      visitedNodes: visitedNodesArr,
      pointers: {},
      activeLine: 16,
      log: "Queue is empty. BFS Complete!"
    });

    return states;
  }
};
