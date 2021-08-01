const HeapNode = require("../models/HeapNode");

module.exports = class Heap {
    constructor() {
        /**
         * @private
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
};
