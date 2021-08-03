const GraphNode = require("../models/GraphNode");
const HashMap = require("./HashMap");

module.exports = class Graph {
    /**
     *
     * @param {"directed" | "undirected"} edgeDirection
     */
    constructor(edgeDirection = "directed") {
        if (!["directed", "undirected"].includes(edgeDirection))
            throw new TypeError(
                'edgeDirection must be undefined, "directed" or "undirected"'
            );
        this.vertices = new HashMap(64);
        this.isDirected = edgeDirection === "directed";
    }

    /**
     * If the graph has the specified vertex
     * @param {number} key
     * @return {boolean}
     */
    hasVertex(key) {
        return this.vertices.has(key);
    }

    /**
     * Add a vertex to the graph
     * @param {GraphNode} node
     * @returns {GraphNode}
     */
    addVertex(node) {
        return this.vertices.set(node.key, node);
    }
};
