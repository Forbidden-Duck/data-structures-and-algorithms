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
        this.edges = new HashMap(64);
    }

    /**
     * Get an edge node
     * @param {number} key
     * @returns {GraphNode}
     */
    getEdge(key) {
        return this.edges.get(key);
    }

    /**
     * Add a node edge
     * @param {GraphNode} node
     * @returns {GraphNode}
     */
    addEdge(node) {
        return this.edges.set(node.key, node);
    }

    /**
     * Delete an edge node
     * @param {number} key
     */
    deleteEdge(key) {
        this.edges.delete(key);
    }
};
