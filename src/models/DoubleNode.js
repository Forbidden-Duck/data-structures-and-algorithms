/**
 * @private @property {DoubleNode} _next
 * @private @property {DoubleNode} _previous
 * @property {DoubleNode} next
 * @property {DoubleNode} previous
 * @property {*} data
 */
module.exports = class DoubleNode {
    /**
     * 
     * @param {string} data 
     */
    constructor(data) {
        this.data = data;
        this._next = null;
        this._previous = null;
    }

    get next() {
        return this._next;
    }

    get previous() {
        return this._previous;
    }
};