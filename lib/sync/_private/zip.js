"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypesAndHelpers_1 = require("../../shared/TypesAndHelpers");
const BasicEnumerable_1 = require("../BasicEnumerable");
function zip(source, second, resultSelector) {
    if (resultSelector) {
        return zip_2(source, second, resultSelector);
    }
    else {
        return zip_1(source, second);
    }
}
exports.zip = zip;
function zip_1(source, second) {
    function* iterator() {
        const firstIterator = source[Symbol.iterator]();
        const secondIterator = second[Symbol.iterator]();
        while (true) {
            const a = firstIterator.next();
            const b = secondIterator.next();
            if (a.done && b.done) {
                break;
            }
            else {
                yield TypesAndHelpers_1.AsTuple(a.value, b.value);
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function zip_2(source, second, resultSelector) {
    function* iterator() {
        const firstIterator = source[Symbol.iterator]();
        const secondIterator = second[Symbol.iterator]();
        while (true) {
            const a = firstIterator.next();
            const b = secondIterator.next();
            if (a.done && b.done) {
                break;
            }
            else {
                yield resultSelector(a.value, b.value);
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
