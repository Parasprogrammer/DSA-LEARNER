export const circularQueueConfig = {
  name: "Circular Queue",
  type: "array",
  xpReward: 50,
  description: "A Circular Queue connects the last position back to the first position to make a circle. It efficiently reuses empty spaces left by dequeued elements.",
  complexity: {
    time: "O(1)",
    space: "O(N)"
  },
  code: `class CircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.head = -1;
    this.tail = -1;
    this.size = k;
  }

  enQueue(value) {
    if (this.isFull()) return false;
    if (this.isEmpty()) this.head = 0;
    this.tail = (this.tail + 1) % this.size;
    this.queue[this.tail] = value;
    return true;
  }

  deQueue() {
    if (this.isEmpty()) return false;
    if (this.head === this.tail) {
      this.head = -1;
      this.tail = -1;
    } else {
      this.head = (this.head + 1) % this.size;
    }
    return true;
  }
}`,
  generateStates: () => {
    const states = [];
    const size = 5;
    let queue = new Array(size).fill(null);
    let head = -1;
    let tail = -1;
    
    states.push({
      array: [...queue],
      activeIndices: [],
      pointers: {},
      doneIndices: [],
      activeLine: 3,
      log: `Initialized empty Circular Queue of size ${size}.`
    });

    const enqueue = (val) => {
      states.push({
        array: [...queue],
        activeIndices: [],
        pointers: { head, tail },
        activeLine: 10,
        log: `enQueue(${val}): Checking if full.`
      });
      
      if (head === -1) head = 0;
      tail = (tail + 1) % size;
      
      states.push({
        array: [...queue],
        activeIndices: [tail],
        pointers: { head, tail },
        activeLine: 12,
        log: `Calculated new tail position: (tail + 1) % ${size} = ${tail}.`
      });

      queue[tail] = val;

      states.push({
        array: [...queue],
        activeIndices: [tail],
        pointers: { head, tail },
        activeLine: 13,
        log: `Inserted ${val} at tail index ${tail}.`
      });
    };

    const dequeue = () => {
      states.push({
        array: [...queue],
        activeIndices: [head],
        pointers: { head, tail },
        activeLine: 18,
        log: `deQueue(): Removing element from head index ${head}.`
      });

      let val = queue[head];
      queue[head] = null;

      states.push({
        array: [...queue],
        activeIndices: [head],
        swapping: true,
        pointers: { head, tail },
        activeLine: 24,
        log: `Removed ${val}.`
      });

      if (head === tail) {
        head = -1;
        tail = -1;
      } else {
        head = (head + 1) % size;
      }

      states.push({
        array: [...queue],
        activeIndices: [],
        pointers: { head, tail },
        activeLine: 24,
        log: `Calculated new head position: ${head}.`
      });
    };

    // Sequence of operations
    enqueue(10);
    enqueue(20);
    enqueue(30);
    enqueue(40);
    dequeue();
    dequeue();
    enqueue(50);
    enqueue(60); // This wraps around!

    states.push({
      array: [...queue],
      activeIndices: [],
      pointers: { head, tail },
      doneIndices: [],
      activeLine: 2,
      log: "Notice how enQueue(60) wrapped around to index 0! This is the power of a Circular Queue."
    });

    return states;
  }
};
