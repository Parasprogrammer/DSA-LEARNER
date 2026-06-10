export const climbingStairsConfig = {
  name: "Climbing Stairs (DP)",
  type: "array",
  xpReward: 100,
  description: "Finds the number of distinct ways to climb n stairs, given you can climb 1 or 2 steps at a time. It maps to the Fibonacci sequence.",
  complexity: { time: "O(N)", space: "O(N)" },
  code: `function climbStairs(n) {
  if (n <= 2) return n;
  let dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}`,
  generateStates: () => {
    const states = [];
    const n = 7;
    let dp = new Array(n + 1).fill('');
    dp[0] = '-';
    
    states.push({
      array: [...dp], activeIndices: [], pointers: {}, activeLine: 3,
      log: `Initialized DP array for ${n} stairs.`
    });

    dp[1] = 1;
    states.push({
      array: [...dp], activeIndices: [1], doneIndices: [1], pointers: {}, activeLine: 4,
      log: "Base case: 1 way to climb 1 stair."
    });

    dp[2] = 2;
    states.push({
      array: [...dp], activeIndices: [2], doneIndices: [1, 2], pointers: {}, activeLine: 5,
      log: "Base case: 2 ways to climb 2 stairs."
    });

    let done = [1, 2];
    for (let i = 3; i <= n; i++) {
      states.push({
        array: [...dp], activeIndices: [i], swapping: true, pointers: { i, 'i-1': i-1, 'i-2': i-2 }, activeLine: 8,
        log: `Ways to reach step ${i} = ways to reach step ${i-1} + ways to reach step ${i-2}.`
      });
      
      dp[i] = dp[i-1] + dp[i-2];
      done.push(i);
      
      states.push({
        array: [...dp], activeIndices: [i], doneIndices: [...done], pointers: { i }, activeLine: 8,
        log: `dp[${i}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}.`
      });
    }

    states.push({
      array: [...dp], activeIndices: [], doneIndices: done, pointers: {}, activeLine: 11,
      log: `Completed! There are ${dp[n]} distinct ways to climb ${n} stairs.`
    });

    return states;
  }
};
