const DoubleNode = require("../src/models/DoubleNode");

describe("DoubleNode", () => {
    describe("constructor", () => {
        it("should create an instance of DoubleNode", () => {
            const node = new DoubleNode();
            expect(node).toBeInstanceOf(DoubleNode);
        });
        it("should add data to it's properties", () => {
            const data = "my data";
            const node = new DoubleNode(data);
            expect(node.data).toStrictEqual(data);
        });
        it("should set next property as null", () => {
            const node = new DoubleNode();
            expect(node.next).toBeNull();
        });
        it("should set previous property as null", () => {
            const node = new DoubleNode();
            expect(node.previous).toBeNull();
        });
    });

    describe("get next", () => {
        it("should return the set DoubleNode", () => {
            const node = new DoubleNode(1);
            const nextNode = new DoubleNode(2);
            node._next = nextNode;
            expect(node.next).toBeInstanceOf(DoubleNode);
            expect(node.next).toMatchObject(nextNode);
        });
    });

    describe("get previous", () => {
        it("should return the set DoubleNode", () => {
            const node = new DoubleNode(1);
            const previousNode = new DoubleNode(2);
            node._previous = previousNode;
            expect(node.previous).toBeInstanceOf(DoubleNode);
            expect(node.previous).toMatchObject(previousNode);
        });
    });

    describe("compareInstance", () => {
        it("should return null if node1 is not an instance of DoubleNode", () => {
            const node1 = { data: "Not a DoubleNode" };
            const node2 = new DoubleNode("Not a DoubleNode"); // Match the data
            expect(DoubleNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return null if node2 is not an instance of DoubleNode", () => {
            const node1 = new DoubleNode("Not a DoubleNode"); // Match the data
            const node2 = { data: "Not a DoubleNode" };
            expect(DoubleNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return null if node1 & node2 is not an instance of DoubleNode", () => {
            const node1 = { data: "Not a DoubleNode" };
            const node2 = { data: "Not a DoubleNode" };
            expect(DoubleNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return true if two of the same instances are present", () => {
            const node = new DoubleNode(1);
            expect(DoubleNode.compareInstance(node, node)).toBe(true);
        });
        it("should return true if two instances have the same data", () => {
            const node1 = new DoubleNode(1);
            const node2 = new DoubleNode(1);
            expect(DoubleNode.compareInstance(node1, node2)).toBe(true);
        });
        it("should return false if two instances have different data", () => {
            const node1 = new DoubleNode(1);
            const node2 = new DoubleNode(2);
            expect(DoubleNode.compareInstance(node1, node2)).toBe(false);
        });
        it("should return true if two instances have the same next and data", () => {
            const node1 = new DoubleNode(1);
            const node1Next = new DoubleNode(2);
            node1._next = node1Next;
            const node2 = new DoubleNode(1);
            const node2Next = new DoubleNode(2);
            node2._next = node2Next;
            expect(DoubleNode.compareInstance(node1, node2)).toBe(true);
        });
        it("should return false if two instances have same next but different data", () => {
            const node1 = new DoubleNode(1);
            const node1Next = new DoubleNode(2);
            node1._next = node1Next;
            const node2 = new DoubleNode(2);
            const node2Next = new DoubleNode(2);
            node2._next = node2Next;
            expect(DoubleNode.compareInstance(node1, node2)).toBe(false);
        });
        it("should return false if two instances have different next but same data", () => {
            const node1 = new DoubleNode(1);
            const node1Next = new DoubleNode(2);
            node1._next = node1Next;
            const node2 = new DoubleNode(1);
            const node2Next = new DoubleNode(1);
            node2._next = node2Next;
            expect(DoubleNode.compareInstance(node1, node2)).toBe(false);
        });
        it("should return true if two instances have the same previous and data", () => {
            const node1 = new DoubleNode(1);
            const node1Previous = new DoubleNode(2);
            node1._previous = node1Previous;
            const node2 = new DoubleNode(1);
            const node2Previous = new DoubleNode(2);
            node2._previous = node2Previous;
            expect(DoubleNode.compareInstance(node1, node2)).toBe(true);
        });
        it("should return false if two instances have same previous but different data", () => {
            const node1 = new DoubleNode(1);
            const node1Previous = new DoubleNode(2);
            node1._next = node1Previous;
            const node2 = new DoubleNode(2);
            const node2Previous = new DoubleNode(2);
            node2._next = node2Previous;
            expect(DoubleNode.compareInstance(node1, node2)).toBe(false);
        });
        it("should return false if two instances have different previous but same data", () => {
            const node1 = new DoubleNode(1);
            const node1Previous = new DoubleNode(2);
            node1._next = node1Previous;
            const node2 = new DoubleNode(1);
            const node2Previous = new DoubleNode(1);
            node2._next = node2Previous;
            expect(DoubleNode.compareInstance(node1, node2)).toBe(false);
        });
    });
});
