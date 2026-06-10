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

export const maxHeapConfig = {
  name: "Max Heap",
  type: "tree",
  xpReward: 65,
  description: "A Max Heap is a complete binary tree where every parent is greater than or equal to its children.",
  complexity: {
    time: "O(log N) insert/extract",
    space: "O(N)"
  },
  code: `function heapifyDown(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest])
    largest = left;

  if (right < n && arr[right] > arr[largest])
    largest = right;

  if (largest !== i) {
    swap(arr, i, largest);
    heapifyDown(arr, n, largest);
  }
}`,
  generateStates: () => {
    const states = [];
    let heap = [50, 40, 45, 10, 20, 30]; // Valid Max Heap
    
    states.push({
      root: arrayToTree(heap),
      activeNodes: [],
      activeLine: 1,
      log: "Valid Max Heap initialized. Let's Extract-Max (remove the root)."
    });

    // Extract Max
    let max = heap[0];
    heap[0] = heap.pop(); // Move last element to root
    
    states.push({
      root: arrayToTree(heap),
      activeNodes: ['node-0'],
      activeLine: 1,
      log: `Extracted Max (${max}). Moved the last leaf (${heap[0]}) to the root. Now we must heapifyDown!`
    });

    // Heapify Down visually
    let n = heap.length;
    let i = 0;
    
    while (true) {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      let compareNodes = [`node-${i}`];
      if (left < n) compareNodes.push(`node-${left}`);
      if (right < n) compareNodes.push(`node-${right}`);

      states.push({
        root: arrayToTree(heap),
        activeNodes: compareNodes,
        activeLine: 6,
        log: "Comparing parent with its children to find the largest."
      });

      if (left < n && heap[left] > heap[largest]) largest = left;
      if (right < n && heap[right] > heap[largest]) largest = right;

      if (largest !== i) {
        let temp = heap[i];
        heap[i] = heap[largest];
        heap[largest] = temp;
        
        states.push({
          root: arrayToTree(heap),
          activeNodes: [`node-${i}`, `node-${largest}`],
          activeLine: 13,
          log: `Child (${heap[i]}) is larger! Swapped to maintain Max Heap property.`
        });
        i = largest;
      } else {
        break;
      }
    }

    states.push({
      root: arrayToTree(heap),
      activeNodes: [],
      visitedNodes: ['node-0'],
      activeLine: 16,
      log: "Heapify Down complete. Max Heap property restored!"
    });

    return states;
  }
};
