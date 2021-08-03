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

    get key() {
        return this._key;
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

    /**
     * Compare two instances of GraphNode
     * @param {GraphNode} a
     * @param {GraphNode} b
     * @returns {boolean}
     */
    static compareInstance(a, b) {
        if (!(a instanceof GraphNode) || !(b instanceof GraphNode)) return null;
        if (typeof a.data !== typeof b.data) return false;
        if (a.key !== b.key) return false;

        switch (a.data) {
            case "object": {
                for (const [key, value] of Object.entries(a.data)) {
                    if (a.data[key] !== b.data[key]) return false;
                }
                break;
            }
            case "function": {
                if (a.data.toString() !== b.data.toString()) return false;
                break;
            }
            default: {
                if (a.data !== b.data) return false;
                break;
            }
        }
        return true;
    }
};
