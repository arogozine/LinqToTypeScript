"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
function each(source, action) {
    function* generator() {
        for (const value of source) {
            action(value);
            yield value;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(generator);
}
exports.each = each;
