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
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0)
                throw new TypeEror("node can not be an empty array");
            for (const nodeItem of node) {
                this.insert(nodeItem);
            }
            return node[0];
        }
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
