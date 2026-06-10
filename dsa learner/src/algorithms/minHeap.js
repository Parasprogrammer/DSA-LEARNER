// Helper to convert array to nested tree object for TreeVisualizer
const arrayToTree = (arr) => {
  if (!arr || arr.length === 0) return null;
  const buildNode = (index) => {
    if (index >= arr.length) return null;
    return {
      id: `node-${index}`,
      val: arr[index],
      left: buildNode(2 * index + 1),
      right: buildNode(2 * index + 2)
    };
  };
  return buildNode(0);
};

export const minHeapConfig = {
  name: "Min Heap",
  type: "tree",
  xpReward: 65,
  description: "A Min Heap is a complete binary tree where every parent is smaller than or equal to its children.",
  complexity: {
    time: "O(log N) insert/extract",
    space: "O(N)"
  },
  code: `function heapifyUp(arr, i) {
  let parent = Math.floor((i - 1) / 2);
  if (parent >= 0 && arr[parent] > arr[i]) {
    swap(arr, parent, i);
    heapifyUp(arr, parent);
  }
}

function insert(arr, val) {
  arr.push(val);
  heapifyUp(arr, arr.length - 1);
}`,
  generateStates: () => {
    const states = [];
    let heap = [10, 20, 15, 30, 40];
    
    states.push({
      root: arrayToTree(heap),
      activeNodes: [],
      activeLine: 10,
      log: "Initialized a valid Min Heap. Let's insert the value 5."
    });

    // Insert 5
    heap.push(5);
    let curr = heap.length - 1;
    
    states.push({
      root: arrayToTree(heap),
      activeNodes: [`node-${curr}`],
      activeLine: 11,
      log: "Inserted 5 at the very end of the array (bottom right of the tree)."
    });

    states.push({
      root: arrayToTree(heap),
      activeNodes: [`node-${curr}`],
      activeLine: 12,
      log: "Triggering heapifyUp to restore Min Heap property!"
    });

    // Heapify Up
    while (curr > 0) {
      let parent = Math.floor((curr - 1) / 2);
      
      states.push({
        root: arrayToTree(heap),
        activeNodes: [`node-${curr}`, `node-${parent}`],
        activeLine: 3,
        log: `Comparing current (${heap[curr]}) with parent (${heap[parent]}).`
      });

      if (heap[parent] > heap[curr]) {
        // Swap
        let temp = heap[parent];
        heap[parent] = heap[curr];
        heap[curr] = temp;
        
        states.push({
          root: arrayToTree(heap), // Tree re-renders the swapped values
          activeNodes: [`node-${curr}`, `node-${parent}`],
          activeLine: 4,
          log: `Parent is larger! Swapped ${heap[curr]} and ${heap[parent]}.`
        });
        curr = parent;
      } else {
        break;
      }
    }

    states.push({
      root: arrayToTree(heap),
      activeNodes: [],
      visitedNodes: [root ? root.id : 'node-0'],
      activeLine: 7,
      log: "Heapify Up complete. Min Heap property restored! The root is now 5."
    });

    return states;
  }
};
