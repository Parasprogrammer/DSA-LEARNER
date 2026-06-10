export const bstConfig = {
  name: "Binary Search Tree",
  type: "tree",
  xpReward: 75,
  description: "A Binary Search Tree (BST) is a tree where each node has at most two children. For any given node, all values in its left subtree are smaller, and all values in its right subtree are larger.",
  complexity: {
    time: "O(log N)",
    space: "O(N)"
  },
  code: `class BST {
  constructor() {
    this.root = null;
  }
  
  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return;
    }
    
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) {
          curr.left = new Node(val);
          break;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = new Node(val);
          break;
        }
        curr = curr.right;
      }
    }
  }
}`,
  generateStates: () => {
    const states = [];
    let nextId = 1;
    
    let nodes = [
      { id: '1', val: 50, left: '2', right: '3' },
      { id: '2', val: 30, left: null, right: null },
      { id: '3', val: 70, left: null, right: null }
    ];
    nextId = 4;
    
    const insertVal = 40;
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: {},
      activeNodes: [],
      activeLine: 6,
      log: `Preparing to insert ${insertVal} into the BST.`
    });
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: '1' },
      activeNodes: ['1'],
      activeLine: 12,
      log: `Starting at the root (50).`
    });

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: '1' },
      activeNodes: ['1'],
      activeLine: 14,
      log: `${insertVal} < 50. Moving to the left subtree.`
    });

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: '2' },
      activeNodes: ['2'],
      activeLine: 19,
      log: `curr is now at 30.`
    });

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: '2' },
      activeNodes: ['2'],
      activeLine: 20,
      log: `${insertVal} > 30. Moving to the right subtree.`
    });

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: '2' },
      activeNodes: ['2'],
      activeLine: 21,
      log: `Right child of 30 is empty! We can insert here.`
    });

    const newNodeId = String(nextId++);
    nodes.push({ id: newNodeId, val: insertVal, left: null, right: null, isNew: true });
    
    nodes.find(n => n.id === '2').right = newNodeId;

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: '2' },
      activeNodes: [newNodeId],
      activeLine: 22,
      log: `Created new node ${insertVal} and linked it as the right child of 30.`
    });

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: {},
      activeNodes: [],
      activeLine: 23,
      log: `Insertion complete!`
    });

    return states;
  }
};
