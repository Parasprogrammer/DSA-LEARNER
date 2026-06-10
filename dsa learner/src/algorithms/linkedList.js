export const linkedListConfig = {
  name: "Singly Linked List",
  type: "linked-list",
  xpReward: 60,
  description: "A linked list is a linear collection of data elements where each element points to the next. It allows for efficient insertion and removal of elements from any position in the sequence during iteration.",
  complexity: {
    time: "O(N) Traversal",
    space: "O(N)"
  },
  code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

function traverseAndInsert(head, val) {
  let curr = head;
  
  // Traverse to the end
  while (curr.next !== null) {
    curr = curr.next;
  }
  
  // Insert new node
  curr.next = new Node(val);
  return head;
}`,
  generateStates: () => {
    const states = [];
    
    // Initial List: 10 -> 20 -> 30
    const nodes = [
      { id: 'n1', val: 10, next: 'n2' },
      { id: 'n2', val: 20, next: 'n3' },
      { id: 'n3', val: 30, next: null }
    ];
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: 'n1' },
      activeNode: 'n1',
      activeLine: 9,
      log: "Initialize curr pointer at the head of the list (10)."
    });
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: 'n1' },
      activeNode: 'n1',
      activeLine: 12,
      log: "curr.next is not null. Entering traversal loop."
    });
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: 'n2' },
      activeNode: 'n2',
      activeLine: 13,
      log: "curr moves to the next node (20)."
    });

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: 'n2' },
      activeNode: 'n2',
      activeLine: 12,
      log: "curr.next is not null. Continuing traversal."
    });

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: 'n3' },
      activeNode: 'n3',
      activeLine: 13,
      log: "curr moves to the next node (30)."
    });
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { curr: 'n3' },
      activeNode: 'n3',
      activeLine: 12,
      log: "curr.next IS null. Loop terminates."
    });
    
    // Add new node (40)
    const newNodes = JSON.parse(JSON.stringify(nodes));
    newNodes.push({ id: 'n4', val: 40, next: null, isNew: true });
    
    states.push({
      nodes: newNodes,
      pointers: { curr: 'n3' },
      activeNode: 'n4',
      activeLine: 17,
      log: "Created new node with value 40."
    });
    
    // Link the new node
    newNodes[2].next = 'n4';
    newNodes[3].isNew = false;
    
    states.push({
      nodes: newNodes,
      pointers: { curr: 'n3' },
      activeNode: 'n4',
      activeLine: 17,
      log: "Linked the previous tail to the new node."
    });
    
    states.push({
      nodes: newNodes,
      pointers: {},
      activeNode: null,
      activeLine: 18,
      log: "Insertion complete! Returning head."
    });

    return states;
  }
};
