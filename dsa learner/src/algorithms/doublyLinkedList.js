export const doublyLinkedListConfig = {
  name: "Doubly Linked List",
  type: "linked-list",
  xpReward: 60,
  description: "A Doubly Linked List contains an extra pointer, typically called 'prev', pointing to the previous node. This allows traversal in both directions.",
  complexity: {
    time: "O(1) insert/delete, O(N) search",
    space: "O(N)"
  },
  code: `class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

function insertTail(head, val) {
  let newNode = new Node(val);
  if (!head) return newNode;
  
  let curr = head;
  while (curr.next) {
    curr = curr.next;
  }
  
  curr.next = newNode;
  newNode.prev = curr;
  return head;
}`,
  generateStates: () => {
    const states = [];
    const values = [10, 20, 30];
    const nodes = [];
    
    states.push({
      nodes: [...nodes],
      pointers: {},
      activeLine: 9,
      log: "Starting to build a Doubly Linked List."
    });

    for (let i = 0; i < values.length; i++) {
      let val = values[i];
      let newNodeId = `node-${i}`;
      
      states.push({
        nodes: [...nodes],
        pointers: { newNode: newNodeId },
        activeLine: 10,
        log: `Created newNode with value ${val}.`
      });

      if (nodes.length === 0) {
        nodes.push({ id: newNodeId, val, next: null, edgeType: 'bidirectional' });
        states.push({
          nodes: JSON.parse(JSON.stringify(nodes)),
          pointers: { head: newNodeId },
          activeLine: 11,
          log: "List was empty. Set head to newNode."
        });
      } else {
        let currIdx = 0;
        states.push({
          nodes: JSON.parse(JSON.stringify(nodes)),
          pointers: { head: nodes[0].id, curr: nodes[currIdx].id, newNode: newNodeId },
          activeLine: 13,
          log: "Traversing to find the tail node."
        });

        while (nodes[currIdx].next !== null) {
          currIdx++;
          states.push({
            nodes: JSON.parse(JSON.stringify(nodes)),
            pointers: { head: nodes[0].id, curr: nodes[currIdx].id, newNode: newNodeId },
            activeLine: 15,
            log: "Traversing..."
          });
        }
        
        // Insert
        nodes[currIdx].next = newNodeId;
        nodes.push({ id: newNodeId, val, next: null, edgeType: 'bidirectional' });
        
        states.push({
          nodes: JSON.parse(JSON.stringify(nodes)),
          pointers: { head: nodes[0].id, curr: nodes[currIdx].id, newNode: newNodeId },
          activeLine: 18,
          log: `Linked curr.next to newNode. Set newNode.prev to curr.`
        });
      }
    }

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { head: nodes[0].id },
      activeLine: 20,
      log: "Doubly Linked List construction complete!"
    });

    return states;
  }
};
