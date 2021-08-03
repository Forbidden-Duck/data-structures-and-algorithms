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
};
