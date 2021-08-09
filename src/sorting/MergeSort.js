/**
 * Takes an array and sorts it using merge sort
 * Does not mutate
 * @template {{key: number, data: *}} T
 * @param {T[]} originalArr
 * @param {new (key: number, data: *) => T} [classType] Node class used (if non present, assumes items are not nodes)
 * @returns {T[]}
 */
module.exports = (originalArr, classType) => {
    // Step 1: Extract all the keys from the original array
    const keyArr = originalArr.map((item) => item.key);
    /**
     * Step 2: Split function
     * @param {number[]} arr
     * @param {number} start
     * @param {number} end
     */
    const split = (arr, start, end) => {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            split(arr, start, mid); // Left split
            split(arr, mid + 1, end); // Right split
            merge(arr, start, mid, end);
        }
    };
    /**
     * Step 3: Merge function
     * @param {number[]} arr
     * @param {number} start
     * @param {number} mid
     * @param {number} end
     */
    const merge = (arr, start, mid, end) => {
        // Temp arrays for the left and right
        /**
         * @type {T[]}
         */
        const leftArr = [];
        /**
         * @type {T[]}
         */
        const rightArr = [];
        arr.forEach((item, index) => {
            // mid - start + 1 = the size of the left array
            if (index >= start && index <= mid) {
                leftArr.push(item);
            } else if (index > mid && index <= end) {
                rightArr.push(item);
            }
        });

        // Merge the arrays with the temp array
        let mergeIndex = start;

        // Traverse both arrays, for each iteration add the smaller number to the temp array
        while (leftArr[0] && rightArr[0]) {
            if (leftArr[0] <= rightArr[0]) {
                arr[mergeIndex] = leftArr[0];
                leftArr.shift();
            } else {
                arr[mergeIndex] = rightArr[0];
                rightArr.shift();
            }
            mergeIndex++;
        }

        // Add the remaining left items
        leftArr.forEach((item) => {
            arr[mergeIndex] = item;
            mergeIndex++;
        });

        // Add the remaining right items
        rightArr.forEach((item) => {
            arr[mergeIndex] = item;
            mergeIndex++;
        });
    };
    // Step 4: Run the algorithm
    split(keyArr, 0, keyArr.length - 1);
    // Step 5: Convert the keys back into nodes
    const cloneArr = [];
    keyArr.forEach((key) => {
        const node = originalArr.find((item) => item.key === key);
        cloneArr.push(
            classType
                ? new classType(node.key, node.data)
                : Object.assign({}, node)
        );
    });
    // Step 6: Return the clone array
    return cloneArr;
};
