export const segmentTreeConfig = {
  name: "Segment Tree",
  type: "tree",
  xpReward: 70,
  description: "A Segment Tree is a binary tree used for storing intervals or segments. It allows querying which of the stored segments contain a given point in O(log N) time.",
  complexity: {
    time: "O(log N) query/update",
    space: "O(N)"
  },
  code: `function build(node, start, end) {
  if (start === end) {
    tree[node] = arr[start];
    return;
  }
  let mid = Math.floor((start + end) / 2);
  build(2 * node, start, mid);
  build(2 * node + 1, mid + 1, end);
  tree[node] = tree[2 * node] + tree[2 * node + 1];
}`,
  generateStates: () => {
    const states = [];
    const arr = [1, 3, 5, 7, 9, 11];
    
    const cloneTree = (node) => node ? JSON.parse(JSON.stringify(node)) : null;
    
    states.push({
      root: null,
      activeNodes: [],
      activeLine: 1,
      log: `Building Segment Tree for sum queries on array: [${arr.join(', ')}]`
    });

    // Manually constructing the balanced segment tree structure for vis
    // [1..11] sum = 36
    let root = {
      id: 'node-36', val: 36, label: '[0..5]',
      left: {
        id: 'node-9', val: 9, label: '[0..2]',
        left: {
          id: 'node-4', val: 4, label: '[0..1]',
          left: { id: 'node-1', val: 1, label: '[0]' },
          right: { id: 'node-3', val: 3, label: '[1]' }
        },
        right: { id: 'node-5', val: 5, label: '[2]' }
      },
      right: {
        id: 'node-27', val: 27, label: '[3..5]',
        left: {
          id: 'node-16', val: 16, label: '[3..4]',
          left: { id: 'node-7', val: 7, label: '[3]' },
          right: { id: 'node-9-leaf', val: 9, label: '[4]' }
        },
        right: { id: 'node-11', val: 11, label: '[5]' }
      }
    };

    states.push({
      root: cloneTree(root),
      activeNodes: [],
      activeLine: 10,
      log: "Segment Tree built successfully! Each node stores the sum of its range interval [L..R]."
    });
    
    // Simulate query [1..3]
    states.push({
      root: cloneTree(root),
      activeNodes: [root.id],
      activeLine: 1,
      log: "Query: Range Sum [1..3]. Starting at root [0..5]."
    });

    states.push({
      root: cloneTree(root),
      activeNodes: [root.left.id, root.right.id],
      activeLine: 6,
      log: "Range [1..3] overlaps both left [0..2] and right [3..5]. Exploring both."
    });

    states.push({
      root: cloneTree(root),
      activeNodes: ['node-3', 'node-5', 'node-7'],
      activeLine: 9,
      log: "Found exact overlapping leaf/sub-segments! Summing [1], [2], and [3]."
    });

    states.push({
      root: cloneTree(root),
      activeNodes: ['node-3', 'node-5', 'node-7'],
      visitedNodes: ['node-3', 'node-5', 'node-7'],
      activeLine: 10,
      log: "Result: 3 + 5 + 7 = 15. Query complete in O(log N)!"
    });

    return states;
  }
};
