/**
 * Takes an array and sorts it using merge sort
 * Does not mutate
 * @template {{key: number, data: *}} T
 * @param {T[]} arr
 * @param {new (key: number, data: *) => T} [classType] Node class used (if non present, assumes items are not nodes)
 * @returns {T[]}
 */
module.exports = (arr, classType) => {
    // Step 1: Do not mutate the original array
    const newArr = [...arr];
    /**
     * Step 2: Split the array multiple times
     * @param {number} start
     * @param {number} end
     */
    const split = (start, end) => {
        if (start < end) {
            const mid = (start + end) / 2;
            split(start, mid); // Left split
            split(mid + 1, end); // Right split
            merge(start, mid, end);
        }
    };
    /**
     * Step 3: Merge the array together
     * @param {number} start
     * @param {number} mid
     * @param {number} end
     */
    const merge = (start, mid, end) => {
        // Temp arrays for the left and right
        /**
         * @type {T[]}
         */
        const leftArr = [];
        /**
         * @type {T[]}
         */
        const rightArr = [];
        newArr.forEach((item, index) => {
            // mid - start + 1 = the size of the left array
            if (index < mid - start + 1) {
                leftArr.push(item);
            } else {
                rightArr.push(item);
            }
        });

        // Merge the arrays with the original
        const leftIndex = start;
        const rightIndex = mid + 1;
        const arrayIndex = 0;

        // Add the smaller of both iterations of left and right to the array
        leftArr.forEach((item, index) => {
            if (rightArr[index] && rightArr[index].key) {
                if (item.key <= rightArr[index].key) {
                    if (!classType) {
                        newArr[arrayIndex] = item;
                    } else {
                        newArr[arrayIndex] = new classType(item.key, item.data); // Left array item
                    }
                    leftArr.splice(index, 1);
                    arrayIndex++;
                } else {
                    const rightItem = rightArr[index];
                    if (!classType) {
                        newArr[arrayIndex] = rightItem;
                    } else {
                        newArr[arrayIndex] = new classType(
                            rightItem.key,
                            rightItem.data
                        );
                    }
                    rightArr.splice(index, 1);
                    arrayIndex++;
                }
            }
        });

        // Add elements left in the left array
        leftArr.forEach((item) => {
            if (!classType) {
                newArr[arrayIndex] = item;
            } else {
                newArr[arrayIndex] = new classType(item.key, item.data);
            }
            arrayIndex++;
        });

        // Add elements left in the right array
        rightArr.forEach((item) => {
            if (!classType) {
                newArr[arrayIndex] = item;
            } else {
                newArr[arrayIndex] = new classType(item.key, item.data);
            }
            arrayIndex++;
        });
    };
    // Step 4: Return the sorted array
    split(0, newArr.length - 1);
    return newArr;
};
