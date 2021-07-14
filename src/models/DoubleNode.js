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
};
