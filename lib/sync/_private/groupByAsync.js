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
const Grouping_1 = require("../Grouping");
function groupByAsync(source, keySelector, comparer) {
    if (comparer) {
        return groupByAsync_0(source, keySelector, comparer);
    }
    else {
        return groupByAsync_0_Simple(source, keySelector);
    }
}
exports.groupByAsync = groupByAsync;
function groupByAsync_0_Simple(source, keySelector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            const keyMap = {};
            for (const value of source) {
                const key = yield __await(keySelector(value));
                const grouping = keyMap[key];
                if (grouping) {
                    grouping.push(value);
                }
                else {
                    keyMap[key] = new Grouping_1.Grouping(key, value);
                }
            }
            // tslint:disable-next-line:forin
            for (const value in keyMap) {
                yield yield __await(keyMap[value]);
            }
        });
    }
    return AsyncEnumerable_1.from(iterator);
}
function groupByAsync_0(source, keySelector, comparer) {
    function generate() {
        return __asyncGenerator(this, arguments, function* generate_1() {
            const keyMap = new Array();
            for (const value of source) {
                const key = yield __await(keySelector(value));
                let found = false;
                for (let i = 0; i < keyMap.length; i++) {
                    const group = keyMap[i];
                    if ((yield __await(comparer(group.key, key))) === true) {
                        group.push(value);
                        found = true;
                        break;
                    }
                }
                if (found === false) {
                    keyMap.push(new Grouping_1.Grouping(key, value));
                }
            }
            for (const keyValue of keyMap) {
                yield yield __await(keyValue);
            }
        });
    }
    return AsyncEnumerable_1.from(generate);
}
