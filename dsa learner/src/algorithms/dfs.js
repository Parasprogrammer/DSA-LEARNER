export const dfsConfig = {
  name: "Depth-First Search",
  type: "graph",
  xpReward: 50,
  description: "DFS explores a graph by going as deep as possible along each branch before backtracking. It relies on a Stack (often implicitly via recursion).",
  complexity: {
    time: "O(V + E)",
    space: "O(V)"
  },
  code: `function dfs(graph, start) {
  let visited = new Set();
  
  function explore(curr) {
    visited.add(curr);
    console.log("Visited:", curr);
    
    for (let neighbor of graph[curr]) {
      if (!visited.has(neighbor)) {
        explore(neighbor);
      }
    }
  }
  
  explore(start);
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

    let visited = new Set();
    let edges = JSON.parse(JSON.stringify(initialEdges));

    states.push({
      nodes, edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: [],
      visitedNodes: [],
      pointers: {},
      activeLine: 2,
      log: "Graph initialized. Preparing to start DFS from node 'A'."
    });

    const explore = (curr) => {
      visited.add(curr);
      
      states.push({
        nodes, edges: JSON.parse(JSON.stringify(edges)),
        activeNodes: [curr],
        visitedNodes: Array.from(visited),
        pointers: { curr },
        activeLine: 5,
        log: `Exploring node '${curr}'. Marked as visited.`
      });

      for (let neighbor of adjList[curr]) {
        let edgeId = `${curr}-${neighbor}`;
        let edgeIdRev = `${neighbor}-${curr}`;
        let targetEdge = edges.find(e => e.id === edgeId || e.id === edgeIdRev);
        
        states.push({
           nodes, edges: JSON.parse(JSON.stringify(edges)),
           activeNodes: [curr, neighbor],
           visitedNodes: Array.from(visited),
           pointers: { curr, neighbor },
           activeLine: 8,
           log: `Checking neighbor '${neighbor}' of '${curr}'.`
        });

        if (!visited.has(neighbor)) {
          if (targetEdge) targetEdge.isTraversed = true;
          
          states.push({
             nodes, edges: JSON.parse(JSON.stringify(edges)),
             activeNodes: [neighbor],
             visitedNodes: Array.from(visited),
             pointers: { curr, neighbor },
             activeLine: 10,
             log: `'${neighbor}' has not been visited. Diving deeper (recursing) into '${neighbor}'.`
           });
           
          explore(neighbor);
          
          // Backtrack
          states.push({
             nodes, edges: JSON.parse(JSON.stringify(edges)),
             activeNodes: [curr],
             visitedNodes: Array.from(visited),
             pointers: { curr },
             activeLine: 11,
             log: `Backtracked from '${neighbor}'. Resuming exploration at '${curr}'.`
           });
        } else {
           states.push({
             nodes, edges: JSON.parse(JSON.stringify(edges)),
             activeNodes: [curr],
             visitedNodes: Array.from(visited),
             pointers: { curr },
             activeLine: 9,
             log: `'${neighbor}' was already visited. Skipping.`
           });
        }
      }
    };

    states.push({
      nodes, edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: ['A'],
      visitedNodes: [],
      pointers: {},
      activeLine: 15,
      log: "Calling recursive explore function on 'A'."
    });

    explore('A');

    states.push({
      nodes, edges: JSON.parse(JSON.stringify(edges)),
      activeNodes: [],
      visitedNodes: Array.from(visited),
      pointers: {},
      activeLine: 16,
      log: "DFS Complete!"
    });

    return states;
  }
};
