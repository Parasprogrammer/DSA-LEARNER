export const dequeConfig = {
  name: "Deque (Double-Ended Queue)",
  type: "array",
  xpReward: 55,
  description: "A Deque is a Double-Ended Queue, meaning elements can be inserted and removed from BOTH the front and the rear.",
  complexity: {
    time: "O(1) per operation",
    space: "O(N)"
  },
  code: `class Deque {
  constructor() {
    this.items = [];
  }
  
  insertFront(val) { this.items.unshift(val); }
  insertRear(val)  { this.items.push(val); }
  
  deleteFront() { return this.items.shift(); }
  deleteRear()  { return this.items.pop(); }
}`,
  generateStates: () => {
    const states = [];
    let items = [];
    
    const pushState = (line, logMsg, activeIdx = -1) => {
       // To visualize a growing/shrinking array, we pad it with nulls dynamically
       let vis = [...items, null, null]; 
       if (items.length === 0) vis = [null, null, null];
       
       states.push({
         array: vis,
         activeIndices: activeIdx >= 0 ? [activeIdx] : [],
         pointers: items.length > 0 ? { front: 0, rear: items.length - 1 } : {},
         activeLine: line,
         log: logMsg
       });
    };

    pushState(2, "Initialized empty Deque.");

    // insertRear(10)
    items.push(10);
    pushState(7, "insertRear(10): Pushed 10 to the rear.", items.length - 1);

    // insertRear(20)
    items.push(20);
    pushState(7, "insertRear(20): Pushed 20 to the rear.", items.length - 1);

    // insertFront(5)
    items.unshift(5);
    pushState(6, "insertFront(5): Unshifted 5 to the front. Elements shift right.", 0);

    // insertFront(1)
    items.unshift(1);
    pushState(6, "insertFront(1): Unshifted 1 to the front.", 0);

    // deleteRear()
    let popped = items.pop();
    pushState(10, `deleteRear(): Popped ${popped} from the rear.`, items.length);

    // deleteFront()
    let shifted = items.shift();
    pushState(9, `deleteFront(): Shifted ${shifted} from the front.`, 0);

    states.push({
         array: [...items],
         activeIndices: [],
         pointers: items.length > 0 ? { front: 0, rear: items.length - 1 } : {},
         doneIndices: items.map((_, i) => i),
         activeLine: 11,
         log: "Deque operations complete. It supports O(1) ops on both ends!"
    });

    return states;
  }
};
