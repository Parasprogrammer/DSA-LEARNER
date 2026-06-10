export const kadanesConfig = {
  name: "Kadane's Algorithm",
  type: "array",
  xpReward: 60,
  description: "Kadane's algorithm is an iterative dynamic programming algorithm that calculates the maximum sum subarray ending at a particular position.",
  complexity: {
    time: "O(N)",
    space: "O(1)"
  },
  code: `function maxSubArraySum(arr) {
  let maxSoFar = arr[0];
  let currentMax = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    currentMax = Math.max(arr[i], currentMax + arr[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }
  
  return maxSoFar;
}`,
  generateStates: () => {
    const states = [];
    const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 2,
      log: `Starting Kadane's Algorithm to find maximum contiguous subarray sum.`
    });

    let maxSoFar = arr[0];
    let currentMax = arr[0];

    states.push({
      array: [...arr],
      activeIndices: [0],
      pointers: { i: 0 },
      doneIndices: [],
      activeLine: 3,
      log: `Initialized maxSoFar = ${maxSoFar} and currentMax = ${currentMax} (using arr[0]).`
    });

    for (let i = 1; i < arr.length; i++) {
      let prevCurrentMax = currentMax;
      let newCurrentMax = Math.max(arr[i], currentMax + arr[i]);
      
      states.push({
        array: [...arr],
        activeIndices: [i],
        pointers: { i },
        doneIndices: [],
        activeLine: 6,
        log: `Comparing arr[${i}] (${arr[i]}) with currentMax + arr[${i}] (${prevCurrentMax + arr[i]}).`
      });

      currentMax = newCurrentMax;

      if (arr[i] > prevCurrentMax + arr[i]) {
        states.push({
          array: [...arr],
          activeIndices: [i],
          pointers: { restart: i },
          doneIndices: [],
          activeLine: 6,
          log: `Better to start a new subarray here! currentMax is now ${currentMax}.`
        });
      } else {
        states.push({
          array: [...arr],
          activeIndices: [i-1, i], // conceptually extending
          pointers: { extend: i },
          doneIndices: [],
          activeLine: 6,
          log: `Extending subarray. currentMax is now ${currentMax}.`
        });
      }

      if (currentMax > maxSoFar) {
        maxSoFar = currentMax;
        states.push({
          array: [...arr],
          activeIndices: [i],
          pointers: { newMax: i },
          doneIndices: [],
          activeLine: 7,
          log: `New global max found! maxSoFar is now ${maxSoFar}.`
        });
      } else {
        states.push({
          array: [...arr],
          activeIndices: [i],
          pointers: { i },
          doneIndices: [],
          activeLine: 7,
          log: `Global maxSoFar remains ${maxSoFar}.`
        });
      }
    }

    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: arr.map((_, i) => i),
      activeLine: 10,
      log: `Algorithm complete. Maximum contiguous subarray sum is ${maxSoFar}.`
    });

    return states;
  }
};
