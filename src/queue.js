const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor(){
    this.value = null;
    this.next = null;
  }

  getUnderlyingList() {
    return this;
  }

  enqueue(value) {
    let newNode = new ListNode(value);
    let current = this;

  
    if (this.value == null) {
      this.value = value;
      current = current.next;
      return;
    }
 
     while (current.next) {
      current = current.next;
     }
    current.next = newNode;
  }

  dequeue() {
    let firstQue = this.value;
    let secondQue = this.next;
    this.value = secondQue.value;
    this.next = secondQue.next;
    return firstQue;
  }
}

module.exports = {
  Queue
};
