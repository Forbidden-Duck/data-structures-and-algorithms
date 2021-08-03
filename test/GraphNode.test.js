const GraphNode = require("../src/models/GraphNode");
const HashMap = require("../src/structures/HashMap");

describe("GraphNode", () => {
    describe("constructor", () => {
        it("should create an instance of GraphNode", () => {
            expect(new GraphNode()).toBeInstanceOf(GraphNode);
        });
        it("should add keys to it's properties", () => {
            expect(new GraphNode(1).key).toBe(1);
        });
        it("should add data to it's properties", () => {
            expect(new GraphNode(null, 1).data).toBe(1);
        });
        it("should add edges as an empty hash map property", () => {
            const node = new GraphNode();
            expect(node.edges).toBeInstanceOf(HashMap);
            expect(node.edges.keys).toStrictEqual([]);
            expect(node.edges.values).toStrictEqual([]);
        });
    });

    describe("getEdge", () => {
        it("should return the specified edge", () => {
            const node1 = new GraphNode(1, 2);
            const node2 = new GraphNode(2, 3);
            node1.edges.set(node2.key, node2);
            expect(node1.getEdge(2)).toMatchObject(node2);
        });
    });

    describe("addEdge", () => {
        it("should add the edge link", () => {
            const node1 = new GraphNode(1, 2);
            const node2 = new GraphNode(2, 3);
            node1.addEdge(node2);
            expect(node1.edges.get(2)).toMatchObject(node2);
        });
    });

    describe("removeEdge", () => {
        it("should remove the edge link", () => {
            const node1 = new GraphNode(1, 2);
            const node2 = new GraphNode(2, 3);
            node1.addEdge(node2);
            expect(node1.getEdge(2)).toMatchObject(node2);
            node1.deleteEdge(2);
            expect(node1.getEdge(2)).toBeUndefined();
        });
    });

    describe("compareInstance", () => {
        it("should return null if node1 is not an instance of GraphNode", () => {
            const node1 = { data: "Not a GraphNode" };
            const node2 = new GraphNode("Not a GraphNode"); // Match the data
            expect(GraphNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return null if node2 is not an instance of GraphNode", () => {
            const node1 = new GraphNode("Not a GraphNode"); // Match the data
            const node2 = { data: "Not a GraphNode" };
            expect(GraphNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return null if node1 & node2 is not an instance of GraphNode", () => {
            const node1 = { data: "Not a GraphNode" };
            const node2 = { data: "Not a GraphNode" };
            expect(GraphNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return true if two of the same instances are present", () => {
            const node = new GraphNode(1, 2);
            expect(GraphNode.compareInstance(node, node)).toBe(true);
        });
        it("should return true if two instances have the same key and data", () => {
            const node1 = new GraphNode(1, 2);
            const node2 = new GraphNode(1, 2);
            expect(GraphNode.compareInstance(node1, node2)).toBe(true);
        });
        it("should return false if two instances have different data", () => {
            const node1 = new GraphNode(1, 2);
            const node2 = new GraphNode(1, 3);
            expect(GraphNode.compareInstance(node1, node2)).toBe(false);
        });
        it("should return false if two instances have different key", () => {
            const node1 = new GraphNode(1, 3);
            const node2 = new GraphNode(2, 3);
            expect(GraphNode.compareInstance(node1, node2)).toBe(false);
        });
    });
});
