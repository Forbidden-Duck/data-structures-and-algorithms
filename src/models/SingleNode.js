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
        return true;
    }
};