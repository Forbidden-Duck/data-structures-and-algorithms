const TreeNode = require("../models/TreeNode");

module.exports = class BinaryTree {
    constructor() {
        /**
         * @private
         */
        this._root = null;
    }

    get root() {
        return this._root;
    }

    /**
     * Insert the node into the tree
     * @param {TreeNode} node
     * @returns {TreeNode}
     */
    insert(node) {
        const insertRecursive = (focusedNode) => {
            if (!(focusedNode instanceof TreeNode)) return node;
            if (node.key < focusedNode.key) {
                focusedNode._left = insertRecursive(focusedNode.left);
            } else if (node.key > focusedNode.key) {
                focusedNode._right = insertRecursive(focusedNode.right);
            }
            return focusedNode;
        };
        if (!(node instanceof TreeNode))
            throw new TypeError("node much be an instance of TreeNode");
        return (this._root = insertRecursive(this.root));
    }
};
