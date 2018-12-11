"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EqualityComparer_1 = require("../../shared/EqualityComparer");
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Produces the set difference of two sequences by using the comparer provided
 * or EqualityComparer to compare values.
 * @param first An IEnumerable<T> whose elements that are not also in second will be returned.
 * @param second An IEnumerable<T> whose elements that also occur in the first sequence
 * will cause those elements to be removed from the returned sequence.
 * @param comparer An IEqualityComparer<T> to compare values. Optional.
 * @returns A sequence that contains the set difference of the elements of two sequences.
 */
function except(first, second, comparer = EqualityComparer_1.EqualityComparer) {
    function* iterator() {
        const secondArray = [...second];
        for (const firstItem of first) {
            let exists = false;
            for (let j = 0; j < secondArray.length; j++) {
                const secondItem = secondArray[j];
                if (comparer(firstItem, secondItem) === true) {
                    exists = true;
                    break;
                }
            }
            if (exists === false) {
                yield firstItem;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.except = except;