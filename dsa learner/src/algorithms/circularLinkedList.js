export const circularLinkedListConfig = {
  name: "Circular Linked List",
  type: "linked-list",
  xpReward: 60,
  description: "A Circular Linked List is a linked list where the last node points back to the head node instead of pointing to null, forming a continuous loop.",
  complexity: {
    time: "O(1) insert at head, O(N) search",
    space: "O(N)"
  },
  code: `class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function makeCircular(head) {
  if (!head) return;
  
  let curr = head;
  while (curr.next) {
    curr = curr.next;
  }
  
  // Link tail back to head
  curr.next = head;
}`,
  generateStates: () => {
    const states = [];
    const values = [5, 15, 25, 35];
    const nodes = values.map((val, i) => ({
      id: `node-${i}`,
      val,
      next: i < values.length - 1 ? `node-${i+1}` : null,
      edgeType: 'forward'
    }));
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { head: nodes[0].id },
      activeLine: 8,
      log: "Starting with a standard Singly Linked List."
    });

    let currIdx = 0;
    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { head: nodes[0].id, curr: nodes[currIdx].id },
      activeLine: 11,
      log: "Traversing to find the tail node."
    });

    while (nodes[currIdx].next !== null) {
      currIdx++;
      states.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        pointers: { head: nodes[0].id, curr: nodes[currIdx].id },
        activeLine: 13,
        log: "Traversing..."
      });
    }

    // Make it circular
    nodes[currIdx].edgeType = 'circular';
    nodes[currIdx].next = nodes[0].id; // conceptually

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { head: nodes[0].id, tail: nodes[currIdx].id },
      activeLine: 17,
      log: "Linked tail's next pointer back to the Head node. The list is now circular!"
    });

    return states;
  }
};
