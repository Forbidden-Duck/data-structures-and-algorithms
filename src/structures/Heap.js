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
     * Parent has a left child
     * @param {number} parentIdx
     * @returns {boolean}
     */
    hasLeftChild(parentIdx) {
        return this.getLeftChildIndex(parentIdx) < this.nodes.length;
    }

    /**
     * Parent has a right child
     * @param {number} parentIdx
     * @returns {boolean}
     */
    hasRightChild(parentIdx) {
        return this.getRightChildIndex(parentIdx) < this.nodes.length;
    }

    /**
     * Child has parent
     * @param {number} childIdx
     * @returns {boolean}
     */
    hasParent(childIdx) {
        return this.getParentIndex(childIdx) >= 0;
    }
};
