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
     */
    static compareInstance(a, b) {
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

        // Check every instance of next and previous nodes are truthy
        if (a.next !== null && b.next !== null) {
            if (!DoubleNode.compareInstance(a._next, b._next)) return false;
        }
        if (a.previous !== null && b.previous !== null) {
            if (!DoubleNode.compareInstance(a._previous, b._previous))
                return false;
        }
        if (
            [false, null].includes(nextTruthy) ||
            [false, null].includes(previousTruthy)
        )
            return false;
        return true;
    }
};
