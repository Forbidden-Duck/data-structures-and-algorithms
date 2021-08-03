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

    /**
     * Remove a vertex from the graph
     * @param {number} key
     */
    removeVertex(key) {
        if (!this.hasVertex(key)) return;
        for (const edgeNode of node.edges.values) {
            edgeNode.deleteEdge(key);
        }
        this.vertices.delete(key);
    }

    /**
     * If the source has an edge to the destination
     * @param {number} srcKey
     * @param {number} destKey
     * @return {boolean}
     */
    hasEdge(srcKey, destKey) {
        return (
            this.hasVertex(srcKey) &&
            this.vertices.get(srcKey).getEdge(destKey) instanceof GraphNode
        );
    }
};
