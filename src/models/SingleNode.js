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
};