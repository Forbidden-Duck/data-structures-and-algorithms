const HeapNode = require("../models/HeapNode");

module.exports = class Heap {
    constructor() {
        /**
         * @private
         * @type {HeapNode[]}
         */
        this.nodes = [];
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
     * Return the size of the Heap
     * @returns {number}
     */
    get size() {
        return this.nodes.length;
    }
};
