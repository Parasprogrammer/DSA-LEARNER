export const twoPointerConfig = {
  name: "Two Pointer Technique",
  type: "array",
  xpReward: 40,
  description: "The two-pointer technique uses two pointers to iterate through a data structure, usually a sorted array, from opposite ends to find pairs or solve problems optimally.",
  complexity: {
    time: "O(N)",
    space: "O(1)"
  },
  code: `function twoSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    let sum = arr[left] + arr[right];
    
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return null;
}`,
  generateStates: () => {
    const states = [];
    const arr = [2, 7, 11, 15, 18, 21];
    const target = 26; // 11 + 15
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 1,
      log: `Starting Two Pointer search. Target sum is ${target}.`
    });

    let left = 0;
    let right = arr.length - 1;

    states.push({
      array: [...arr],
      activeIndices: [left, right],
      pointers: { left, right },
      doneIndices: [],
      activeLine: 3,
      log: `Initialized left pointer at 0, right pointer at ${right}.`
    });

    while (left < right) {
      let sum = arr[left] + arr[right];
      
      states.push({
        array: [...arr],
        activeIndices: [left, right],
        pointers: { left, right },
        doneIndices: [],
        activeLine: 6,
        log: `Checking sum: ${arr[left]} + ${arr[right]} = ${sum}.`
      });

      if (sum === target) {
        states.push({
          array: [...arr],
          activeIndices: [left, right],
          pointers: { found: left, found2: right },
          doneIndices: [left, right],
          activeLine: 9,
          log: `Found target sum ${target} at indices ${left} and ${right}!`
        });
        return states;
      } else if (sum < target) {
        states.push({
          array: [...arr],
          activeIndices: [left, right],
          pointers: { left, right },
          doneIndices: [],
          activeLine: 11,
          log: `Sum ${sum} is less than ${target}. Incrementing left pointer to increase sum.`
        });
        left++;
      } else {
        states.push({
          array: [...arr],
          activeIndices: [left, right],
          pointers: { left, right },
          doneIndices: [],
          activeLine: 13,
          log: `Sum ${sum} is greater than ${target}. Decrementing right pointer to decrease sum.`
        });
        right--;
      }
    }

    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 16,
      log: `No pair found that sums to ${target}.`
    });

    return states;
  }
};
