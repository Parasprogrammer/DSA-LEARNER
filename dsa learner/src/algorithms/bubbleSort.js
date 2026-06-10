export const bubbleSortConfig = {
  name: "Bubble Sort",
  xpReward: 50,
  description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
  complexity: {
    time: "O(N²)",
    space: "O(1)"
  },
  code: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
  generateStates: () => {
    const states = [];
    const arr = [6, 3, 8, 5, 2, 7, 4, 1]; // visually un-sorted array
    let n = arr.length;
    const doneIndices = new Set();
    
    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 2,
      log: "Initialized array length n = 8"
    });

    for (let i = 0; i < n - 1; i++) {
      states.push({
        array: [...arr],
        activeIndices: [],
        pointers: { i },
        doneIndices: Array.from(doneIndices),
        activeLine: 3,
        log: `Starting outer loop i=${i}`
      });

      for (let j = 0; j < n - i - 1; j++) {
        states.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          pointers: { i, j },
          doneIndices: Array.from(doneIndices),
          activeLine: 4,
          log: `Comparing arr[${j}] (${arr[j]}) and arr[${j+1}] (${arr[j+1]})`
        });

        if (arr[j] > arr[j + 1]) {
          // Swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          states.push({
            array: [...arr],
            activeIndices: [j, j + 1],
            swapping: true,
            pointers: { i, j },
            doneIndices: Array.from(doneIndices),
            activeLine: 6,
            log: `Swapped ${arr[j+1]} and ${arr[j]}`
          });
        }
      }
      doneIndices.add(n - i - 1);
    }
    doneIndices.add(0);

    states.push({
      array: [...arr],
      activeIndices: [],
      pointers: {},
      doneIndices: Array.from(doneIndices),
      activeLine: 13,
      log: "Sorting complete!"
    });

    return states;
  }
};
