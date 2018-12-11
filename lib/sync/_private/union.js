"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Produces the set union of two sequences by using scrict equality comparison or a specified IEqualityComparer<T>.
 * @param first An IEnumerable<T> whose distinct elements form the first set for the union.
 * @param second An IEnumerable<T> whose distinct elements form the second set for the union.
 * @param comparer The IEqualityComparer<T> to compare values. Optional.
 */
function union(first, second, comparer) {
    if (comparer) {
        return union_2(first, second, comparer);
    }
    else {
        return union_1(first, second);
    }
}
exports.union = union;
function union_1(first, second) {
    function* iterator() {
        const set = new Set();
        for (const item of first) {
            if (set.has(item) === false) {
                yield item;
                set.add(item);
            }
        }
        for (const item of second) {
            if (set.has(item) === false) {
                yield item;
                set.add(item);
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function union_2(first, second, comparer) {
    function* iterator() {
        const result = [];
        for (const source of [first, second]) {
            for (const value of source) {
                let exists = false;
                for (const resultValue of result) {
                    if (comparer(value, resultValue) === true) {
                        exists = true;
                        break;
                    }
                }
                if (exists === false) {
                    yield value;
                    result.push(value);
                }
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}