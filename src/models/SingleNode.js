/**
 * @private @property {SingleNode} _next
 * @property {SingleNode} next
 * @property {*} data
 */
module.exports = class SingleNode {
    /**
     * 
     * @param {string} data 
     */
    constructor(data) {
        this.data = data;
        this._next = null;
    }

    get next() {
        return this._next;
    }
};