"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayEnumerable_1 = require("./ArrayEnumerable");
class Grouping extends ArrayEnumerable_1.ArrayEnumerable {
    constructor(key, startingItem) {
        super(1);
        this.key = key;
        this[0] = startingItem;
    }
}
exports.Grouping = Grouping;
