const HashMap = require("../structures/HashMap");

module.exports = class GraphNode {
    /**
     *
     * @param {number} key
     * @param {*} data
     */
    constructor(key, data) {
        /**
         * @private
         */
        this._key = key;
        this.data = data;
        /**
         * @private
         */
        this.adjacents = new HashMap(64);
    }

    /**
     * Get an adjacent node
     * @param {number} key
     * @returns {GraphNode}
     */
    getAdjacent(key) {
        return this.adjacents.get(key);
    }

    /**
     * Add a node adjacent
     * @param {GraphNode} node
     * @returns {GraphNode}
     */
    addAdjacent(node) {
        return this.adjacents.set(node.key, node);
    }

    /**
     * Delete an adjacent node
     * @param {number} key
     */
    deleteAdjacent(key) {
        this.adjacents.delete(key);
    }
};
