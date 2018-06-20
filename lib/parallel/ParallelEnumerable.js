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
const async_1 = require("../async/async");
const shared_1 = require("../shared/shared");
const sync_1 = require("../sync/sync");
const BasicParallelEnumerable_1 = require("./BasicParallelEnumerable");
const OrderedParallelEnumerable_1 = require("./OrderedParallelEnumerable");
/**
 * Contains static methods to work with Parallel Async
 */
class ParallelEnumerable {
    constructor() {
        //
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
    static aggregate_2(source, seed, func) {
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
    static aggregate_3(source, seed, func, resultSelector) {
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
    static all(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextIteration = ParallelEnumerable.nextIteration(source, (x) => {
                if (!predicate(x)) {
                    throw new Error(String(false));
                }
                return true;
            });
            switch (nextIteration.type) {
                case 0 /* PromiseToArray */:
                    return nextIteration.generator()
                        .then(() => true, () => false);
                case 1 /* ArrayOfPromises */:
                    return Promise.all(nextIteration.generator())
                        .then(() => true, () => false);
                case 2 /* PromiseOfPromises */:
                    return nextIteration.generator()
                        .then(Promise.all.bind(Promise))
                        .then(() => true, () => false);
            }
        });
    }
    static allAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextIteration = ParallelEnumerable.nextIterationAsync(source, (x) => __awaiter(this, void 0, void 0, function* () {
                if ((yield predicate(x)) === false) {
                    throw new Error(String(false));
                }
                return true;
            }));
            switch (nextIteration.type) {
                case 0 /* PromiseToArray */:
                    return nextIteration
                        .generator()
                        .then(() => true, () => false);
                case 1 /* ArrayOfPromises */:
                    return Promise.all(nextIteration.generator())
                        .then(() => true, () => false);
                case 2 /* PromiseOfPromises */:
                    return nextIteration.generator()
                        .then(Promise.all.bind(Promise))
                        .then(() => true, () => false);
            }
        });
    }
    static empty() {
        const dataFunc = {
            generator: () => __awaiter(this, void 0, void 0, function* () { return []; }),
            type: 0 /* PromiseToArray */,
        };
        return new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc);
    }
    static any(source, predicate) {
        const nextIteration = ParallelEnumerable.nextIteration(source, predicate || ((_) => true));
        switch (nextIteration.type) {
            case 0 /* PromiseToArray */:
                return nextIteration.generator().then((values) => {
                    return values.some((x) => x);
                });
            case 1 /* ArrayOfPromises */:
                return Promise.all(nextIteration.generator()).then((values) => {
                    return values.some((x) => x);
                });
            case 2 /* PromiseOfPromises */:
                return nextIteration.generator().then((values) => Promise.all(values)).then((values) => {
                    return values.some((x) => x);
                });
        }
    }
    static anyAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextIteration = ParallelEnumerable.nextIterationAsync(source, predicate);
            switch (nextIteration.type) {
                case 0 /* PromiseToArray */:
                    return nextIteration.generator().then((values) => {
                        return values.some((x) => x);
                    });
                case 1 /* ArrayOfPromises */:
                    return Promise.all(nextIteration.generator()).then((values) => {
                        return values.some((x) => x);
                    });
                case 2 /* PromiseOfPromises */:
                    return nextIteration.generator().then((values) => Promise.all(values)).then((values) => {
                        return values.some((x) => x);
                    });
            }
        });
    }
    static asAsync(source) {
        function generator() {
            return __asyncGenerator(this, arguments, function* generator_1() {
                for (const value of yield __await(source.toArray())) {
                    yield yield __await(value);
                }
            });
        }
        return async_1.AsyncEnumerable.from(generator);
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
        var source_4, source_4_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_4, _a;
            let value;
            let count;
            try {
                for (source_4 = __asyncValues(source); source_4_1 = yield source_4.next(), !source_4_1.done;) {
                    const item = source_4_1.value;
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
        });
    }
    static average_2(source, func) {
        var source_5, source_5_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_5, _a;
            let value;
            let count;
            try {
                for (source_5 = __asyncValues(source); source_5_1 = yield source_5.next(), !source_5_1.done;) {
                    const item = source_5_1.value;
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
        });
    }
    static averageAsync(source, func) {
        var source_6, source_6_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_6, _a;
            let value;
            let count;
            try {
                for (source_6 = __asyncValues(source); source_6_1 = yield source_6.next(), !source_6_1.done;) {
                    const item = source_6_1.value;
                    value = (value || 0) + (yield func(item));
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
    static concat(first, second) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            // Wait for both enumerables
            const promiseResults = yield Promise.all([first.toArray(), second.toArray()]);
            // Concat
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static contains(source, value, comparer = shared_1.StrictEqualityComparer) {
        return __awaiter(this, void 0, void 0, function* () {
            let values;
            if (comparer) {
                values = ParallelEnumerable.nextIteration(source, (x) => comparer(value, x));
            }
            else {
                values = ParallelEnumerable.nextIteration(source, (x) => x === value);
            }
            switch (values.type) {
                case 0 /* PromiseToArray */:
                    {
                        const data = yield values.generator();
                        return data.some((x) => x);
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const data = yield Promise.all(values.generator());
                        return data.some((x) => x);
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const data = yield Promise.all(yield values.generator());
                        return data.some((x) => x);
                    }
            }
        });
    }
    static containsAsync(source, value, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = ParallelEnumerable.nextIterationAsync(source, (x) => comparer(value, x));
            switch (values.type) {
                case 0 /* PromiseToArray */:
                    {
                        const data = yield values.generator();
                        return data.some((x) => x);
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const data = yield Promise.all(values.generator());
                        return data.some((x) => x);
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const data = yield Promise.all(yield values.generator());
                        return data.some((x) => x);
                    }
            }
        });
    }
    static count(source, predicate) {
        if (predicate) {
            return ParallelEnumerable.count_2(source, predicate);
        }
        else {
            return ParallelEnumerable.count_1(source);
        }
    }
    static count_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                case 2 /* PromiseOfPromises */:
                    const arrayData = yield source.toArray();
                    return arrayData.length;
                case 1 /* ArrayOfPromises */:
                    const promises = dataFunc.generator();
                    return promises.length;
            }
        });
    }
    static count_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = yield source.toArray();
            let count = 0;
            for (let i = 0; i < values.length; i++) {
                if (predicate(values[i]) === true) {
                    count++;
                }
            }
            return count;
        });
    }
    static countAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = ParallelEnumerable.nextIterationAsync(source, predicate);
            let countPromise;
            switch (data.type) {
                case 1 /* ArrayOfPromises */:
                    countPromise = Promise.all(data.generator());
                    break;
                case 2 /* PromiseOfPromises */:
                    countPromise = Promise.all(yield data.generator());
                    break;
                case 0 /* PromiseToArray */:
                default:
                    countPromise = data.generator();
                    break;
            }
            let count = 0;
            for (const value of yield countPromise) {
                if (value) {
                    count++;
                }
            }
            return count;
        });
    }
    static distinct(source, comparer = shared_1.StrictEqualityComparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const distinctElements = [];
            for (const item of yield source.toArray()) {
                const foundItem = distinctElements.find((x) => comparer(x, item));
                if (!foundItem) {
                    distinctElements.push(item);
                }
            }
            return distinctElements;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static distinctAsync(source, comparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const distinctElements = [];
            outerLoop: for (const item of yield source.toArray()) {
                for (const distinctElement of distinctElements) {
                    const found = yield comparer(distinctElement, item);
                    if (found) {
                        continue outerLoop;
                    }
                }
                distinctElements.push(item);
            }
            return distinctElements;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static each(source, action) {
        return new BasicParallelEnumerable_1.BasicParallelEnumerable(ParallelEnumerable.nextIteration(source, (x) => {
            action(x);
            return x;
        }));
    }
    static eachAsync(source, action) {
        return new BasicParallelEnumerable_1.BasicParallelEnumerable(ParallelEnumerable.nextIterationAsync(source, (x) => __awaiter(this, void 0, void 0, function* () {
            yield action(x);
            return x;
        })));
    }
    static elementAt(source, index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (index < 0) {
                throw new shared_1.ArgumentOutOfRangeException("index");
            }
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    return dataFunc.generator().then((values) => {
                        if (index >= values.length) {
                            throw new shared_1.ArgumentOutOfRangeException("index");
                        }
                        else {
                            return values[index];
                        }
                    });
                case 1 /* ArrayOfPromises */:
                    return Promise.all(dataFunc.generator()).then((values) => {
                        if (index >= values.length) {
                            throw new shared_1.ArgumentOutOfRangeException("index");
                        }
                        else {
                            return values[index];
                        }
                    });
                case 2 /* PromiseOfPromises */:
                    return dataFunc.generator().then((values) => __awaiter(this, void 0, void 0, function* () {
                        if (index >= values.length) {
                            throw new shared_1.ArgumentOutOfRangeException("index");
                        }
                        else {
                            return yield values[index];
                        }
                    }));
            }
        });
    }
    static elementAtOrDefault(source, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    return dataFunc.generator().then((values) => {
                        if (index >= values.length) {
                            return null;
                        }
                        else {
                            return values[index];
                        }
                    });
                case 1 /* ArrayOfPromises */:
                    return Promise.all(dataFunc.generator()).then((values) => {
                        if (index >= values.length) {
                            return null;
                        }
                        else {
                            return values[index];
                        }
                    });
                case 2 /* PromiseOfPromises */:
                    return dataFunc.generator().then((values) => __awaiter(this, void 0, void 0, function* () {
                        if (index >= values.length) {
                            return null;
                        }
                        else {
                            return yield values[index];
                        }
                    }));
            }
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static exceptAsync(first, second, comparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield Promise.all([first.toArray(), second.toArray()]);
            const firstValues = values[0];
            const secondValues = values[1];
            const resultValues = [];
            for (const firstItem of firstValues) {
                let exists = false;
                for (let j = 0; j < secondValues.length; j++) {
                    const secondItem = secondValues[j];
                    if ((yield comparer(firstItem, secondItem)) === true) {
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static first(source, predicate) {
        if (predicate) {
            return ParallelEnumerable.first_2(source, predicate);
        }
        else {
            return ParallelEnumerable.first_1(source);
        }
    }
    static first_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    {
                        const values = yield dataFunc.generator();
                        if (values.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        else {
                            return values[0];
                        }
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const promises = dataFunc.generator();
                        if (promises.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        else {
                            return yield promises[0];
                        }
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const promises = yield dataFunc.generator();
                        if (promises.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        else {
                            return yield promises[0];
                        }
                    }
            }
        });
    }
    static first_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield ParallelEnumerable.toArray(source);
            for (const value of data) {
                if (predicate(value) === true) {
                    return value;
                }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        });
    }
    static firstAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield ParallelEnumerable.toArray(source);
            for (const value of data) {
                if ((yield predicate(value)) === true) {
                    return value;
                }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        });
    }
    static firstOrDefault(source, predicate) {
        if (predicate) {
            return ParallelEnumerable.firstOrDefault_2(source, predicate);
        }
        else {
            return ParallelEnumerable.firstOrDefault_1(source);
        }
    }
    static firstOrDefault_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    {
                        const values = yield dataFunc.generator();
                        if (values.length === 0) {
                            return null;
                        }
                        else {
                            return values[0];
                        }
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const promises = dataFunc.generator();
                        if (promises.length === 0) {
                            return null;
                        }
                        else {
                            return yield promises[0];
                        }
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const promises = yield dataFunc.generator();
                        if (promises.length === 0) {
                            return null;
                        }
                        else {
                            return yield promises[0];
                        }
                    }
            }
        });
    }
    static firstOrDefault_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield ParallelEnumerable.toArray(source);
            for (const value of data) {
                if (predicate(value) === true) {
                    return value;
                }
            }
            return null;
        });
    }
    static firstOrDefaultAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield ParallelEnumerable.toArray(source);
            for (const value of data) {
                if ((yield predicate(value)) === true) {
                    return value;
                }
            }
            return null;
        });
    }
    static flatten(source, shallow) {
        function iterator(sourceInner) {
            return __asyncGenerator(this, arguments, function* iterator_1() {
                var e_7, _a, e_8, _b;
                try {
                    for (var sourceInner_1 = __asyncValues(sourceInner), sourceInner_1_1; sourceInner_1_1 = yield __await(sourceInner_1.next()), !sourceInner_1_1.done;) {
                        const item = sourceInner_1_1.value;
                        if (item[Symbol.asyncIterator] !== undefined) {
                            const items = shallow ? item : iterator(item);
                            try {
                                for (var items_1 = __asyncValues(items), items_1_1; items_1_1 = yield __await(items_1.next()), !items_1_1.done;) {
                                    const inner = items_1_1.value;
                                    yield yield __await(inner);
                                }
                            }
                            catch (e_8_1) { e_8 = { error: e_8_1 }; }
                            finally {
                                try {
                                    if (items_1_1 && !items_1_1.done && (_b = items_1.return)) yield __await(_b.call(items_1));
                                }
                                finally { if (e_8) throw e_8.error; }
                            }
                        }
                        else {
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (sourceInner_1_1 && !sourceInner_1_1.done && (_a = sourceInner_1.return)) yield __await(_a.call(sourceInner_1));
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            });
        }
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            var e_9, _a;
            const results = new Array();
            try {
                for (var _b = __asyncValues(iterator(source)), _c; _c = yield _b.next(), !_c.done;) {
                    const x = _c.value;
                    results.push(x);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_9) throw e_9.error; }
            }
            return results;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static from(type, generator) {
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type,
        });
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
            /* tslint:disable:forin */
            for (const value in keyMap) {
                results.push(keyMap[value]);
            }
            /* tslint:enable:forin */
            return results;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static groupByAsync(source, keySelector, comparer) {
        if (comparer) {
            return ParallelEnumerable.groupByAsync_0(source, keySelector, comparer);
        }
        else {
            return ParallelEnumerable.groupByAsync_0_Simple(source, keySelector);
        }
    }
    static groupByAsync_0_Simple(source, keySelector) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const keyMap = {};
            for (const value of yield source.toArray()) {
                const key = yield keySelector(value);
                const grouping = keyMap[key];
                if (grouping) {
                    grouping.push(value);
                }
                else {
                    keyMap[key] = new sync_1.Grouping(key, value);
                }
            }
            const results = new Array();
            /* tslint:disable:forin */
            for (const value in keyMap) {
                results.push(keyMap[value]);
            }
            /* tslint:enable:forin */
            return results;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static groupByAsync_0(source, keySelector, comparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            var e_10, _a;
            const keyMap = new Array();
            try {
                for (var source_7 = __asyncValues(source), source_7_1; source_7_1 = yield source_7.next(), !source_7_1.done;) {
                    const value = source_7_1.value;
                    const key = yield keySelector(value);
                    let found = false;
                    for (let i = 0; i < keyMap.length; i++) {
                        const group = keyMap[i];
                        if ((yield comparer(group.key, key)) === true) {
                            group.push(value);
                            found = true;
                            break;
                        }
                    }
                    if (found === false) {
                        keyMap.push(new sync_1.Grouping(key, value));
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (source_7_1 && !source_7_1.done && (_a = source_7.return)) yield _a.call(source_7);
                }
                finally { if (e_10) throw e_10.error; }
            }
            const results = new Array();
            for (const g of keyMap) {
                results.push(g);
            }
            return results;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
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
        // generate(): AsyncIterableIterator<IGrouping<string | number, TElement>>
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
            /* tslint:disable:forin */
            const results = new Array();
            for (const value in keyMap) {
                results.push(keyMap[value]);
            }
            /* tslint:enable:forin */
            return results;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static groupBy_1(source, keySelector, elementSelector, comparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            var e_11, _a;
            const keyMap = new Array();
            try {
                for (var source_8 = __asyncValues(source), source_8_1; source_8_1 = yield source_8.next(), !source_8_1.done;) {
                    const value = source_8_1.value;
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
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (source_8_1 && !source_8_1.done && (_a = source_8.return)) yield _a.call(source_8);
                }
                finally { if (e_11) throw e_11.error; }
            }
            const results = new Array();
            for (const value of keyMap) {
                results.push(value);
            }
            return results;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static intersectAsync(first, second, comparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const firstResults = yield first.distinctAsync(comparer).toArray();
            if (firstResults.length === 0) {
                return [];
            }
            const secondResults = yield second.toArray();
            const results = new Array();
            for (let i = 0; i < firstResults.length; i++) {
                const firstValue = firstResults[i];
                for (let j = 0; j < secondResults.length; j++) {
                    const secondValue = secondResults[j];
                    if ((yield comparer(firstValue, secondValue)) === true) {
                        results.push(firstValue);
                        break;
                    }
                }
            }
            return results;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static min(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let minInfo;
            if (selector) {
                const dataFunc = ParallelEnumerable.nextIteration(source, selector);
                minInfo = yield new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc)
                    .toArray();
            }
            else {
                minInfo = yield source.toArray();
            }
            if (minInfo.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return Math.min.apply(null, minInfo);
        });
    }
    static last(source, predicate) {
        if (predicate) {
            return ParallelEnumerable.last_2(source, predicate);
        }
        else {
            return ParallelEnumerable.last_1(source);
        }
    }
    static last_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    {
                        const values = yield dataFunc.generator();
                        if (values.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        else {
                            return values[values.length - 1];
                        }
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const promises = dataFunc.generator();
                        if (promises.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        else {
                            return yield promises[promises.length - 1];
                        }
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const promises = yield dataFunc.generator();
                        if (promises.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        else {
                            return yield promises[promises.length - 1];
                        }
                    }
            }
        });
    }
    static last_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    {
                        const values = yield dataFunc.generator();
                        // Promise Array - Predicate
                        for (let i = values.length - 1; i >= 0; i--) {
                            const value = values[i];
                            if (predicate(value)) {
                                return value;
                            }
                        }
                        break;
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const promises = dataFunc.generator();
                        // Promise Array - Predicate
                        for (let i = promises.length - 1; i >= 0; i--) {
                            const value = yield promises[i];
                            if (predicate(value)) {
                                return value;
                            }
                        }
                        break;
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const promises = yield dataFunc.generator();
                        // Promise Array - Predicate
                        for (let i = promises.length - 1; i >= 0; i--) {
                            const value = yield promises[i];
                            if (predicate(value)) {
                                return value;
                            }
                        }
                        break;
                    }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        });
    }
    static lastAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    {
                        const values = yield dataFunc.generator();
                        // Promise Array - Predicate
                        for (let i = values.length - 1; i >= 0; i--) {
                            const value = values[i];
                            if ((yield predicate(value)) === true) {
                                return value;
                            }
                        }
                        break;
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const promises = dataFunc.generator();
                        // Promise Array - Predicate
                        for (let i = promises.length - 1; i >= 0; i--) {
                            const value = yield promises[i];
                            if ((yield predicate(value)) === true) {
                                return value;
                            }
                        }
                        break;
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const promises = yield dataFunc.generator();
                        // Promise Array - Predicate
                        for (let i = promises.length - 1; i >= 0; i--) {
                            const value = yield promises[i];
                            if ((yield predicate(value)) === true) {
                                return value;
                            }
                        }
                        break;
                    }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        });
    }
    static lastOrDefault(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (predicate) {
                return ParallelEnumerable.lastOrDefault_2(source, predicate);
            }
            else {
                return ParallelEnumerable.lastOrDefault_1(source);
            }
        });
    }
    static lastOrDefault_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    {
                        const values = yield dataFunc.generator();
                        if (values.length === 0) {
                            return null;
                        }
                        else {
                            return values[values.length - 1];
                        }
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const promises = dataFunc.generator();
                        if (promises.length === 0) {
                            return null;
                        }
                        else {
                            return yield promises[promises.length - 1];
                        }
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const promises = yield dataFunc.generator();
                        if (promises.length === 0) {
                            return null;
                        }
                        else {
                            return yield promises[promises.length - 1];
                        }
                    }
            }
        });
    }
    static lastOrDefault_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    {
                        const values = yield dataFunc.generator();
                        for (let i = values.length - 1; i >= 0; i--) {
                            const value = values[i];
                            if (predicate(value)) {
                                return value;
                            }
                        }
                        break;
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const promises = dataFunc.generator();
                        for (let i = promises.length - 1; i >= 0; i--) {
                            const value = yield promises[i];
                            if (predicate(value)) {
                                return value;
                            }
                        }
                        break;
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const promises = yield dataFunc.generator();
                        for (let i = promises.length - 1; i >= 0; i--) {
                            const value = yield promises[i];
                            if (predicate(value)) {
                                return value;
                            }
                        }
                        break;
                    }
            }
            return null;
        });
    }
    static lastOrDefaultAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    {
                        const values = yield dataFunc.generator();
                        for (let i = values.length - 1; i >= 0; i--) {
                            const value = values[i];
                            if ((yield predicate(value)) === true) {
                                return value;
                            }
                        }
                        break;
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const promises = dataFunc.generator();
                        for (let i = promises.length - 1; i >= 0; i--) {
                            const value = yield promises[i];
                            if ((yield predicate(value)) === true) {
                                return value;
                            }
                        }
                        break;
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const promises = yield dataFunc.generator();
                        for (let i = promises.length - 1; i >= 0; i--) {
                            const value = yield promises[i];
                            if ((yield predicate(value)) === true) {
                                return value;
                            }
                        }
                        break;
                    }
            }
            return null;
        });
    }
    static max(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let maxInfo;
            if (selector) {
                const dataFunc = ParallelEnumerable.nextIteration(source, selector);
                maxInfo = yield new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc).toArray();
            }
            else {
                maxInfo = yield source.toArray();
            }
            if (maxInfo.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return Math.max.apply(null, maxInfo);
        });
    }
    static maxAsync(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = ParallelEnumerable.nextIterationAsync(source, selector);
            const maxInfo = yield new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc).toArray();
            if (maxInfo.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return Math.max.apply(null, maxInfo);
        });
    }
    static minAsync(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = ParallelEnumerable.nextIterationAsync(source, selector);
            const maxInfo = yield new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc).toArray();
            if (maxInfo.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return Math.min.apply(null, maxInfo);
        });
    }
    static select(source, key) {
        if (typeof key === "string") {
            return new BasicParallelEnumerable_1.BasicParallelEnumerable(ParallelEnumerable.nextIteration(source, (x) => x[key]));
        }
        else {
            return new BasicParallelEnumerable_1.BasicParallelEnumerable(ParallelEnumerable.nextIteration(source, key));
        }
    }
    static selectAsync(source, keyOrSelector) {
        let selector;
        if (typeof keyOrSelector === "string") {
            selector = (x) => (x[keyOrSelector]);
        }
        else {
            selector = keyOrSelector;
        }
        const generator = ParallelEnumerable.nextIterationAsync(source, selector);
        return new BasicParallelEnumerable_1.BasicParallelEnumerable(generator);
    }
    static selectMany(source, selector) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            let values;
            if (typeof selector === "string") {
                values = yield ParallelEnumerable.nextIteration(source, (x) => x[selector]);
            }
            else {
                values = yield ParallelEnumerable.nextIteration(source, selector);
            }
            const valuesArray = [];
            switch (values.type) {
                case 0 /* PromiseToArray */:
                    {
                        for (const outer of yield values.generator()) {
                            for (const y of outer) {
                                valuesArray.push(y);
                            }
                        }
                        break;
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        for (const outer of values.generator()) {
                            for (const y of yield outer) {
                                valuesArray.push(y);
                            }
                        }
                        break;
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        for (const outer of yield values.generator()) {
                            for (const y of yield outer) {
                                valuesArray.push(y);
                            }
                        }
                        break;
                    }
            }
            return valuesArray;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static selectManyAsync(source, selector) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield ParallelEnumerable.nextIterationAsync(source, selector);
            const valuesArray = [];
            switch (values.type) {
                case 0 /* PromiseToArray */:
                    {
                        for (const outer of yield values.generator()) {
                            for (const y of outer) {
                                valuesArray.push(y);
                            }
                        }
                        break;
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        for (const outer of values.generator()) {
                            for (const y of yield outer) {
                                valuesArray.push(y);
                            }
                        }
                        break;
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        for (const outer of yield values.generator()) {
                            for (const y of yield outer) {
                                valuesArray.push(y);
                            }
                        }
                        break;
                    }
            }
            return valuesArray;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static ofType(source, type) {
        const typeCheck = typeof type === "string" ?
            ((x) => typeof x === type) :
            ((x) => x instanceof type);
        const data = () => __awaiter(this, void 0, void 0, function* () { return (yield source.toArray()).filter(typeCheck); });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator: data,
            type: 0 /* PromiseToArray */,
        });
    }
    static orderBy(source, keySelector, comparer) {
        return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generate(source, keySelector, true, comparer);
    }
    static orderByAsync(source, keySelector, comparer) {
        return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generateAsync(source, keySelector, true, comparer);
    }
    static orderByDescending(source, keySelector, comparer) {
        return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generate(source, keySelector, false, comparer);
    }
    static orderByDescendingAsync(source, keySelector, comparer) {
        return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generateAsync(source, keySelector, false, comparer);
    }
    static repeat(element, count, delay) {
        if (count < 0) {
            throw new shared_1.ArgumentOutOfRangeException(`count`);
        }
        if (delay) {
            return ParallelEnumerable.repeat_2(element, count, delay);
        }
        else {
            return ParallelEnumerable.repeat_1(element, count);
        }
    }
    static repeat_1(element, count) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = new Array(count);
            for (let i = 0; i < count; i++) {
                values[i] = element;
            }
            return values;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static repeat_2(element, count, delay) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = new Array(count);
            for (let i = 0; i < count; i++) {
                values[i] = new Promise((resolve) => setTimeout(() => resolve(element), delay));
            }
            return values;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 2 /* PromiseOfPromises */,
        });
    }
    static reverse(source) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield source.toArray();
            return values.reverse();
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
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
    static sequenceEqualsAsync(first, second, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstArray = yield first.toArray();
            const secondArray = yield second.toArray();
            if (firstArray.length !== secondArray.length) {
                return false;
            }
            for (let i = 0; i < firstArray.length; i++) {
                const firstResult = firstArray[i];
                const secondResult = secondArray[i];
                if ((yield comparer(firstResult, secondResult)) === false) {
                    return false;
                }
            }
            return true;
        });
    }
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains more than one element
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    static single(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (predicate) {
                return ParallelEnumerable.single_2(source, predicate);
            }
            else {
                return ParallelEnumerable.single_1(source);
            }
        });
    }
    static single_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    {
                        const results = yield dataFunc.generator();
                        if (results.length > 1) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                        }
                        else if (results.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        return results[0];
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const results = dataFunc.generator();
                        if (results.length > 1) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                        }
                        else if (results.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        return results[0];
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const results = yield dataFunc.generator();
                        if (results.length > 1) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                        }
                        else if (results.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        return yield results[0];
                    }
            }
        });
    }
    static single_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield ParallelEnumerable.toArray(source);
            let hasValue = false;
            let singleValue = null;
            for (const value of results) {
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
        });
    }
    /**
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    static singleAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield ParallelEnumerable.toArray(source);
            let hasValue = false;
            let singleValue = null;
            for (const value of results) {
                if ((yield predicate(value)) === true) {
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
        });
    }
    static singleOrDefault(source, predicate) {
        if (predicate) {
            return ParallelEnumerable.singleOrDefault_2(source, predicate);
        }
        else {
            return ParallelEnumerable.singleOrDefault_1(source);
        }
    }
    static singleOrDefault_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = source.dataFunc;
            switch (dataFunc.type) {
                case 0 /* PromiseToArray */:
                    {
                        const results = yield dataFunc.generator();
                        if (results.length > 1) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                        }
                        else if (results.length === 0) {
                            return null;
                        }
                        return results[0];
                    }
                case 1 /* ArrayOfPromises */:
                    {
                        const results = dataFunc.generator();
                        if (results.length > 1) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                        }
                        else if (results.length === 0) {
                            return null;
                        }
                        return results[0];
                    }
                case 2 /* PromiseOfPromises */:
                    {
                        const results = yield dataFunc.generator();
                        if (results.length > 1) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                        }
                        else if (results.length === 0) {
                            return null;
                        }
                        return yield results[0];
                    }
            }
        });
    }
    static singleOrDefault_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield ParallelEnumerable.toArray(source);
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
    static singleOrDefaultAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield ParallelEnumerable.toArray(source);
            let hasValue = false;
            let singleValue = null;
            for (const value of results) {
                if ((yield predicate(value)) === true) {
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
    static skip(source, count) {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                {
                    const generator = () => __awaiter(this, void 0, void 0, function* () { return (yield dataFunc.generator()).slice(count); });
                    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                        generator,
                        type: 0 /* PromiseToArray */,
                    });
                }
            case 1 /* ArrayOfPromises */:
                {
                    const generator = () => dataFunc.generator().slice(count);
                    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                        generator,
                        type: 1 /* ArrayOfPromises */,
                    });
                }
            case 2 /* PromiseOfPromises */:
                {
                    const generator = () => __awaiter(this, void 0, void 0, function* () {
                        const dataInner = yield dataFunc.generator();
                        return dataInner.slice(count);
                    });
                    const dataFuncNew = {
                        generator,
                        type: 2 /* PromiseOfPromises */,
                    };
                    return new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFuncNew);
                }
        }
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static skipWhileAsync(source, predicate) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield source.toArray();
            let i = 0;
            for (; i < values.length; i++) {
                const value = values[i];
                if ((yield predicate(value, i)) === false) {
                    break;
                }
            }
            const returnedValues = [];
            for (; i < values.length; i++) {
                returnedValues.push(values[i]);
            }
            return returnedValues;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
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
    static sumAsync(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let sum = 0;
            for (const value of yield source.toArray()) {
                sum += yield selector(value);
            }
            return sum;
        });
    }
    static take(source, amount) {
        const amountLeft = amount > 0 ? amount : 0;
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 1 /* ArrayOfPromises */:
                const generator1 = () => dataFunc.generator().splice(0, amountLeft);
                return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                    generator: generator1,
                    type: 1 /* ArrayOfPromises */,
                });
            case 2 /* PromiseOfPromises */:
                const generator2 = () => dataFunc.generator().then((x) => x.splice(0, amountLeft));
                return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                    generator: generator2,
                    type: 2 /* PromiseOfPromises */,
                });
            case 0 /* PromiseToArray */:
            default:
                const generator3 = () => dataFunc.generator().then((x) => x.splice(0, amountLeft));
                return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                    generator: generator3,
                    type: 0 /* PromiseToArray */,
                });
        }
    }
    static takeWhile(source, predicate) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield source.toArray();
            const results = new Array();
            if (predicate.length === 1) {
                for (const value of values) {
                    if (predicate(value) === true) {
                        results.push(value);
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                for (let i = 0; i < values.length; i++) {
                    const value = values[i];
                    if (predicate(value, i) === true) {
                        results.push(value);
                    }
                    else {
                        break;
                    }
                }
            }
            return results;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static takeWhileAsync(source, predicate) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield source.toArray();
            const results = new Array();
            if (predicate.length === 1) {
                const sPredicate = predicate;
                for (const value of values) {
                    if ((yield sPredicate(value)) === true) {
                        results.push(value);
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                for (let i = 0; i < values.length; i++) {
                    const value = values[i];
                    if ((yield predicate(value, i)) === true) {
                        results.push(value);
                    }
                    else {
                        break;
                    }
                }
            }
            return results;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static toArray(source) {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                return dataFunc.generator();
            case 1 /* ArrayOfPromises */:
                return Promise.all(dataFunc.generator());
            case 2 /* PromiseOfPromises */:
                return (() => __awaiter(this, void 0, void 0, function* () {
                    const data = yield dataFunc.generator();
                    return Promise.all(data);
                }))();
            default:
                throw new Error("Not Implemented");
        }
    }
    static toMap(source, selector) {
        var source_9, source_9_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_12, _a;
            const map = new Map();
            try {
                for (source_9 = __asyncValues(source); source_9_1 = yield source_9.next(), !source_9_1.done;) {
                    const value = source_9_1.value;
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
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (source_9_1 && !source_9_1.done && (_a = source_9.return)) yield _a.call(source_9);
                }
                finally { if (e_12) throw e_12.error; }
            }
            return map;
        });
    }
    static toMapAsync(source, selector) {
        var source_10, source_10_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_13, _a;
            const map = new Map();
            try {
                for (source_10 = __asyncValues(source); source_10_1 = yield source_10.next(), !source_10_1.done;) {
                    const value = source_10_1.value;
                    const key = yield selector(value);
                    const array = map.get(key);
                    if (array === undefined) {
                        map.set(key, [value]);
                    }
                    else {
                        array.push(value);
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (source_10_1 && !source_10_1.done && (_a = source_10.return)) yield _a.call(source_10);
                }
                finally { if (e_13) throw e_13.error; }
            }
            return map;
        });
    }
    static toObject(source, selector) {
        var source_11, source_11_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_14, _a;
            const map = {};
            try {
                for (source_11 = __asyncValues(source); source_11_1 = yield source_11.next(), !source_11_1.done;) {
                    const value = source_11_1.value;
                    map[selector(value)] = value;
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (source_11_1 && !source_11_1.done && (_a = source_11.return)) yield _a.call(source_11);
                }
                finally { if (e_14) throw e_14.error; }
            }
            return map;
        });
    }
    static toSet(source) {
        var source_12, source_12_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_15, _a;
            const set = new Set();
            try {
                for (source_12 = __asyncValues(source); source_12_1 = yield source_12.next(), !source_12_1.done;) {
                    const item = source_12_1.value;
                    set.add(item);
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (source_12_1 && !source_12_1.done && (_a = source_12.return)) yield _a.call(source_12);
                }
                finally { if (e_15) throw e_15.error; }
            }
            return set;
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
        function generator() {
            return __awaiter(this, void 0, void 0, function* () {
                var e_16, _a;
                const set = new Set();
                const secondPromise = second.toArray();
                try {
                    for (var first_3 = __asyncValues(first), first_3_1; first_3_1 = yield first_3.next(), !first_3_1.done;) {
                        const item = first_3_1.value;
                        if (set.has(item) === false) {
                            set.add(item);
                        }
                    }
                }
                catch (e_16_1) { e_16 = { error: e_16_1 }; }
                finally {
                    try {
                        if (first_3_1 && !first_3_1.done && (_a = first_3.return)) yield _a.call(first_3);
                    }
                    finally { if (e_16) throw e_16.error; }
                }
                const secondValues = yield secondPromise;
                for (const item of secondValues) {
                    if (set.has(item) === false) {
                        set.add(item);
                    }
                }
                return [...set.keys()];
            });
        }
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static unionAsync(first, second, comparer) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const values = yield Promise.all([first.toArray(), second.toArray()]);
            for (const source of values) {
                for (const value of source) {
                    let exists = false;
                    for (const resultValue of result) {
                        if ((yield comparer(value, resultValue)) === true) {
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static where(source, predicate) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield source.toArray();
            return values.filter(predicate);
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static whereAsync(source, predicate) {
        const generator = () => __awaiter(this, void 0, void 0, function* () {
            const values = yield source.toArray();
            const valuesAsync = values.map((x, i) => __awaiter(this, void 0, void 0, function* () {
                const keep = yield predicate(x, i);
                return {
                    keep,
                    x,
                };
            }));
            const filteredValues = [];
            for (const value of yield Promise.all(valuesAsync)) {
                if (value.keep) {
                    filteredValues.push(value.x);
                }
            }
            return filteredValues;
        });
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
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
        function generator() {
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static zip_2(source, second, resultSelector) {
        function generator() {
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
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static ZipAsync(source, second, resultSelector) {
        function generator() {
            return __awaiter(this, void 0, void 0, function* () {
                const items = yield Promise.all([source.toArray(), second.toArray()]);
                const max = items[0].length > items[1].length ? items[0].length : items[1].length;
                const resultPromises = new Array(max);
                for (let i = 0; i < max; i++) {
                    const a = items[0][i];
                    const b = items[1][i];
                    resultPromises[i] = resultSelector(a, b);
                }
                return Promise.all(resultPromises);
            });
        }
        return new BasicParallelEnumerable_1.BasicParallelEnumerable({
            generator,
            type: 0 /* PromiseToArray */,
        });
    }
    static nextIterationAsync(source, onfulfilled) {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                {
                    const generator = () => __awaiter(this, void 0, void 0, function* () {
                        const results = yield dataFunc.generator();
                        const newPromises = new Array(results.length);
                        for (let i = 0; i < results.length; i++) {
                            newPromises[i] = onfulfilled(results[i]);
                        }
                        return newPromises;
                    });
                    return {
                        generator,
                        type: 2 /* PromiseOfPromises */,
                    };
                }
            case 1 /* ArrayOfPromises */:
                {
                    const generator = () => dataFunc
                        .generator()
                        .map((promise) => promise.then(onfulfilled));
                    return {
                        generator,
                        type: 1 /* ArrayOfPromises */,
                    };
                }
            case 2 /* PromiseOfPromises */:
                {
                    const generator = () => __awaiter(this, void 0, void 0, function* () {
                        const promises = yield dataFunc.generator();
                        return promises.map((promise) => promise.then(onfulfilled));
                    });
                    return {
                        generator,
                        type: 2 /* PromiseOfPromises */,
                    };
                }
        }
    }
    static nextIteration(source, onfulfilled) {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                {
                    const generator = () => dataFunc.generator().then((x) => {
                        const convValues = new Array(x.length);
                        for (let i = 0; i < x.length; i++) {
                            convValues[i] = onfulfilled(x[i]);
                        }
                        return convValues;
                    });
                    return {
                        generator,
                        type: 0 /* PromiseToArray */,
                    };
                }
            case 1 /* ArrayOfPromises */:
                {
                    const generator = () => {
                        const previousData = dataFunc.generator();
                        const newPromises = new Array(previousData.length);
                        for (let i = 0; i < previousData.length; i++) {
                            newPromises[i] = previousData[i].then(onfulfilled);
                        }
                        return newPromises;
                    };
                    return {
                        generator,
                        type: 1 /* ArrayOfPromises */,
                    };
                }
            case 2 /* PromiseOfPromises */:
                {
                    const generator = () => __awaiter(this, void 0, void 0, function* () {
                        const previousData = yield dataFunc.generator();
                        const newPromises = new Array(previousData.length);
                        for (let i = 0; i < previousData.length; i++) {
                            newPromises[i] = previousData[i].then(onfulfilled);
                        }
                        return newPromises;
                    });
                    return {
                        generator,
                        type: 2 /* PromiseOfPromises */,
                    };
                }
        }
    }
}
exports.ParallelEnumerable = ParallelEnumerable;
Object.freeze(async_1.AsyncEnumerable);
