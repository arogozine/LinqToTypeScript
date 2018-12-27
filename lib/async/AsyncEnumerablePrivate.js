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
const Grouping_1 = require("./../sync/Grouping");
const BasicAsyncEnumerable_1 = require("./BasicAsyncEnumerable");
// tslint:disable:completed-docs
function groupBy_0_Simple(source, keySelector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            var e_1, _a;
            const keyMap = {};
            try {
                for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield __await(source_1.next()), !source_1_1.done;) {
                    const value = source_1_1.value;
                    const key = keySelector(value);
                    const grouping = keyMap[key];
                    if (grouping) {
                        grouping.push(value);
                    }
                    else {
                        keyMap[key] = new Grouping_1.Grouping(key, value);
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
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.groupBy_0_Simple = groupBy_0_Simple;
function groupBy_0(source, keySelector, comparer) {
    function generate() {
        return __asyncGenerator(this, arguments, function* generate_1() {
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
                            group.push(value);
                            found = true;
                            break;
                        }
                    }
                    if (found === false) {
                        keyMap.push(new Grouping_1.Grouping(key, value));
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
            for (const g of keyMap) {
                yield yield __await(g);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
}
exports.groupBy_0 = groupBy_0;
function groupByAsync_0_Simple(source, keySelector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_2() {
            var e_3, _a;
            const keyMap = {};
            try {
                for (var source_3 = __asyncValues(source), source_3_1; source_3_1 = yield __await(source_3.next()), !source_3_1.done;) {
                    const value = source_3_1.value;
                    const key = yield __await(keySelector(value));
                    const grouping = keyMap[key];
                    if (grouping) {
                        grouping.push(value);
                    }
                    else {
                        keyMap[key] = new Grouping_1.Grouping(key, value);
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
            // tslint:disable-next-line:forin
            for (const value in keyMap) {
                yield yield __await(keyMap[value]);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.groupByAsync_0_Simple = groupByAsync_0_Simple;
function groupByAsync_0(source, keySelector, comparer) {
    function generate() {
        return __asyncGenerator(this, arguments, function* generate_2() {
            var e_4, _a;
            const keyMap = new Array();
            try {
                for (var source_4 = __asyncValues(source), source_4_1; source_4_1 = yield __await(source_4.next()), !source_4_1.done;) {
                    const value = source_4_1.value;
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
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (source_4_1 && !source_4_1.done && (_a = source_4.return)) yield __await(_a.call(source_4));
                }
                finally { if (e_4) throw e_4.error; }
            }
            for (const keyValue of keyMap) {
                yield yield __await(keyValue);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
}
exports.groupByAsync_0 = groupByAsync_0;
function groupBy_1_Simple(source, keySelector, elementSelector) {
    function generate() {
        return __asyncGenerator(this, arguments, function* generate_3() {
            var e_5, _a;
            const keyMap = {};
            try {
                for (var source_5 = __asyncValues(source), source_5_1; source_5_1 = yield __await(source_5.next()), !source_5_1.done;) {
                    const value = source_5_1.value;
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
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (source_5_1 && !source_5_1.done && (_a = source_5.return)) yield __await(_a.call(source_5));
                }
                finally { if (e_5) throw e_5.error; }
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
        return __asyncGenerator(this, arguments, function* generate_4() {
            var e_6, _a;
            const keyMap = new Array();
            try {
                for (var source_6 = __asyncValues(source), source_6_1; source_6_1 = yield __await(source_6.next()), !source_6_1.done;) {
                    const value = source_6_1.value;
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
                        keyMap.push(new Grouping_1.Grouping(key, element));
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (source_6_1 && !source_6_1.done && (_a = source_6.return)) yield __await(_a.call(source_6));
                }
                finally { if (e_6) throw e_6.error; }
            }
            for (const value of keyMap) {
                yield yield __await(value);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
}
exports.groupBy_1 = groupBy_1;
exports.select1 = (source, selector) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_3() {
            var e_7, _a;
            try {
                for (var source_7 = __asyncValues(source), source_7_1; source_7_1 = yield __await(source_7.next()), !source_7_1.done;) {
                    const value = source_7_1.value;
                    yield yield __await(selector(value));
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (source_7_1 && !source_7_1.done && (_a = source_7.return)) yield __await(_a.call(source_7));
                }
                finally { if (e_7) throw e_7.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
};
exports.select2 = (source, selector) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_4() {
            var e_8, _a;
            let index = 0;
            try {
                for (var source_8 = __asyncValues(source), source_8_1; source_8_1 = yield __await(source_8.next()), !source_8_1.done;) {
                    const value = source_8_1.value;
                    yield yield __await(selector(value, index));
                    index++;
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (source_8_1 && !source_8_1.done && (_a = source_8.return)) yield __await(_a.call(source_8));
                }
                finally { if (e_8) throw e_8.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
};
exports.select3 = (source, key) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_5() {
            var e_9, _a;
            try {
                for (var source_9 = __asyncValues(source), source_9_1; source_9_1 = yield __await(source_9.next()), !source_9_1.done;) {
                    const value = source_9_1.value;
                    yield yield __await(value[key]);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (source_9_1 && !source_9_1.done && (_a = source_9.return)) yield __await(_a.call(source_9));
                }
                finally { if (e_9) throw e_9.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
};
function selectAsync_1(source, selector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_6() {
            var e_10, _a;
            try {
                for (var source_10 = __asyncValues(source), source_10_1; source_10_1 = yield __await(source_10.next()), !source_10_1.done;) {
                    const value = source_10_1.value;
                    yield yield __await(selector(value));
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (source_10_1 && !source_10_1.done && (_a = source_10.return)) yield __await(_a.call(source_10));
                }
                finally { if (e_10) throw e_10.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.selectAsync_1 = selectAsync_1;
function selectAsync_2(source, key) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_7() {
            var e_11, _a;
            try {
                for (var source_11 = __asyncValues(source), source_11_1; source_11_1 = yield __await(source_11.next()), !source_11_1.done;) {
                    const value = source_11_1.value;
                    yield yield __await(value[key]);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (source_11_1 && !source_11_1.done && (_a = source_11.return)) yield __await(_a.call(source_11));
                }
                finally { if (e_11) throw e_11.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.selectAsync_2 = selectAsync_2;
exports.selectMany1 = (source, selector) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_8() {
            var e_12, _a;
            try {
                for (var source_12 = __asyncValues(source), source_12_1; source_12_1 = yield __await(source_12.next()), !source_12_1.done;) {
                    const value = source_12_1.value;
                    for (const selectorValue of selector(value)) {
                        yield yield __await(selectorValue);
                    }
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (source_12_1 && !source_12_1.done && (_a = source_12.return)) yield __await(_a.call(source_12));
                }
                finally { if (e_12) throw e_12.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
};
exports.selectMany2 = (source, selector) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_9() {
            var e_13, _a;
            let index = 0;
            try {
                for (var source_13 = __asyncValues(source), source_13_1; source_13_1 = yield __await(source_13.next()), !source_13_1.done;) {
                    const value = source_13_1.value;
                    for (const selectorValue of selector(value, index)) {
                        yield yield __await(selectorValue);
                    }
                    index++;
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (source_13_1 && !source_13_1.done && (_a = source_13.return)) yield __await(_a.call(source_13));
                }
                finally { if (e_13) throw e_13.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
};
exports.selectMany3 = (source, selector) => {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_10() {
            var e_14, _a;
            try {
                for (var source_14 = __asyncValues(source), source_14_1; source_14_1 = yield __await(source_14.next()), !source_14_1.done;) {
                    const value = source_14_1.value;
                    for (const selectorValue of value[selector]) {
                        yield yield __await(selectorValue);
                    }
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (source_14_1 && !source_14_1.done && (_a = source_14.return)) yield __await(_a.call(source_14));
                }
                finally { if (e_14) throw e_14.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
};
function skipWhile_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_11() {
            var e_15, _a;
            let skip = true;
            try {
                for (var source_15 = __asyncValues(source), source_15_1; source_15_1 = yield __await(source_15.next()), !source_15_1.done;) {
                    const item = source_15_1.value;
                    if (skip === false) {
                        yield yield __await(item);
                    }
                    else if (predicate(item) === false) {
                        skip = false;
                        yield yield __await(item);
                    }
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (source_15_1 && !source_15_1.done && (_a = source_15.return)) yield __await(_a.call(source_15));
                }
                finally { if (e_15) throw e_15.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.skipWhile_1 = skipWhile_1;
function skipWhile_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_12() {
            var e_16, _a;
            let index = 0;
            let skip = true;
            try {
                for (var source_16 = __asyncValues(source), source_16_1; source_16_1 = yield __await(source_16.next()), !source_16_1.done;) {
                    const item = source_16_1.value;
                    if (skip === false) {
                        yield yield __await(item);
                    }
                    else if (predicate(item, index) === false) {
                        skip = false;
                        yield yield __await(item);
                    }
                    index++;
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (source_16_1 && !source_16_1.done && (_a = source_16.return)) yield __await(_a.call(source_16));
                }
                finally { if (e_16) throw e_16.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.skipWhile_2 = skipWhile_2;
function skipWhileAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_13() {
            var e_17, _a;
            let skip = true;
            try {
                for (var source_17 = __asyncValues(source), source_17_1; source_17_1 = yield __await(source_17.next()), !source_17_1.done;) {
                    const item = source_17_1.value;
                    if (skip === false) {
                        yield yield __await(item);
                    }
                    else if ((yield __await(predicate(item))) === false) {
                        skip = false;
                        yield yield __await(item);
                    }
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (source_17_1 && !source_17_1.done && (_a = source_17.return)) yield __await(_a.call(source_17));
                }
                finally { if (e_17) throw e_17.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.skipWhileAsync_1 = skipWhileAsync_1;
function skipWhileAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_14() {
            var e_18, _a;
            let index = 0;
            let skip = true;
            try {
                for (var source_18 = __asyncValues(source), source_18_1; source_18_1 = yield __await(source_18.next()), !source_18_1.done;) {
                    const item = source_18_1.value;
                    if (skip === false) {
                        yield yield __await(item);
                    }
                    else if ((yield __await(predicate(item, index))) === false) {
                        skip = false;
                        yield yield __await(item);
                    }
                    index++;
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (source_18_1 && !source_18_1.done && (_a = source_18.return)) yield __await(_a.call(source_18));
                }
                finally { if (e_18) throw e_18.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.skipWhileAsync_2 = skipWhileAsync_2;
function repeat_1(element, count) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_15() {
            for (let i = 0; i < count; i++) {
                yield yield __await(element);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.repeat_1 = repeat_1;
function repeat_2(element, count, delay) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_16() {
            for (let i = 0; i < count; i++) {
                yield yield __await(yield __await(new Promise((resolve) => setTimeout(() => resolve(element), delay))));
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.repeat_2 = repeat_2;
function takeWhile_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_17() {
            var e_19, _a;
            try {
                for (var source_19 = __asyncValues(source), source_19_1; source_19_1 = yield __await(source_19.next()), !source_19_1.done;) {
                    const item = source_19_1.value;
                    if (predicate(item)) {
                        yield yield __await(item);
                    }
                    else {
                        break;
                    }
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (source_19_1 && !source_19_1.done && (_a = source_19.return)) yield __await(_a.call(source_19));
                }
                finally { if (e_19) throw e_19.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.takeWhile_1 = takeWhile_1;
function takeWhile_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_18() {
            var e_20, _a;
            let index = 0;
            try {
                for (var source_20 = __asyncValues(source), source_20_1; source_20_1 = yield __await(source_20.next()), !source_20_1.done;) {
                    const item = source_20_1.value;
                    if (predicate(item, index++)) {
                        yield yield __await(item);
                    }
                    else {
                        break;
                    }
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (source_20_1 && !source_20_1.done && (_a = source_20.return)) yield __await(_a.call(source_20));
                }
                finally { if (e_20) throw e_20.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.takeWhile_2 = takeWhile_2;
function takeWhileAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_19() {
            var e_21, _a;
            try {
                for (var source_21 = __asyncValues(source), source_21_1; source_21_1 = yield __await(source_21.next()), !source_21_1.done;) {
                    const item = source_21_1.value;
                    if (yield __await(predicate(item))) {
                        yield yield __await(item);
                    }
                    else {
                        break;
                    }
                }
            }
            catch (e_21_1) { e_21 = { error: e_21_1 }; }
            finally {
                try {
                    if (source_21_1 && !source_21_1.done && (_a = source_21.return)) yield __await(_a.call(source_21));
                }
                finally { if (e_21) throw e_21.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.takeWhileAsync_1 = takeWhileAsync_1;
function takeWhileAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_20() {
            var e_22, _a;
            let index = 0;
            try {
                for (var source_22 = __asyncValues(source), source_22_1; source_22_1 = yield __await(source_22.next()), !source_22_1.done;) {
                    const item = source_22_1.value;
                    if (yield __await(predicate(item, index++))) {
                        yield yield __await(item);
                    }
                    else {
                        break;
                    }
                }
            }
            catch (e_22_1) { e_22 = { error: e_22_1 }; }
            finally {
                try {
                    if (source_22_1 && !source_22_1.done && (_a = source_22.return)) yield __await(_a.call(source_22));
                }
                finally { if (e_22) throw e_22.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.takeWhileAsync_2 = takeWhileAsync_2;
function union_1(first, second) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_21() {
            var e_23, _a, e_24, _b;
            const set = new Set();
            try {
                for (var first_1 = __asyncValues(first), first_1_1; first_1_1 = yield __await(first_1.next()), !first_1_1.done;) {
                    const item = first_1_1.value;
                    if (set.has(item) === false) {
                        yield yield __await(item);
                        set.add(item);
                    }
                }
            }
            catch (e_23_1) { e_23 = { error: e_23_1 }; }
            finally {
                try {
                    if (first_1_1 && !first_1_1.done && (_a = first_1.return)) yield __await(_a.call(first_1));
                }
                finally { if (e_23) throw e_23.error; }
            }
            try {
                for (var second_1 = __asyncValues(second), second_1_1; second_1_1 = yield __await(second_1.next()), !second_1_1.done;) {
                    const item = second_1_1.value;
                    if (set.has(item) === false) {
                        yield yield __await(item);
                        set.add(item);
                    }
                }
            }
            catch (e_24_1) { e_24 = { error: e_24_1 }; }
            finally {
                try {
                    if (second_1_1 && !second_1_1.done && (_b = second_1.return)) yield __await(_b.call(second_1));
                }
                finally { if (e_24) throw e_24.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.union_1 = union_1;
function union_2(first, second, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_22() {
            var e_25, _a;
            const result = [];
            for (const source of [first, second]) {
                try {
                    for (var source_23 = __asyncValues(source), source_23_1; source_23_1 = yield __await(source_23.next()), !source_23_1.done;) {
                        const value = source_23_1.value;
                        let exists = false;
                        for (const resultValue of result) {
                            if (comparer(value, resultValue) === true) {
                                exists = true;
                                break;
                            }
                        }
                        if (exists === false) {
                            yield yield __await(value);
                            result.push(value);
                        }
                    }
                }
                catch (e_25_1) { e_25 = { error: e_25_1 }; }
                finally {
                    try {
                        if (source_23_1 && !source_23_1.done && (_a = source_23.return)) yield __await(_a.call(source_23));
                    }
                    finally { if (e_25) throw e_25.error; }
                }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.union_2 = union_2;
function where_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_23() {
            var e_26, _a;
            try {
                for (var source_24 = __asyncValues(source), source_24_1; source_24_1 = yield __await(source_24.next()), !source_24_1.done;) {
                    const item = source_24_1.value;
                    if (predicate(item) === true) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_26_1) { e_26 = { error: e_26_1 }; }
            finally {
                try {
                    if (source_24_1 && !source_24_1.done && (_a = source_24.return)) yield __await(_a.call(source_24));
                }
                finally { if (e_26) throw e_26.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.where_1 = where_1;
function where_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_24() {
            var e_27, _a;
            let i = 0;
            try {
                for (var source_25 = __asyncValues(source), source_25_1; source_25_1 = yield __await(source_25.next()), !source_25_1.done;) {
                    const item = source_25_1.value;
                    if (predicate(item, i++) === true) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_27_1) { e_27 = { error: e_27_1 }; }
            finally {
                try {
                    if (source_25_1 && !source_25_1.done && (_a = source_25.return)) yield __await(_a.call(source_25));
                }
                finally { if (e_27) throw e_27.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.where_2 = where_2;
function whereAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_25() {
            var e_28, _a;
            try {
                for (var source_26 = __asyncValues(source), source_26_1; source_26_1 = yield __await(source_26.next()), !source_26_1.done;) {
                    const item = source_26_1.value;
                    if ((yield __await(predicate(item))) === true) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_28_1) { e_28 = { error: e_28_1 }; }
            finally {
                try {
                    if (source_26_1 && !source_26_1.done && (_a = source_26.return)) yield __await(_a.call(source_26));
                }
                finally { if (e_28) throw e_28.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.whereAsync_1 = whereAsync_1;
function whereAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_26() {
            var e_29, _a;
            let i = 0;
            try {
                for (var source_27 = __asyncValues(source), source_27_1; source_27_1 = yield __await(source_27.next()), !source_27_1.done;) {
                    const item = source_27_1.value;
                    if ((yield __await(predicate(item, i++))) === true) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_29_1) { e_29 = { error: e_29_1 }; }
            finally {
                try {
                    if (source_27_1 && !source_27_1.done && (_a = source_27.return)) yield __await(_a.call(source_27));
                }
                finally { if (e_29) throw e_29.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.whereAsync_2 = whereAsync_2;
function zip_1(source, second) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_27() {
            const firstIterator = source[Symbol.asyncIterator]();
            const secondIterator = second[Symbol.asyncIterator]();
            while (true) {
                const result = yield __await(Promise.all([firstIterator.next(), secondIterator.next()]));
                const a = result[0];
                const b = result[1];
                if (a.done && b.done) {
                    break;
                }
                else {
                    yield yield __await([a.value, b.value]);
                }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.zip_1 = zip_1;
function zip_2(source, second, resultSelector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_28() {
            const firstIterator = source[Symbol.asyncIterator]();
            const secondIterator = second[Symbol.asyncIterator]();
            while (true) {
                const result = yield __await(Promise.all([firstIterator.next(), secondIterator.next()]));
                const a = result[0];
                const b = result[1];
                if (a.done && b.done) {
                    break;
                }
                else {
                    yield yield __await(resultSelector(a.value, b.value));
                }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.zip_2 = zip_2;
