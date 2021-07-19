const SinglyLinkedList = require("./SinglyLinkedList");
const SingleNode = require("../models/SingleNode");

module.exports = class Stack {
    constructor() {
        /**
         * @private
         */
        this.elements = new SinglyLinkedList();
    }

    /**
     * Get the front of the stack without removing it
     * @returns {*}
     */
    get peek() {
        return this.isEmpty() ? null : this.elements.head.data;
    }

    /**
     * Push the value to the front of the stack
     * @param {*} value
     */
    push(value) {
        this.elements.prepend(new SingleNode(value));
    }

    /**
     * Remove the front value
     */
    pop() {
        if (this.isEmpty()) return null;
        this.elements.delete(this.elements.head);
    }

    /**
     * Returns whether of not the stack is empty
     * @returns {boolean}
     */
    isEmpty() {
        return this.size <= 0;
    }

    /**
     * Remove the entire stack
     */
    clear() {
        this.elements.clear();
    }

    /**
     * Create a clone of the stack
     * @returns {Stack}
     */
    clone() {
        const stack = new Stack();
        stack.elements = this.elements.clone();
        return stack;
    }

    /**
     * Returns the size of the stack
     * @returns {number}
     */
    get size() {
        return this.elements.size;
    }

    /**
     * Convert the stack into an array of values
     * @returns {*[]}
     */
    toArray() {
        const values = [];
        this.elements.forEach((node) => values.push(node.data));
        return values;
    }

    /**
     * Convert the stack into a string of values
     * @returns {string}
     */
    toString() {
        return this.elements.toString();
    }
};
