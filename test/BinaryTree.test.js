const BinaryTree = require("../src/structures/BinaryTree");
const TreeNode = require("../src/models/TreeNode");

describe("BinaryTree", () => {
    describe("constructor", () => {
        it("should create an instance of BinaryTree", () => {
            expect(new BinaryTree()).toBeInstanceOf(BinaryTree);
        });
        it("should set the root property to null", () => {
            expect(new BinaryTree().root).toBeNull();
        });
    });

    describe("get root", () => {
        it("should return the set TreeNode", () => {
            const tree = new BinaryTree();
            const root = new TreeNode("root");
            tree._root = root;
            expect(tree.root).toBeInstanceOf(TreeNode);
            expect(tree.root).toMatchObject(root);
        });
    });
});
