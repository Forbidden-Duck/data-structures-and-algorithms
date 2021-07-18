const DoubleNode = require("../models/DoubleNode");

module.exports = class DoublyLinkedList {
    constructor() {
        /**
         * @private
         */
        this._head = null;
        /**
         * @private
         */
        this._tail = null;
    }

    get head() {
        return this._head;
    }

    get tail() {
        return this._tail;
    }

    /**
     * Prepend a node to the start of the list
     * @param {DoubleNode} node
     * @returns {DoubleNode}
     */
    prepend(node) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0) return this.head;
            // Loop through the nodes in reverse
            for (let i = node.length - 1; i >= 0; i--) {
                this.prepend(node[i]);
            }
            return this.head;
        }
        if (!(node instanceof DoubleNode))
            throw new TypeError("node must be instance of DoubleNode");

        // If head or tail are null, set the head and tail as node
        if (this._head === null || this._tail === null) {
            this._head = node;
            this._tail = node;
        } else {
            // Set node's next node as the original head node,
            // set the original head's previous as node and set node as the head node
            node._next = this._head;
            this._head.previous = node;
            this._head = node;
        }
        return this.head;
    }

    /**
     * Append a node to the end of the list
     * @param {DoubleNode} node
     * @returns {DoubleNode}
     */
    append(node) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0) return this.tail;
            for (const nodeItem of node) {
                this.append(nodeItem);
            }
            return this.tail;
        }
        if (!(node instanceof DoubleNode))
            throw new TypeError("node must be instanceof DoubleNode");

        // If head or tail are null, set the head and tail as node
        if (this._head === null || this._tail === null) {
            this._head = node;
            this._tail = node;
        } else {
            // Set node's previous node as the original tail node,
            // Set the original tail's next node as node and set the tail node as node
            node._previous = this._tail;
            this._tail.next = node;
            this._tail = node;
        }
        return this.tail;
    }
};
