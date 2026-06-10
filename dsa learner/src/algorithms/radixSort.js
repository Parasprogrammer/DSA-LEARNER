export const radixSortConfig = {
  name: "Radix Sort",
  type: "buckets",
  xpReward: 80,
  description: "Radix Sort is a non-comparative sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value.",
  complexity: {
    time: "O(d * (N + K))",
    space: "O(N + K)"
  },
  code: `function radixSort(arr) {
  let max = Math.max(...arr);
  
  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  return arr;
}

function countingSortByDigit(arr, exp) {
  let output = new Array(arr.length);
  let buckets = Array.from({length: 10}, () => []);
  
  // Scatter
  for (let i = 0; i < arr.length; i++) {
    let digit = Math.floor(arr[i] / exp) % 10;
    buckets[digit].push(arr[i]);
  }
  
  // Gather
  let index = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      arr[index++] = buckets[i][j];
    }
  }
}`,
  generateStates: () => {
    const states = [];
    const initialArr = [170, 45, 75, 90, 802, 24, 2, 66];
    let arr = [...initialArr];
    const max = Math.max(...arr);
    
    states.push({
      array: [...arr],
      buckets: Array.from({length: 10}, () => []),
      activeIndices: [],
      activeBuckets: [],
      activeLine: 2,
      log: `Starting Radix Sort. Max element is ${max}.`
    });

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      let buckets = Array.from({length: 10}, () => []);
      
      states.push({
        array: [...arr],
        buckets: JSON.parse(JSON.stringify(buckets)),
        activeIndices: [],
        activeBuckets: [],
        activeLine: 5,
        log: `Sorting by digit place: ${exp}s place.`
      });
      
      // Scatter
      let tempArr = [...arr];
      for (let i = 0; i < arr.length; i++) {
        let digit = Math.floor(arr[i] / exp) % 10;
        buckets[digit].push(arr[i]);
        tempArr[i] = null;
        
        states.push({
          array: [...tempArr],
          buckets: JSON.parse(JSON.stringify(buckets)),
          activeIndices: [i],
          activeBuckets: [digit],
          activeLine: 18,
          log: `Element ${arr[i]} has digit ${digit} in ${exp}s place. Placed in Bucket ${digit}.`
        });
      }
      
      // Gather
      let index = 0;
      let finalArr = Array(arr.length).fill(null);
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
          arr[index] = buckets[i][j];
          finalArr[index] = arr[index];
          
          let visBuckets = JSON.parse(JSON.stringify(buckets));
          visBuckets[i] = visBuckets[i].slice(j + 1);
          
          states.push({
            array: [...finalArr],
            buckets: visBuckets,
            activeIndices: [index],
            activeBuckets: [i],
            activeLine: 26,
            log: `Gathered ${arr[index]} from Bucket ${i}.`
          });
          index++;
        }
      }
    }

    states.push({
      array: [...arr],
      buckets: Array.from({length: 10}, () => []),
      activeIndices: [],
      activeBuckets: [],
      activeLine: 8,
      log: "Radix Sort Complete!"
    });

    return states;
  }
};
