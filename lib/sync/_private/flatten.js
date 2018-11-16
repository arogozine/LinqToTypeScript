"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
function flatten(source, shallow) {
    // tslint:disable-next-line:no-shadowed-variable
    function* iterator(source) {
        for (const item of source) {
            // JS string is an Iterable.
            // We exclude it from being flattened
            if (item[Symbol.iterator] !== undefined && typeof item !== "string") {
                yield* shallow ? item : iterator(item);
            }
            else {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(() => iterator(source));
}
exports.flatten = flatten;
