export const treeTraversalsConfig = {
  name: "Tree Traversals",
  type: "tree",
  xpReward: 50,
  description: "Visualizes standard Depth-First traversals (In-order, Pre-order, Post-order) on a Binary Search Tree.",
  complexity: {
    time: "O(N)",
    space: "O(H)"
  },
  code: `// In-Order Traversal
function inorder(node) {
  if (!node) return;
  inorder(node.left);
  console.log(node.val);
  inorder(node.right);
}

// Pre-Order Traversal
function preorder(node) {
  if (!node) return;
  console.log(node.val);
  preorder(node.left);
  preorder(node.right);
}`,
  generateStates: () => {
    const states = [];
    
    // Construct a static tree
    let root = {
      id: 'node-20', val: 20,
      left: {
        id: 'node-10', val: 10,
        left: { id: 'node-5', val: 5 },
        right: { id: 'node-15', val: 15 }
      },
      right: {
        id: 'node-30', val: 30,
        left: { id: 'node-25', val: 25 },
        right: { id: 'node-35', val: 35 }
      }
    };
    
    const cloneTree = (node) => JSON.parse(JSON.stringify(node));
    
    states.push({
      root: cloneTree(root),
      activeNodes: [],
      visitedNodes: [],
      activeLine: 2,
      log: "Initialized Binary Tree. Executing Pre-Order Traversal (Root -> Left -> Right)."
    });

    let visited = [];

    const preorder = (node) => {
      if (!node) return;
      
      states.push({
        root: cloneTree(root),
        activeNodes: [node.id],
        visitedNodes: [...visited],
        activeLine: 12,
        log: `Pre-Order: Visiting node ${node.val}`
      });
      
      visited.push(node.id);
      
      states.push({
        root: cloneTree(root),
        activeNodes: [],
        visitedNodes: [...visited],
        activeLine: 13,
        log: `Pre-Order: Visited ${node.val}. Moving to left child.`
      });

      preorder(node.left);
      
      states.push({
        root: cloneTree(root),
        activeNodes: [node.id],
        visitedNodes: [...visited],
        activeLine: 14,
        log: `Back at node ${node.val}. Moving to right child.`
      });
      
      preorder(node.right);
    };

    preorder(root);

    states.push({
      root: cloneTree(root),
      activeNodes: [],
      visitedNodes: [...visited],
      activeLine: 16,
      log: "Pre-Order Traversal complete! (Try modifying the code block to see In-order)."
    });

    return states;
  }
};
