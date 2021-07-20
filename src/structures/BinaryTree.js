const TreeNode = require("../models/TreeNode");

module.exports = class BinaryTree {
    constructor() {
        this._root = null;
    }

    get root() {
        return this._root;
    }
};
