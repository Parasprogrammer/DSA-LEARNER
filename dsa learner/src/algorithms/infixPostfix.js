export const infixPostfixConfig = {
  name: "Infix to Postfix",
  type: "buckets",
  xpReward: 65,
  description: "Converts a standard mathematical expression (Infix) into Reverse Polish Notation (Postfix) using a Stack to hold operators.",
  complexity: {
    time: "O(N)",
    space: "O(N)"
  },
  code: `function infixToPostfix(s) {
  let output = [];
  let stack = [];
  let prec = { '+': 1, '-': 1, '*': 2, '/': 2 };
  
  for (let char of s) {
    if (/[A-Z]/.test(char)) {
      output.push(char);
    } else if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      while (stack.length && stack[stack.length-1] !== '(')
        output.push(stack.pop());
      stack.pop();
    } else {
      while (stack.length && prec[char] <= prec[stack[stack.length-1]])
        output.push(stack.pop());
      stack.push(char);
    }
  }
  while (stack.length) output.push(stack.pop());
  return output.join('');
}`,
  generateStates: () => {
    const states = [];
    const arr = ['A', '+', 'B', '*', 'C'];
    
    // Buckets: index 0 = Output, index 1 = Stack
    states.push({
      array: [...arr],
      buckets: [[], []], 
      activeIndices: [],
      activeBuckets: [],
      activeLine: 2,
      log: "Initialized Empty Output (B0) and Operator Stack (B1)."
    });

    let output = [];
    let stack = [];
    let prec = { '+': 1, '-': 1, '*': 2, '/': 2 };

    for (let i = 0; i < arr.length; i++) {
      let char = arr[i];
      let tempArr = [...arr];
      tempArr[i] = null; // disappearing from input
      
      states.push({
        array: [...arr],
        buckets: [[...output], [...stack]],
        activeIndices: [i],
        activeBuckets: [],
        activeLine: 6,
        log: `Reading character '${char}'.`
      });

      if (/[A-Z]/.test(char)) {
        output.push(char);
        states.push({
          array: [...tempArr],
          buckets: [[...output], [...stack]],
          activeIndices: [i],
          activeBuckets: [0],
          activeLine: 8,
          log: `'${char}' is an operand. Appended directly to Output (B0).`
        });
      } else {
        // Simple operator logic for visualizer (assuming no parens in this example for brevity)
        while (stack.length && prec[char] <= prec[stack[stack.length-1]]) {
          let popped = stack.pop();
          output.push(popped);
          states.push({
             array: [...tempArr],
             buckets: [[...output], [...stack]],
             activeIndices: [],
             activeBuckets: [0, 1],
             activeLine: 17,
             log: `Operator '${char}' has <= precedence than '${popped}'. Popped '${popped}' to Output.`
          });
        }
        stack.push(char);
        states.push({
          array: [...tempArr],
          buckets: [[...output], [...stack]],
          activeIndices: [i],
          activeBuckets: [1],
          activeLine: 18,
          log: `Pushed operator '${char}' onto the Stack (B1).`
        });
      }
    }

    while (stack.length) {
      let popped = stack.pop();
      output.push(popped);
      states.push({
         array: Array(arr.length).fill(null),
         buckets: [[...output], [...stack]],
         activeIndices: [],
         activeBuckets: [0, 1],
         activeLine: 21,
         log: `Popping remaining operator '${popped}' from Stack to Output.`
      });
    }

    states.push({
      array: Array(arr.length).fill(null),
      buckets: [[...output], [...stack]],
      activeIndices: [],
      activeBuckets: [],
      activeLine: 22,
      log: `Complete! Postfix expression: ${output.join('')}`
    });

    return states;
  }
};
