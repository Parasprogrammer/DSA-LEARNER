export const monotonicStackConfig = {
  name: "Monotonic Stack",
  type: "buckets",
  xpReward: 65,
  description: "A monotonic stack maintains its elements in a strictly increasing or decreasing order. It's incredibly powerful for O(N) span, next-greater, or histogram problems.",
  complexity: {
    time: "O(N)",
    space: "O(N)"
  },
  code: `function buildMonotonicDecreasing(arr) {
  let stack = [];
  
  for (let i = 0; i < arr.length; i++) {
    // Pop smaller elements to maintain decreasing order
    while (stack.length && stack[stack.length-1] < arr[i]) {
      stack.pop();
    }
    stack.push(arr[i]);
  }
  return stack;
}`,
  generateStates: () => {
    const states = [];
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];
    
    states.push({
      array: [...arr],
      buckets: [[]],
      activeIndices: [],
      activeBuckets: [],
      activeLine: 2,
      log: "Building a Monotonic Decreasing Stack. Elements must stay ordered largest to smallest."
    });

    let stack = [];

    for (let i = 0; i < arr.length; i++) {
      let tempArr = [...arr];
      
      states.push({
        array: [...tempArr],
        buckets: [[...stack]],
        activeIndices: [i],
        activeBuckets: [],
        activeLine: 4,
        log: `Current element is ${arr[i]}.`
      });

      while (stack.length && stack[stack.length-1] < arr[i]) {
        let popped = stack[stack.length-1];
        states.push({
          array: [...tempArr],
          buckets: [[...stack]],
          activeIndices: [i],
          activeBuckets: [0],
          pointers: { top: stack.length - 1 },
          activeLine: 6,
          log: `Stack top (${popped}) is smaller than ${arr[i]}. We must pop it to maintain monotonic decreasing order!`
        });
        
        stack.pop();
        
        states.push({
          array: [...tempArr],
          buckets: [[...stack]],
          activeIndices: [i],
          activeBuckets: [0],
          swapping: true,
          activeLine: 7,
          log: `Popped ${popped}.`
        });
      }
      
      stack.push(arr[i]);
      tempArr[i] = null;
      
      states.push({
        array: [...tempArr],
        buckets: [[...stack]],
        activeIndices: [i],
        activeBuckets: [0],
        activeLine: 9,
        log: `Pushed ${arr[i]} onto the stack. Monotonic property maintained.`
      });
    }

    states.push({
      array: Array(arr.length).fill(null),
      buckets: [[...stack]],
      activeIndices: [],
      activeBuckets: [],
      activeLine: 11,
      log: "Complete! The remaining elements form a strictly monotonic decreasing sequence."
    });

    return states;
  }
};
