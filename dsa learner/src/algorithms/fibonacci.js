export const fibonacciConfig = {
  name: "Fibonacci (DP)",
  type: "array",
  xpReward: 100,
  description: "Calculates the Nth Fibonacci number using a bottom-up Dynamic Programming approach to avoid redundant calculations.",
  complexity: { time: "O(N)", space: "O(N)" },
  code: `function fibonacci(n) {
  if (n <= 1) return n;
  let dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}`,
  generateStates: () => {
    const states = [];
    const n = 8;
    let dp = new Array(n + 1).fill('');
    
    states.push({
      array: [...dp], activeIndices: [], pointers: {}, activeLine: 3,
      log: `Initialized DP array of size ${n+1}.`
    });

    dp[0] = 0;
    states.push({
      array: [...dp], activeIndices: [0], doneIndices: [0], pointers: {}, activeLine: 4,
      log: "Base case: dp[0] = 0"
    });

    dp[1] = 1;
    states.push({
      array: [...dp], activeIndices: [1], doneIndices: [0, 1], pointers: {}, activeLine: 5,
      log: "Base case: dp[1] = 1"
    });

    let done = [0, 1];
    for (let i = 2; i <= n; i++) {
      states.push({
        array: [...dp], activeIndices: [i], swapping: true, pointers: { i, 'i-1': i-1, 'i-2': i-2 }, activeLine: 8,
        log: `Calculating dp[${i}] = dp[${i-1}] + dp[${i-2}] (${dp[i-1]} + ${dp[i-2]})`
      });
      
      dp[i] = dp[i-1] + dp[i-2];
      done.push(i);
      
      states.push({
        array: [...dp], activeIndices: [i], doneIndices: [...done], pointers: { i }, activeLine: 8,
        log: `dp[${i}] is now ${dp[i]}.`
      });
    }

    states.push({
      array: [...dp], activeIndices: [], doneIndices: done, pointers: {}, activeLine: 11,
      log: `Completed! The ${n}th Fibonacci number is ${dp[n]}.`
    });

    return states;
  }
};
