const GraphNode = require("../models/GraphNode");
const HashMap = require("./HashMap");
const Queue = require("./Queue");
const Stack = require("./Stack");

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
        /**
         * @private
         */
        this.vertices = new HashMap(64);
        this.isDirected = edgeDirection === "directed";
    }

    /**
     * If the graph has the specified vertex
     * @param {number} key
     * @return {boolean}
     */
    hasVertex(key) {
        if (isNaN(key)) throw new TypeError("key must be a number");
        return this.vertices.has(key);
    }

    /**
     * Add a vertex to the graph
     * @param {GraphNode} node
     * @returns {GraphNode}
     */
    addVertex(node) {
        if (!(node instanceof GraphNode))
            throw new TypeError("node must be an instance of GraphNode");
        return this.vertices.set(node.key, node);
    }

    /**
     * Delete a vertex from the graph
     * @param {number} key
     */
    deleteVertex(key) {
        if (!this.hasVertex(key)) return; // Triggers an error if not a number
        const currentNode = this.vertices.get(key);
        for (const edgeNode of this.vertices.values) {
            currentNode.deleteEdge(edgeNode.key);
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

    /**
     * Add a edge link between the source and the destination
     * @param {GraphNode | number} source
     * @param {GraphNode | number} destination
     * @returns {{ source: GraphNode, destination: GraphNode }}
     */
    addEdge(source, destination) {
        if (
            (!(source instanceof GraphNode) && isNaN(source)) ||
            (!(destination instanceof GraphNode) && isNaN(destination))
        )
            throw new TypeError(
                "source and destination must be either a GraphNode or a number"
            );
        // Extract the key from the node or just use the param as the key
        const srcKey = source instanceof GraphNode ? source.key : source;
        const destKey =
            destination instanceof GraphNode ? destination.key : destination;
        // Using the find the node otherwise add it
        const srcNode =
            this.vertices.get(srcKey) ||
            (source instanceof GraphNode
                ? this.addVertex(source)
                : this.addVertex(new GraphNode(srcKey, null)));
        const destNode =
            this.vertices.get(destKey) ||
            (destination instanceof GraphNode
                ? this.addVertex(destination)
                : this.addVertex(new GraphNode(destKey, null)));
        srcNode.addEdge(destNode);
        if (!this.isDirected) {
            destNode.addEdge(srcNode);
        }
        return { source: srcNode, destination: destNode };
    }

    /**
     * Delete a link between the source and the destination
     * @param {number} srcKey
     * @param {number} destKey
     */
    deleteEdge(srcKey, destKey) {
        const srcNode = this.vertices.get(srcKey);
        const destNode = this.vertices.get(destKey);
        if (srcNode && destNode) {
            srcNode.deleteEdge(destKey);
            if (!this.isDirected) {
                destNode.deleteEdge(srcKey);
            }
        }
    }

    /**
     * Clear the graph
     */
    clear() {
        /**
         * Loop through all the vertices and deleting them
         * Deleting vertices deletes the respective edges as well
         */
        for (const vertexKey of this.vertices.keys) {
            this.deleteVertex(vertexKey);
        }
    }

    /**
     * Clone the graph
     * @returns {Graph}
     */
    clone() {
        const graph = new Graph(this.isDirected ? "directed" : "undirected");
        for (const vertex of this.vertices.values) {
            const vertexClone = graph.addVertex(
                new GraphNode(vertex.key, vertex.data)
            );
            for (const edge of vertex.edges.values) {
                graph.addEdge(vertexClone, new GraphNode(edge.key, edge.data));
            }
        }
        return graph;
    }

    get verticesSize() {
        return this.vertices.values.length;
    }

    get edgesSize() {
        let size = 0;
        for (const node of this.vertices.values) {
            size += node.edges.values.length;
        }
        return size;
    }

    /**
     * Convert the graph to an array following the Breadth-first search
     * @param {GraphNode} start
     * @returns {GraphNode[]}
     */
    toBFS(start = this.vertices.values[0]) {
        if (!(start instanceof GraphNode)) return [];
        const queue = new Queue();
        /**
         * @type {GraphNode[]}
         */
        const visited = [];
        queue.enqueue(start);
        while (!queue.isEmpty()) {
            /**
             * @type {GraphNode}
             */
            const node = queue.dequeue();
            if (
                node &&
                !visited.find((focusedNode) =>
                    GraphNode.compareInstance(node, focusedNode)
                )
            ) {
                visited.push(node);
                node.edges.values.forEach((edge) => queue.enqueue(edge));
            }
        }
        return visited;
    }

    /**
     * Convert the graph to an array following the Depth-first search
     * @param {GraphNode} start
     * @returns {GraphNode[]}
     */
    toDFS(start = this.vertices.values[0]) {
        if (!(start instanceof GraphNode)) return [];
        const stack = new Stack();
        /**
         * @type {GraphNode[]}
         */
        const visited = [];
        stack.push(start);
        while (!stack.isEmpty()) {
            /**
             * @type {GraphNode}
             */
            const node = stack.pop();
            if (
                node &&
                !visited.find((focusedNode) =>
                    GraphNode.compareInstance(node, focusedNode)
                )
            ) {
                visited.push(node);
                node.edges.values.forEach((edge) => stack.push(edge));
            }
        }
        return visited;
    }
};
