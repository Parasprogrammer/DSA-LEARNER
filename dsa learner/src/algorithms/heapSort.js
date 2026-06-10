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

export const heapSortConfig = {
  name: "Heap Sort",
  type: "tree",
  xpReward: 90,
  description: "Heap Sort builds a Max Heap, then repeatedly extracts the maximum element and places it at the end of the array, shrinking the heap size until the array is sorted.",
  complexity: {
    time: "O(N log N)",
    space: "O(1)"
  },
  code: `function heapSort(arr) {
  let n = arr.length;
  // Build Max Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyDown(arr, n, i);
  }
  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapifyDown(arr, i, 0);
  }
}`,
  generateStates: () => {
    const states = [];
    let arr = [12, 11, 13, 5, 6, 7]; // Unsorted array
    let n = arr.length;
    
    states.push({
      root: arrayToTree(arr),
      activeNodes: [],
      activeLine: 2,
      log: "Array visualized as a Complete Binary Tree. First step: Build a Max Heap."
    });

    // Heapify helper
    const heapify = (heapArr, size, i) => {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      if (left < size && heapArr[left] > heapArr[largest]) largest = left;
      if (right < size && heapArr[right] > heapArr[largest]) largest = right;

      if (largest !== i) {
        let temp = heapArr[i];
        heapArr[i] = heapArr[largest];
        heapArr[largest] = temp;
        
        states.push({
          root: arrayToTree(heapArr),
          activeNodes: [`node-${i}`, `node-${largest}`],
          activeLine: 4,
          log: "Heapifying: Swapped to enforce Max Heap property."
        });
        
        heapify(heapArr, size, largest);
      }
    };

    // Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }

    states.push({
      root: arrayToTree(arr),
      activeNodes: [],
      activeLine: 6,
      log: "Max Heap built successfully! The largest element is now at the root."
    });

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
      // Note: In a real heap sort visualization, the sorted elements at the end are no longer part of the heap.
      // We can visualize this by setting a specific flag or just showing the tree shrink. 
      // arrayToTree maps the whole array, so the sorted elements will appear at the bottom right.
      
      let max = arr[0];
      let temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      
      states.push({
        root: arrayToTree(arr),
        activeNodes: [`node-0`, `node-${i}`],
        visitedNodes: Array.from({length: n - i}, (_, idx) => `node-${n - 1 - idx}`),
        activeLine: 9,
        log: `Swapped root (${max}) with last element. ${max} is now locked in its sorted position!`
      });

      // We only heapify the unsorted portion (size i)
      // To reflect this in our static arrayToTree, we pass 'i' as size.
      // But arrayToTree uses arr.length. So we just pass a sliced copy to heapify.
      let heapPortion = arr.slice(0, i);
      
      let heapifySim = (simArr, size, idx) => {
        let largest = idx;
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;

        if (left < size && simArr[left] > simArr[largest]) largest = left;
        if (right < size && simArr[right] > simArr[largest]) largest = right;

        if (largest !== idx) {
          let t = simArr[idx];
          simArr[idx] = simArr[largest];
          simArr[largest] = t;
          
          // Sync back to main arr for visualization
          arr[idx] = simArr[idx];
          arr[largest] = simArr[largest];
          
          states.push({
            root: arrayToTree(arr),
            activeNodes: [`node-${idx}`, `node-${largest}`],
            visitedNodes: Array.from({length: n - i}, (_, idx) => `node-${n - 1 - idx}`),
            activeLine: 10,
            log: "Heapify down the remaining unsorted heap..."
          });
          
          heapifySim(simArr, size, largest);
        }
      };
      
      heapifySim(heapPortion, i, 0);
    }

    states.push({
      root: arrayToTree(arr),
      activeNodes: [],
      visitedNodes: arr.map((_, idx) => `node-${idx}`),
      activeLine: 12,
      log: "Heap Sort Complete! The tree structure implicitly holds a fully sorted array."
    });

    return states;
  }
};
