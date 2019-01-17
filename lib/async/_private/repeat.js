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
const ArgumentOutOfRangeException_1 = require("../../shared/ArgumentOutOfRangeException");
const BasicAsyncEnumerable_1 = require("../BasicAsyncEnumerable");
/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IAsyncEnumerable<T> that contains a repeated value.
 */
function repeat(element, count, delay) {
    if (count < 0) {
        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException(`count`);
    }
    if (delay) {
        return repeat_2(element, count, delay);
    }
    else {
        return repeat_1(element, count);
    }
}
exports.repeat = repeat;
function repeat_1(element, count) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            for (let i = 0; i < count; i++) {
                yield yield __await(element);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
function repeat_2(element, count, delay) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_2() {
            for (let i = 0; i < count; i++) {
                yield yield __await(yield __await(new Promise((resolve) => setTimeout(() => resolve(element), delay))));
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
