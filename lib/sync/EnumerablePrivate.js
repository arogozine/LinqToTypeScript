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
// tslint:disable:completed-docs
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
    return async_1.from(iterator);
}
exports.skipWhileAsync_1 = skipWhileAsync_1;
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
        return __asyncGenerator(this, arguments, function* iterator_3() {
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
        return __asyncGenerator(this, arguments, function* iterator_4() {
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
