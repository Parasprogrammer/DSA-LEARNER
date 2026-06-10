export const prefixSumConfig = {
  name: "Prefix Sum",
  type: "array",
  xpReward: 45,
  description: "A Prefix Sum array stores the cumulative sum of elements from the beginning up to the current index. It enables O(1) range sum queries.",
  complexity: {
    time: "O(N)",
    space: "O(N)"
  },
  code: `function buildPrefixSum(arr) {
  let prefix = new Array(arr.length);
  prefix[0] = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
  }
  
  return prefix;
}

// Query sum from index L to R
function querySum(prefix, L, R) {
  if (L === 0) return prefix[R];
  return prefix[R] - prefix[L - 1];
}`,
  generateStates: () => {
    const states = [];
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];
    
    // We will visualize both the original array and the prefix array in the buckets engine
    // Or we can just overwrite the array for simplicity to show the prefix sum building in-place.
    // Let's do in-place modification for visualization using the standard Array Visualizer.
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 2,
      log: `Starting Prefix Sum construction.`
    });

    let prefix = new Array(arr.length);
    prefix[0] = arr[0];
    
    let visArr = [...arr];

    states.push({
      array: [...visArr],
      activeIndices: [0],
      pointers: { i: 0 },
      doneIndices: [0],
      activeLine: 3,
      log: `prefix[0] = arr[0] = ${arr[0]}`
    });

    for (let i = 1; i < arr.length; i++) {
      states.push({
        array: [...visArr],
        activeIndices: [i - 1, i],
        pointers: { prev: i - 1, curr: i },
        doneIndices: Array.from({length: i}, (_, idx) => idx),
        activeLine: 6,
        log: `prefix[${i}] = prefix[${i-1}] (${prefix[i-1]}) + arr[${i}] (${arr[i]})`
      });

      prefix[i] = prefix[i - 1] + arr[i];
      visArr[i] = prefix[i]; // Update visualization array to show prefix sum

      states.push({
        array: [...visArr],
        activeIndices: [i],
        pointers: { i },
        swapping: true, // reuse this to show modification
        doneIndices: Array.from({length: i + 1}, (_, idx) => idx),
        activeLine: 6,
        log: `prefix[${i}] becomes ${prefix[i]}`
      });
    }

    states.push({
      array: [...visArr],
      activeIndices: [],
      pointers: {},
      doneIndices: visArr.map((_, i) => i),
      activeLine: 9,
      log: "Prefix Sum array construction complete! It can now answer range sum queries in O(1)."
    });

    return states;
  }
};
