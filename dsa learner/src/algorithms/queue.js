export const queueConfig = {
  name: "Queue (FIFO)",
  type: "array",
  xpReward: 35,
  description: "A Queue is a linear structure which follows the First-In-First-Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue).",
  complexity: {
    time: "O(1) Enqueue/Dequeue",
    space: "O(N)"
  },
  code: `class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    if (this.items.length === 0) return "Underflow";
    return this.items.shift();
  }
}

// Simulation
let q = new Queue();
q.enqueue(5);
q.enqueue(15);
q.enqueue(25);
q.dequeue();
q.enqueue(35);`,
  generateStates: () => {
    const states = [];
    const arr = [];
    
    // Initial state
    states.push({
      array: [...arr],
      orientation: 'horizontal',
      pointers: {},
      activeLine: 18,
      log: "Queue is empty."
    });

    // enqueue 5
    arr.push(5);
    states.push({
      array: [...arr],
      orientation: 'horizontal',
      pointers: { front: 0, rear: arr.length - 1 },
      activeIndices: [arr.length - 1],
      activeLine: 19,
      log: "Enqueued 5. Both front and rear point to the first element."
    });

    // enqueue 15
    arr.push(15);
    states.push({
      array: [...arr],
      orientation: 'horizontal',
      pointers: { front: 0, rear: arr.length - 1 },
      activeIndices: [arr.length - 1],
      activeLine: 20,
      log: "Enqueued 15. Rear pointer moves to the new element."
    });

    // enqueue 25
    arr.push(25);
    states.push({
      array: [...arr],
      orientation: 'horizontal',
      pointers: { front: 0, rear: arr.length - 1 },
      activeIndices: [arr.length - 1],
      activeLine: 21,
      log: "Enqueued 25 at the rear."
    });

    // dequeue
    states.push({
      array: [...arr],
      orientation: 'horizontal',
      pointers: { front: 0, rear: arr.length - 1 },
      activeIndices: [0],
      swapping: true, // highlight removal
      activeLine: 22,
      log: "Preparing to dequeue the front element (5)."
    });
    
    const dequeued = arr.shift();
    states.push({
      array: [...arr],
      orientation: 'horizontal',
      pointers: { front: 0, rear: arr.length - 1 },
      activeIndices: [],
      activeLine: 22,
      log: `Dequeued ${dequeued}. Front moves to the next element (${arr[0]}).`
    });

    // enqueue 35
    arr.push(35);
    states.push({
      array: [...arr],
      orientation: 'horizontal',
      pointers: { front: 0, rear: arr.length - 1 },
      activeIndices: [arr.length - 1],
      activeLine: 23,
      log: "Enqueued 35 at the rear."
    });

    return states;
  }
};
