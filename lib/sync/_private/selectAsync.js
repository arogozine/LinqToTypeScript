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
const from_1 = require("../../async/_private/from");
function selectAsync(source, selector) {
    if (typeof selector === "function") {
        if (selector.length === 1) {
            return selectAsync1(source, selector);
        }
        else {
            return selectAsync2(source, selector);
        }
    }
    else {
        return selectAsync3(source, selector);
    }
}
exports.selectAsync = selectAsync;
const selectAsync1 = (source, selector) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            for (const value of source) {
                yield yield __await(selector(value));
            }
        });
    }
    return from_1.from(iterator);
};
const selectAsync2 = (source, selector) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_2() {
            let index = 0;
            for (const value of source) {
                yield yield __await(selector(value, index));
                index++;
            }
        });
    }
    return from_1.from(iterator);
};
const selectAsync3 = (source, key) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_3() {
            for (const value of source) {
                yield yield __await(value[key]);
            }
        });
    }
    return from_1.from(iterator);
};
