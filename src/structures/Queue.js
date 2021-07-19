const SinglyLinkedList = require("./SinglyLinkedList");
const SingleNode = require("../models/SingleNode");

module.exports = class Queue {
    constructor() {
        /**
         * @private
         */
        this.elements = new SinglyLinkedList();
    }

    /**
     * Get the front of the queue without removing it
     * @returns {*}
     */
    get peek() {
        return this.isEmpty() ? null : this.elements.head.data;
    }

    /**
     * Enqueue the specified value
     * @param {*} value
     */
    enqueue(value) {
        this.elements.append(new SingleNode(value));
    }

    /**
     * Remove the front value
     */
    dequeue() {
        if (this.isEmpty()) return null;
        this.elements.delete(this.elements.head);
    }

    /**
     * Returns whether or not the queue is empty
     * @returns {boolean}
     */
    isEmpty() {
        return this.size <= 0;
    }

    /**
     * Remove the entire queue
     */
    clear() {
        this.elements.clear();
    }

    /**
     * Create a clone of the queue
     * @returns {Queue}
     */
    clone() {
        const queue = new Queue();
        queue.elements = this.elements.clone();
        return queue;
    }

    /**
     * Returns the size of the queue
     * @returns {number}
     */
    get size() {
        return this.elements.size;
    }

    /**
     * Convert the queue into an array of values
     * @returns {*[]}
     */
    toArray() {
        const values = [];
        this.elements.forEach((node) => values.push(node.data));
        return values;
    }

    /**
     * Convert the queue into a string of values
     * @returns {string}
     */
    toString() {
        return this.elements.toString();
    }
};
