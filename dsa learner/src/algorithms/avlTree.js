export const avlTreeConfig = {
  name: "AVL Tree",
  type: "tree",
  xpReward: 80,
  description: "An AVL Tree is a self-balancing Binary Search Tree. If the height difference of left and right subtrees exceeds 1 after an insertion, it performs rotations to balance itself.",
  complexity: {
    time: "O(log N)",
    space: "O(N)"
  },
  code: `class Node {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
    this.height = 1;
  }
}
function rightRotate(y) {
  let x = y.left;
  let T2 = x.right;
  x.right = y;
  y.left = T2;
  y.height = Math.max(height(y.left), height(y.right)) + 1;
  x.height = Math.max(height(x.left), height(x.right)) + 1;
  return x;
}
function leftRotate(x) {
  let y = x.right;
  let T2 = y.left;
  y.left = x;
  x.right = T2;
  x.height = Math.max(height(x.left), height(x.right)) + 1;
  y.height = Math.max(height(y.left), height(y.right)) + 1;
  return y;
}`,
  generateStates: () => {
    const states = [];
    
    // We will simulate inserting 10, 20, 30 to trigger a Left Rotation
    let root = null;
    let nextId = 1;

    const cloneTree = (node) => node ? JSON.parse(JSON.stringify(node)) : null;

    states.push({
      root: cloneTree(root),
      activeNodes: [],
      activeLine: 8,
      log: "Initialized empty AVL Tree. Let's insert 10, 20, 30 to trigger a rotation!"
    });

    root = { id: `node-${nextId++}`, val: 10, height: 1 };
    states.push({ root: cloneTree(root), activeNodes: [root.id], activeLine: 1, log: "Inserted 10 as Root." });
    
    root.right = { id: `node-${nextId++}`, val: 20, height: 1 };
    root.height = 2;
    states.push({ root: cloneTree(root), activeNodes: [root.right.id], activeLine: 1, log: "Inserted 20. Tree is still balanced (height diff <= 1)." });
    
    root.right.right = { id: `node-${nextId++}`, val: 30, height: 1 };
    root.right.height = 2;
    root.height = 3;
    states.push({ 
      root: cloneTree(root), 
      activeNodes: [root.right.right.id, root.id], 
      activeLine: 8, 
      log: "Inserted 30. Root node (10) now has a balance factor of -2! An imbalance is detected." 
    });

    states.push({ 
      root: cloneTree(root), 
      activeNodes: [root.id], 
      activeLine: 17, 
      log: "Right-Right heavy. Executing Left Rotation on node 10..." 
    });

    // Left Rotate logic manually executed for state
    let y = root.right; // 20
    let T2 = y.left; // null
    
    y.left = root; // 20's left becomes 10
    root.right = T2; // 10's right becomes null
    
    root.height = 1;
    y.height = 2;
    
    root = y; // new root is 20

    states.push({ 
      root: cloneTree(root), 
      activeNodes: [root.id], 
      activeLine: 24, 
      log: "Left Rotation Complete! The AVL tree is beautifully balanced again." 
    });

    return states;
  }
};
