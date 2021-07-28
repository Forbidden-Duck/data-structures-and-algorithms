const TreeNode = require("../src/models/TreeNode");

describe("TreeNode", () => {
    describe("constructor", () => {
        it("it should create an instance of TreeNode", () => {
            const node = new TreeNode();
            expect(node).toBeInstanceOf(TreeNode);
        });
        it("should add key to it's properties", () => {
            const key = 1;
            const node = new TreeNode(key, 2);
            expect(node.key).toStrictEqual(key);
        });
        it("should add data to it's properties", () => {
            const data = "my data";
            const node = new TreeNode(1, data);
            expect(node.data).toStrictEqual(data);
        });
        it("should set the left property as null", () => {
            const node = new TreeNode();
            expect(node.left).toBeNull();
        });
        it("should set the right property as null", () => {
            const node = new TreeNode();
            expect(node.right).toBeNull();
        });
    });

    describe("get left", () => {
        it("should return the set TreeNode", () => {
            const node = new TreeNode(1);
            const leftNode = new TreeNode(2);
            node._left = leftNode;
            expect(node.left).toBeInstanceOf(TreeNode);
            expect(node.left).toMatchObject(leftNode);
        });
    });

    describe("get right", () => {
        it("should return the set TreeNode", () => {
            const node = new TreeNode(1);
            const rightNode = new TreeNode(2);
            node._right = rightNode;
            expect(node.right).toBeInstanceOf(TreeNode);
            expect(node.right).toMatchObject(rightNode);
        });
    });

    describe("compareInstance", () => {
        it("should return null if node1 is not an instance of TreeNode", () => {
            const node1 = { data: "Not a TreeNode" };
            const node2 = new TreeNode("Not a TreeNode"); // Match the data
            expect(TreeNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return null if node2 is not an instance of TreeNode", () => {
            const node1 = new TreeNode("Not a TreeNode"); // Match the data
            const node2 = { data: "Not a TreeNode" };
            expect(TreeNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return null if node1 & node2 is not an instance of TreeNode", () => {
            const node1 = { data: "Not a TreeNode" };
            const node2 = { data: "Not a TreeNode" };
            expect(TreeNode.compareInstance(node1, node2)).toBeNull();
        });
        it("should return true if two of the same instances are present", () => {
            const node = new TreeNode(1);
            expect(TreeNode.compareInstance(node, node)).toBe(true);
        });
        it("should return true if two instances have the same data", () => {
            const node1 = new TreeNode(1);
            const node2 = new TreeNode(1);
            expect(TreeNode.compareInstance(node1, node2)).toBe(true);
        });
        it("should return false if two instances have different data", () => {
            const node1 = new TreeNode(1);
            const node2 = new TreeNode(2);
            expect(TreeNode.compareInstance(node1, node2)).toBe(false);
        });
        it("should return true if two instances have the same left and data", () => {
            const node1 = new TreeNode(1);
            const node1Left = new TreeNode(2);
            node1._left = node1Left;
            const node2 = new TreeNode(1);
            const node2Left = new TreeNode(2);
            node2._left = node2Left;
            expect(TreeNode.compareInstance(node1, node2)).toBe(true);
        });
        it("should return false if two instances have same left but different data", () => {
            const node1 = new TreeNode(1);
            const node1Left = new TreeNode(2);
            node1._left = node1Left;
            const node2 = new TreeNode(2);
            const node2Left = new TreeNode(2);
            node2._left = node2Left;
            expect(TreeNode.compareInstance(node1, node2)).toBe(false);
        });
        it("should return false if two instances have different left but same data", () => {
            const node1 = new TreeNode(1);
            const node1Left = new TreeNode(2);
            node1._left = node1Left;
            const node2 = new TreeNode(1);
            const node2Left = new TreeNode(1);
            node2._left = node2Left;
            expect(TreeNode.compareInstance(node1, node2)).toBe(false);
        });
        it("should return true if two instances have the same right and data", () => {
            const node1 = new TreeNode(1);
            const node1Right = new TreeNode(2);
            node1._right = node1Right;
            const node2 = new TreeNode(1);
            const node2Right = new TreeNode(2);
            node2._right = node2Right;
            expect(TreeNode.compareInstance(node1, node2)).toBe(true);
        });
        it("should return false if two instances have same right but different data", () => {
            const node1 = new TreeNode(1);
            const node1Right = new TreeNode(2);
            node1._left = node1Right;
            const node2 = new TreeNode(2);
            const node2Right = new TreeNode(2);
            node2._left = node2Right;
            expect(TreeNode.compareInstance(node1, node2)).toBe(false);
        });
        it("should return false if two instances have different right but same data", () => {
            const node1 = new TreeNode(1);
            const node1Right = new TreeNode(2);
            node1._left = node1Right;
            const node2 = new TreeNode(1);
            const node2Right = new TreeNode(1);
            node2._left = node2Right;
            expect(TreeNode.compareInstance(node1, node2)).toBe(false);
        });
    });
});
