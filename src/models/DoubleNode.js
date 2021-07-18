module.exports = class DoubleNode {
    constructor(data) {
        this.data = data;
        /**
         * @private
         * @type {DoubleNode}
         */
        this._next = null;
        /**
         * @private
         * @type {DoubleNode}
         */
        this._previous = null;
    }

    get next() {
        return this._next;
    }

    get previous() {
        return this._previous;
    }

    /**
     * Compare two instances of DoubleNode
     * @param {DoubleNode} a
     * @param {DoubleNode} b
     * @param {"next" | "previous"} [skip] used to prevent call back errors
     */
    static compareInstance(a, b, skip) {
        if (!(a instanceof DoubleNode) || !(b instanceof DoubleNode))
            return null;
        if (typeof a.data !== typeof b.data) return false;

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

        // Check every instance of next or previous nodes are truthy
        if (a.next !== null && b.next !== null && skip !== "next") {
            // Stops it going back up the list
            if (!DoubleNode.compareInstance(a._next, b._next, "previous"))
                return false;
        }
        if (a.previous !== null && b.previous !== null && skip !== "previous") {
            // Stops it going back down the list
            if (!DoubleNode.compareInstance(a._previous, b._previous, "next"))
                return false;
        }
        return true;
    }
};
