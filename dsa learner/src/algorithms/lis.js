export const lisConfig = {
  name: "Longest Increasing Subsequence",
  type: "array",
  xpReward: 120,
  description: "Finds the length of the longest strictly increasing subsequence in an array.",
  complexity: { time: "O(N²)", space: "O(N)" },
  code: `function lengthOfLIS(nums) {
  let n = nums.length;
  let dp = new Array(n).fill(1);
  
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  
  return Math.max(...dp);
}`,
  generateStates: () => {
    const states = [];
    const nums = [10, 9, 2, 5, 3, 7, 101, 18];
    const n = nums.length;
    let dp = new Array(n).fill(1);
    
    let array = nums.map((val, idx) => `${val}\n[1]`);

    states.push({
      array: [...array], activeIndices: [], pointers: {}, activeLine: 3,
      log: `nums = [${nums.join(', ')}]\nInitialized dp array with all 1s (each element is an LIS of length 1).`
    });

    let maxLis = 1;

    for (let i = 1; i < n; i++) {
      states.push({
        array: [...array], activeIndices: [i], pointers: { i }, activeLine: 5,
        log: `Checking nums[${i}] = ${nums[i]}`
      });

      for (let j = 0; j < i; j++) {
        states.push({
          array: [...array], activeIndices: [i], swapping: true, pointers: { i, j }, activeLine: 7,
          log: `Comparing nums[i]=${nums[i]} with nums[j]=${nums[j]}`
        });

        if (nums[i] > nums[j]) {
          if (dp[j] + 1 > dp[i]) {
            dp[i] = dp[j] + 1;
            array[i] = `${nums[i]}\n[${dp[i]}]`;
            states.push({
              array: [...array], activeIndices: [i, j], pointers: { i, j }, activeLine: 8,
              log: `nums[${i}] > nums[${j}]. Updated dp[${i}] to max(${dp[i]-1}, dp[${j}] + 1) = ${dp[i]}.`
            });
          } else {
             states.push({
              array: [...array], activeIndices: [i, j], pointers: { i, j }, activeLine: 8,
              log: `nums[${i}] > nums[${j}], but dp[${j}] + 1 <= dp[${i}]. No change.`
            });
          }
        } else {
           states.push({
              array: [...array], activeIndices: [i], pointers: { i, j }, activeLine: 7,
              log: `nums[${i}] <= nums[${j}]. Not an increasing sequence.`
            });
        }
      }
      maxLis = Math.max(maxLis, dp[i]);
    }

    states.push({
      array: [...array], activeIndices: [], pointers: {}, activeLine: 13,
      log: `Completed! The maximum LIS length is ${maxLis}.`
    });

    return states;
  }
};
