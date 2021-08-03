const SinglyLinkedList = require("./SinglyLinkedList");
const SingleNode = require("../models/SingleNode");

/**
 * The size of the HashMap affects the number of collisions
 * To show how collisions are being handled, a small number is
 * being used
 */
const DEFAULT_SIZE = 32;

module.exports = class HashMap {
    /**
     *
     * @param {number} hashMapSize
     */
    constructor(hashMapSize = DEFAULT_SIZE) {
        /**
         * Each bucket uses a SinglyLinkedList based on the size
         * @private
         */
        this.buckets = Array(hashMapSize)
            .fill(null)
            .map(() => new SinglyLinkedList());
        /**
         * @private
         */
        this._keys = {};
    }

    /**
     * Get all the keys
     * @returns {string[]}
     */
    get keys() {
        return Object.keys(this._keys);
    }

    /**
     * Get all the hashes
     * @returns {number[]}
     */
    get hashes() {
        return Object.values(this._keys);
    }

    /**
     * Get all the values stored in the HashMap
     * @returns {*[]}
     */
    get values() {
        return this.buckets.reduce((values, bucket) => {
            return values.concat(
                bucket.toArray().map((node) => node.data.value)
            );
        }, []);
    }

    /**
     * Convert a key to a hash
     * https://stackoverflow.com/questions/1660501/what-is-a-good-64bit-hash-function-in-java-for-textual-strings
     *
     * @param {string} key
     * @returns {number}
     */
    hash(key) {
        // PRIME
        let hash = 1125899906842597;
        const length = key.length;
        for (let i = 0; i < length; i++) {
            hash = 31 * hash + key.charCodeAt(i);
        }
        // Reduce to fit the table size
        return hash % this.buckets.length;
    }

    /**
     * Check if the HashMap has the specified key
     * @param {string} key
     * @return {boolean}
     */
    has(key) {
        return Object.hasOwnProperty.call(this._keys, key);
    }

    /**
     * Get a value at the key
     * @param {string} key
     * @returns {*}
     */
    get(key) {
        const bucket = this.buckets[this.hash(key)];
        const node = bucket.find((focusedNode) => focusedNode.data.key === key);
        return node ? node.data.value : undefined;
    }

    /**
     * Set a value at the key
     * @template T
     * @param {string} key
     * @param {T} value
     * @returns {T}
     */
    set(key, value) {
        const hash = this.hash(key);
        this._keys[key] = hash;
        const bucket = this.buckets[hash];
        const node = bucket.find((focusedNode) => focusedNode.data.key === key);
        if (node) {
            node.data.value = value;
        } else {
            bucket.append(new SingleNode({ key, value }));
        }
        return value;
    }

    /**
     * Delete the value at the key
     * @param {string} key
     */
    delete(key) {
        const hash = this.hash(key);
        delete this._keys[key];
        const bucket = this.buckets[hash];
        const node = bucket.find((focusedNode) => focusedNode.data.key === key);
        if (node) {
            bucket.delete(node);
        }
    }
};
