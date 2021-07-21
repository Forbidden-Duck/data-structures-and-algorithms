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
     * @param {"left" | "right" | "parent"} skip
     */
    static compareInstance(a, b, skip) {
        throw new Error("Not implemented yet");
    }
};
