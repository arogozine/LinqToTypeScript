"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEnumerable_1 = require("./BaseEnumerable");
class BasicEnumerable extends BaseEnumerable_1.BaseEnumerable {
    constructor(iterator) {
        super();
        this.iterator = iterator;
    }
    [Symbol.iterator]() {
        return this.iterator();
    }
}
exports.BasicEnumerable = BasicEnumerable;
