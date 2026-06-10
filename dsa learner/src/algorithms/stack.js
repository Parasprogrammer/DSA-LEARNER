export const stackConfig = {
  name: "Stack (LIFO)",
  type: "array",
  xpReward: 35,
  description: "A Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements can only be added (pushed) or removed (popped) from the top.",
  complexity: {
    time: "O(1) Push/Pop",
    space: "O(N)"
  },
  code: `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.items.length === 0) return "Underflow";
    return this.items.pop();
  }
}

// Simulation
let s = new Stack();
s.push(10);
s.push(20);
s.push(30);
s.pop();
s.push(40);`,
  generateStates: () => {
    const states = [];
    const arr = [];
    
    // Initial state
    states.push({
      array: [...arr],
      orientation: 'vertical',
      pointers: {},
      activeLine: 18,
      log: "Stack is empty."
    });

    // push 10
    arr.push(10);
    states.push({
      array: [...arr],
      orientation: 'vertical',
      pointers: { top: arr.length - 1 },
      activeIndices: [arr.length - 1],
      activeLine: 19,
      log: "Pushed 10 onto the stack. Top is now pointing to 10."
    });

    // push 20
    arr.push(20);
    states.push({
      array: [...arr],
      orientation: 'vertical',
      pointers: { top: arr.length - 1 },
      activeIndices: [arr.length - 1],
      activeLine: 20,
      log: "Pushed 20 onto the stack. Top moves up."
    });

    // push 30
    arr.push(30);
    states.push({
      array: [...arr],
      orientation: 'vertical',
      pointers: { top: arr.length - 1 },
      activeIndices: [arr.length - 1],
      activeLine: 21,
      log: "Pushed 30 onto the stack."
    });

    // pop
    states.push({
      array: [...arr],
      orientation: 'vertical',
      pointers: { top: arr.length - 1 },
      activeIndices: [arr.length - 1],
      swapping: true, // using swapping class as a highlight for removal
      activeLine: 22,
      log: "Preparing to pop the top element (30)."
    });
    
    const popped = arr.pop();
    states.push({
      array: [...arr],
      orientation: 'vertical',
      pointers: { top: arr.length - 1 },
      activeIndices: [],
      activeLine: 22,
      log: `Popped ${popped}. Top moves down to ${arr[arr.length-1]}.`
    });

    // push 40
    arr.push(40);
    states.push({
      array: [...arr],
      orientation: 'vertical',
      pointers: { top: arr.length - 1 },
      activeIndices: [arr.length - 1],
      activeLine: 23,
      log: "Pushed 40 onto the stack."
    });

    return states;
  }
};
