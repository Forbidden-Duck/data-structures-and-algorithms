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
        if (!(this.root instanceof TreeNode)) {
            this._root = node;
            return this.root;
        }
        this.forEach((focusedNode) => {
            if (node.key < focusedNode.key) {
                if (focusedNode.left instanceof TreeNode)
                    return focusedNode.left;
                focusedNode._left = node;
                node._parent = focusedNode;
                return null;
            }
            if (node.key > focusedNode.key) {
                if (focusedNode.right instanceof TreeNode)
                    return focusedNode.right;
                focusedNode._right = node;
                node._parent = focusedNode;
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
                if (!(focusedNode._right instanceof TreeNode))
                    return focusedNode._left;
                const minRight = this.min(focusedNode.right);
                focusedNode = Object.assign(focusedNode, {
                    _key: minRight.key,
                    data: minRight.data,
                });
                focusedNode._right = deleteRecursive(focusedNode.right);
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
     * Find a node based on the callbackFn
     * @param {function} callbackFn
     * @returns {TreeNode}
     */
    find(callbackFn) {
        if (!(callbackFn instanceof Function))
            throw new TypeError("callbackFn must be a function");
        let node = null;
        this.forEach((focusedNode) => {
            const cbValue = callbackFn(focusedNode);
            if (cbValue && node === null) {
                node = focusedNode;
                return null;
            }
            return cbValue;
        });
        return node;
    }

    /**
     * Find the smallest key in the tree
     * @returns {TreeNode}
     */
    min(node = this.root) {
        if (!(node instanceof TreeNode)) return null;
        if (node.left instanceof TreeNode) return this.min(node.left);
        return node;
    }

    /**
     * Find the largest key in the tree
     * @returns {TreeNode}
     */
    max(node = this.root) {
        if (!(node instanceof TreeNode)) return null;
        if (node.right instanceof TreeNode) return this.max(node.right);
        return node;
    }

    /**
     * Find the node with a key less than the specified key
     * @param {number} key
     * @returns {TreeNode}
     */
    lowerBound(key) {
        key = parseInt(key);
        if (isNaN(key)) return null;
        let smallestNode = null;
        this.forEach((node) => {
            if (
                node.key < key &&
                (smallestNode === null || node.key > smallestNode.key)
            )
                smallestNode = node;
        });
        return smallestNode;
    }

    /**
     * Find the node with a key more than the specified key
     * @param {number} key
     * @returns {TreeNode}
     */
    upperBound(key) {
        key = parseInt(key);
        if (isNaN(key)) return null;
        let largestNode = null;
        this.forEach((node) => {
            if (
                node.key > key &&
                (largestNode === null || node.key < largestNode.key)
            )
                largestNode = node;
        });
        return largestNode;
    }

    /**
     * Loops through the tree prioritising the left side
     * Returning a node in the callbackFn will restart the loop at that node
     * @param {function} callbackFn (value as TreeNode, this)
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
     * Immutably clone the tree and it's nodes
     * @returns {BinaryTree}
     */
    clone() {
        const tree = new BinaryTree();
        this.forEach((node) => tree.insert(new Tree(node.data)));
        return tree;
    }

    /**
     * Return the size of the tree
     * @returns {number}
     */
    get size() {
        let size = 0;
        this.forEach((node) => size++);
        return size;
    }

    /**
     * Traverse the tree in pre-order
     * @returns {TreeNode[]}
     */
    toPreOrder() {
        const array = [];
        const toPreOrderRecursive = (focusedNode) => {
            array.push(focusedNode);
            if (focusedNode.left instanceof TreeNode)
                toPreOrderRecursive(focusedNode.left);
            if (focusedNode.right instanceof TreeNode)
                toPreOrderRecursive(focusedNode.right);
        };
        toPreOrderRecursive(this.root);
        return array;
    }

    /**
     * Traverse the tree in in-order
     * @returns {TreeNode[]}
     */
    toInOrder() {
        const array = [];
        const toInOrderRecursive = (focusedNode) => {
            if (focusedNode.left instanceof TreeNode)
                toInOrderRecursive(focusedNode.left);
            array.push(focusedNode);
            if (focusedNode.right instanceof TreeNode)
                toInOrderRecursive(focusedNode.right);
        };
        toInOrderRecursive(this.root);
        return array;
    }

    /**
     * Traverse the tree in post-order
     * @returns {TreeNode[]}
     */
    toPostOrder() {
        const array = [];
        const toPostOrderRecursive = (focusedNode) => {
            if (focusedNode.left instanceof TreeNode)
                toPostOrderRecursive(focusedNode.left);
            if (focusedNode.right instanceof TreeNode)
                toPostOrderRecursive(focusedNode.right);
            array.push(focusedNode);
        };
        toPostOrderRecursive(this.root);
        return array;
    }
};
