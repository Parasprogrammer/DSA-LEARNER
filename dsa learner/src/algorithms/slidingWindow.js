export const slidingWindowConfig = {
  name: "Sliding Window",
  type: "array",
  xpReward: 50,
  description: "The Sliding Window technique is used to perform operations on a specific window size of a given array, such as finding the maximum sum of a subarray of size K.",
  complexity: {
    time: "O(N)",
    space: "O(1)"
  },
  code: `function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // Calculate initial window sum
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}`,
  generateStates: () => {
    const states = [];
    const arr = [2, 1, 5, 1, 3, 2];
    const k = 3;
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 2,
      log: `Starting Sliding Window to find max sum subarray of size K=${k}.`
    });

    let maxSum = 0;
    let windowSum = 0;
    
    // Initial window
    let initialIndices = [];
    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
      initialIndices.push(i);
      
      states.push({
        array: [...arr],
        activeIndices: [...initialIndices],
        pointers: { i },
        doneIndices: [],
        activeLine: 7,
        log: `Building initial window. Adding ${arr[i]}. Current window sum: ${windowSum}.`
      });
    }
    maxSum = windowSum;

    states.push({
      array: [...arr],
      activeIndices: [...initialIndices],
      pointers: { window: "initial" },
      doneIndices: [],
      activeLine: 9,
      log: `Initial window sum is ${maxSum}. Setting maxSum = ${maxSum}.`
    });

    // Slide window
    for (let i = k; i < arr.length; i++) {
      let removeIdx = i - k;
      let addIdx = i;
      
      states.push({
        array: [...arr],
        activeIndices: [removeIdx, addIdx],
        pointers: { left: removeIdx, right: addIdx },
        doneIndices: [],
        activeLine: 13,
        log: `Sliding window. Removing ${arr[removeIdx]} and adding ${arr[addIdx]}.`
      });
      
      windowSum = windowSum - arr[removeIdx] + arr[addIdx];
      
      let windowIndices = [];
      for(let w = removeIdx + 1; w <= addIdx; w++) windowIndices.push(w);

      states.push({
        array: [...arr],
        activeIndices: windowIndices,
        pointers: {},
        doneIndices: [],
        activeLine: 14,
        log: `New window sum is ${windowSum}. Current maxSum is ${maxSum}.`
      });

      if (windowSum > maxSum) {
        maxSum = windowSum;
        states.push({
          array: [...arr],
          activeIndices: windowIndices,
          pointers: { newMax: "!" },
          doneIndices: [],
          activeLine: 14,
          log: `Updated maxSum to ${maxSum}.`
        });
      }
    }

    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: arr.map((_, i) => i), // Light up everything
      activeLine: 17,
      log: `Completed! The maximum subarray sum of size ${k} is ${maxSum}.`
    });

    return states;
  }
};
