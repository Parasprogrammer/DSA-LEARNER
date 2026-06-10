export const mergeSortConfig = {
  name: "Merge Sort",
  type: "array",
  xpReward: 60,
  description: "Merge Sort is a divide-and-conquer algorithm that recursively divides an array into two halves, sorts them, and then merges the sorted halves back together.",
  complexity: {
    time: "O(N log N)",
    space: "O(N)"
  },
  code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
  generateStates: () => {
    const states = [];
    const arr = [8, 3, 5, 4, 7, 6, 1, 2];
    let stepCount = 0;
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 2,
      log: `Starting Merge Sort on array: [${arr.join(', ')}]`
    });

    // In-place simulation of merge sort for visualization
    const doMergeSort = (start, end) => {
      if (end - start <= 1) return;
      
      const mid = Math.floor((start + end) / 2);
      
      states.push({
        array: [...arr],
        activeIndices: [],
        pointers: { start, mid, end: end - 1 },
        doneIndices: [],
        activeLine: 4,
        log: `Dividing array at index ${mid}.`
      });

      doMergeSort(start, mid);
      doMergeSort(mid, end);
      
      // Merge
      states.push({
        array: [...arr],
        activeIndices: [],
        pointers: { left: start, right: mid },
        doneIndices: [],
        activeLine: 8,
        log: `Merging sub-arrays: indices ${start} to ${mid - 1} and ${mid} to ${end - 1}`
      });

      let merged = [];
      let i = start, j = mid;
      
      while (i < mid && j < end) {
        states.push({
          array: [...arr],
          activeIndices: [i, j],
          pointers: { i, j },
          doneIndices: [],
          activeLine: 16,
          log: `Comparing ${arr[i]} and ${arr[j]}`
        });

        if (arr[i] <= arr[j]) {
          merged.push(arr[i++]);
        } else {
          merged.push(arr[j++]);
        }
      }
      
      while (i < mid) merged.push(arr[i++]);
      while (j < end) merged.push(arr[j++]);
      
      // Copy back
      for (let k = 0; k < merged.length; k++) {
        arr[start + k] = merged[k];
        states.push({
          array: [...arr],
          activeIndices: [start + k],
          swapping: true,
          pointers: {},
          doneIndices: [],
          activeLine: 23,
          log: `Placed ${merged[k]} into the merged array at index ${start + k}.`
        });
      }
    };

    doMergeSort(0, arr.length);

    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: arr.map((_, i) => i),
      activeLine: 24,
      log: "Merge Sort Complete!"
    });

    return states;
  }
};
