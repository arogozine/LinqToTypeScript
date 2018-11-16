"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
function concat(first, second) {
    function* iterator() {
        yield* first;
        yield* second;
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.concat = concat;
