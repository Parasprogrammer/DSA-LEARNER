export const unionFindConfig = {
  name: "Union Find (Disjoint Set)",
  type: "array",
  xpReward: 100,
  description: "Keeps track of a set of elements partitioned into a number of disjoint subsets. Uses path compression and union by rank.",
  complexity: { time: "O(α(N))", space: "O(N)" },
  code: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  find(i) {
    if (this.parent[i] === i) return i;
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);
    if (rootI !== rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
    }
  }
}`,
  generateStates: () => {
    const states = [];
    const n = 6;
    let array = Array.from({length: n}, (_, i) => i);
    let ranks = new Array(n).fill(0);

    states.push({
      array: [...array],
      activeIndices: [],
      pointers: {},
      activeLine: 2,
      log: "Initialized parent array where each element points to itself."
    });

    const find = (i) => {
      states.push({
        array: [...array],
        activeIndices: [i],
        pointers: { current: i },
        activeLine: 7,
        log: `Finding root of ${i}.`
      });
      if (array[i] === i) return i;
      let root = find(array[i]);
      array[i] = root;
      states.push({
        array: [...array],
        activeIndices: [i, root],
        pointers: { i, root },
        activeLine: 9,
        log: `Path compression: Parent of ${i} is now root ${root}.`
      });
      return root;
    };

    const union = (i, j) => {
      states.push({
        array: [...array],
        activeIndices: [i, j],
        pointers: { i, j },
        activeLine: 13,
        log: `Union operation for elements ${i} and ${j}.`
      });
      let rootI = find(i);
      let rootJ = find(j);
      
      if (rootI !== rootJ) {
        if (ranks[rootI] < ranks[rootJ]) {
          array[rootI] = rootJ;
          states.push({
            array: [...array], activeIndices: [rootI, rootJ], pointers: { rootI, rootJ },
            activeLine: 18, log: `Rank of root ${rootI} < ${rootJ}. Attached ${rootI} under ${rootJ}.`
          });
        } else if (ranks[rootI] > ranks[rootJ]) {
          array[rootJ] = rootI;
          states.push({
            array: [...array], activeIndices: [rootI, rootJ], pointers: { rootI, rootJ },
            activeLine: 20, log: `Rank of root ${rootI} > ${rootJ}. Attached ${rootJ} under ${rootI}.`
          });
        } else {
          array[rootJ] = rootI;
          ranks[rootI]++;
          states.push({
            array: [...array], activeIndices: [rootI, rootJ], pointers: { rootI, rootJ },
            activeLine: 22, log: `Ranks equal. Attached ${rootJ} under ${rootI} and incremented rank of ${rootI}.`
          });
        }
      } else {
        states.push({
          array: [...array], activeIndices: [rootI, rootJ], pointers: { rootI, rootJ },
          activeLine: 16, log: `${i} and ${j} are already in the same set.`
        });
      }
    };

    union(0, 1);
    union(1, 2);
    union(3, 4);
    union(2, 4);

    states.push({
      array: [...array],
      activeIndices: [],
      pointers: {},
      activeLine: 27,
      log: "Completed sequence of Unions and Finds."
    });

    return states;
  }
};
