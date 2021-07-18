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
            for (let i = node.length - 1; i >= 0; i--) {
                this.prepend(node[i]);
            }
            return this.head;
        }
        if (!(node instanceof DoubleNode))
            throw new TypeError("node must be instance of DoubleNode");

        if (this._head === null || this._tail === null) {
            this._head = node;
            this._tail = node;
        } else {
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

        if (this._head === null || this._tail === null) {
            this._head = node;
            this._tail = node;
        } else {
            node._previous = this._tail;
            this._tail.next = node;
            this._tail = node;
        }
        return this.tail;
    }

    /**
     * Insert node before nodeBefore
     * @param {DoubleNode} node
     * @param {DoubleNode} nodeBefore
     * @returns {DoubleNode}
     */
    insertBefore(node, nodeBefore) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0)
                throw new TypeError("node can not be an empty array");
            for (const nodeItem of node) {
                this.insertBefore(nodeItem, nodeBefore);
            }
            return node[0];
        }
        // Ensure both node and nodeBefore are instances of DoubleNode
        if (!(node instanceof DoubleNode))
            throw new TypeError("node must be instance of DoubleNode");
        if (!(nodeBefore instanceof DoubleNode))
            throw new TypeError("nodeBefore must be instance of DoubleNode");

        if (DoubleNode.compareInstance(this._head, nodeBefore))
            this._head = node;

        node._previous = nodeBefore._previous;
        nodeBefore._previous = node;
        node._next = nodeBefore;
        // If node's previous isn't null set node's previous next node as node
        if (node._previous !== null) {
            node._previous._next = node;
        }
        return nodeBefore.previous;
    }

    /**
     * Insert node after nodeAfter
     * @param {DoubleNode} node
     * @param {DoubleNode} nodeAfter
     * @returns {DoubleNode}
     */
    insertAfter(node, nodeAfter) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0)
                throw new TypeError("node can not be an empty array");
            for (let i = node.length - 1; i >= 0; i--) {
                this.insertAfter(node[i], nodeAfter);
            }
            return node[node.length - 1];
        }
        // Ensure both node and nodeAfter are instances of DoubleNode
        if (!(node instanceof DoubleNode))
            throw new TypeError("node must be instance of DoubleNode");
        if (!(nodeAfter instanceof DoubleNode))
            throw new TypeError("nodeAfter must be instance of DoubleNode");

        if (DoubleNode.compareInstance(this._tail, nodeAfter))
            this._tail = node;

        node._next = nodeAfter._next;
        nodeAfter._next = node;
        node._previous = nodeAfter;
        if (node._next !== null) {
            node._next._previous = node;
        }
        return nodeAfter.next;
    }

    /**
     * Delete a node from the list
     * @param {DoubleNode} node
     */
    delete(node) {
        // Check if node is an instance of DoubleNode
        if (!(node instanceof DoubleNode))
            throw new TypeError("node must be instance of DoubleNode");

        if (DoubleNode.compareInstance(node, this._head))
            this._head = node._next;
        if (DoubleNode.compareInstance(node, this._tail))
            this._tail = node.previous;
        if (node._previous !== null) node._previous._next = node._next;
        if (node._next !== null) node._next._previous = node._previous;
    }
};
