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
const BasicAsyncEnumerable_1 = require("../BasicAsyncEnumerable");
function selectMany(source, selector) {
    if (typeof selector === "function") {
        if (selector.length === 1) {
            return selectMany1(source, selector);
        }
        else {
            return selectMany2(source, selector);
        }
    }
    else {
        return selectMany3(source, selector);
    }
}
exports.selectMany = selectMany;
const selectMany1 = (source, selector) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            var e_1, _a;
            try {
                for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield __await(source_1.next()), !source_1_1.done;) {
                    const value = source_1_1.value;
                    for (const selectorValue of selector(value)) {
                        yield yield __await(selectorValue);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield __await(_a.call(source_1));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
};
const selectMany2 = (source, selector) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_2() {
            var e_2, _a;
            let index = 0;
            try {
                for (var source_2 = __asyncValues(source), source_2_1; source_2_1 = yield __await(source_2.next()), !source_2_1.done;) {
                    const value = source_2_1.value;
                    for (const selectorValue of selector(value, index)) {
                        yield yield __await(selectorValue);
                    }
                    index++;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield __await(_a.call(source_2));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
};
const selectMany3 = (source, selector) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_3() {
            var e_3, _a;
            try {
                for (var source_3 = __asyncValues(source), source_3_1; source_3_1 = yield __await(source_3.next()), !source_3_1.done;) {
                    const value = source_3_1.value;
                    for (const selectorValue of value[selector]) {
                        yield yield __await(selectorValue);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (source_3_1 && !source_3_1.done && (_a = source_3.return)) yield __await(_a.call(source_3));
                }
                finally { if (e_3) throw e_3.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
};
