export const balancedParensConfig = {
  name: "Balanced Parentheses",
  type: "buckets",
  xpReward: 50,
  description: "A classic stack problem. We push opening brackets onto the stack. When we see a closing bracket, we pop from the stack and check if it matches the closing bracket.",
  complexity: {
    time: "O(N)",
    space: "O(N)"
  },
  code: `function isValid(s) {
  let stack = [];
  let map = { ')': '(', '}': '{', ']': '[' };
  
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`,
  generateStates: () => {
    const states = [];
    const s = "{ [ ( ) ] }";
    const arr = s.split(' ').filter(c => c !== '');
    
    states.push({
      array: [...arr],
      buckets: [[]],
      activeIndices: [],
      activeBuckets: [],
      activeLine: 2,
      log: "Initialized empty stack. Array represents our expression string."
    });

    let stack = [];
    let map = { ')': '(', '}': '{', ']': '[' };
    
    for (let i = 0; i < arr.length; i++) {
      let char = arr[i];
      let tempArr = [...arr];
      
      states.push({
        array: [...tempArr],
        buckets: [[...stack]],
        activeIndices: [i],
        activeBuckets: [],
        activeLine: 6,
        log: `Reading character '${char}'.`
      });

      if (char === '(' || char === '{' || char === '[') {
        stack.push(char);
        tempArr[i] = null; // show it moving to stack
        
        states.push({
          array: [...tempArr],
          buckets: [[...stack]],
          activeIndices: [i],
          activeBuckets: [0],
          activeLine: 8,
          log: `'${char}' is an opening bracket. Pushed to stack.`
        });
      } else {
        if (stack.length === 0) {
          states.push({
            array: [...tempArr],
            buckets: [[...stack]],
            activeIndices: [i],
            activeBuckets: [0],
            activeLine: 11,
            log: `Found closing bracket '${char}', but stack is empty! Invalid.`
          });
          return states;
        }
        
        let popped = stack.pop();
        
        states.push({
          array: [...tempArr],
          buckets: [[...stack, popped]], // show it before disappearing
          activeIndices: [i],
          activeBuckets: [0],
          pointers: { popped },
          activeLine: 10,
          log: `Found closing bracket '${char}'. Popped '${popped}' from stack.`
        });

        if (popped !== map[char]) {
          states.push({
            array: [...tempArr],
            buckets: [[...stack]],
            activeIndices: [i],
            activeBuckets: [0],
            activeLine: 11,
            log: `'${popped}' does not match '${char}'! Invalid.`
          });
          return states;
        } else {
           states.push({
            array: [...tempArr],
            buckets: [[...stack]],
            activeIndices: [],
            activeBuckets: [0],
            activeLine: 10,
            log: `'${popped}' matches '${char}'! Valid pair.`
          });
        }
      }
    }

    if (stack.length === 0) {
      states.push({
        array: Array(arr.length).fill(null),
        buckets: [[]],
        activeIndices: [],
        activeBuckets: [],
        activeLine: 15,
        log: "String fully parsed and stack is empty. Expression is VALID!"
      });
    }

    return states;
  }
};
