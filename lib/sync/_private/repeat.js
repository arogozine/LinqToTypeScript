"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArgumentOutOfRangeException_1 = require("../../shared/ArgumentOutOfRangeException");
const BasicEnumerable_1 = require("../BasicEnumerable");
function repeat(element, count) {
    if (count < 0) {
        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException(`count`);
    }
    function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.repeat = repeat;
