"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncEnumerable_1 = require("../../async/AsyncEnumerable");
/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An Iterable<T> to filter.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
function whereAsync(source, predicate) {
    if (predicate.length === 1) {
        return whereAsync_1(source, predicate);
    }
    else {
        return whereAsync_2(source, predicate);
    }
}
exports.whereAsync = whereAsync;
function whereAsync_1(source, predicate) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_1() {
            for (const item of source) {
                if ((yield __await(predicate(item))) === true) {
                    yield yield __await(item);
                }
            }
        });
    }
    return AsyncEnumerable_1.from(generator);
}
function whereAsync_2(source, predicate) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_2() {
            let i = 0;
            for (const item of source) {
                if ((yield __await(predicate(item, i++))) === true) {
                    yield yield __await(item);
                }
            }
        });
    }
    return AsyncEnumerable_1.from(generator);
}
