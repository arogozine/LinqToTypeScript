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
const Grouping_1 = require("../../sync/Grouping");
const BasicAsyncEnumerable_1 = require("../BasicAsyncEnumerable");
function groupByWithSel(source, keySelector, elementSelector, comparer) {
    if (comparer) {
        return groupBy_1(source, keySelector, elementSelector, comparer);
    }
    else {
        return groupBy_1_Simple(source, keySelector, elementSelector);
    }
}
exports.groupByWithSel = groupByWithSel;
function groupBy_1_Simple(source, keySelector, elementSelector) {
    function generate() {
        return __asyncGenerator(this, arguments, function* generate_1() {
            var e_1, _a;
            const keyMap = {};
            try {
                for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield __await(source_1.next()), !source_1_1.done;) {
                    const value = source_1_1.value;
                    const key = keySelector(value);
                    const grouping = keyMap[key];
                    const element = elementSelector(value);
                    if (grouping) {
                        grouping.push(element);
                    }
                    else {
                        keyMap[key] = new Grouping_1.Grouping(key, element);
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
            // tslint:disable-next-line:forin
            for (const value in keyMap) {
                yield yield __await(keyMap[value]);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
}
exports.groupBy_1_Simple = groupBy_1_Simple;
function groupBy_1(source, keySelector, elementSelector, comparer) {
    function generate() {
        return __asyncGenerator(this, arguments, function* generate_2() {
            var e_2, _a;
            const keyMap = new Array();
            try {
                for (var source_2 = __asyncValues(source), source_2_1; source_2_1 = yield __await(source_2.next()), !source_2_1.done;) {
                    const value = source_2_1.value;
                    const key = keySelector(value);
                    let found = false;
                    for (let i = 0; i < keyMap.length; i++) {
                        const group = keyMap[i];
                        if (comparer(group.key, key)) {
                            group.push(elementSelector(value));
                            found = true;
                            break;
                        }
                    }
                    if (found === false) {
                        const element = elementSelector(value);
                        keyMap.push(new Grouping_1.Grouping(key, element)); // TODO
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield __await(_a.call(source_2));
                }
                finally { if (e_2) throw e_2.error; }
            }
            for (const value of keyMap) {
                yield yield __await(value);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
}
exports.groupBy_1 = groupBy_1;
