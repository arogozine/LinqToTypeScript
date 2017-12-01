"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncIterator) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared/shared");
const sync_1 = require("../sync/sync");
class BasicParallelEnumerable {
    constructor(dataFunc) {
        this.dataFunc = dataFunc;
    }
    aggregate(seed, func, resultSelector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.aggregate(seed, func, resultSelector);
        });
    }
    all(predicate) {
        return this.nextIteration((x) => {
            if (!predicate(x)) {
                throw new Error(String(false));
            }
            return true;
        }).then(() => true, () => false);
    }
    any(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const promiseResults = yield this.nextIteration(predicate || ((_) => true));
            if (predicate) {
                return promiseResults.length !== 0 && promiseResults.some((x) => x);
            }
            else {
                return promiseResults.length !== 0;
            }
        });
    }
    average(selector) {
        return ParallelEnumerable.average(selector);
    }
    concat(second) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const promiseResults = yield Promise.all([this.toArray(), second.toArray()]);
            const firstData = promiseResults[0];
            const secondData = promiseResults[1];
            const data = new Array(firstData.length + secondData.length);
            let i = 0;
            for (; i < firstData.length; i++) {
                data[i] = firstData[i];
            }
            for (let j = 0; j < secondData.length; j++, i++) {
                data[i] = secondData[j];
            }
            return data;
        });
        return new BasicParallelEnumerable(generator);
    }
    contains(value, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            let values;
            if (comparer) {
                values = yield this.nextIteration((x) => comparer(value, x));
            }
            else {
                values = yield this.nextIteration((x) => x === value);
            }
            return values.some((x) => x);
        });
    }
    count(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (predicate) {
                const values = yield this.toArray();
                let count = 0;
                for (let i = 0; i < values.length; i++) {
                    if (predicate(values[i]) === true) {
                        count++;
                    }
                }
                return count;
            }
            else {
                const data = this.dataFunc();
                if (Array.isArray(data)) {
                    return data.length;
                }
                else {
                    return (yield data).length;
                }
            }
        });
    }
    distinct(comparer = shared_1.StrictEqualityComparer) {
        const iterator = () => __awaiter(this, void 0, void 0, function* () {
            const distinctElements = [];
            yield this.nextIteration((item) => {
                const foundItem = distinctElements.find((x) => comparer(x, item));
                if (!foundItem) {
                    distinctElements.push(item);
                }
            });
            return distinctElements;
        });
        return new BasicParallelEnumerable(iterator);
    }
    each(action) {
        return new BasicParallelEnumerable(() => {
            return this.nextIteration((x) => {
                action(x);
                return x;
            });
        });
    }
    elementAt(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.dataFunc();
            if (Array.isArray(data)) {
                if (index >= data.length) {
                    throw new shared_1.ArgumentOutOfRangeException("index");
                }
                else {
                    return yield data[index];
                }
            }
            else {
                const dataArray = yield data;
                if (index >= dataArray.length) {
                    throw new shared_1.ArgumentOutOfRangeException("index");
                }
                else {
                    return yield dataArray[index];
                }
            }
        });
    }
    elementAtOrDefault(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.dataFunc();
            if (Array.isArray(data)) {
                if (index >= data.length) {
                    return null;
                }
                else {
                    return yield data[index];
                }
            }
            else {
                const dataArray = yield data;
                if (index >= dataArray.length) {
                    return null;
                }
                else {
                    return yield dataArray[index];
                }
            }
        });
    }
    except(second, comparer) {
        return ParallelEnumerable.except(this, second, comparer);
    }
    first(predicate) {
        if (predicate) {
            return this.first_2(predicate);
        }
        else {
            return this.first_1();
        }
    }
    first_1() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPromises = this.dataFunc();
            if (Array.isArray(dataPromises)) {
                if (dataPromises.length === 0) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                }
                return yield dataPromises[0];
            }
            else {
                const data = yield dataPromises;
                if (data.length === 0) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                }
                else {
                    return data[0];
                }
            }
        });
    }
    first_2(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.toArray();
            for (const value of data) {
                if (predicate(value) === true) {
                    return value;
                }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        });
    }
    firstOrDefault(predicate) {
        if (predicate) {
            return this.firstOrDefault_2(predicate);
        }
        else {
            return this.firstOrDefault_1();
        }
    }
    firstOrDefault_1() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPromises = this.dataFunc();
            if (Array.isArray(dataPromises)) {
                if (dataPromises.length === 0) {
                    return null;
                }
                return yield dataPromises[0];
            }
            else {
                const data = yield dataPromises;
                if (data.length === 0) {
                    return null;
                }
                else {
                    return data[0];
                }
            }
        });
    }
    firstOrDefault_2(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.toArray();
            for (const value of data) {
                if (predicate(value) === true) {
                    return value;
                }
            }
            return null;
        });
    }
    groupBy(keySelector, comparer) {
        return ParallelEnumerable.groupBy(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return ParallelEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return ParallelEnumerable.intersect(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return ParallelEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPromises = this.dataFunc();
            if (Array.isArray(dataPromises)) {
                if (predicate) {
                    for (let i = dataPromises.length - 1; i >= 0; i--) {
                        const value = yield dataPromises[i];
                        if (predicate(value)) {
                            return value;
                        }
                    }
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
                }
                else {
                    if (dataPromises.length === 0) {
                        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                    }
                    else {
                        return yield dataPromises[dataPromises.length - 1];
                    }
                }
            }
            else {
                const values = yield dataPromises;
                if (predicate) {
                    for (let i = values.length - 1; i >= 0; i--) {
                        const value = values[i];
                        if (predicate(value)) {
                            return value;
                        }
                    }
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
                }
                else {
                    if (values.length === 0) {
                        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                    }
                    else {
                        return yield values[values.length - 1];
                    }
                }
            }
        });
    }
    lastOrDefault(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPromises = this.dataFunc();
            if (Array.isArray(dataPromises)) {
                if (predicate) {
                    for (let i = dataPromises.length - 1; i >= 0; i--) {
                        const value = yield dataPromises[i];
                        if (predicate(value)) {
                            return value;
                        }
                    }
                    return null;
                }
                else {
                    if (dataPromises.length === 0) {
                        return null;
                    }
                    else {
                        return yield dataPromises[dataPromises.length - 1];
                    }
                }
            }
            else {
                const values = yield dataPromises;
                if (predicate) {
                    for (let i = values.length - 1; i >= 0; i--) {
                        const value = values[i];
                        if (predicate(value)) {
                            return value;
                        }
                    }
                    return null;
                }
                else {
                    if (values.length === 0) {
                        return null;
                    }
                    else {
                        return yield values[values.length - 1];
                    }
                }
            }
        });
    }
    max(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let maxInfo;
            if (selector) {
                maxInfo = yield this.nextIteration(selector);
            }
            else {
                const data = this.dataFunc();
                maxInfo = yield Promise.all(data);
            }
            return Math.max.apply(null, maxInfo);
        });
    }
    min(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let minInfo;
            if (selector) {
                minInfo = yield this.nextIteration(selector);
            }
            else {
                const data = this.dataFunc();
                minInfo = yield Promise.all(data);
            }
            return Math.min.apply(null, minInfo);
        });
    }
    ofType(type) {
        return ParallelEnumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return ParallelEnumerable.orderBy(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return ParallelEnumerable.orderByDescending(this, predicate, comparer);
    }
    reverse() {
        return ParallelEnumerable.reverse(this);
    }
    select(key) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            let values;
            if (typeof key === "string") {
                values = yield this.nextIteration((x) => x[key]);
            }
            else {
                values = yield this.nextIteration(key);
            }
            return values;
        });
        return new BasicParallelEnumerable(generator);
    }
    selectMany(selector) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            let values;
            if (typeof selector === "string") {
                values = yield this.nextIteration((x) => x[selector]);
            }
            else {
                values = yield this.nextIteration(selector);
            }
            const valuesArray = [];
            for (const outer of values) {
                for (const y of outer) {
                    valuesArray.push(y);
                }
            }
            return valuesArray;
        });
        return new BasicParallelEnumerable(generator);
    }
    sequenceEquals(second, comparer) {
        return ParallelEnumerable.sequenceEquals(this, second, comparer);
    }
    single(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (predicate) {
                return this.single_2(predicate);
            }
            else {
                return this.single_1();
            }
        });
    }
    single_1() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPromises = this.dataFunc();
            if (Array.isArray(dataPromises)) {
                if (dataPromises.length > 1) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                }
                else if (dataPromises.length === 0) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                }
                return yield dataPromises[0];
            }
            else {
                const results = yield dataPromises;
                if (results.length > 1) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                }
                else if (results.length === 0) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                }
                return results[0];
            }
        });
    }
    single_2(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.toArray();
            let hasValue = false;
            let singleValue = null;
            for (const value of results) {
                if (predicate(value)) {
                    if (hasValue === true) {
                        throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
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
        });
    }
    singleOrDefault(predicate) {
        if (predicate) {
            return this.singleOrDefault_2(predicate);
        }
        else {
            return this.singleOrDefault_1();
        }
    }
    singleOrDefault_1() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPromises = this.dataFunc();
            if (Array.isArray(dataPromises)) {
                if (dataPromises.length > 1) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                }
                else if (dataPromises.length === 0) {
                    return null;
                }
                return yield dataPromises[0];
            }
            else {
                const results = yield dataPromises;
                if (results.length > 1) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                }
                else if (results.length === 0) {
                    return null;
                }
                return results[0];
            }
        });
    }
    singleOrDefault_2(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.toArray();
            let hasValue = false;
            let singleValue = null;
            for (const value of results) {
                if (predicate(value)) {
                    if (hasValue === true) {
                        throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                    }
                    else {
                        hasValue = true;
                        singleValue = value;
                    }
                }
            }
            return singleValue;
        });
    }
    skip(count) {
        const promiseOrPromises = this.dataFunc();
        if (Array.isArray(promiseOrPromises)) {
            return new BasicParallelEnumerable(() => promiseOrPromises.slice(count));
        }
        else {
            return new BasicParallelEnumerable(() => __awaiter(this, void 0, void 0, function* () { return (yield promiseOrPromises).slice(count); }));
        }
    }
    skipWhile(predicate) {
        return ParallelEnumerable.skipWhile(this, predicate);
    }
    sum(selector) {
        return ParallelEnumerable.sum(this, selector);
    }
    take(amount) {
        return ParallelEnumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return ParallelEnumerable.takeWhile(this, predicate);
    }
    toArray() {
        return __awaiter(this, void 0, void 0, function* () {
            const promiseOrPromises = this.dataFunc();
            if (Array.isArray(promiseOrPromises)) {
                return Promise.all(promiseOrPromises);
            }
            else {
                return yield promiseOrPromises;
            }
        });
    }
    toMap(selector) {
        return ParallelEnumerable.toMap(this, selector);
    }
    toSet() {
        return ParallelEnumerable.toSet(this);
    }
    union(second, comparer) {
        return ParallelEnumerable.union(this, second, comparer);
    }
    where(predicate) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield this.toArray();
            return values.filter(predicate);
        });
        return new BasicParallelEnumerable(generator);
    }
    zip(second, resultSelector) {
        return ParallelEnumerable.zip(second, resultSelector);
    }
    nextIteration(onfulfilled) {
        const promiseOrPromises = this.dataFunc();
        if (Array.isArray(promiseOrPromises)) {
            const newPromises = new Array(promiseOrPromises.length);
            for (let i = 0; i < promiseOrPromises.length; i++) {
                newPromises[i] = promiseOrPromises[i].then(onfulfilled);
            }
            return Promise.all(newPromises);
        }
        else {
            return promiseOrPromises.then((data) => data.map(onfulfilled));
        }
    }
    [Symbol.asyncIterator]() {
        const toArray = this.toArray;
        const thisOuter = this;
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_1() {
                for (const value of yield __await(toArray.apply(thisOuter))) {
                    yield value;
                }
            });
        }
        return iterator();
    }
}
exports.BasicParallelEnumerable = BasicParallelEnumerable;
class OrderedParallelEnumerable extends BasicParallelEnumerable {
    constructor(map, comparer) {
        super(OrderedParallelEnumerable.generate(map, comparer));
        this.map = map;
    }
    static unrollAndSort(mapPromise, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield mapPromise;
            const returnValues = new Array();
            for (const key of [...map.keys()].sort(comparer ? comparer : undefined)) {
                const values = map.get(key);
                if (values instanceof Map) {
                    for (const value of yield OrderedParallelEnumerable.unrollAndSort(values, comparer)) {
                        returnValues.push(value);
                    }
                }
                else {
                    for (const value of values) {
                        returnValues.push(value);
                    }
                }
            }
            return returnValues;
        });
    }
    static generate(mapFunc, comparer) {
        return () => OrderedParallelEnumerable.unrollAndSort(mapFunc(), comparer);
    }
    getMap() {
        return this.map();
    }
    thenBy(keySelector, comparer) {
        return ParallelEnumerable.thenBy(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return ParallelEnumerable.thenByDescending(this, keySelector, comparer);
    }
}
class OrderedParallelEnumerableDescending extends BasicParallelEnumerable {
    constructor(map, comparer) {
        super(OrderedParallelEnumerableDescending.generate(map, comparer));
        this.map = map;
    }
    static unrollAndSort(mapPromise, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield mapPromise;
            const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
            const returnValues = new Array();
            for (let i = sortedKeys.length - 1; i >= 0; i--) {
                const key = sortedKeys[i];
                const values = map.get(key);
                if (values instanceof Map) {
                    for (const value of yield OrderedParallelEnumerableDescending.unrollAndSort(values, comparer)) {
                        returnValues.push(value);
                    }
                }
                else {
                    for (const value of values) {
                        returnValues.push(value);
                    }
                }
            }
            return returnValues;
        });
    }
    static generate(mapFunc, comparer) {
        return () => OrderedParallelEnumerableDescending.unrollAndSort(mapFunc(), comparer);
    }
    getMap() {
        return this.map();
    }
    thenBy(keySelector, comparer) {
        return ParallelEnumerable.thenBy(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return ParallelEnumerable.thenByDescending(this, keySelector, comparer);
    }
}
class ParallelEnumerable {
    constructor() {
    }
    static aggregate(source, seedOrFunc, func, resultSelector) {
        if (resultSelector) {
            if (!func) {
                throw new ReferenceError(`TAccumulate function is undefined`);
            }
            return ParallelEnumerable.aggregate_3(source, seedOrFunc, func, resultSelector);
        }
        else if (func) {
            return ParallelEnumerable.aggregate_2(source, seedOrFunc, func);
        }
        else {
            return ParallelEnumerable.aggregate_1(source, seedOrFunc);
        }
    }
    static aggregate_1(source, func) {
        return __awaiter(this, void 0, void 0, function* () {
            let aggregateValue;
            try {
                for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield source_1.next(), !source_1_1.done;) {
                    const value = yield source_1_1.value;
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
            var e_1, _a;
        });
    }
    static aggregate_2(source, seed, func) {
        return __awaiter(this, void 0, void 0, function* () {
            let aggregateValue = seed;
            try {
                for (var source_2 = __asyncValues(source), source_2_1; source_2_1 = yield source_2.next(), !source_2_1.done;) {
                    const value = yield source_2_1.value;
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
            var e_2, _a;
        });
    }
    static aggregate_3(source, seed, func, resultSelector) {
        return __awaiter(this, void 0, void 0, function* () {
            let aggregateValue = seed;
            try {
                for (var source_3 = __asyncValues(source), source_3_1; source_3_1 = yield source_3.next(), !source_3_1.done;) {
                    const value = yield source_3_1.value;
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
            var e_3, _a;
        });
    }
    static average(source, selector) {
        if (selector) {
            return ParallelEnumerable.average_2(source, selector);
        }
        else {
            return ParallelEnumerable.average_1(source);
        }
    }
    static average_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let value;
            let count;
            try {
                for (var source_4 = __asyncValues(source), source_4_1; source_4_1 = yield source_4.next(), !source_4_1.done;) {
                    const item = yield source_4_1.value;
                    value = (value || 0) + item;
                    count = (count || 0) + 1;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (source_4_1 && !source_4_1.done && (_a = source_4.return)) yield _a.call(source_4);
                }
                finally { if (e_4) throw e_4.error; }
            }
            if (value === undefined) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return value / count;
            var e_4, _a;
        });
    }
    static average_2(source, func) {
        return __awaiter(this, void 0, void 0, function* () {
            let value;
            let count;
            try {
                for (var source_5 = __asyncValues(source), source_5_1; source_5_1 = yield source_5.next(), !source_5_1.done;) {
                    const item = yield source_5_1.value;
                    value = (value || 0) + func(item);
                    count = (count || 0) + 1;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (source_5_1 && !source_5_1.done && (_a = source_5.return)) yield _a.call(source_5);
                }
                finally { if (e_5) throw e_5.error; }
            }
            if (value === undefined) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return value / count;
            var e_5, _a;
        });
    }
    static except(first, second, comparer = shared_1.EqualityComparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield Promise.all([first.toArray(), second.toArray()]);
            const firstValues = values[0];
            const secondValues = values[1];
            const resultValues = [];
            for (const firstItem of firstValues) {
                let exists = false;
                for (let j = 0; j < secondValues.length; j++) {
                    const secondItem = secondValues[j];
                    if (comparer(firstItem, secondItem) === true) {
                        exists = true;
                        break;
                    }
                }
                if (exists === false) {
                    resultValues.push(firstItem);
                }
            }
            return resultValues;
        });
        return new BasicParallelEnumerable(generator);
    }
    static from(promisesOrGenerator) {
        if (Array.isArray(promisesOrGenerator)) {
            if (promisesOrGenerator.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return new BasicParallelEnumerable(() => promisesOrGenerator);
        }
        else {
            return new BasicParallelEnumerable(promisesOrGenerator);
        }
    }
    static groupBy(source, keySelector, comparer) {
        if (comparer) {
            return ParallelEnumerable.groupBy_0(source, keySelector, comparer);
        }
        else {
            return ParallelEnumerable.groupBy_0_Simple(source, keySelector);
        }
    }
    static groupBy_0_Simple(source, keySelector) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const keyMap = {};
            for (const value of yield source.toArray()) {
                const key = keySelector(value);
                const grouping = keyMap[key];
                if (grouping) {
                    grouping.push(value);
                }
                else {
                    keyMap[key] = new sync_1.Grouping(key, value);
                }
            }
            const results = new Array();
            for (const value in keyMap) {
                results.push(keyMap[value]);
            }
            return results;
        });
        return new BasicParallelEnumerable(generator);
    }
    static groupBy_0(source, keySelector, comparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const keyMap = new Array();
            for (const value of yield source.toArray()) {
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
            const results = new Array();
            for (const g of keyMap) {
                results.push(g);
            }
            return results;
        });
        return new BasicParallelEnumerable(generator);
    }
    static groupByWithSel(source, keySelector, elementSelector, comparer) {
        if (comparer) {
            return ParallelEnumerable.groupBy_1(source, keySelector, elementSelector, comparer);
        }
        else {
            return ParallelEnumerable.groupBy_1_Simple(source, keySelector, elementSelector);
        }
    }
    static groupBy_1_Simple(source, keySelector, elementSelector) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const keyMap = {};
            for (const value of yield source.toArray()) {
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
            const results = new Array();
            for (const value in keyMap) {
                results.push(keyMap[value]);
            }
            return results;
        });
        return new BasicParallelEnumerable(generator);
    }
    static groupBy_1(source, keySelector, elementSelector, comparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const keyMap = new Array();
            try {
                for (var source_6 = __asyncValues(source), source_6_1; source_6_1 = yield source_6.next(), !source_6_1.done;) {
                    const value = yield source_6_1.value;
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
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (source_6_1 && !source_6_1.done && (_a = source_6.return)) yield _a.call(source_6);
                }
                finally { if (e_6) throw e_6.error; }
            }
            const results = new Array();
            for (const value of keyMap) {
                results.push(value);
            }
            return results;
            var e_6, _a;
        });
        return new BasicParallelEnumerable(generator);
    }
    static join(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const innerOuter = yield Promise.all([inner.toArray(), outer.toArray()]);
            const innerArray = innerOuter[0];
            const outerArray = innerOuter[1];
            const results = new Array();
            for (const o of outerArray) {
                const outerKey = outerKeySelector(o);
                for (const i of innerArray) {
                    const innerKey = innerKeySelector(i);
                    if (comparer(outerKey, innerKey) === true) {
                        results.push(resultSelector(o, i));
                    }
                }
            }
            return results;
        });
        return new BasicParallelEnumerable(generator);
    }
    static intersect(first, second, comparer = shared_1.StrictEqualityComparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const firstResults = yield first.distinct(comparer).toArray();
            if (firstResults.length === 0) {
                return [];
            }
            const secondResults = yield second.toArray();
            const results = new Array();
            for (let i = 0; i < firstResults.length; i++) {
                const firstValue = firstResults[i];
                for (let j = 0; j < secondResults.length; j++) {
                    const secondValue = secondResults[j];
                    if (comparer(firstValue, secondValue) === true) {
                        results.push(firstValue);
                        break;
                    }
                }
            }
            return results;
        });
        return new BasicParallelEnumerable(generator);
    }
    static skip(source, count) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            return (yield source.toArray()).slice(count);
        });
        return new BasicParallelEnumerable(generator);
    }
    static skipWhile(source, predicate) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield source.toArray();
            let i = 0;
            for (; i < values.length; i++) {
                const value = values[i];
                if (predicate(value, i) === false) {
                    break;
                }
            }
            const returnedValues = [];
            for (; i < values.length; i++) {
                returnedValues.push(values[i]);
            }
            return returnedValues;
        });
        return new BasicParallelEnumerable(generator);
    }
    static ofType(source, type) {
        const typeCheck = typeof type === "string" ?
            ((x) => typeof x === type) :
            ((x) => x instanceof type);
        const generator = () => __awaiter(this, void 0, void 0, function* () { return (yield source.toArray()).filter(typeCheck); });
        return new BasicParallelEnumerable(generator);
    }
    static orderBy(source, keySelector, comparer) {
        return new OrderedParallelEnumerable(ParallelEnumerable.orderByInner(source, keySelector), comparer);
    }
    static orderByInner(source, keySelector) {
        return function lazyMap() {
            return __awaiter(this, void 0, void 0, function* () {
                const map = new Map();
                try {
                    for (var source_7 = __asyncValues(source), source_7_1; source_7_1 = yield source_7.next(), !source_7_1.done;) {
                        const item = yield source_7_1.value;
                        const key = keySelector(item);
                        const currentMapping = map.get(key);
                        if (currentMapping) {
                            currentMapping.push(item);
                        }
                        else {
                            map.set(key, [item]);
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (source_7_1 && !source_7_1.done && (_a = source_7.return)) yield _a.call(source_7);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                return map;
                var e_7, _a;
            });
        };
    }
    static orderByDescending(source, keySelector, comparer) {
        return new OrderedParallelEnumerableDescending(ParallelEnumerable.orderByInner(source, keySelector), comparer);
    }
    static range(start, count) {
        const generator = () => {
            const items = new Array(count);
            const max = start + count;
            for (let i = start, j = 0; i < max; i++, j++) {
                items[j] = new Promise((resolve) => resolve(i));
            }
            return items;
        };
        return new BasicParallelEnumerable(generator);
    }
    static repeat(element, count, delay) {
        if (delay) {
            return ParallelEnumerable.repeat_2(element, count, delay);
        }
        else {
            return ParallelEnumerable.repeat_1(element, count);
        }
    }
    static repeat_1(element, count) {
        const generator = () => {
            const values = new Array(count);
            for (let i = 0; i < count; i++) {
                values[i] = new Promise((resolve) => resolve(element));
            }
            return values;
        };
        return new BasicParallelEnumerable(generator);
    }
    static repeat_2(element, count, delay) {
        const generator = () => {
            const values = new Array(count);
            for (let i = 0; i < count; i++) {
                values[i] = new Promise((resolve) => setTimeout(() => resolve(element), delay));
            }
            return values;
        };
        return new BasicParallelEnumerable(generator);
    }
    static reverse(source) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield source.toArray();
            return values.reverse();
        });
        return new BasicParallelEnumerable(generator);
    }
    static sequenceEquals(first, second, comparer = shared_1.StrictEqualityComparer) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstArray = yield first.toArray();
            const secondArray = yield second.toArray();
            if (firstArray.length !== secondArray.length) {
                return false;
            }
            for (let i = 0; i < firstArray.length; i++) {
                const firstResult = firstArray[i];
                const secondResult = secondArray[i];
                if (comparer(firstResult, secondResult) === false) {
                    return false;
                }
            }
            return true;
        });
    }
    static sum(source, selector) {
        if (selector) {
            return ParallelEnumerable.sum_2(source, selector);
        }
        else {
            return ParallelEnumerable.sum_1(source);
        }
    }
    static sum_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let sum = 0;
            for (const value of yield source.toArray()) {
                sum += value;
            }
            return sum;
        });
    }
    static sum_2(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let sum = 0;
            for (const value of yield source.toArray()) {
                sum += selector(value);
            }
            return sum;
        });
    }
    static take(source, amount) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const amountLeft = amount > 0 ? amount : 0;
            const values = yield source.toArray();
            return values.splice(0, amountLeft);
        });
        return new BasicParallelEnumerable(generator);
    }
    static takeWhile(source, predicate) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield source.toArray();
            return values.filter(predicate);
        });
        return new BasicParallelEnumerable(generator);
    }
    static thenBy(source, keySelector, comparer) {
        function sortInnerMost(item) {
            if (item instanceof Map) {
                for (const key of item.keys()) {
                    item.set(key, sortInnerMost(item.get(key)));
                }
                return item;
            }
            else {
                const map = new Map();
                for (let i = 0; i < item.length; i++) {
                    const value = item[i];
                    const key = keySelector(value);
                    const mapping = map.get(key);
                    if (mapping) {
                        mapping.push(value);
                    }
                    else {
                        map.set(key, [value]);
                    }
                }
                return map;
            }
        }
        return new OrderedParallelEnumerable(() => __awaiter(this, void 0, void 0, function* () { return sortInnerMost(yield source.getMap()); }), comparer);
    }
    static thenByDescending(source, keySelector, comparer) {
        function sortInnerMost(item) {
            if (item instanceof Map) {
                for (const key of item.keys()) {
                    item.set(key, sortInnerMost(item.get(key)));
                }
                return item;
            }
            else {
                const map = new Map();
                for (let i = 0; i < item.length; i++) {
                    const value = item[i];
                    const key = keySelector(value);
                    const mapping = map.get(key);
                    if (mapping) {
                        mapping.push(value);
                    }
                    else {
                        map.set(key, [value]);
                    }
                }
                return map;
            }
        }
        return new OrderedParallelEnumerableDescending(() => __awaiter(this, void 0, void 0, function* () { return sortInnerMost(yield source.getMap()); }), comparer);
    }
    static toMap(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = new Map();
            try {
                for (var source_8 = __asyncValues(source), source_8_1; source_8_1 = yield source_8.next(), !source_8_1.done;) {
                    const value = yield source_8_1.value;
                    const key = selector(value);
                    const array = map.get(key);
                    if (array === undefined) {
                        map.set(key, [value]);
                    }
                    else {
                        array.push(value);
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (source_8_1 && !source_8_1.done && (_a = source_8.return)) yield _a.call(source_8);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return map;
            var e_8, _a;
        });
    }
    static toObject(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = {};
            try {
                for (var source_9 = __asyncValues(source), source_9_1; source_9_1 = yield source_9.next(), !source_9_1.done;) {
                    const value = yield source_9_1.value;
                    map[selector(value)] = value;
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (source_9_1 && !source_9_1.done && (_a = source_9.return)) yield _a.call(source_9);
                }
                finally { if (e_9) throw e_9.error; }
            }
            return map;
            var e_9, _a;
        });
    }
    static toSet(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const set = new Set();
            try {
                for (var source_10 = __asyncValues(source), source_10_1; source_10_1 = yield source_10.next(), !source_10_1.done;) {
                    const item = yield source_10_1.value;
                    set.add(item);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (source_10_1 && !source_10_1.done && (_a = source_10.return)) yield _a.call(source_10);
                }
                finally { if (e_10) throw e_10.error; }
            }
            return set;
            var e_10, _a;
        });
    }
    static union(first, second, comparer) {
        if (comparer) {
            return ParallelEnumerable.union_2(first, second, comparer);
        }
        else {
            return ParallelEnumerable.union_1(first, second);
        }
    }
    static union_1(first, second) {
        function iterator() {
            return __awaiter(this, void 0, void 0, function* () {
                const set = new Set();
                const secondPromise = second.toArray();
                try {
                    for (var first_3 = __asyncValues(first), first_3_1; first_3_1 = yield first_3.next(), !first_3_1.done;) {
                        const item = yield first_3_1.value;
                        if (set.has(item) === false) {
                            set.add(item);
                        }
                    }
                }
                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                finally {
                    try {
                        if (first_3_1 && !first_3_1.done && (_a = first_3.return)) yield _a.call(first_3);
                    }
                    finally { if (e_11) throw e_11.error; }
                }
                const secondValues = yield secondPromise;
                for (const item of secondValues) {
                    if (set.has(item) === false) {
                        set.add(item);
                    }
                }
                return [...set.keys()];
                var e_11, _a;
            });
        }
        return new BasicParallelEnumerable(iterator);
    }
    static union_2(first, second, comparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const values = yield Promise.all([first.toArray(), second.toArray()]);
            for (const source of values) {
                for (const value of source) {
                    let exists = false;
                    for (const resultValue of result) {
                        if (comparer(value, resultValue) === true) {
                            exists = true;
                            break;
                        }
                    }
                    if (exists === false) {
                        result.push(value);
                    }
                }
            }
            return result;
        });
        return new BasicParallelEnumerable(generator);
    }
    static zip(source, second, resultSelector) {
        if (resultSelector) {
            return ParallelEnumerable.zip_2(source, second, resultSelector);
        }
        else {
            return ParallelEnumerable.zip_1(source, second);
        }
    }
    static zip_1(source, second) {
        function iterator() {
            return __awaiter(this, void 0, void 0, function* () {
                const items = yield Promise.all([source.toArray(), second.toArray()]);
                const max = items[0].length > items[1].length ? items[0].length : items[1].length;
                const results = new Array(max);
                for (let i = 0; i < max; i++) {
                    const a = items[0][i];
                    const b = items[1][i];
                    results[i] = shared_1.AsTuple(a, b);
                }
                return results;
            });
        }
        return new BasicParallelEnumerable(iterator);
    }
    static zip_2(source, second, resultSelector) {
        function iterator() {
            return __awaiter(this, void 0, void 0, function* () {
                const items = yield Promise.all([source.toArray(), second.toArray()]);
                const max = items[0].length > items[1].length ? items[0].length : items[1].length;
                const results = new Array(max);
                for (let i = 0; i < max; i++) {
                    const a = items[0][i];
                    const b = items[1][i];
                    results[i] = resultSelector(a, b);
                }
                return results;
            });
        }
        return new BasicParallelEnumerable(iterator);
    }
}
exports.ParallelEnumerable = ParallelEnumerable;
