const BinaryTree = require("../src/structures/BinaryTree");
const TreeNode = require("../src/models/TreeNode");

const BT = new BinaryTree();

describe("BinaryTree", () => {
    describe("constructor", () => {
        it("should create an instance of BinaryTree", () => {
            expect(BT).toBeInstanceOf(BinaryTree);
        });
        it("should set the root property to null", () => {
            expect(BT.root).toBeNull();
        });
    });

    describe("get root", () => {
        it("should return the set TreeNode", () => {
            // New instance to not override existing root node
            const tree = new BinaryTree();
            const root = new TreeNode("root");
            tree._root = root;
            expect(tree.root).toBeInstanceOf(TreeNode);
            expect(tree.root).toMatchObject(root);
        });
    });
});
