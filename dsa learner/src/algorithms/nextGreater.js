export const nextGreaterConfig = {
  name: "Next Greater Element",
  type: "array",
  xpReward: 60,
  description: "Finds the first greater element to the right of each element in an array using a Stack to keep track of elements whose next greater is not yet found.",
  complexity: {
    time: "O(N)",
    space: "O(N)"
  },
  code: `function nextGreaterElement(arr) {
  let result = new Array(arr.length).fill(-1);
  let stack = []; // stores indices
  
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[stack[stack.length-1]] < arr[i]) {
      let idx = stack.pop();
      result[idx] = arr[i];
    }
    stack.push(i);
  }
  return result;
}`,
  generateStates: () => {
    const states = [];
    const arr = [4, 5, 2, 25];
    const result = new Array(arr.length).fill(-1);
    
    // For visualization, we'll show the result array in the bucket
    states.push({
      array: [...arr],
      buckets: [[...result]],
      activeIndices: [],
      activeBuckets: [],
      activeLine: 2,
      log: "Initialized result array with -1s in Bucket 0. Stack will track indices internally."
    });

    let stack = [];

    for (let i = 0; i < arr.length; i++) {
      states.push({
        array: [...arr],
        buckets: [[...result]],
        activeIndices: [i],
        pointers: { curr: i },
        activeBuckets: [],
        activeLine: 5,
        log: `Looking at element ${arr[i]}.`
      });

      while (stack.length && arr[stack[stack.length-1]] < arr[i]) {
        let idx = stack.pop();
        
        states.push({
          array: [...arr],
          buckets: [[...result]],
          activeIndices: [idx, i],
          pointers: { poppedIdx: idx, curr: i },
          activeBuckets: [],
          activeLine: 6,
          log: `Element ${arr[i]} is greater than ${arr[idx]}.`
        });

        result[idx] = arr[i];
        
        states.push({
          array: [...arr],
          buckets: [[...result]],
          activeIndices: [idx, i],
          pointers: { curr: i },
          activeBuckets: [0],
          swapping: true,
          activeLine: 8,
          log: `Set result[${idx}] to ${arr[i]}.`
        });
      }
      
      stack.push(i);
      states.push({
        array: [...arr],
        buckets: [[...result]],
        activeIndices: [i],
        pointers: { curr: i, stackTop: i },
        activeBuckets: [],
        activeLine: 10,
        log: `Pushed index ${i} onto the internal stack.`
      });
    }

    states.push({
      array: [...arr],
      buckets: [[...result]],
      activeIndices: [],
      pointers: {},
      activeBuckets: [],
      doneIndices: arr.map((_, i) => i),
      activeLine: 12,
      log: "Algorithm Complete! Bucket 0 shows the Next Greater Elements."
    });

    return states;
  }
};
