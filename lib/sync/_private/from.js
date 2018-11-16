"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
function from(source) {
    if (Array.isArray(source)) {
        function* iterator() {
            for (const value of source) {
                yield value;
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    else {
        return new BasicEnumerable_1.BasicEnumerable(() => source);
    }
}
exports.from = from;
