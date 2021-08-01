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
        return 2 * parentIdx + 1;
    }

    /**
     * Returns the index of the parent's right child
     * @param {number} parentIdx
     * @returns {number}
     */
    getRightChildIndex(parentIdx) {
        return 2 * parentIdx + 2;
    }

    /**
     * Returns the parent index of the child
     * @param {number} childIndx
     * @returns {number}
     */
    getParentIndex(childIndx) {
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
        this.nodes.push(node);
        this.heapifyUp();
        return node;
    }

    /**
     * Swaps two nodes
     * @param {number} idx1
     * @param {number} idx2
     */
    swap(idx1, idx2) {
        const temp = this.nodes[idx1];
        this.nodes[idx1] = this.nodes[idx2];
        this.nodes[idx2] = temp;
    }

    /**
     * Push the bottom node up into the right position
     * @param {number} [index]
     */
    heapifyUp(index = this.nodes.length - 1) {
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
        let childIdx = this.compareChildren(index);
        while (this.shouldSwap(index, childIdx)) {
            this.swap(index, childIdx);
            index = childIdx;
            childIdx = this.compareChildren(index);
        }
    }

    /**
     * Return the size of the Heap
     * @returns {number}
     */
    get size() {
        return this.nodes.length;
    }
};
