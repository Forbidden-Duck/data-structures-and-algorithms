/**
 * Takes an array and sorts it using bubble sort
 * Does not mutate
 * @template {{key: number, data: *}} T
 * @param {T[]} originalArr
 * @param {new (key: number, data: *) => T} classType Node class used (if non present, assumes items are not nodes)
 * @returns {T[]}
 */
module.exports = (originalArr, classType) => {
    // Step 1: Extract all the keys from the original array
    const keyArr = originalArr.map((item) => item.key);
    // Step 2: Sort
    const length = keyArr.length;
    for (let i = 0; i < length - 1; i++) {
        let swapped = false;
        for (let j = 0; j < length - i - 1; j++) {
            if (keyArr[j] > keyArr[j + 1]) {
                const temp = keyArr[j];
                keyArr[j] = keyArr[j + 1];
                keyArr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    // Step 3: Convert the keys back into nodes
    const cloneArr = [];
    keyArr.forEach((key) => {
        const node = originalArr.find((item) => item.key === key);
        cloneArr.push(
            classType
                ? new classType(node.key, node.data)
                : Object.assign({}, node)
        );
    });
    // Step 4: Return the clone array
    return cloneArr;
};
