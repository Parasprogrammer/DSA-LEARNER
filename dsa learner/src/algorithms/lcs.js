export const lcsConfig = {
  name: "Longest Common Subsequence",
  type: "grid",
  xpReward: 150,
  description: "Finds the length of the longest subsequence present in both strings. Subsequences are not required to occupy consecutive positions within the original strings.",
  complexity: { time: "O(M * N)", space: "O(M * N)" },
  code: `function lcs(text1, text2) {
  let m = text1.length;
  let n = text2.length;
  let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}`,
  generateStates: () => {
    const states = [];
    const text1 = "abcde";
    const text2 = "ace";
    const m = text1.length;
    const n = text2.length;
    
    let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(''));
    let rowHeaders = ['Ø', ...text1.split('')];
    let colHeaders = ['Ø', ...text2.split('')];

    for(let i=0; i<=m; i++) dp[i][0] = 0;
    for(let j=0; j<=n; j++) dp[0][j] = 0;

    let doneCells = [];
    for(let i=0; i<=m; i++) doneCells.push([i,0]);
    for(let j=1; j<=n; j++) doneCells.push([0,j]);

    states.push({
      grid: JSON.parse(JSON.stringify(dp)),
      rowHeaders, colHeaders, activeCells: [], comparingCells: [], doneCells: [...doneCells], pointers: {}, activeLine: 4,
      log: "Initialized DP table with 0s for base cases (empty string comparisons)."
    });

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        states.push({
          grid: JSON.parse(JSON.stringify(dp)),
          rowHeaders, colHeaders, activeCells: [[i, j]], comparingCells: [], doneCells: [...doneCells], pointers: { curr: [i, j] }, activeLine: 7,
          log: `Comparing '${text1[i-1]}' and '${text2[j-1]}'.`
        });

        if (text1[i - 1] === text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          
          states.push({
            grid: JSON.parse(JSON.stringify(dp)),
            rowHeaders, colHeaders, activeCells: [[i, j]], comparingCells: [[i-1, j-1]], doneCells: [...doneCells], pointers: { curr: [i, j], 'diag': [i-1, j-1] }, activeLine: 8,
            log: `Match! '${text1[i-1]}' === '${text2[j-1]}'. dp[i][j] = diagonal (${dp[i-1][j-1]}) + 1 = ${dp[i][j]}.`
          });
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          
          states.push({
            grid: JSON.parse(JSON.stringify(dp)),
            rowHeaders, colHeaders, activeCells: [[i, j]], comparingCells: [[i-1, j], [i, j-1]], doneCells: [...doneCells], pointers: { curr: [i, j], 'up': [i-1, j], 'left': [i, j-1] }, activeLine: 10,
            log: `No match. dp[i][j] = max(up (${dp[i-1][j]}), left (${dp[i][j-1]})) = ${dp[i][j]}.`
          });
        }
        
        doneCells.push([i, j]);
        states.push({
            grid: JSON.parse(JSON.stringify(dp)),
            rowHeaders, colHeaders, activeCells: [], comparingCells: [], doneCells: [...doneCells], pointers: {}, activeLine: 12,
            log: `Saved ${dp[i][j]} at dp[${i}][${j}].`
        });
      }
    }

    states.push({
      grid: JSON.parse(JSON.stringify(dp)),
      rowHeaders, colHeaders, activeCells: [], comparingCells: [], doneCells: [...doneCells], pointers: {}, activeLine: 16,
      log: `Completed! The length of the LCS is ${dp[m][n]}.`
    });

    return states;
  }
};
