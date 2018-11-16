"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const shared_1 = require("./../shared/shared");
const Grouping_1 = require("./../sync/Grouping");
const BasicAsyncEnumerable_1 = require("./BasicAsyncEnumerable");
// tslint:disable:completed-docs
function aggregate_1(source, func) {
    var source_1, source_1_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_1, _a;
        let aggregateValue;
        try {
            for (source_1 = __asyncValues(source); source_1_1 = yield source_1.next(), !source_1_1.done;) {
                const value = source_1_1.value;
                if (aggregateValue) {
                    aggregateValue = func(aggregateValue, value);
                }
                else {
                    aggregateValue = value;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield _a.call(source_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (aggregateValue === undefined) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return aggregateValue;
    });
}
exports.aggregate_1 = aggregate_1;
function aggregate_2(source, seed, func) {
    var source_2, source_2_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_2, _a;
        let aggregateValue = seed;
        try {
            for (source_2 = __asyncValues(source); source_2_1 = yield source_2.next(), !source_2_1.done;) {
                const value = source_2_1.value;
                aggregateValue = func(aggregateValue, value);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield _a.call(source_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return aggregateValue;
    });
}
exports.aggregate_2 = aggregate_2;
function aggregate_3(source, seed, func, resultSelector) {
    var source_3, source_3_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_3, _a;
        let aggregateValue = seed;
        try {
            for (source_3 = __asyncValues(source); source_3_1 = yield source_3.next(), !source_3_1.done;) {
                const value = source_3_1.value;
                aggregateValue = func(aggregateValue, value);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (source_3_1 && !source_3_1.done && (_a = source_3.return)) yield _a.call(source_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return resultSelector(aggregateValue);
    });
}
exports.aggregate_3 = aggregate_3;
function any_1(source) {
    var source_4, source_4_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_4, _a;
        try {
            for (source_4 = __asyncValues(source); source_4_1 = yield source_4.next(), !source_4_1.done;) {
                const _ = source_4_1.value;
                return true;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (source_4_1 && !source_4_1.done && (_a = source_4.return)) yield _a.call(source_4);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return false;
    });
}
exports.any_1 = any_1;
function any_2(source, predicate) {
    var source_5, source_5_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_5, _a;
        try {
            for (source_5 = __asyncValues(source); source_5_1 = yield source_5.next(), !source_5_1.done;) {
                const item = source_5_1.value;
                if (predicate(item) === true) {
                    return true;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (source_5_1 && !source_5_1.done && (_a = source_5.return)) yield _a.call(source_5);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return false;
    });
}
exports.any_2 = any_2;
function average_1(source) {
    var source_6, source_6_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_6, _a;
        let value;
        let count;
        try {
            for (source_6 = __asyncValues(source); source_6_1 = yield source_6.next(), !source_6_1.done;) {
                const item = source_6_1.value;
                value = (value || 0) + item;
                count = (count || 0) + 1;
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (source_6_1 && !source_6_1.done && (_a = source_6.return)) yield _a.call(source_6);
            }
            finally { if (e_6) throw e_6.error; }
        }
        if (value === undefined) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return value / count;
    });
}
exports.average_1 = average_1;
function average_2(source, func) {
    var source_7, source_7_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_7, _a;
        let value;
        let count;
        try {
            for (source_7 = __asyncValues(source); source_7_1 = yield source_7.next(), !source_7_1.done;) {
                const item = source_7_1.value;
                value = (value || 0) + func(item);
                count = (count || 0) + 1;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (source_7_1 && !source_7_1.done && (_a = source_7.return)) yield _a.call(source_7);
            }
            finally { if (e_7) throw e_7.error; }
        }
        if (value === undefined) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return value / count;
    });
}
exports.average_2 = average_2;
function count_1(source) {
    var source_8, source_8_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_8, _a;
        let count = 0;
        try {
            for (source_8 = __asyncValues(source); source_8_1 = yield source_8.next(), !source_8_1.done;) {
                const _ = source_8_1.value;
                count++;
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (source_8_1 && !source_8_1.done && (_a = source_8.return)) yield _a.call(source_8);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return count;
    });
}
exports.count_1 = count_1;
function count_2(source, predicate) {
    var source_9, source_9_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_9, _a;
        let count = 0;
        try {
            for (source_9 = __asyncValues(source); source_9_1 = yield source_9.next(), !source_9_1.done;) {
                const value = source_9_1.value;
                if (predicate(value) === true) {
                    count++;
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (source_9_1 && !source_9_1.done && (_a = source_9.return)) yield _a.call(source_9);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return count;
    });
}
exports.count_2 = count_2;
function first_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const first = yield source[Symbol.asyncIterator]().next();
        if (first.done === true) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return first.value;
    });
}
exports.first_1 = first_1;
function first_2(source, predicate) {
    var source_10, source_10_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_10, _a;
        try {
            for (source_10 = __asyncValues(source); source_10_1 = yield source_10.next(), !source_10_1.done;) {
                const value = source_10_1.value;
                if (predicate(value) === true) {
                    return value;
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (source_10_1 && !source_10_1.done && (_a = source_10.return)) yield _a.call(source_10);
            }
            finally { if (e_10) throw e_10.error; }
        }
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
    });
}
exports.first_2 = first_2;
function firstOrDefault_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const first = yield source[Symbol.asyncIterator]().next();
        return first.value || null;
    });
}
exports.firstOrDefault_1 = firstOrDefault_1;
function firstOrDefault_2(source, predicate) {
    var source_11, source_11_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_11, _a;
        try {
            for (source_11 = __asyncValues(source); source_11_1 = yield source_11.next(), !source_11_1.done;) {
                const value = source_11_1.value;
                if (predicate(value) === true) {
                    return value;
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (source_11_1 && !source_11_1.done && (_a = source_11.return)) yield _a.call(source_11);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return null;
    });
}
exports.firstOrDefault_2 = firstOrDefault_2;
function groupBy_0_Simple(source, keySelector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            var e_12, _a;
            const keyMap = {};
            try {
                for (var source_12 = __asyncValues(source), source_12_1; source_12_1 = yield __await(source_12.next()), !source_12_1.done;) {
                    const value = source_12_1.value;
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
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (source_12_1 && !source_12_1.done && (_a = source_12.return)) yield __await(_a.call(source_12));
                }
                finally { if (e_12) throw e_12.error; }
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
            var e_13, _a;
            const keyMap = new Array();
            try {
                for (var source_13 = __asyncValues(source), source_13_1; source_13_1 = yield __await(source_13.next()), !source_13_1.done;) {
                    const value = source_13_1.value;
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
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (source_13_1 && !source_13_1.done && (_a = source_13.return)) yield __await(_a.call(source_13));
                }
                finally { if (e_13) throw e_13.error; }
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
            var e_14, _a;
            const keyMap = {};
            try {
                for (var source_14 = __asyncValues(source), source_14_1; source_14_1 = yield __await(source_14.next()), !source_14_1.done;) {
                    const value = source_14_1.value;
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
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (source_14_1 && !source_14_1.done && (_a = source_14.return)) yield __await(_a.call(source_14));
                }
                finally { if (e_14) throw e_14.error; }
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
            var e_15, _a;
            const keyMap = new Array();
            try {
                for (var source_15 = __asyncValues(source), source_15_1; source_15_1 = yield __await(source_15.next()), !source_15_1.done;) {
                    const value = source_15_1.value;
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
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (source_15_1 && !source_15_1.done && (_a = source_15.return)) yield __await(_a.call(source_15));
                }
                finally { if (e_15) throw e_15.error; }
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
            var e_16, _a;
            const keyMap = {};
            try {
                for (var source_16 = __asyncValues(source), source_16_1; source_16_1 = yield __await(source_16.next()), !source_16_1.done;) {
                    const value = source_16_1.value;
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
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (source_16_1 && !source_16_1.done && (_a = source_16.return)) yield __await(_a.call(source_16));
                }
                finally { if (e_16) throw e_16.error; }
            }
            /* tslint:disable:forin */
            for (const value in keyMap) {
                yield yield __await(keyMap[value]);
            }
            /* tslint:enable */
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
}
exports.groupBy_1_Simple = groupBy_1_Simple;
function groupBy_1(source, keySelector, elementSelector, comparer) {
    function generate() {
        return __asyncGenerator(this, arguments, function* generate_4() {
            var e_17, _a;
            const keyMap = new Array();
            try {
                for (var source_17 = __asyncValues(source), source_17_1; source_17_1 = yield __await(source_17.next()), !source_17_1.done;) {
                    const value = source_17_1.value;
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
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (source_17_1 && !source_17_1.done && (_a = source_17.return)) yield __await(_a.call(source_17));
                }
                finally { if (e_17) throw e_17.error; }
            }
            for (const value of keyMap) {
                yield yield __await(value);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
}
exports.groupBy_1 = groupBy_1;
function select_1(source, selector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_3() {
            var e_18, _a;
            try {
                for (var source_18 = __asyncValues(source), source_18_1; source_18_1 = yield __await(source_18.next()), !source_18_1.done;) {
                    const value = source_18_1.value;
                    yield yield __await(selector(value));
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
exports.select_1 = select_1;
function select_2(source, key) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_4() {
            var e_19, _a;
            try {
                for (var source_19 = __asyncValues(source), source_19_1; source_19_1 = yield __await(source_19.next()), !source_19_1.done;) {
                    const value = source_19_1.value;
                    yield yield __await(value[key]);
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
exports.select_2 = select_2;
function selectAsync_1(source, selector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_5() {
            var e_20, _a;
            try {
                for (var source_20 = __asyncValues(source), source_20_1; source_20_1 = yield __await(source_20.next()), !source_20_1.done;) {
                    const value = source_20_1.value;
                    yield yield __await(selector(value));
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
exports.selectAsync_1 = selectAsync_1;
function selectAsync_2(source, key) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_6() {
            var e_21, _a;
            try {
                for (var source_21 = __asyncValues(source), source_21_1; source_21_1 = yield __await(source_21.next()), !source_21_1.done;) {
                    const value = source_21_1.value;
                    yield yield __await(value[key]);
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
exports.selectAsync_2 = selectAsync_2;
function selectMany_1(source, selector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_7() {
            var e_22, _a;
            try {
                for (var source_22 = __asyncValues(source), source_22_1; source_22_1 = yield __await(source_22.next()), !source_22_1.done;) {
                    const value = source_22_1.value;
                    for (const selectorValue of selector(value)) {
                        yield yield __await(selectorValue);
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
exports.selectMany_1 = selectMany_1;
function selectMany_2(source, selector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_8() {
            var e_23, _a;
            try {
                for (var source_23 = __asyncValues(source), source_23_1; source_23_1 = yield __await(source_23.next()), !source_23_1.done;) {
                    const value = source_23_1.value;
                    for (const selectorValue of value[selector]) {
                        yield yield __await(selectorValue);
                    }
                }
            }
            catch (e_23_1) { e_23 = { error: e_23_1 }; }
            finally {
                try {
                    if (source_23_1 && !source_23_1.done && (_a = source_23.return)) yield __await(_a.call(source_23));
                }
                finally { if (e_23) throw e_23.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.selectMany_2 = selectMany_2;
function single_1(source) {
    var source_24, source_24_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_24, _a;
        let hasValue = false;
        let singleValue = null;
        try {
            for (source_24 = __asyncValues(source); source_24_1 = yield source_24.next(), !source_24_1.done;) {
                const value = source_24_1.value;
                if (hasValue === true) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                }
                else {
                    hasValue = true;
                    singleValue = value;
                }
            }
        }
        catch (e_24_1) { e_24 = { error: e_24_1 }; }
        finally {
            try {
                if (source_24_1 && !source_24_1.done && (_a = source_24.return)) yield _a.call(source_24);
            }
            finally { if (e_24) throw e_24.error; }
        }
        if (hasValue === false) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return singleValue;
    });
}
exports.single_1 = single_1;
function single_2(source, predicate) {
    var source_25, source_25_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_25, _a;
        let hasValue = false;
        let singleValue = null;
        try {
            for (source_25 = __asyncValues(source); source_25_1 = yield source_25.next(), !source_25_1.done;) {
                const value = source_25_1.value;
                if (predicate(value)) {
                    if (hasValue === true) {
                        throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneMatchingElement);
                    }
                    else {
                        hasValue = true;
                        singleValue = value;
                    }
                }
            }
        }
        catch (e_25_1) { e_25 = { error: e_25_1 }; }
        finally {
            try {
                if (source_25_1 && !source_25_1.done && (_a = source_25.return)) yield _a.call(source_25);
            }
            finally { if (e_25) throw e_25.error; }
        }
        if (hasValue === false) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        }
        return singleValue;
    });
}
exports.single_2 = single_2;
function singleOrDefault_1(source) {
    var source_26, source_26_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_26, _a;
        let hasValue = false;
        let singleValue = null;
        try {
            for (source_26 = __asyncValues(source); source_26_1 = yield source_26.next(), !source_26_1.done;) {
                const value = source_26_1.value;
                if (hasValue === true) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                }
                else {
                    hasValue = true;
                    singleValue = value;
                }
            }
        }
        catch (e_26_1) { e_26 = { error: e_26_1 }; }
        finally {
            try {
                if (source_26_1 && !source_26_1.done && (_a = source_26.return)) yield _a.call(source_26);
            }
            finally { if (e_26) throw e_26.error; }
        }
        return singleValue;
    });
}
exports.singleOrDefault_1 = singleOrDefault_1;
function singleOrDefault_2(source, predicate) {
    var source_27, source_27_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_27, _a;
        let hasValue = false;
        let singleValue = null;
        try {
            for (source_27 = __asyncValues(source); source_27_1 = yield source_27.next(), !source_27_1.done;) {
                const value = source_27_1.value;
                if (predicate(value)) {
                    if (hasValue === true) {
                        throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneMatchingElement);
                    }
                    else {
                        hasValue = true;
                        singleValue = value;
                    }
                }
            }
        }
        catch (e_27_1) { e_27 = { error: e_27_1 }; }
        finally {
            try {
                if (source_27_1 && !source_27_1.done && (_a = source_27.return)) yield _a.call(source_27);
            }
            finally { if (e_27) throw e_27.error; }
        }
        return singleValue;
    });
}
exports.singleOrDefault_2 = singleOrDefault_2;
function skipWhile_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_9() {
            var e_28, _a;
            let skip = true;
            try {
                for (var source_28 = __asyncValues(source), source_28_1; source_28_1 = yield __await(source_28.next()), !source_28_1.done;) {
                    const item = source_28_1.value;
                    if (skip === false) {
                        yield yield __await(item);
                    }
                    else if (predicate(item) === false) {
                        skip = false;
                        yield yield __await(item);
                    }
                }
            }
            catch (e_28_1) { e_28 = { error: e_28_1 }; }
            finally {
                try {
                    if (source_28_1 && !source_28_1.done && (_a = source_28.return)) yield __await(_a.call(source_28));
                }
                finally { if (e_28) throw e_28.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.skipWhile_1 = skipWhile_1;
function skipWhile_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_10() {
            var e_29, _a;
            let index = 0;
            let skip = true;
            try {
                for (var source_29 = __asyncValues(source), source_29_1; source_29_1 = yield __await(source_29.next()), !source_29_1.done;) {
                    const item = source_29_1.value;
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
            catch (e_29_1) { e_29 = { error: e_29_1 }; }
            finally {
                try {
                    if (source_29_1 && !source_29_1.done && (_a = source_29.return)) yield __await(_a.call(source_29));
                }
                finally { if (e_29) throw e_29.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.skipWhile_2 = skipWhile_2;
function skipWhileAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_11() {
            var e_30, _a;
            let skip = true;
            try {
                for (var source_30 = __asyncValues(source), source_30_1; source_30_1 = yield __await(source_30.next()), !source_30_1.done;) {
                    const item = source_30_1.value;
                    if (skip === false) {
                        yield yield __await(item);
                    }
                    else if ((yield __await(predicate(item))) === false) {
                        skip = false;
                        yield yield __await(item);
                    }
                }
            }
            catch (e_30_1) { e_30 = { error: e_30_1 }; }
            finally {
                try {
                    if (source_30_1 && !source_30_1.done && (_a = source_30.return)) yield __await(_a.call(source_30));
                }
                finally { if (e_30) throw e_30.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.skipWhileAsync_1 = skipWhileAsync_1;
function skipWhileAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_12() {
            var e_31, _a;
            let index = 0;
            let skip = true;
            try {
                for (var source_31 = __asyncValues(source), source_31_1; source_31_1 = yield __await(source_31.next()), !source_31_1.done;) {
                    const item = source_31_1.value;
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
            catch (e_31_1) { e_31 = { error: e_31_1 }; }
            finally {
                try {
                    if (source_31_1 && !source_31_1.done && (_a = source_31.return)) yield __await(_a.call(source_31));
                }
                finally { if (e_31) throw e_31.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.skipWhileAsync_2 = skipWhileAsync_2;
function last_1(source) {
    var source_32, source_32_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_32, _a;
        let last = null;
        try {
            for (source_32 = __asyncValues(source); source_32_1 = yield source_32.next(), !source_32_1.done;) {
                const value = source_32_1.value;
                last = value;
            }
        }
        catch (e_32_1) { e_32 = { error: e_32_1 }; }
        finally {
            try {
                if (source_32_1 && !source_32_1.done && (_a = source_32.return)) yield _a.call(source_32);
            }
            finally { if (e_32) throw e_32.error; }
        }
        if (!last) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return last;
    });
}
exports.last_1 = last_1;
function last_2(source, predicate) {
    var source_33, source_33_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_33, _a;
        let last = null;
        try {
            for (source_33 = __asyncValues(source); source_33_1 = yield source_33.next(), !source_33_1.done;) {
                const value = source_33_1.value;
                if (predicate(value) === true) {
                    last = value;
                }
            }
        }
        catch (e_33_1) { e_33 = { error: e_33_1 }; }
        finally {
            try {
                if (source_33_1 && !source_33_1.done && (_a = source_33.return)) yield _a.call(source_33);
            }
            finally { if (e_33) throw e_33.error; }
        }
        if (!last) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        }
        return last;
    });
}
exports.last_2 = last_2;
function lastOrDefault_1(source) {
    var source_34, source_34_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_34, _a;
        let last = null;
        try {
            for (source_34 = __asyncValues(source); source_34_1 = yield source_34.next(), !source_34_1.done;) {
                const value = source_34_1.value;
                last = value;
            }
        }
        catch (e_34_1) { e_34 = { error: e_34_1 }; }
        finally {
            try {
                if (source_34_1 && !source_34_1.done && (_a = source_34.return)) yield _a.call(source_34);
            }
            finally { if (e_34) throw e_34.error; }
        }
        return last;
    });
}
exports.lastOrDefault_1 = lastOrDefault_1;
function lastOrDefault_2(source, predicate) {
    var source_35, source_35_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_35, _a;
        let last = null;
        try {
            for (source_35 = __asyncValues(source); source_35_1 = yield source_35.next(), !source_35_1.done;) {
                const value = source_35_1.value;
                if (predicate(value) === true) {
                    last = value;
                }
            }
        }
        catch (e_35_1) { e_35 = { error: e_35_1 }; }
        finally {
            try {
                if (source_35_1 && !source_35_1.done && (_a = source_35.return)) yield _a.call(source_35);
            }
            finally { if (e_35) throw e_35.error; }
        }
        return last;
    });
}
exports.lastOrDefault_2 = lastOrDefault_2;
function max_1(source) {
    var source_36, source_36_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_36, _a;
        let max = null;
        try {
            for (source_36 = __asyncValues(source); source_36_1 = yield source_36.next(), !source_36_1.done;) {
                const item = source_36_1.value;
                max = Math.max(max || Number.NEGATIVE_INFINITY, item);
            }
        }
        catch (e_36_1) { e_36 = { error: e_36_1 }; }
        finally {
            try {
                if (source_36_1 && !source_36_1.done && (_a = source_36.return)) yield _a.call(source_36);
            }
            finally { if (e_36) throw e_36.error; }
        }
        if (max === null) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        else {
            return max;
        }
    });
}
exports.max_1 = max_1;
function max_2(source, selector) {
    var source_37, source_37_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_37, _a;
        let max = null;
        try {
            for (source_37 = __asyncValues(source); source_37_1 = yield source_37.next(), !source_37_1.done;) {
                const item = source_37_1.value;
                max = Math.max(max || Number.NEGATIVE_INFINITY, selector(item));
            }
        }
        catch (e_37_1) { e_37 = { error: e_37_1 }; }
        finally {
            try {
                if (source_37_1 && !source_37_1.done && (_a = source_37.return)) yield _a.call(source_37);
            }
            finally { if (e_37) throw e_37.error; }
        }
        if (max === null) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        else {
            return max;
        }
    });
}
exports.max_2 = max_2;
function min_1(source) {
    var source_38, source_38_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_38, _a;
        let min = null;
        try {
            for (source_38 = __asyncValues(source); source_38_1 = yield source_38.next(), !source_38_1.done;) {
                const item = source_38_1.value;
                min = Math.min(min || Number.POSITIVE_INFINITY, item);
            }
        }
        catch (e_38_1) { e_38 = { error: e_38_1 }; }
        finally {
            try {
                if (source_38_1 && !source_38_1.done && (_a = source_38.return)) yield _a.call(source_38);
            }
            finally { if (e_38) throw e_38.error; }
        }
        if (min === null) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        else {
            return min;
        }
    });
}
exports.min_1 = min_1;
function min_2(source, selector) {
    var source_39, source_39_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_39, _a;
        let min = null;
        try {
            for (source_39 = __asyncValues(source); source_39_1 = yield source_39.next(), !source_39_1.done;) {
                const item = source_39_1.value;
                min = Math.min(min || Number.POSITIVE_INFINITY, selector(item));
            }
        }
        catch (e_39_1) { e_39 = { error: e_39_1 }; }
        finally {
            try {
                if (source_39_1 && !source_39_1.done && (_a = source_39.return)) yield _a.call(source_39);
            }
            finally { if (e_39) throw e_39.error; }
        }
        if (min === null) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        else {
            return min;
        }
    });
}
exports.min_2 = min_2;
function repeat_1(element, count) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_13() {
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
        return __asyncGenerator(this, arguments, function* iterator_14() {
            for (let i = 0; i < count; i++) {
                yield yield __await(yield __await(new Promise((resolve) => setTimeout(() => resolve(element), delay))));
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.repeat_2 = repeat_2;
function sum_1(source) {
    var source_40, source_40_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_40, _a;
        let sum = 0;
        try {
            for (source_40 = __asyncValues(source); source_40_1 = yield source_40.next(), !source_40_1.done;) {
                const value = source_40_1.value;
                sum += value;
            }
        }
        catch (e_40_1) { e_40 = { error: e_40_1 }; }
        finally {
            try {
                if (source_40_1 && !source_40_1.done && (_a = source_40.return)) yield _a.call(source_40);
            }
            finally { if (e_40) throw e_40.error; }
        }
        return sum;
    });
}
exports.sum_1 = sum_1;
function sum_2(source, selector) {
    var source_41, source_41_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_41, _a;
        let sum = 0;
        try {
            for (source_41 = __asyncValues(source); source_41_1 = yield source_41.next(), !source_41_1.done;) {
                const value = source_41_1.value;
                sum += selector(value);
            }
        }
        catch (e_41_1) { e_41 = { error: e_41_1 }; }
        finally {
            try {
                if (source_41_1 && !source_41_1.done && (_a = source_41.return)) yield _a.call(source_41);
            }
            finally { if (e_41) throw e_41.error; }
        }
        return sum;
    });
}
exports.sum_2 = sum_2;
function takeWhile_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_15() {
            var e_42, _a;
            try {
                for (var source_42 = __asyncValues(source), source_42_1; source_42_1 = yield __await(source_42.next()), !source_42_1.done;) {
                    const item = source_42_1.value;
                    if (predicate(item)) {
                        yield yield __await(item);
                    }
                    else {
                        break;
                    }
                }
            }
            catch (e_42_1) { e_42 = { error: e_42_1 }; }
            finally {
                try {
                    if (source_42_1 && !source_42_1.done && (_a = source_42.return)) yield __await(_a.call(source_42));
                }
                finally { if (e_42) throw e_42.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.takeWhile_1 = takeWhile_1;
function takeWhile_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_16() {
            var e_43, _a;
            let index = 0;
            try {
                for (var source_43 = __asyncValues(source), source_43_1; source_43_1 = yield __await(source_43.next()), !source_43_1.done;) {
                    const item = source_43_1.value;
                    if (predicate(item, index++)) {
                        yield yield __await(item);
                    }
                    else {
                        break;
                    }
                }
            }
            catch (e_43_1) { e_43 = { error: e_43_1 }; }
            finally {
                try {
                    if (source_43_1 && !source_43_1.done && (_a = source_43.return)) yield __await(_a.call(source_43));
                }
                finally { if (e_43) throw e_43.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.takeWhile_2 = takeWhile_2;
function takeWhileAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_17() {
            var e_44, _a;
            try {
                for (var source_44 = __asyncValues(source), source_44_1; source_44_1 = yield __await(source_44.next()), !source_44_1.done;) {
                    const item = source_44_1.value;
                    if (yield __await(predicate(item))) {
                        yield yield __await(item);
                    }
                    else {
                        break;
                    }
                }
            }
            catch (e_44_1) { e_44 = { error: e_44_1 }; }
            finally {
                try {
                    if (source_44_1 && !source_44_1.done && (_a = source_44.return)) yield __await(_a.call(source_44));
                }
                finally { if (e_44) throw e_44.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.takeWhileAsync_1 = takeWhileAsync_1;
function takeWhileAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_18() {
            var e_45, _a;
            let index = 0;
            try {
                for (var source_45 = __asyncValues(source), source_45_1; source_45_1 = yield __await(source_45.next()), !source_45_1.done;) {
                    const item = source_45_1.value;
                    if (yield __await(predicate(item, index++))) {
                        yield yield __await(item);
                    }
                    else {
                        break;
                    }
                }
            }
            catch (e_45_1) { e_45 = { error: e_45_1 }; }
            finally {
                try {
                    if (source_45_1 && !source_45_1.done && (_a = source_45.return)) yield __await(_a.call(source_45));
                }
                finally { if (e_45) throw e_45.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.takeWhileAsync_2 = takeWhileAsync_2;
function union_1(first, second) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_19() {
            var e_46, _a, e_47, _b;
            const set = new Set();
            try {
                for (var first_3 = __asyncValues(first), first_3_1; first_3_1 = yield __await(first_3.next()), !first_3_1.done;) {
                    const item = first_3_1.value;
                    if (set.has(item) === false) {
                        yield yield __await(item);
                        set.add(item);
                    }
                }
            }
            catch (e_46_1) { e_46 = { error: e_46_1 }; }
            finally {
                try {
                    if (first_3_1 && !first_3_1.done && (_a = first_3.return)) yield __await(_a.call(first_3));
                }
                finally { if (e_46) throw e_46.error; }
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
            catch (e_47_1) { e_47 = { error: e_47_1 }; }
            finally {
                try {
                    if (second_1_1 && !second_1_1.done && (_b = second_1.return)) yield __await(_b.call(second_1));
                }
                finally { if (e_47) throw e_47.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.union_1 = union_1;
function union_2(first, second, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_20() {
            var e_48, _a;
            const result = [];
            for (const source of [first, second]) {
                try {
                    for (var source_46 = __asyncValues(source), source_46_1; source_46_1 = yield __await(source_46.next()), !source_46_1.done;) {
                        const value = source_46_1.value;
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
                catch (e_48_1) { e_48 = { error: e_48_1 }; }
                finally {
                    try {
                        if (source_46_1 && !source_46_1.done && (_a = source_46.return)) yield __await(_a.call(source_46));
                    }
                    finally { if (e_48) throw e_48.error; }
                }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.union_2 = union_2;
function where_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_21() {
            var e_49, _a;
            try {
                for (var source_47 = __asyncValues(source), source_47_1; source_47_1 = yield __await(source_47.next()), !source_47_1.done;) {
                    const item = source_47_1.value;
                    if (predicate(item) === true) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_49_1) { e_49 = { error: e_49_1 }; }
            finally {
                try {
                    if (source_47_1 && !source_47_1.done && (_a = source_47.return)) yield __await(_a.call(source_47));
                }
                finally { if (e_49) throw e_49.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.where_1 = where_1;
function where_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_22() {
            var e_50, _a;
            let i = 0;
            try {
                for (var source_48 = __asyncValues(source), source_48_1; source_48_1 = yield __await(source_48.next()), !source_48_1.done;) {
                    const item = source_48_1.value;
                    if (predicate(item, i++) === true) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_50_1) { e_50 = { error: e_50_1 }; }
            finally {
                try {
                    if (source_48_1 && !source_48_1.done && (_a = source_48.return)) yield __await(_a.call(source_48));
                }
                finally { if (e_50) throw e_50.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.where_2 = where_2;
function whereAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_23() {
            var e_51, _a;
            try {
                for (var source_49 = __asyncValues(source), source_49_1; source_49_1 = yield __await(source_49.next()), !source_49_1.done;) {
                    const item = source_49_1.value;
                    if ((yield __await(predicate(item))) === true) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_51_1) { e_51 = { error: e_51_1 }; }
            finally {
                try {
                    if (source_49_1 && !source_49_1.done && (_a = source_49.return)) yield __await(_a.call(source_49));
                }
                finally { if (e_51) throw e_51.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.whereAsync_1 = whereAsync_1;
function whereAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_24() {
            var e_52, _a;
            let i = 0;
            try {
                for (var source_50 = __asyncValues(source), source_50_1; source_50_1 = yield __await(source_50.next()), !source_50_1.done;) {
                    const item = source_50_1.value;
                    if ((yield __await(predicate(item, i++))) === true) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_52_1) { e_52 = { error: e_52_1 }; }
            finally {
                try {
                    if (source_50_1 && !source_50_1.done && (_a = source_50.return)) yield __await(_a.call(source_50));
                }
                finally { if (e_52) throw e_52.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.whereAsync_2 = whereAsync_2;
function zip_1(source, second) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_25() {
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
                    yield yield __await(shared_1.AsTuple(a.value, b.value));
                }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.zip_1 = zip_1;
function zip_2(source, second, resultSelector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_26() {
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
