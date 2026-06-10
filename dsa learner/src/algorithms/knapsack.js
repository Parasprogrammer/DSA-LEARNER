export const knapsackConfig = {
  name: "0/1 Knapsack",
  type: "grid",
  xpReward: 150,
  description: "Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value. You cannot break an item, either pick it (1) or don't pick it (0).",
  complexity: { time: "O(N * W)", space: "O(N * W)" },
  code: `function knapsack(W, wt, val, n) {
  let dp = Array(n + 1).fill().map(() => Array(W + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (wt[i - 1] <= w) {
        dp[i][w] = Math.max(
          val[i - 1] + dp[i - 1][w - wt[i - 1]], 
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  return dp[n][W];
}`,
  generateStates: () => {
    const states = [];
    const val = [60, 100, 120];
    const wt = [1, 2, 3];
    const W = 5;
    const n = val.length;
    
    let dp = Array(n + 1).fill().map(() => Array(W + 1).fill(''));
    let rowHeaders = ['Item 0 (0, $0)', ...wt.map((w, i) => `Item ${i+1} (${w}kg, $${val[i]})`)];
    let colHeaders = Array.from({length: W + 1}, (_, i) => `${i}kg`);

    for(let i=0; i<=n; i++) dp[i][0] = 0;
    for(let w=0; w<=W; w++) dp[0][w] = 0;

    states.push({
      grid: JSON.parse(JSON.stringify(dp)),
      rowHeaders, colHeaders, activeCells: [], comparingCells: [], pointers: {}, activeLine: 2,
      log: "Initialized DP table with 0s for base cases (0 items or 0 capacity)."
    });

    let doneCells = [];
    for(let i=0; i<=n; i++) doneCells.push([i,0]);
    for(let w=1; w<=W; w++) doneCells.push([0,w]);

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= W; w++) {
        states.push({
          grid: JSON.parse(JSON.stringify(dp)),
          rowHeaders, colHeaders, activeCells: [[i, w]], comparingCells: [[i-1, w]], doneCells: [...doneCells], pointers: { curr: [i, w] }, activeLine: 6,
          log: `Evaluating Item ${i} (${wt[i-1]}kg) for Knapsack Capacity ${w}kg.`
        });

        if (wt[i - 1] <= w) {
          let pickVal = val[i - 1] + dp[i - 1][w - wt[i - 1]];
          let noPickVal = dp[i - 1][w];
          
          states.push({
            grid: JSON.parse(JSON.stringify(dp)),
            rowHeaders, colHeaders, 
            activeCells: [[i, w]], 
            comparingCells: [[i-1, w], [i-1, w - wt[i-1]]], 
            doneCells: [...doneCells], 
            pointers: { curr: [i, w], 'no-pick': [i-1, w], 'pick': [i-1, w - wt[i-1]] }, 
            activeLine: 7,
            log: `Item can fit! Max of (No Pick: $${noPickVal}) OR (Pick: $${val[i-1]} + $${dp[i - 1][w - wt[i - 1]]} = $${pickVal}).`
          });
          
          dp[i][w] = Math.max(pickVal, noPickVal);
          doneCells.push([i, w]);
          
          states.push({
            grid: JSON.parse(JSON.stringify(dp)),
            rowHeaders, colHeaders, activeCells: [[i, w]], comparingCells: [], doneCells: [...doneCells], pointers: { curr: [i, w] }, activeLine: 10,
            log: `Stored $${dp[i][w]} in dp[${i}][${w}].`
          });
        } else {
          dp[i][w] = dp[i - 1][w];
          doneCells.push([i, w]);
          
          states.push({
            grid: JSON.parse(JSON.stringify(dp)),
            rowHeaders, colHeaders, activeCells: [[i, w]], comparingCells: [[i-1, w]], doneCells: [...doneCells], pointers: { curr: [i, w] }, activeLine: 13,
            log: `Item ${i} (${wt[i-1]}kg) exceeds capacity ${w}kg. Cannot pick. Inheriting $${dp[i-1][w]}.`
          });
        }
      }
    }

    states.push({
      grid: JSON.parse(JSON.stringify(dp)),
      rowHeaders, colHeaders, activeCells: [], comparingCells: [], doneCells: [...doneCells], pointers: {}, activeLine: 18,
      log: `Completed! Maximum value for capacity ${W}kg is $${dp[n][W]}.`
    });

    return states;
  }
};
