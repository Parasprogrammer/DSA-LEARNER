export const priorityQueueConfig = {
  name: "Priority Queue",
  type: "array",
  xpReward: 60,
  description: "A Priority Queue is a special queue where elements are dequeued based on their priority, not their insertion order. Here, we visualize it as a sorted array (insert takes O(N)).",
  complexity: {
    time: "O(N) insert, O(1) dequeue",
    space: "O(N)"
  },
  code: `class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  // Element is {val, priority}. Lower priority number = higher priority
  enqueue(element) {
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (element.priority < this.items[i].priority) {
        this.items.splice(i, 0, element);
        added = true;
        break;
      }
    }
    if (!added) this.items.push(element);
  }
  
  dequeue() {
    return this.items.shift();
  }
}`,
  generateStates: () => {
    const states = [];
    let items = []; // stores {val, priority}
    
    // Helper to format the array for visualization. e.g., "val(P:1)"
    const getVisArray = () => items.map(it => `${it.val}(P${it.priority})`);
    
    states.push({
      array: [null, null, null],
      activeIndices: [],
      pointers: {},
      activeLine: 3,
      log: "Initialized Priority Queue. We will sort elements such that Priority 1 is dequeued before Priority 2."
    });

    const enqueue = (val, priority) => {
      let element = { val, priority };
      
      states.push({
        array: getVisArray(),
        activeIndices: [],
        pointers: {},
        activeLine: 7,
        log: `enqueue(${val}) with Priority ${priority}.`
      });

      let added = false;
      for (let i = 0; i < items.length; i++) {
        states.push({
          array: getVisArray(),
          activeIndices: [i],
          pointers: { i },
          activeLine: 10,
          log: `Checking if new priority ${priority} is less than ${items[i].priority}.`
        });

        if (element.priority < items[i].priority) {
          items.splice(i, 0, element);
          added = true;
          
          states.push({
            array: getVisArray(),
            activeIndices: [i],
            swapping: true,
            pointers: { inserted: i },
            activeLine: 11,
            log: `It is! Spliced element into index ${i}.`
          });
          break;
        }
      }
      
      if (!added) {
        items.push(element);
        states.push({
            array: getVisArray(),
            activeIndices: [items.length - 1],
            pointers: { appended: items.length - 1 },
            activeLine: 16,
            log: `Lowest priority so far. Appended to the end.`
        });
      }
    };

    const dequeue = () => {
      let popped = items.shift();
      states.push({
        array: getVisArray(), // state after shift
        activeIndices: [],
        swapping: true,
        pointers: { dequeued: popped.val },
        activeLine: 20,
        log: `dequeue(): Removed highest priority element: ${popped.val} (P${popped.priority}).`
      });
    };

    enqueue("Task A", 3);
    enqueue("Task B", 1);
    enqueue("Task C", 2);
    dequeue();
    enqueue("Task D", 1);

    states.push({
      array: getVisArray(),
      activeIndices: [],
      pointers: {},
      doneIndices: items.map((_, i) => i),
      activeLine: 21,
      log: "Priority Queue operations complete!"
    });

    return states;
  }
};
