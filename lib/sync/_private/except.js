"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EqualityComparer_1 = require("../../shared/EqualityComparer");
const BasicEnumerable_1 = require("../BasicEnumerable");
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
