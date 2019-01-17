"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
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
const StrictEqualityComparer_1 = require("../../shared/StrictEqualityComparer");
const BasicAsyncEnumerable_1 = require("../BasicAsyncEnumerable");
/**
 * Correlates the elements of two sequences based on matching keys.
 * A specified IEqualityComparer<T> is used to compare keys or the strict equality comparer.
 * @param outer The first sequence to join.
 * @param inner The sequence to join to the first sequence.
 * @param outerKeySelector A function to extract the join key from each element of the first sequence.
 * @param innerKeySelector A function to extract the join key from each element of the second sequence.
 * @param resultSelector A function to create a result element from two matching elements.
 * @param comparer An IEqualityComparer<T> to hash and compare keys. Optional.
 * @returns An IAsyncEnumerable<T> that has elements of type TResult that
 * are obtained by performing an inner join on two sequences.
 */
function join(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer = StrictEqualityComparer_1.StrictEqualityComparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            var e_1, _a, e_2, _b;
            const innerArray = [];
            try {
                for (var inner_1 = __asyncValues(inner), inner_1_1; inner_1_1 = yield __await(inner_1.next()), !inner_1_1.done;) {
                    const i = inner_1_1.value;
                    innerArray.push(i);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (inner_1_1 && !inner_1_1.done && (_a = inner_1.return)) yield __await(_a.call(inner_1));
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var outer_1 = __asyncValues(outer), outer_1_1; outer_1_1 = yield __await(outer_1.next()), !outer_1_1.done;) {
                    const o = outer_1_1.value;
                    const outerKey = outerKeySelector(o);
                    for (const i of innerArray) {
                        const innerKey = innerKeySelector(i);
                        if (comparer(outerKey, innerKey) === true) {
                            yield yield __await(resultSelector(o, i));
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (outer_1_1 && !outer_1_1.done && (_b = outer_1.return)) yield __await(_b.call(outer_1));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.join = join;
