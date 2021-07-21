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
        if (!(this.root instanceof TreeNode)) return (this.root = node);
        this.forEach((focusedNode) => {
            if (node.key < focusedNode.key) {
                if (focusedNode.left instanceof TreeNode) {
                    return focusedNode.left;
                }
                focusedNode.left = node;
                node.parent = focusedNode;
                return null;
            }
            if (node > focusedNode.key) {
                if (focusedNode.right instanceof TreeNode) {
                    return focusNode.right;
                }
                focusedNode.right = node;
                node.parent = focusedNode;
                return null;
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
        if (!(node instanceof TreeNode))
            throw new TypeError("node much be an instance of TreeNode");
        if (!(this.root instanceof TreeNode))
            throw new TypeError("There is no nodes in the tree");
        this.forEach((focusedNode) => {
            if (!(focusedNode instanceof TreeNode)) return null;
            // Find the specified node
            if (node.key < focusedNode.key) {
                return focusedNode.left;
            }
            if (node.key > focusedNode.key) {
                return focusedNode.right;
            }
            // Focused node is the node to remove
            const nodeIsRoot = TreeNode.compareInstance(focusedNode, this.root);
            /**
             * If no children are left, return null
             * There is no need to add a statement as checking
             * the left child and return the right, will return null anyway
             */
            // Node has only a right child
            if (!(focusedNode.left instanceof TreeNode)) {
                if (nodeIsRoot) {
                    this.root = node.right;
                } else {
                    if (
                        TreeNode.compareInstance(
                            focusedNode.parent.left,
                            focusedNode
                        )
                    ) {
                        focusedNode.parent.left = focusedNode.right;
                    } else if (
                        TreeNode.compareInstance(
                            focusedNode.parent.right,
                            focusedNode
                        )
                    ) {
                        focusedNode.parent.right = focusedNode.right;
                    }
                    if (focusedNode.right instanceof TreeNode) {
                        // Since no children can parsed here
                        focusedNode.right.parent = focusedNode.parent;
                    }
                    focusedNode.parent = null;
                }
                return null;
            }
            // Node has only a left child
            if (!(focusedNode.right instanceof TreeNode)) {
                if (nodeIsRoot) {
                    this.root = node.left;
                } else {
                    if (
                        TreeNode.compareInstance(
                            focusedNode.parent.left,
                            focusedNode
                        )
                    ) {
                        focusedNode.parent.left = focusedNode.left;
                    } else if (
                        TreeNode.compareInstance(
                            focusedNode.parent.right,
                            focusedNode
                        )
                    ) {
                        focusedNode.parent.right = focusedNode.left;
                    }
                    focusedNode.left.parent = focusedNode.parent;
                    focusedNode.parent = null;
                }
                return null;
            }
            // Node has both children
            const minRight = this.min(focusedNode.right);
            focusedNode = Object.assign(focusedNode, {
                key: minRight.key,
                data: minRight.data,
            });
            return focusedNode.right;
        });
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
