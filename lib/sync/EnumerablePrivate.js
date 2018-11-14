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
const shared_1 = require("../shared/shared");
const async_1 = require("./../async/async");
const BasicEnumerable_1 = require("./BasicEnumerable");
const sync_1 = require("./sync");
// tslint:disable:completed-docs
/**
 * @throws {InvalidOperationException} No Elements
 */
function aggregate_1(source, func) {
    let aggregateValue;
    for (const value of source) {
        if (aggregateValue) {
            aggregateValue = func(aggregateValue, value);
        }
        else {
            aggregateValue = value;
        }
    }
    if (aggregateValue === undefined) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return aggregateValue;
}
exports.aggregate_1 = aggregate_1;
function aggregate_2(source, seed, func) {
    let aggregateValue = seed;
    for (const value of source) {
        aggregateValue = func(aggregateValue, value);
    }
    return aggregateValue;
}
exports.aggregate_2 = aggregate_2;
function aggregate_3(source, seed, func, resultSelector) {
    let aggregateValue = seed;
    for (const value of source) {
        aggregateValue = func(aggregateValue, value);
    }
    return resultSelector(aggregateValue);
}
exports.aggregate_3 = aggregate_3;
function any_1(source) {
    for (const _ of source) {
        return true;
    }
    return false;
}
exports.any_1 = any_1;
function any_2(source, predicate) {
    for (const item of source) {
        if (predicate(item) === true) {
            return true;
        }
    }
    return false;
}
exports.any_2 = any_2;
function average_1(source) {
    let value;
    let count;
    for (const item of source) {
        value = (value || 0) + item;
        count = (count || 0) + 1;
    }
    if (value === undefined) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return value / count;
}
exports.average_1 = average_1;
function average_2(source, func) {
    let value;
    let count;
    for (const item of source) {
        value = (value || 0) + func(item);
        count = (count || 0) + 1;
    }
    if (value === undefined) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return value / count;
}
exports.average_2 = average_2;
function count_1(source) {
    let count = 0;
    for (const _ of source) {
        count++;
    }
    return count;
}
exports.count_1 = count_1;
function count_2(source, predicate) {
    let count = 0;
    for (const value of source) {
        if (predicate(value) === true) {
            count++;
        }
    }
    return count;
}
exports.count_2 = count_2;
function first_1(source) {
    const first = source[Symbol.iterator]().next();
    if (first.done === true) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return first.value;
}
exports.first_1 = first_1;
function first_2(source, predicate) {
    for (const value of source) {
        if (predicate(value) === true) {
            return value;
        }
    }
    throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
}
exports.first_2 = first_2;
function firstOrDefault_1(source) {
    const first = source[Symbol.iterator]().next();
    return first.value || null;
}
exports.firstOrDefault_1 = firstOrDefault_1;
function firstOrDefault_2(source, predicate) {
    for (const value of source) {
        if (predicate(value) === true) {
            return value;
        }
    }
    return null;
}
exports.firstOrDefault_2 = firstOrDefault_2;
function groupBy_0_Simple(source, keySelector) {
    function* iterator() {
        const keyMap = {};
        for (const value of source) {
            const key = keySelector(value);
            const grouping = keyMap[key];
            if (grouping) {
                grouping.push(value);
            }
            else {
                keyMap[key] = new sync_1.Grouping(key, value);
            }
        }
        // tslint:disable-next-line:forin
        for (const value in keyMap) {
            yield keyMap[value];
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.groupBy_0_Simple = groupBy_0_Simple;
function groupBy_0(source, keySelector, comparer) {
    function* generate() {
        const keyMap = new Array();
        for (const value of source) {
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
                keyMap.push(new sync_1.Grouping(key, value));
            }
        }
        for (const keyValue of keyMap) {
            yield keyValue;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(generate);
}
exports.groupBy_0 = groupBy_0;
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
                    keyMap[key] = new sync_1.Grouping(key, value);
                }
            }
            // tslint:disable-next-line:forin
            for (const value in keyMap) {
                yield yield __await(keyMap[value]);
            }
        });
    }
    return async_1.from(iterator);
}
exports.groupByAsync_0_Simple = groupByAsync_0_Simple;
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
                    keyMap.push(new sync_1.Grouping(key, value));
                }
            }
            for (const keyValue of keyMap) {
                yield yield __await(keyValue);
            }
        });
    }
    return async_1.from(generate);
}
exports.groupByAsync_0 = groupByAsync_0;
function groupBy_1_Simple(source, keySelector, elementSelector) {
    function* generate() {
        const keyMap = {};
        for (const value of source) {
            const key = keySelector(value);
            const grouping = keyMap[key];
            const element = elementSelector(value);
            if (grouping) {
                grouping.push(element);
            }
            else {
                keyMap[key] = new sync_1.Grouping(key, element);
            }
        }
        /* tslint:disable:forin */
        for (const value in keyMap) {
            yield keyMap[value];
        }
        /* tslint:enable:forin */
    }
    return new BasicEnumerable_1.BasicEnumerable(generate);
}
exports.groupBy_1_Simple = groupBy_1_Simple;
function groupBy_1(source, keySelector, elementSelector, comparer) {
    function* generate() {
        const keyMap = new Array();
        for (const value of source) {
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
                keyMap.push(new sync_1.Grouping(key, element));
            }
        }
        for (const keyValue of keyMap) {
            yield keyValue;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(generate);
}
exports.groupBy_1 = groupBy_1;
function groupBy_2_Simple(source, keySelector, resultSelector) {
    function* iterator() {
        const groupByResult = groupBy_0_Simple(source, keySelector);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.groupBy_2_Simple = groupBy_2_Simple;
function groupBy_2(source, keySelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
    function* iterator() {
        const groupByResult = groupBy_0(source, keySelector, comparer);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.groupBy_2 = groupBy_2;
function groupBy_3_Simple(source, keySelector, elementSelector, resultSelector) {
    function* iterator() {
        const groupByResult = groupBy_1_Simple(source, keySelector, elementSelector);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.groupBy_3_Simple = groupBy_3_Simple;
function groupBy_3(source, keySelector, elementSelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
    function* iterator() {
        const groupByResult = groupBy_1(source, keySelector, elementSelector, comparer);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.groupBy_3 = groupBy_3;
function select_1(source, selector) {
    function* iterator() {
        for (const value of source) {
            yield selector(value);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.select_1 = select_1;
function select_2(source, key) {
    function* iterator() {
        for (const value of source) {
            yield value[key];
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.select_2 = select_2;
function selectAsync_1(source, selector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_2() {
            for (const value of source) {
                yield yield __await(selector(value));
            }
        });
    }
    return async_1.from(iterator);
}
exports.selectAsync_1 = selectAsync_1;
function selectAsync_2(source, key) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_3() {
            for (const value of source) {
                yield yield __await(value[key]);
            }
        });
    }
    return async_1.from(iterator);
}
exports.selectAsync_2 = selectAsync_2;
function selectMany_1(source, selector) {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.selectMany_1 = selectMany_1;
function selectMany_2(source, selector) {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.selectMany_2 = selectMany_2;
function single_1(source) {
    let hasValue = false;
    let singleValue = null;
    for (const value of source) {
        if (hasValue === true) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
        }
        else {
            hasValue = true;
            singleValue = value;
        }
    }
    if (hasValue === false) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return singleValue;
}
exports.single_1 = single_1;
function single_2(source, predicate) {
    let hasValue = false;
    let singleValue = null;
    for (const value of source) {
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
    if (hasValue === false) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
    }
    return singleValue;
}
exports.single_2 = single_2;
function singleOrDefault_1(source) {
    let hasValue = false;
    let singleValue = null;
    for (const value of source) {
        if (hasValue === true) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
        }
        else {
            hasValue = true;
            singleValue = value;
        }
    }
    return singleValue;
}
exports.singleOrDefault_1 = singleOrDefault_1;
function singleOrDefault_2(source, predicate) {
    let hasValue = false;
    let singleValue = null;
    for (const value of source) {
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
    return singleValue;
}
exports.singleOrDefault_2 = singleOrDefault_2;
function skipWhile_1(source, predicate) {
    function* iterator() {
        let skip = true;
        for (const item of source) {
            if (skip === false) {
                yield item;
            }
            else if (predicate(item) === false) {
                skip = false;
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.skipWhile_1 = skipWhile_1;
function skipWhile_2(source, predicate) {
    function* iterator() {
        let index = 0;
        let skip = true;
        for (const item of source) {
            if (skip === false) {
                yield item;
            }
            else if (predicate(item, index) === false) {
                skip = false;
                yield item;
            }
            index++;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.skipWhile_2 = skipWhile_2;
function skipWhileAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_4() {
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
    return async_1.from(iterator);
}
exports.skipWhileAsync_1 = skipWhileAsync_1;
function skipWhileAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_5() {
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
    return async_1.from(iterator);
}
exports.skipWhileAsync_2 = skipWhileAsync_2;
function last_1(source) {
    let last;
    for (const value of source) {
        last = value;
    }
    if (!last) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return last;
}
exports.last_1 = last_1;
function last_2(source, predicate) {
    let last;
    for (const value of source) {
        if (predicate(value) === true) {
            last = value;
        }
    }
    if (!last) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
    }
    return last;
}
exports.last_2 = last_2;
function lastOrDefault_1(source) {
    let last = null;
    for (const value of source) {
        last = value;
    }
    return last;
}
exports.lastOrDefault_1 = lastOrDefault_1;
function lastOrDefault_2(source, predicate) {
    let last = null;
    for (const value of source) {
        if (predicate(value) === true) {
            last = value;
        }
    }
    return last;
}
exports.lastOrDefault_2 = lastOrDefault_2;
function max_1(source) {
    let max = null;
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, item);
    }
    if (max === null) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    else {
        return max;
    }
}
exports.max_1 = max_1;
function max_2(source, selector) {
    let max = null;
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, selector(item));
    }
    if (max === null) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    else {
        return max;
    }
}
exports.max_2 = max_2;
function min_1(source) {
    let min = null;
    for (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, item);
    }
    if (min === null) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    else {
        return min;
    }
}
exports.min_1 = min_1;
function min_2(source, selector) {
    let min = null;
    for (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, selector(item));
    }
    if (min === null) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    else {
        return min;
    }
}
exports.min_2 = min_2;
function sum_1(source) {
    let sum = 0;
    for (const value of source) {
        sum += value;
    }
    return sum;
}
exports.sum_1 = sum_1;
function sum_2(source, selector) {
    let sum = 0;
    for (const value of source) {
        sum += selector(value);
    }
    return sum;
}
exports.sum_2 = sum_2;
function takeWhile_1(source, predicate) {
    function* iterator() {
        for (const item of source) {
            if (predicate(item)) {
                yield item;
            }
            else {
                break;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.takeWhile_1 = takeWhile_1;
function takeWhile_2(source, predicate) {
    function* iterator() {
        let index = 0;
        for (const item of source) {
            if (predicate(item, index++)) {
                yield item;
            }
            else {
                break;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.takeWhile_2 = takeWhile_2;
function takeWhileAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_6() {
            for (const item of source) {
                if (yield __await(predicate(item))) {
                    yield yield __await(item);
                }
                else {
                    break;
                }
            }
        });
    }
    return async_1.from(iterator);
}
exports.takeWhileAsync_1 = takeWhileAsync_1;
function takeWhileAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_7() {
            let index = 0;
            for (const item of source) {
                if (yield __await(predicate(item, index++))) {
                    yield yield __await(item);
                }
                else {
                    break;
                }
            }
        });
    }
    return async_1.from(iterator);
}
exports.takeWhileAsync_2 = takeWhileAsync_2;
function union_1(first, second) {
    function* iterator() {
        const set = new Set();
        for (const item of first) {
            if (set.has(item) === false) {
                yield item;
                set.add(item);
            }
        }
        for (const item of second) {
            if (set.has(item) === false) {
                yield item;
                set.add(item);
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.union_1 = union_1;
function union_2(first, second, comparer) {
    function* iterator() {
        const result = [];
        for (const source of [first, second]) {
            for (const value of source) {
                let exists = false;
                for (const resultValue of result) {
                    if (comparer(value, resultValue) === true) {
                        exists = true;
                        break;
                    }
                }
                if (exists === false) {
                    yield value;
                    result.push(value);
                }
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.union_2 = union_2;
function where_1(source, predicate) {
    function* iterator() {
        for (const item of source) {
            if (predicate(item) === true) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.where_1 = where_1;
function where_2(source, predicate) {
    function* iterator() {
        let i = 0;
        for (const item of source) {
            if (predicate(item, i++) === true) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.where_2 = where_2;
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
    return async_1.from(generator);
}
exports.whereAsync_1 = whereAsync_1;
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
    return async_1.from(generator);
}
exports.whereAsync_2 = whereAsync_2;
function zip_1(source, second) {
    function* iterator() {
        const firstIterator = source[Symbol.iterator]();
        const secondIterator = second[Symbol.iterator]();
        while (true) {
            const a = firstIterator.next();
            const b = secondIterator.next();
            if (a.done && b.done) {
                break;
            }
            else {
                yield shared_1.AsTuple(a.value, b.value);
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.zip_1 = zip_1;
function zip_2(source, second, resultSelector) {
    function* iterator() {
        const firstIterator = source[Symbol.iterator]();
        const secondIterator = second[Symbol.iterator]();
        while (true) {
            const a = firstIterator.next();
            const b = secondIterator.next();
            if (a.done && b.done) {
                break;
            }
            else {
                yield resultSelector(a.value, b.value);
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.zip_2 = zip_2;
