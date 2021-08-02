const HeapNode = require("../models/HeapNode");

module.exports = class Heap {
    constructor() {
        /**
         * @private
         * @type {HeapNode[]}
         */
        this.nodes = [];
    }

    get root() {
        return this.nodes[0];
    }

    /**
     * Returns the index of the parent's left child
     * @param {number} parentIdx
     * @returns {number}
     */
    getLeftChildIndex(parentIdx) {
        if (isNaN(parentIdx)) throw new TypeError("parentIdx must be a number");
        return 2 * parentIdx + 1;
    }

    /**
     * Returns the index of the parent's right child
     * @param {number} parentIdx
     * @returns {number}
     */
    getRightChildIndex(parentIdx) {
        if (isNaN(parentIdx)) throw new TypeError("parentIdx must be a number");
        return 2 * parentIdx + 2;
    }

    /**
     * Returns the parent index of the child
     * @param {number} childIdx
     * @returns {number}
     */
    getParentIndex(childIdx) {
        if (isNaN(childIdx)) throw new TypeError("childIdx must be a number");
        return Math.floor((childIdx - 1) / 2);
    }

    /**
     * Return the left child of the parent
     * @param {number} parentIdx
     * @returns {HeapNode}
     */
    leftChild(parentIdx) {
        return this.nodes[this.getLeftChildIndex(parentIdx)];
    }

    /**
     * Return the right child of the parent
     * @param {number} parentIdx
     * @returns {HeapNode}
     */
    rightChild(parentIdx) {
        return this.nodes[this.getRightChildIndex(parentIdx)];
    }

    /**
     * Return the parent of the child
     * @param {number} childIdx
     * @returns {HeapNode}
     */
    parent(childIdx) {
        return this.nodes[this.getParentIndex(childIdx)];
    }

    /**
     * Checks if the parent and child node are in the right position
     * @param {HeapNode} parent
     * @param {HeapNode} child
     * @returns {boolean}
     */
    compareByNode(parent, child) {
        if (typeof this.compareKeys !== "function")
            throw new Error("Not implemented");
        if (!(parent instanceof HeapNode))
            throw new TypeError("parent must be an instance of HeapNode");
        if (!(child instanceof HeapNode))
            throw new TypeError("child must be an instance of HeapNode");
        return this.compareKeys(parent.key, child.key);
    }

    /**
     * Checks if the parent and child node are in the right position
     * @param {number} parentIdx
     * @param {number} childIdx
     * @returns {boolean}
     */
    compareByIndex(parentIdx, childIdx) {
        if (typeof this.compareKeys !== "function")
            throw new Error("Not implemented");
        return this.compareKeys(
            this.nodes[parentIdx].key,
            this.nodes[childIdx].key
        );
    }

    /**
     * Compares the left and right child and returns one of the two
     * @param {number} parentIdx
     * @returns {number}
     */
    compareChildren(parentIdx) {
        if (!this.leftChild(parentIdx) && !this.rightChild(parentIdx))
            return -1;
        const leftChildIdx = this.getLeftChildIndex(parentIdx);
        const rightChildIdx = this.getRightChildIndex(parentIdx);
        if (!this.leftChild()) return rightChildIdx;
        if (!this.rightChild()) return leftChildIdx;
        return this.compareByIndex(leftChildIdx, rightChildIdx)
            ? leftChildIdx
            : rightChildId;
    }

    /**
     * Checks if a parent and child nodes should be swapped
     * @param {number} parentIdx
     * @param {number} childIdx
     * @returns {boolean}
     */
    shouldSwap(parentIdx, childIdx) {
        if (isNaN(parentIdx)) throw new TypeError("parentIdx must be a number");
        if (isNaN(childIdx)) throw new TypeError("childIdx must be a number");
        if (parentIdx < 0 || parentIdx >= this.size) return false;
        if (childIdx < 0 || childIdx >= this.size) return false;
        return !this.compareByIndex(parentIdx, childIdx);
    }

    /**
     * Insert the node into the heap
     * @param {HeapNode} node
     * @returns {HeapNode}
     */
    insert(node) {
        if (!(node instanceof HeapNode))
            throw new TypeError("node must be an instance of HeapNode");
        this.nodes.push(node);
        this.heapifyUp();
        return node;
    }

    /**
     * Delete the node from the heap
     * @param {HeapNode} node
     */
    delete(node) {
        if (!(node instanceof HeapNode))
            throw new TypeError("node must be an instance of HeapNode");
        const nodeIndex = this.findIndex((focusedNode) =>
            HeapNode.compareInstance(node, focusedNode)
        );
        if (!nodeIndex) throw new TypeError("Invalid node was provided");

        // If the node is the last child, just delete it
        if (nodeIndex === this.nodes.length - 1) {
            this.nodes.pop();
        } else {
            // Move the last node to the vacant position
            this.nodes[nodeIndex] = this.nodes.pop();
            const parentItemIdx = this.getParentIndex(nodeIndex);
            // If there is no parent or the parent is in the correct position with the node
            // heapifyDown otherwise heapifyUp
            if (
                this.leftChild(nodeIndex) &&
                (!this.parent(nodeIndex) ||
                    !this.shouldSwap(parentItemIdx, nodeIndex))
            ) {
                this.heapifyDown(nodeIndex);
            } else {
                this.heapifyUp(nodeIndex);
            }
        }
    }

    /**
     * Return the node at the given index
     * @param {number} index
     * @returns {HeapNode}
     */
    get(index) {
        if (isNaN(index)) throw new TypeError("index must be a number");
        return this.nodes[index] || null;
    }

    /**
     * Find a node using the specified callback function
     * @param {(this: void, value: HeapNode, index: number, obj: HeapNode[]) => value is HeapNode} callbackFn
     * @param {*} thisArg
     * @returns {HeapNode}
     */
    find(callbackFn, thisArg) {
        return this.nodes.find(callbackFn, thisArg) || null;
    }

    /**
     * Find the index of the node using the specified callback function
     * @param {(value: HeapNode, index: number, obj: HeapNode[]) => unknown} callbackFn
     * @param {*} thisArg
     * @returns {number}
     */
    findIndex(callbackFn, thisArg) {
        return this.nodes.findIndex(callbackFn, thisArg) || null;
    }

    /**
     * Swaps two nodes
     * @param {number} idx1
     * @param {number} idx2
     */
    swap(idx1, idx2) {
        if (isNaN(idx1)) throw new TypeError("idx1 must be a number");
        if (isNaN(idx2)) throw new TypeError("idx2 must be a number");
        const temp = this.nodes[idx1];
        this.nodes[idx1] = this.nodes[idx2];
        this.nodes[idx2] = temp;
    }

    /**
     * Push the bottom node up into the right position
     * @param {number} [index]
     */
    heapifyUp(index = this.nodes.length - 1) {
        if (isNaN(index)) index = this.nodes.length - 1;
        let parentIdx = Math.floor((index - 1) / 2);
        while (this.shouldSwap(parentIdx, index)) {
            this.swap(parentIdx, index);
            index = parentIdx;
            parentIdx = Math.floor((index - 1) / 2);
        }
    }

    /**
     * Pushes the top node down into the right position
     * @param {number} [index]
     */
    heapifyDown(index = 0) {
        if (isNaN(index)) index = 0;
        let childIdx = this.compareChildren(index);
        while (this.shouldSwap(index, childIdx)) {
            this.swap(index, childIdx);
            index = childIdx;
            childIdx = this.compareChildren(index);
        }
    }

    /**
     * Loop through every item of the heap
     * @param {(value: HeapNode, index: number, array: HeapNode[]) => void} callbackFn
     * @param {*} thisArg
     */
    forEach(callbackFn, thisArg) {
        this.nodes.forEach(callbackFn, thisArg);
    }

    /**
     * Return the size of the Heap
     * @returns {number}
     */
    get size() {
        return this.nodes.length;
    }
};
