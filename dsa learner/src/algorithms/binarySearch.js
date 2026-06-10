export const binarySearchConfig = {
  name: "Binary Search",
  type: "array",
  xpReward: 40,
  description: "Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
  complexity: {
    time: "O(log N)",
    space: "O(1)"
  },
  code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    }
    
    if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  return -1; // Target not found
}`,
  generateStates: () => {
    const states = [];
    const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
    const target = 23;
    let left = 0;
    let right = arr.length - 1;
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: { left, right },
      doneIndices: [],
      activeLine: 2,
      log: `Searching for target: ${target} in a sorted array of length ${arr.length}`
    });

    let found = false;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      
      states.push({
        array: [...arr],
        activeIndices: [mid],
        pointers: { left, right, mid },
        doneIndices: [],
        activeLine: 6,
        log: `Calculated mid index = ${mid}. Value at mid is ${arr[mid]}.`
      });

      if (arr[mid] === target) {
        states.push({
          array: [...arr],
          activeIndices: [mid],
          swapping: true, // we use swapping class for a visual pop when found
          pointers: { left, right, mid },
          doneIndices: [mid],
          activeLine: 8,
          log: `Target ${target} found at index ${mid}!`
        });
        found = true;
        break;
      }
      
      if (arr[mid] < target) {
        states.push({
          array: [...arr],
          activeIndices: [mid],
          pointers: { left, right, mid },
          doneIndices: [],
          activeLine: 12,
          log: `${arr[mid]} is less than ${target}. Searching the right half.`
        });
        left = mid + 1;
      } else {
        states.push({
          array: [...arr],
          activeIndices: [mid],
          pointers: { left, right, mid },
          doneIndices: [],
          activeLine: 14,
          log: `${arr[mid]} is greater than ${target}. Searching the left half.`
        });
        right = mid - 1;
      }
    }
    
    if (!found) {
      states.push({
        array: [...arr],
        activeIndices: [],
        pointers: { left, right },
        doneIndices: [],
        activeLine: 17,
        log: `Target ${target} not found in the array.`
      });
    }

    return states;
  }
};
