export const bucketSortConfig = {
  name: "Bucket Sort",
  type: "buckets",
  xpReward: 60,
  description: "Bucket Sort distributes elements into a number of buckets. Each bucket is then sorted individually. It is mainly useful when input is uniformly distributed over a range.",
  complexity: {
    time: "O(N + K)",
    space: "O(N + K)"
  },
  code: `function bucketSort(arr) {
  if (arr.length === 0) return arr;
  
  // Find max to determine bucket scale (assuming elements 0-99)
  let max = Math.max(...arr);
  let bucketCount = 10;
  let buckets = Array.from({length: bucketCount}, () => []);
  
  // Scatter
  for (let i = 0; i < arr.length; i++) {
    let bucketIndex = Math.floor((arr[i] / (max + 1)) * bucketCount);
    buckets[bucketIndex].push(arr[i]);
  }
  
  // Sort buckets & Gather
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    buckets[i].sort((a, b) => a - b);
    for (let j = 0; j < buckets[i].length; j++) {
      arr[index++] = buckets[i][j];
    }
  }
  return arr;
}`,
  generateStates: () => {
    const states = [];
    const initialArr = [78, 17, 39, 26, 72, 94, 21, 12, 23, 68];
    const arr = [...initialArr];
    const bucketCount = 10;
    const max = Math.max(...arr);
    
    // Initialize empty buckets
    let buckets = Array.from({length: bucketCount}, () => []);
    
    states.push({
      array: [...arr],
      buckets: JSON.parse(JSON.stringify(buckets)),
      activeIndices: [],
      activeBuckets: [],
      activeLine: 7,
      log: `Initialized ${bucketCount} empty buckets.`
    });

    // Scatter
    for (let i = 0; i < arr.length; i++) {
      let bucketIndex = Math.floor((arr[i] / (max + 1)) * bucketCount);
      buckets[bucketIndex].push(arr[i]);
      
      let tempArr = [...arr];
      tempArr[i] = null; // show it leaving the array
      
      states.push({
        array: [...tempArr],
        buckets: JSON.parse(JSON.stringify(buckets)),
        activeIndices: [i],
        activeBuckets: [bucketIndex],
        activeLine: 12,
        log: `Scattered ${arr[i]} into Bucket ${bucketIndex}.`
      });
    }

    // Sort buckets
    for (let i = 0; i < bucketCount; i++) {
      if (buckets[i].length > 1) {
        buckets[i].sort((a, b) => a - b);
        states.push({
          array: Array(arr.length).fill(null),
          buckets: JSON.parse(JSON.stringify(buckets)),
          activeIndices: [],
          activeBuckets: [i],
          activeLine: 18,
          log: `Sorted elements inside Bucket ${i}.`
        });
      }
    }

    // Gather
    let index = 0;
    let finalArr = Array(arr.length).fill(null);
    for (let i = 0; i < bucketCount; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        finalArr[index] = buckets[i][j];
        
        // Remove from bucket for visual effect
        let visBuckets = JSON.parse(JSON.stringify(buckets));
        visBuckets[i] = visBuckets[i].slice(j + 1);
        
        states.push({
          array: [...finalArr],
          buckets: visBuckets,
          activeIndices: [index],
          activeBuckets: [i],
          activeLine: 20,
          log: `Gathered ${finalArr[index]} from Bucket ${i} back into the main array.`
        });
        index++;
      }
    }

    states.push({
      array: [...finalArr],
      buckets: Array.from({length: bucketCount}, () => []),
      activeIndices: [],
      activeBuckets: [],
      activeLine: 23,
      log: "Bucket Sort Complete!"
    });

    return states;
  }
};
