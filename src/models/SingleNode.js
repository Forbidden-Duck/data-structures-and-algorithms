module.exports = class SingleNode {
    constructor(data) {
        this.data = data;
        /**
         * @private
         * @type {SingleNode}
         */
        this._next = null;
    }

    get next() {
        return this._next;
    }

    /**
     * Compare two instances of SingleNode
     * @param {SingleNode} a 
     * @param {SingleNode} b 
     * @returns 
     */
    static compareInstance(a, b) {
        if (!(a instanceof SingleNode)
            || !(b instanceof SingleNode)) {
            return null;
        }
        if (typeof a.data !== typeof b.data) {
            return false;
        }
        switch (typeof a.data) {
            case "object": {
                for (const [key, value] of Object.entries(a.data)) {
                    if (a.data[key] !== b.data[key]) {
                        return false;
                    }
                }
                break;
            }
            case "function": {
                if (a.data.toString() !== b.data.toString()) {
                    return false;
                }
            }
            default: {
                if (a.data !== b.data) {
                    return false;
                }
            }
        }
        if (a.next !== null && b.next !== null) {
            // Check both instances of next nodes are correct
            return SingleNode.compareInstance(a._next, b._next);
        }
        if ((a.next === null && b.next !== null)
            || (a.next !== null && b.next === null)) {
            return false;
        }
        return true;
    }
};