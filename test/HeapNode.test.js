const HeapNode = require("../src/models/HeapNode");

describe("HeapNode", () => {
    describe("constructor", () => {
        it("should create an instance of HeapNode", () => {
            expect(new HeapNode()).toBeInstanceOf(HeapNode);
        });
        it("should add key to it's properties", () => {
            expect(new HeapNode(1).key).toBe(1);
        });
        it("should add data to it's properties", () => {
            expect(new HeapNode(null, 1).data).toBe(1);
        });
    });

    describe("compareInstance", () => {
        it("should return null if node1 is not an instance of HeapNode", () => {
            const node1 = { data: "Not a HeapNode" };
            const node2 = new HeapNode("Not a HeapNode"); // Match the data
            expect(HeapNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return null if node2 is not an instance of HeapNode", () => {
            const node1 = new HeapNode("Not a HeapNode"); // Match the data
            const node2 = { data: "Not a HeapNode" };
            expect(HeapNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return null if node1 & node2 is not an instance of HeapNode", () => {
            const node1 = { data: "Not a HeapNode" };
            const node2 = { data: "Not a HeapNode" };
            expect(HeapNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return true if two of the same instances are present", () => {
            const node = new HeapNode(1, 2);
            expect(HeapNode.compareInstance(node, node)).toBe(true);
        });
        it("should return true if two instances have the same key and data", () => {
            const node1 = new HeapNode(1, 2);
            const node2 = new HeapNode(1, 2);
            expect(HeapNode.compareInstance(node1, node2)).toBe(true);
        });
        it("should return false if two instances have different data", () => {
            const node1 = new HeapNode(1, 2);
            const node2 = new HeapNode(1, 3);
            expect(HeapNode.compareInstance(node1, node2)).toBe(false);
        });
        it("should return false if two instances have different key", () => {
            const node1 = new HeapNode(1, 3);
            const node2 = new HeapNode(2, 3);
            expect(HeapNode.compareInstance(node1, node2)).toBe(false);
        });
    });
});
