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

    /**
     * Delete the node from the tree
     * @param {TreeNode} node
     */
    delete(node) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0)
                throw new TypeError("node can not be an empty array");
            for (const nodeItem of node) {
                this.delete(nodeItem);
            }
            return;
        }
        const deleteRecursive = (focusedNode) => {
            if (!(focusedNode instanceof TreeNode)) return null;
            // Find the specified node
            if (node.key < focusedNode.key) {
                focusedNode._left = deleteRecursive(focusedNode.left);
            } else if (node.key > focusedNode.key) {
                focusedNode._right = deleteRecursive(focusedNode.right);
            } else {
                // Focused is the node to delete
                /**
                 * If no children are left, return null
                 * There is no need to add a statement as checking
                 * the left child and return the right, will return null anyway
                 */
                if (!(focusedNode._left instanceof TreeNode))
                    return focusedNode._right;
                if (!(focusNode._right instanceof TreeNode))
                    return focusedNode._left;
                const minRight = this.min(focusedNode.right);
                focusedNode = Object.assign(focusedNode, {
                    key: minRight.key,
                    value: minRight.value,
                });
                focusedNode._right = this.deleteRecursive(focusedNode.right);
            }
            return focusedNode;
        };
        this._root = deleteRecursive(this.root);
    }

    /**
     * Clear the tree
     */
    clear() {
        // Recursively unlink every node
        // Should remove the risk of a potential memory leak (unlikely either way)
        const clearRecursive = (focusedNode) => {
            this.delete([focusedNode, focusedNode.left, focusedNode.right]);
            if (this.root instanceof TreeNode) {
                clearRecursive(this.root);
            }
        };
        clearRecursive(this.root);
    }

    /**
     * Find the smallest key in the tree
     * @returns {TreeNode}
     */
    min(node = this.root) {
        if (!(node instanceof TreeNode)) return null;
        if (node.left instanceof TreeNode) return min(node.left);
        return node;
    }
};
