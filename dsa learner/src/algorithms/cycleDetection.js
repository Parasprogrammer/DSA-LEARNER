export const cycleDetectionConfig = {
  name: "Cycle Detection (Floyd)",
  type: "linked-list",
  xpReward: 70,
  description: "Floyd's Cycle-Finding Algorithm uses two pointers (slow and fast) moving at different speeds. If there is a cycle, the fast pointer will eventually catch up to the slow pointer.",
  complexity: {
    time: "O(N)",
    space: "O(1)"
  },
  code: `function hasCycle(head) {
  if (!head) return false;
  
  let slow = head;
  let fast = head;
  
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    
    if (slow === fast) {
      return true; // Cycle detected!
    }
  }
  
  return false;
}`,
  generateStates: () => {
    const states = [];
    const values = [3, 2, 0, -4];
    const nodes = values.map((val, i) => ({
      id: `node-${i}`,
      val,
      next: i < values.length - 1 ? `node-${i+1}` : null,
      edgeType: 'forward'
    }));
    
    // Create cycle: tail connects to node-1 (value 2)
    nodes[3].next = 'node-1';
    nodes[3].edgeType = 'loop';
    
    states.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      pointers: { slow: nodes[0].id, fast: nodes[0].id },
      activeLine: 4,
      log: "Initialized slow and fast pointers at the Head."
    });

    let slowIdx = 0;
    let fastIdx = 0;

    // Simulate traversal
    let step = 0;
    while (step < 10) { // Safety bound
      states.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        pointers: { slow: nodes[slowIdx].id, fast: nodes[fastIdx].id },
        activeNode: nodes[fastIdx].id,
        activeLine: 7,
        log: `Checking if fast and fast.next are null.`
      });

      // Move slow
      slowIdx = slowIdx === 3 ? 1 : slowIdx + 1; // logical wrap based on our hardcoded cycle
      // Move fast (2 steps)
      fastIdx = fastIdx === 3 ? 1 : fastIdx + 1;
      fastIdx = fastIdx === 3 ? 1 : fastIdx + 1;

      states.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        pointers: { slow: nodes[slowIdx].id, fast: nodes[fastIdx].id },
        activeLine: 9,
        log: "Moved slow pointer 1 step. Moved fast pointer 2 steps."
      });

      if (slowIdx === fastIdx) {
        states.push({
          nodes: JSON.parse(JSON.stringify(nodes)),
          pointers: { slow: nodes[slowIdx].id, fast: nodes[fastIdx].id, collision: nodes[slowIdx].id },
          activeNode: nodes[slowIdx].id,
          activeLine: 12,
          log: "Fast pointer caught up to the Slow pointer! Cycle detected!"
        });
        break;
      }
      step++;
    }

    return states;
  }
};
