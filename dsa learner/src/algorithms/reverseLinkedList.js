export const reverseLinkedListConfig = {
  name: "Reverse Linked List",
  type: "linked-list",
  xpReward: 65,
  description: "Reversing a linked list involves iterating through the nodes and flipping their 'next' pointers to point to the previous node.",
  complexity: {
    time: "O(N)",
    space: "O(1)"
  },
  code: `function reverseList(head) {
  let prev = null;
  let curr = head;
  
  while (curr !== null) {
    let nextTemp = curr.next; // store next
    curr.next = prev;         // reverse pointer
    
    prev = curr;              // advance prev
    curr = nextTemp;          // advance curr
  }
  
  return prev; // new head
}`,
  generateStates: () => {
    const states = [];
    const values = [1, 2, 3, 4, 5];
    const nodes = values.map((val, i) => ({
      id: `node-${i}`,
      val,
      next: i < values.length - 1 ? `node-${i+1}` : null,
      edgeType: 'forward'
    }));
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { head: nodes[0].id, prev: 'null' },
      activeLine: 2,
      log: "Initialized prev = null, curr = head."
    });

    let prevIdx = -1;
    let currIdx = 0;

    while (currIdx < nodes.length) {
      let currId = nodes[currIdx].id;
      let prevId = prevIdx >= 0 ? nodes[prevIdx].id : 'null';
      
      states.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        pointers: { prev: prevId, curr: currId },
        activeNode: currId,
        activeLine: 6,
        log: `Stored nextTemp.`
      });

      // Reverse pointer
      nodes[currIdx].edgeType = prevIdx >= 0 ? 'backward' : 'none';
      if(prevIdx < 0) nodes[currIdx].next = null; // Head becomes tail
      
      states.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        pointers: { prev: prevId, curr: currId },
        activeNode: currId,
        activeLine: 7,
        log: `Reversed pointer of curr to point to prev.`
      });

      // Advance
      prevIdx = currIdx;
      currIdx++;
      
      let newCurrId = currIdx < nodes.length ? nodes[currIdx].id : 'null';
      
      states.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        pointers: { prev: nodes[prevIdx].id, curr: newCurrId },
        activeLine: 10,
        log: "Advanced prev and curr pointers."
      });
    }

    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { head: nodes[prevIdx].id },
      activeLine: 13,
      log: "List reversed successfully! 'prev' is the new head."
    });

    return states;
  }
};
