"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
function where(source, predicate) {
    if (predicate.length === 1) {
        return where_1(source, predicate);
    }
    else {
        return where_2(source, predicate);
    }
}
exports.where = where;
function where_1(source, predicate) {
    function* iterator() {
        for (const item of source) {
            if (predicate(item) === true) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.where_1 = where_1;
function where_2(source, predicate) {
    function* iterator() {
        let i = 0;
        for (const item of source) {
            if (predicate(item, i++) === true) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.where_2 = where_2;
