module.exports = class HeapNode {
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
    }

    get key() {
        return this._key;
    }

    /**
     * Compare two instances of HeapNode
     * @param {HeapNode} a
     * @param {HeapNode} b
     */
    static compareInstance(a, b) {
        if (!(a instanceof HeapNode) || !(b instanceof HeapNode)) return null;
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
        return true;
    }
};
