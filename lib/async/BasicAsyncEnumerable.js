"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The class behind IAsyncEnumerable<T>
 * @private
 */
class BasicAsyncEnumerable {
    constructor(iterator) {
        this.iterator = iterator;
        //
    }
    [Symbol.asyncIterator]() {
        return this.iterator();
    }
}
exports.BasicAsyncEnumerable = BasicAsyncEnumerable;
