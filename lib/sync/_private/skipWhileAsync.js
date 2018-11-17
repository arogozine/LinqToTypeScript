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
function skipWhileAsync(source, predicate) {
    if (predicate.length === 1) {
        return skipWhileAsync_1(source, predicate);
    }
    else {
        return skipWhileAsync_2(source, predicate);
    }
}
exports.skipWhileAsync = skipWhileAsync;
function skipWhileAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            let skip = true;
            for (const item of source) {
                if (skip === false) {
                    yield yield __await(item);
                }
                else if ((yield __await(predicate(item))) === false) {
                    skip = false;
                    yield yield __await(item);
                }
            }
        });
    }
    return AsyncEnumerable_1.from(iterator);
}
function skipWhileAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_2() {
            let index = 0;
            let skip = true;
            for (const item of source) {
                if (skip === false) {
                    yield yield __await(item);
                }
                else if ((yield __await(predicate(item, index))) === false) {
                    skip = false;
                    yield yield __await(item);
                }
                index++;
            }
        });
    }
    return AsyncEnumerable_1.from(iterator);
}
