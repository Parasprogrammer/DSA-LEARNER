export const arrayReversalConfig = {
  name: "Array Reversal",
  xpReward: 30,
  description: "Reversing an array is achieved by maintaining two pointers (left and right) at opposite ends of the array. The elements at these pointers are swapped, and the pointers move towards the center until they meet.",
  complexity: {
    time: "O(N)",
    space: "O(1)"
  },
  code: `function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    
    left++;
    right--;
  }
  return arr;
}`,
  generateStates: () => {
    const states = [];
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    let left = 0;
    let right = arr.length - 1;
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: { left, right },
      doneIndices: [],
      activeLine: 2,
      log: "Initialized left and right pointers"
    });

    const doneIndices = new Set();

    while (left < right) {
      states.push({
        array: [...arr],
        activeIndices: [left, right],
        pointers: { left, right },
        doneIndices: Array.from(doneIndices),
        activeLine: 5,
        log: `Ready to swap elements at ${left} and ${right}`
      });

      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;

      states.push({
        array: [...arr],
        activeIndices: [left, right],
        swapping: true,
        pointers: { left, right },
        doneIndices: Array.from(doneIndices),
        activeLine: 6,
        log: `Swapped elements to get ${arr[left]} and ${arr[right]}`
      });

      doneIndices.add(left);
      doneIndices.add(right);

      left++;
      right--;
    }
    
    if (left === right) doneIndices.add(left);
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: { left, right },
      doneIndices: Array.from(doneIndices),
      activeLine: 12,
      log: "Reversal complete!"
    });

    return states;
  }
};
