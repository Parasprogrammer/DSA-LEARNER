export const linearSearchConfig = {
  name: "Linear Search",
  type: "array",
  xpReward: 20,
  description: "Linear search sequentially checks each element of the list until a match is found or the whole list has been searched.",
  complexity: {
    time: "O(N)",
    space: "O(1)"
  },
  code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Target found
    }
  }
  return -1; // Target not found
}`,
  generateStates: () => {
    const states = [];
    const arr = [12, 45, 7, 23, 9, 88, 34];
    const target = 88;
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 1,
      log: `Starting Linear Search. Looking for target: ${target}`
    });

    for (let i = 0; i < arr.length; i++) {
      states.push({
        array: [...arr],
        activeIndices: [i],
        pointers: { i },
        doneIndices: [],
        activeLine: 3,
        log: `Checking if element at index ${i} (${arr[i]}) equals ${target}.`
      });

      if (arr[i] === target) {
        states.push({
          array: [...arr],
          activeIndices: [i],
          pointers: { found: i },
          doneIndices: [i],
          activeLine: 4,
          log: `Target ${target} found at index ${i}! Search complete.`
        });
        return states;
      }
    }

    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 7,
      log: `Target ${target} not found in the array.`
    });

    return states;
  }
};
