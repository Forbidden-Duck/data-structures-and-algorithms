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
     * Step 2: Sort function
     * @param {number[]} arr
     * @param {number} low
     * @param {number} high
     */
    const sort = (arr, low, high) => {
        if (low < high) {
            const index = partition(arr, low, high);
            sort(arr, low, index - 1);
            sort(arr, index + 1, high);
        }
    };
    /**
     * Step 3: Partition function
     * @param {number[]} arr
     * @param {number} low
     * @param {number} high
     */
    const partition = (arr, low, high) => {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (pivot > arr[j]) {
                i++;
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    };
    // Step 4: Run the algorithm
    sort(arr, 0, keyArr.length - 1);
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
