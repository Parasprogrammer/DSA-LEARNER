export const quickSortConfig = {
  name: "Quick Sort",
  type: "array",
  xpReward: 65,
  description: "Quick Sort is a highly efficient sorting algorithm that partitions an array into two smaller arrays based on a pivot element, and recursively sorts those partitions.",
  complexity: {
    time: "O(N log N)",
    space: "O(log N)"
  },
  code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      // Swap arr[i] and arr[j]
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  // Swap pivot
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  
  return i + 1;
}`,
  generateStates: () => {
    const states = [];
    const arr = [10, 80, 30, 90, 40, 50, 70];
    const doneIndices = new Set();
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 2,
      log: `Starting Quick Sort on array: [${arr.join(', ')}]`
    });

    const doQuickSort = (low, high) => {
      if (low < high) {
        // Partition
        let pivot = arr[high];
        
        states.push({
          array: [...arr],
          activeIndices: [high],
          pointers: { low, high, pivot: high },
          doneIndices: Array.from(doneIndices),
          activeLine: 11,
          log: `Selected pivot element ${pivot} at index ${high}.`
        });

        let i = low - 1;
        
        for (let j = low; j < high; j++) {
          states.push({
            array: [...arr],
            activeIndices: [j],
            pointers: { i, j, pivot: high },
            doneIndices: Array.from(doneIndices),
            activeLine: 15,
            log: `Checking if ${arr[j]} is less than pivot ${pivot}.`
          });

          if (arr[j] < pivot) {
            i++;
            
            // Swap
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            
            if (i !== j) {
              states.push({
                array: [...arr],
                activeIndices: [i, j],
                swapping: true,
                pointers: { i, j, pivot: high },
                doneIndices: Array.from(doneIndices),
                activeLine: 18,
                log: `Swapped elements ${arr[i]} and ${arr[j]}.`
              });
            }
          }
        }
        
        // Swap pivot
        let temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        states.push({
          array: [...arr],
          activeIndices: [i + 1, high],
          swapping: true,
          pointers: { pivotLoc: i + 1 },
          doneIndices: Array.from(doneIndices),
          activeLine: 25,
          log: `Placed pivot ${pivot} into its correct sorted position.`
        });
        
        doneIndices.add(i + 1);
        
        let pi = i + 1;
        doQuickSort(low, pi - 1);
        doQuickSort(pi + 1, high);
      } else if (low === high) {
        doneIndices.add(low);
      }
    };

    doQuickSort(0, arr.length - 1);

    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: arr.map((_, i) => i),
      activeLine: 7,
      log: "Quick Sort Complete!"
    });

    return states;
  }
};
