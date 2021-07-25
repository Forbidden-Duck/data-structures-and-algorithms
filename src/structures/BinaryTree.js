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
        if (!(node instanceof TreeNode))
            throw new TypeError("node much be an instance of TreeNode");
        this.forEach((focusedNode) => {
            if (node.key < focusedNode.key) {
                if (focusedNode.left instanceof TreeNode)
                    return focusedNode.left;
                focusedNode.left = node;
                node.parent = focusedNode;
                return null;
            }
            if (node.key > focusedNode.key) {
                if (focusedNode.right instanceof TreeNode)
                    return focusedNode.right;
                focusedNode.right = node;
                node.parent = focusedNode;
                return;
                null;
            }
            focusedNode.data = node.data;
            return null;
        });
        return node;
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
        this.forEach((focusedNode) => {
            this.delete(focusedNode);
        });
    }

    /**
     * Get the specified key
     * @param {number} key
     * @return {TreeNode}
     */
    get(key) {
        if (isNaN(parseInt(key))) throw new TypeError("key must be a number");
        let foundNode = null;
        this.forEach((focusedNode) => {
            if (focusedNode.key === key) {
                foundNode = focusedNode;
                return null;
            }
        });
        return foundNode;
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

    /**
     * Loops through the tree prioritising the left side
     * Returning a node in the callbackFn will restart the loop at that node
     * @param {function} callbackFn (value as DoubleNode, this)
     * @param {*} thisArg If provided it will be used as this for each invocation of the callback
     */
    forEach(callbackFn, startNode = this.root, thisArg) {
        const forEachRecursive = (focusedNode) => {
            if (!(focusedNode instanceof TreeNode)) return;
            const forEachNode = callbackFn(focusedNode, this);

            // If the callback sends back a node, restart recursion
            if (forEachNode instanceof TreeNode) {
                forEachRecursive(forEachNode);
                return null; // null will stop the previous recursions from happening
            } else if (forEachNode === null) return null;

            if (focusedNode.left instanceof TreeNode) {
                const forEachLeft = forEachRecursive(focusedNode.left);
                if (forEachLeft === null) return null; // If null, stop recursion
            }
            if (focusedNode.right instanceof TreeNode) {
                const forEachRight = forEachRecursive(focusedNode.right);
                if (forEachRight === null) return null;
            }
        };
        if (!(callbackFn instanceof Function))
            throw new TypeError("callbackFn must be a function");
        if (thisArg) callbackFn = callbackFn.bind(thisArg);
        forEachRecursive(startNode);
    }
};
