module.exports = class TreeNode {
    /**
     *
     * @param {number} key
     * @param {*} data
     */
    constructor(key, data) {
        /**
         * @private
         */
        this._key = key;
        this.data = data;
        /**
         * @private
         */
        this._left = null;
        /**
         * @private
         */
        this._right = null;
        /**
         * @private
         */
        this._parent = null;
    }

    get key() {
        return this._key;
    }

    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }

    get parent() {
        return this._parent;
    }

    /**
     * Compare two instances of TreeNode
     * @param {TreeNode} a
     * @param {TreeNode} b
     */
    static compareInstance(a, b) {
        if (!(a instanceof TreeNode) || !(b instanceof TreeNode)) return null;
        if (typeof a.data !== typeof b.data) return false;
        if (a.key !== b.key) return false;

        switch (a.data) {
            case "object": {
                for (const [key, value] of Object.entries(a.data)) {
                    if (a.data[key] !== b.data[key]) return false;
                }
                break;
            }
            case "function": {
                if (a.data.toString() !== b.data.toString()) return false;
                break;
            }
            default: {
                if (a.data !== b.data) return false;
                break;
            }
        }

        // Check every instance of left and right nodes are truthy
        if (a.left !== null && b.left !== null) {
            if (!TreeNode.compareInstance(a.left, b.left)) return false;
        }
        if (a.right !== null && b.right !== null) {
            if (!TreeNode.compareInstance(a.right, b.right)) return false;
        }
        return true;
    }
};
