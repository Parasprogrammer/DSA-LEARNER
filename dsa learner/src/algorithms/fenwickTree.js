export const fenwickTreeConfig = {
  name: "Fenwick Tree (BIT)",
  type: "array",
  xpReward: 75,
  description: "A Fenwick Tree (Binary Indexed Tree) efficiently updates elements and calculates prefix sums in an array of numbers using bitwise operations.",
  complexity: {
    time: "O(log N)",
    space: "O(N)"
  },
  code: `function update(idx, val, bit, n) {
  for (; idx <= n; idx += idx & -idx) {
    bit[idx] += val;
  }
}

function query(idx, bit) {
  let sum = 0;
  for (; idx > 0; idx -= idx & -idx) {
    sum += bit[idx];
  }
  return sum;
}`,
  generateStates: () => {
    const states = [];
    const arr = [0, 3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 3]; // 1-indexed for BIT
    const bit = new Array(arr.length).fill(0);
    
    states.push({
      array: [...bit],
      activeIndices: [],
      pointers: {},
      activeLine: 1,
      log: "Initialized empty Fenwick Tree (BIT) array of size 11 (1-indexed)."
    });

    // Simulate building the BIT by updating elements
    const update = (idx, val) => {
      states.push({
        array: [...bit],
        activeIndices: [],
        pointers: { target: idx },
        activeLine: 2,
        log: `update(idx: ${idx}, val: ${val})`
      });

      for (; idx < bit.length; idx += idx & -idx) {
        bit[idx] += val;
        states.push({
          array: [...bit],
          activeIndices: [idx],
          pointers: { idx },
          swapping: true,
          activeLine: 3,
          log: `Added ${val} to bit[${idx}]. Next idx jumps by LSB: idx += (idx & -idx)`
        });
      }
    };

    // Just build a small portion for visual brevity
    update(1, 3);
    update(2, 2);
    update(3, -1);
    update(4, 6);

    states.push({
      array: [...bit],
      activeIndices: [],
      pointers: {},
      activeLine: 7,
      log: "BIT partially built. Now let's query the prefix sum up to index 3!"
    });

    const query = (idx) => {
      let sum = 0;
      for (; idx > 0; idx -= idx & -idx) {
        sum += bit[idx];
        states.push({
          array: [...bit],
          activeIndices: [idx],
          pointers: { query: idx },
          activeLine: 10,
          log: `Accumulating bit[${idx}] = ${bit[idx]}. Current sum: ${sum}. Next idx jumps by LSB: idx -= (idx & -idx)`
        });
      }
      return sum;
    };

    let total = query(3);

    states.push({
      array: [...bit],
      activeIndices: [],
      doneIndices: [0, 1, 2, 3],
      pointers: {},
      activeLine: 12,
      log: `Query complete! Prefix sum up to index 3 is ${total}.`
    });

    return states;
  }
};
