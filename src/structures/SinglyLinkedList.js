const SingleNode = require("../models/SingleNode");

module.exports = class SinglyLinkedList {
    constructor() {
        /**
         * @private
         */
        this._head = null;
        /**
         * @private
         */
        this._tail = null;
    }

    get head() {
        return this._head;
    }

    get tail() {
        return this._tail;
    }

    /**
     * Prepend a node to the start of the list
     * @param {SingleNode} node
     * @returns {SingleNode}
     */
    prepend(node) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0) return this._head;
            // Loop through the nodes in reverse
            for (let i = node.length - 1; i >= 0; i--) {
                this.prepend(node[i]);
            }
            return this._head;
        }
        if (!(node instanceof SingleNode))
            throw new TypeError("node must be an instance of SingleNode");

        // If head or tail are null, set head and tail as node
        if (this._head === null || this._tail === null) {
            this._head = node;
            this._tail = node;
        } else {
            // Set node as the head node & set the original head as the next node
            node._next = this._head;
            this._head = node;
        }
        return this._head;
    }

    /**
     * Append a node to the end of the list
     * @param {SingleNode} node
     * @returns {SingleNode}
     */
    append(node) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0) return this._tail;
            for (const nodeItem of node) {
                this.append(nodeItem);
            }
            return this._tail;
        }
        if (!(node instanceof SingleNode))
            throw new TypeError("node must be an instance of SingleNode");

        // If head or tail are null, set head and tail as node
        if (this._head === null && this._tail === null) {
            this._head = node;
            this._tail = node;
        } else {
            // Set the next node of the tail node as this node, then set the tail as this node
            this._tail._next = node;
            this._tail = node;
        }
        return this._tail;
    }

    /**
     * Insert node1 before node2
     * @param {SingleNode} node
     * @param {SingleNode} nodeBefore
     * @returns {SingleNode}
     */
    insertBefore(node, nodeBefore) {
        // Handle an array of node
        if (Array.isArray(node)) {
            if (node.length <= 0)
                throw new TypeError("node can not be an empty array");
            for (const nodeItem of node) {
                this.insertBefore(nodeItem, nodeBefore);
            }
            return node[0]; // Return the first node of the array
        }
        // Ensure both node and nodeBefore are instances of SingleNode
        if (!(node instanceof SingleNode))
            throw new TypeError("node must be an instance of SingleNode");
        if (!(nodeBefore instanceof SingleNode))
            throw new TypeError("nodeBefore must be an instance of SingleNode");

        // If the list's head is equal to nodeBefore set the head as node
        if (SingleNode.compareInstance(this._head, nodeBefore)) {
            this._head = node;
        } else {
            // Find the node before nodeBefore
            const nodeBeforeNodeBefore = this.getNodeBefore(nodeBefore);
            nodeBeforeNodeBefore._next = node;
        }

        node._next = nodeBefore;
        // Return the previous node of nodeBefore, if insertBefore failed getNodeBefore should be empty
        return this.getNodeBefore(nodeBefore);
    }

    /**
     * Insert node1 after node2
     * @param {SingleNode} node
     * @param {SingleNode} nodeAfter
     * @returns {SingleNode}
     */
    insertAfter(node, nodeAfter) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0)
                throw new TypeError("node can not be an empty array");
            // Loop through the nodes in reverse
            for (let i = node.length - 1; i >= 0; i--) {
                this.insertAfter(node[i], nodeAfter);
            }
            return node[node.length - 1]; // Return the last node of the array
        }
        // Ensure both node and nodeAfter are instances of SingleNode
        if (!(node instanceof SingleNode))
            throw new TypeError("node must be an instance of SingleNode");
        if (!(nodeAfter instanceof SingleNode))
            throw new TypeError("nodeAfter must be an instance of SingleNode");

        // If the list's tail is equal to nodeAfter set the tail as node
        if (SingleNode.compareInstance(this._tail, nodeAfter))
            this._tail = node;

        node._next = nodeAfter.next;
        nodeAfter._next = node;

        // Return the next node of nodeAfter, if insertAfter failed nodeAfter.next should be empty
        return nodeAfter.next;
    }

    /**
     * Delete a node from the list
     * @param {SingleNode} node
     */
    delete(node) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0) return;
            // Loop through the nodes
            for (const nodeItem of node) {
                this.delete(nodeItem);
            }
            return;
        }
        // Check if node is an instance of SingleNode
        if (!(node instanceof SingleNode))
            throw new TypeError("node must be an instance of SingleNode");

        // Check if the node is the head node
        if (SingleNode.compareInstance(node, this._head))
            this._head = node.next;
        // If the node is the tail node set the tail as null
        if (SingleNode.compareInstance(node, this._tail))
            this._tail = this.getNodeBefore(node);

        let focusedNode = this._head;
        while (focusedNode !== null) {
            // If the focusNode's next node is this node
            // Set the next node of focusedNode as this node
            if (focusedNode._next === node) {
                focusedNode._next = node.next;
                // If the tail node is null
                // Set it as the next node or the node before
                if (this._tail === null) {
                    this._tail = node._next || focusedNode;
                }
                return;
            }

            // Update the focusedNode
            focusedNode = focusedNode.next;
        }
    }

    /**
     * Delete the node before the specified node
     * @param {SingleNode} node
     */
    deleteBefore(node) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0) return;
            // Loop through the nodes
            for (const nodeItem of node) {
                this.deleteBefore(nodeItem);
            }
            return;
        }
        // Check if node is an instance of SingleNode
        if (!(node instanceof SingleNode))
            throw new TypeError("node must be an instance of SingleNode");
        // Check if the node is the head node
        if (SingleNode.compareInstance(node, this._head))
            throw new TypeError("There is no node before the head node");

        let focusedNode = this._head;
        while (focusedNode !== null) {
            // If the focusNode's next node is this node
            // Delete focusedNode
            if (SingleNode.compareInstance(focusedNode.next, node)) {
                this.delete(focusedNode);
                return;
            }

            // Update the focusedNode
            focusedNode = focusedNode.next;
        }
    }

    /**
     * Delete the node after the specified node
     * @param {SingleNode} node
     */
    deleteAfter(node) {
        // Handle an array of nodes
        if (Array.isArray(node)) {
            if (node.length <= 0) return;
            // Loop through the nodes
            for (const nodeItem of node) {
                this.deleteAfter(nodeItem);
            }
            return;
        }

        // Check if node is an instance of SingleNode
        if (!(node instanceof SingleNode))
            throw new TypeError("node must be an instance of SingleNode");
        // Check if node is the tail node
        if (SingleNode.compareInstance(node, this._tail))
            throw new TypeError("There is no node after the tail node");
        this.delete(node.next);
    }

    /**
     * Delete all the nodes in the linked list
     */
    clear() {
        this.delete(this.toArray());
    }

    /**
     * Get a node based on the index provided
     * @param {number} index
     * @return {SingleNode}
     */
    get(index) {
        if (isNaN(parseInt(index)))
            throw new TypeError("index must be a number");
        return this.toArray()[parseInt(index)];
    }

    /**
     * Find a node based on the callbackFn
     * @param {function} callbackFn
     * @return {SingleNode}
     */
    find(callbackFn) {
        if (!(callbackFn instanceof Function))
            throw new TypeError("callbackFn must be a function");
        let node = null;
        this.forEach((focusedNode) => {
            if (callbackFn(focusedNode) && node === null) {
                node = focusedNode;
            }
        });
        return node;
    }

    /**
     * Get previous node of the specfied node
     * @param {SingleNode} node
     * @return {SingleNode}
     */
    getNodeBefore(node) {
        // Check if node is an instance of SingleNode
        if (!(node instanceof SingleNode))
            throw new TypeError("node must be an instance of SingleNode");
        // Check if the node is the head node
        if (SingleNode.compareInstance(node, this._head)) return null;

        let focusedNode = this._head;
        while (focusedNode !== null) {
            if (SingleNode.compareInstance(node, focusedNode.next))
                return focusedNode;
            // Update the focusedNode
            focusedNode = focusedNode.next;
        }
        return null;
    }

    /**
     * Loops through the linked list for each item
     * @param {function} callbackFn (value as SingleNode, this)
     * @param {*} thisArg If provided it will be used as this for each invocation of the callback
     */
    forEach(callbackFn, thisArg) {
        if (!(callbackFn instanceof Function))
            throw new TypeError("callbackFn must be a function");
        if (thisArg) callbackFn = callbackFn.bind(thisArg);
        let focusedNode = this._head;
        while (focusedNode !== null) {
            callbackFn(focusedNode, this);
            focusedNode = focusedNode.next;
        }
    }

    /**
     * Filter the list based on the provided callback (does not mutate the original list)
     * @param {function} callbackFn (value as SingleNode, this)
     * @param {*} thisArg If provided it will be used as this for each invocation of the callback
     * @returns {SinglyLinkedList}
     */
    filter(callbackFn, thisArg) {
        if (!(callbackFn instanceof Function))
            throw new TypeError("callbackFn must be a function");
        if (thisArg) callbackFn = callbackFn.bind(thisArg);
        const results = new SinglyLinkedList();
        this.forEach((node, list) => {
            if (!callbackFn(node, list)) return;
            results.append(new SingleNode(node.data));
        });
        return results;
    }

    /**
     * Create a clone of this list and it's nodes
     * @returns {SinglyLinkedList}
     */
    clone() {
        const list = new SinglyLinkedList();
        this.forEach((node) => {
            list.append(new SingleNode(node.data)); // Ensure the nodes are immutable
        });
        return list;
    }

    /**
     * Return the size of the linked list
     * @return {number}
     */
    get size() {
        let size = 0;
        let focusedNode = this._head;
        // For every node increase the size
        while (focusedNode !== null) {
            size++;
            focusedNode = focusedNode.next;
        }
        return size;
    }

    /**
     * Convert the linked list into an array of nodes
     * @returns {SingleNode[]}
     */
    toArray() {
        let nodes = [];
        let focusedNode = this._head;
        // For every node push the node to the array
        while (focusedNode !== null) {
            nodes.push(focusedNode);
            focusedNode = focusedNode.next;
        }
        return nodes;
    }

    /**
     * Convert the linked list into a string
     * @returns {string}
     */
    toString() {
        let strOfNodes = "";
        let focusedNode = this._head;
        // For every node push the node to the string
        while (focusedNode !== null) {
            // Convert the data into a string
            if (focusedNode.data.toString()) {
                strOfNodes += focusedNode.data.toString();
            } else {
                strOfNodes += focusedNode.data;
            }
            // If focusedNode has a next node add an arrow to the string
            if (focusedNode.next instanceof SingleNode) strOfNodes += " -> ";
            focusedNode = focusedNode.next;
        }
        return strOfNodes;
    }

    /**
     * Convert the linked list into a reversed string
     * @returns {string}
     */
    toStringReverse() {
        let strOfNodes = "";
        let focusedNode = this._tail;
        // For every node push the node to the string
        while (focusedNode !== null) {
            // Convert the data into a string
            if (focusedNode.data.toString()) {
                strOfNodes += focusedNode.data.toString();
            } else {
                strOfNodes += focusedNode.data;
            }
            // If focusedNode has a previous node add an arrow to the string
            if (this.getNodeBefore(focusedNode) instanceof SingleNode)
                strOfNodes += " <- ";
            focusedNode = this.getNodeBefore(focusedNode);
        }
        return strOfNodes;
    }
};
