"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Basic Enumerable. Usually returned from the Enumerable class.
 * @private Use @see {IEnumerable} instead
 */
class BasicEnumerable {
    constructor(iterator) {
        this.iterator = iterator;
        //
    }
    [Symbol.iterator]() {
        return this.iterator();
    }
}
exports.BasicEnumerable = BasicEnumerable;
