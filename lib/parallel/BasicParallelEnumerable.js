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
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared/shared");
const ParallelEnumerable_1 = require("./ParallelEnumerable");
class BasicParallelEnumerable {
    constructor(dataFunc) {
        this.dataFunc = dataFunc;
    }
    aggregate(seed, func, resultSelector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.aggregate(this, seed, func, resultSelector);
        });
    }
    all(predicate) {
        const nextIteration = this.nextIteration((x) => {
            if (!predicate(x)) {
                throw new Error(String(false));
            }
            return true;
        });
        switch (nextIteration.type) {
            case 0:
                return nextIteration.generator().then(() => true, () => false);
            case 1:
                return Promise.all(nextIteration.generator()).then(() => true, () => false);
            case 2:
                return nextIteration.generator().then(Promise.all).then(() => true, () => false);
        }
    }
    allAsync(predicate) {
        const nextIteration = this.nextIterationAsync((x) => __awaiter(this, void 0, void 0, function* () {
            if ((yield predicate(x)) === false) {
                throw new Error(String(false));
            }
            return true;
        }));
        switch (nextIteration.type) {
            case 0:
                return nextIteration.generator().then(() => true, () => false);
            case 1:
                return Promise.all(nextIteration.generator()).then(() => true, () => false);
            case 2:
                return nextIteration.generator().then(Promise.all).then(() => true, () => false);
        }
    }
    any(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextIteration = this.nextIteration(predicate || ((_) => true));
            switch (nextIteration.type) {
                case 0:
                    return nextIteration.generator().then((values) => {
                        return values.some((x) => x);
                    });
                case 1:
                    return Promise.all(nextIteration.generator()).then((values) => {
                        return values.some((x) => x);
                    });
                case 2:
                    return nextIteration.generator().then(Promise.all).then((values) => {
                        return values.some((x) => x);
                    });
            }
        });
    }
    anyAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextIteration = this.nextIterationAsync(predicate);
            switch (nextIteration.type) {
                case 0:
                    return nextIteration.generator().then((values) => {
                        return values.some((x) => x);
                    });
                case 1:
                    return Promise.all(nextIteration.generator()).then((values) => {
                        return values.some((x) => x);
                    });
                case 2:
                    return nextIteration.generator().then(Promise.all).then((values) => {
                        return values.some((x) => x);
                    });
            }
        });
    }
    average(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.average(selector);
    }
    averageAsync(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.averageAsync(this, selector);
    }
    concat(second) {
        return ParallelEnumerable_1.ParallelEnumerable.concat(this, second);
    }
    contains(value, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            let values;
            if (comparer) {
                values = this.nextIteration((x) => comparer(value, x));
            }
            else {
                values = this.nextIteration((x) => x === value);
            }
            switch (values.type) {
                case 0:
                    {
                        const data = yield values.generator();
                        return data.some((x) => x);
                    }
                case 1:
                    {
                        const data = yield Promise.all(values.generator());
                        return data.some((x) => x);
                    }
                case 2:
                    {
                        const data = yield Promise.all(yield values.generator());
                        return data.some((x) => x);
                    }
            }
        });
    }
    count(predicate) {
        if (predicate) {
            return this.count_2(predicate);
        }
        else {
            return this.count_1();
        }
    }
    count_1() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
                case 2:
                    const arrayData = yield this.toArray();
                    return arrayData.length;
                case 1:
                    const promises = dataFunc.generator();
                    return promises.length;
            }
        });
    }
    count_2(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = yield this.toArray();
            let count = 0;
            for (let i = 0; i < values.length; i++) {
                if (predicate(values[i]) === true) {
                    count++;
                }
            }
            return count;
        });
    }
    countAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.nextIterationAsync(predicate);
            let countPromise;
            switch (data.type) {
                case 1:
                    countPromise = Promise.all(data.generator());
                    break;
                case 2:
                    countPromise = Promise.all(yield data.generator());
                    break;
                case 0:
                    countPromise = data.generator();
                    break;
                default:
                    throw new Error("Not Possible");
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
    distinct(comparer = shared_1.StrictEqualityComparer) {
        return ParallelEnumerable_1.ParallelEnumerable.distinct(this, comparer);
    }
    each(action) {
        return new BasicParallelEnumerable(this.nextIteration((x) => {
            action(x);
            return x;
        }));
    }
    eachAsync(action) {
        return new BasicParallelEnumerable(this.nextIterationAsync((x) => __awaiter(this, void 0, void 0, function* () {
            yield action(x);
            return x;
        })));
    }
    elementAt(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
                    return dataFunc.generator().then((values) => {
                        if (index >= values.length) {
                            throw new shared_1.ArgumentOutOfRangeException("index");
                        }
                        else {
                            return values[index];
                        }
                    });
                case 1:
                    return Promise.all(dataFunc.generator()).then((values) => {
                        if (index >= values.length) {
                            throw new shared_1.ArgumentOutOfRangeException("index");
                        }
                        else {
                            return values[index];
                        }
                    });
                case 2:
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
    elementAtOrDefault(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
                    return dataFunc.generator().then((values) => {
                        if (index >= values.length) {
                            return null;
                        }
                        else {
                            return values[index];
                        }
                    });
                case 1:
                    return Promise.all(dataFunc.generator()).then((values) => {
                        if (index >= values.length) {
                            return null;
                        }
                        else {
                            return values[index];
                        }
                    });
                case 2:
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
    except(second, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.except(this, second, comparer);
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
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
                    {
                        const values = yield dataFunc.generator();
                        if (values.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        else {
                            return values[0];
                        }
                    }
                case 1:
                    {
                        const promises = dataFunc.generator();
                        if (promises.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        else {
                            return yield promises[0];
                        }
                    }
                case 2:
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
    firstAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.toArray();
            for (const value of data) {
                if ((yield predicate(value)) === true) {
                    return value;
                }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
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
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
                    {
                        const values = yield dataFunc.generator();
                        if (values.length === 0) {
                            return null;
                        }
                        else {
                            return values[0];
                        }
                    }
                case 1:
                    {
                        const promises = dataFunc.generator();
                        if (promises.length === 0) {
                            return null;
                        }
                        else {
                            return yield promises[0];
                        }
                    }
                case 2:
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
    firstOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.toArray();
            for (const value of data) {
                if ((yield predicate(value)) === true) {
                    return value;
                }
            }
            return null;
        });
    }
    groupBy(keySelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.groupBy(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.intersect(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        if (predicate) {
            return this.last_2(predicate);
        }
        else {
            return this.last_1();
        }
    }
    last_1() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
                    {
                        const values = yield dataFunc.generator();
                        if (values.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        else {
                            return values[values.length - 1];
                        }
                    }
                case 1:
                    {
                        const promises = dataFunc.generator();
                        if (promises.length === 0) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
                        }
                        else {
                            return yield promises[promises.length - 1];
                        }
                    }
                case 2:
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
    last_2(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
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
                case 1:
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
                case 2:
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
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        });
    }
    lastAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
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
                case 1:
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
                case 2:
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
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        });
    }
    lastOrDefault(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (predicate) {
                return this.lastOrDefault_2(predicate);
            }
            else {
                return this.lastOrDefault_1();
            }
        });
    }
    lastOrDefault_1() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
                    {
                        const values = yield dataFunc.generator();
                        if (values.length === 0) {
                            return null;
                        }
                        else {
                            return values[values.length - 1];
                        }
                    }
                case 1:
                    {
                        const promises = dataFunc.generator();
                        if (promises.length === 0) {
                            return null;
                        }
                        else {
                            return yield promises[promises.length - 1];
                        }
                    }
                case 2:
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
    lastOrDefault_2(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
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
                case 1:
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
                case 2:
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
    lastOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
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
                case 1:
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
                case 2:
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
    max(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let maxInfo;
            if (selector) {
                const dataFunc = this.nextIteration(selector);
                maxInfo = yield new BasicParallelEnumerable(dataFunc).toArray();
            }
            else {
                maxInfo = yield this.toArray();
            }
            if (maxInfo.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return Math.max.apply(null, maxInfo);
        });
    }
    maxAsync(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.nextIterationAsync(selector);
            const maxInfo = yield new BasicParallelEnumerable(dataFunc).toArray();
            if (maxInfo.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return Math.max.apply(null, maxInfo);
        });
    }
    min(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let minInfo;
            if (selector) {
                const dataFunc = this.nextIteration(selector);
                minInfo = yield new BasicParallelEnumerable(dataFunc).toArray();
            }
            else {
                minInfo = yield this.toArray();
            }
            if (minInfo.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return Math.min.apply(null, minInfo);
        });
    }
    minAsync(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFunc = this.nextIterationAsync(selector);
            const maxInfo = yield new BasicParallelEnumerable(dataFunc).toArray();
            if (maxInfo.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return Math.min.apply(null, maxInfo);
        });
    }
    ofType(type) {
        return ParallelEnumerable_1.ParallelEnumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.orderBy(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.orderByDescending(this, predicate, comparer);
    }
    reverse() {
        return ParallelEnumerable_1.ParallelEnumerable.reverse(this);
    }
    select(key) {
        if (typeof key === "string") {
            return new BasicParallelEnumerable(this.nextIteration((x) => x[key]));
        }
        else {
            return new BasicParallelEnumerable(this.nextIteration(key));
        }
    }
    selectAsync(keyOrSelector) {
        let selector;
        if (typeof keyOrSelector === "string") {
            selector = (x) => (x[keyOrSelector]);
        }
        else {
            selector = keyOrSelector;
        }
        const generator = this.nextIterationAsync(selector);
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
            switch (values.type) {
                case 0:
                    {
                        for (const outer of yield values.generator()) {
                            for (const y of outer) {
                                valuesArray.push(y);
                            }
                        }
                        break;
                    }
                case 1:
                    {
                        for (const outer of values.generator()) {
                            for (const y of yield outer) {
                                valuesArray.push(y);
                            }
                        }
                        break;
                    }
                case 2:
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
        return new BasicParallelEnumerable({
            type: 0,
            generator,
        });
    }
    sequenceEquals(second, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.sequenceEquals(this, second, comparer);
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
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
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
                case 1:
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
                case 2:
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
    singleAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.toArray();
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
            const dataFunc = this.dataFunc;
            switch (dataFunc.type) {
                case 0:
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
                case 1:
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
                case 2:
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
    singleOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.toArray();
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
    skip(count) {
        const dataFunc = this.dataFunc;
        switch (dataFunc.type) {
            case 0:
                {
                    const generator = () => __awaiter(this, void 0, void 0, function* () { return (yield dataFunc.generator()).slice(count); });
                    return new BasicParallelEnumerable({
                        type: 0,
                        generator,
                    });
                }
            case 1:
                {
                    const generator = () => dataFunc.generator().slice(count);
                    return new BasicParallelEnumerable({
                        type: 1,
                        generator,
                    });
                }
            case 2:
                {
                    const generator = () => __awaiter(this, void 0, void 0, function* () {
                        const dataInner = yield dataFunc.generator();
                        return dataInner.slice(count);
                    });
                    const dataFuncNew = {
                        type: 2,
                        generator,
                    };
                    return new BasicParallelEnumerable(dataFuncNew);
                }
        }
    }
    skipWhile(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.skipWhile(this, predicate);
    }
    skipWhileAsync(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.skipWhileAsync(this, predicate);
    }
    sum(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.sum(this, selector);
    }
    sumAsync(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.sumAsync(this, selector);
    }
    take(amount) {
        return ParallelEnumerable_1.ParallelEnumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.takeWhile(this, predicate);
    }
    takeWhileAsync(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.takeWhileAsync(this, predicate);
    }
    toArray() {
        const dataFunc = this.dataFunc;
        switch (dataFunc.type) {
            case 0:
                return dataFunc.generator();
            case 1:
                return Promise.all(dataFunc.generator());
            case 2:
                return (() => __awaiter(this, void 0, void 0, function* () {
                    const data = yield dataFunc.generator();
                    return Promise.all(data);
                }))();
            default:
                throw new Error("Not Implemented");
        }
    }
    toMap(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.toMap(this, selector);
    }
    toMapAsync(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.toMapAsync(this, selector);
    }
    toSet() {
        return ParallelEnumerable_1.ParallelEnumerable.toSet(this);
    }
    union(second, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.union(this, second, comparer);
    }
    where(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.where(this, predicate);
    }
    whereAsync(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.whereAsync(this, predicate);
    }
    zip(second, resultSelector) {
        return ParallelEnumerable_1.ParallelEnumerable.zip(this, second, resultSelector);
    }
    nextIterationAsync(onfulfilled) {
        const dataFunc = this.dataFunc;
        switch (dataFunc.type) {
            case 0:
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
                        type: 2,
                        generator,
                    };
                }
            case 1:
                {
                    const generator = () => dataFunc
                        .generator()
                        .map((promise) => promise.then(onfulfilled));
                    return {
                        type: 1,
                        generator,
                    };
                }
            case 2:
                {
                    const generator = () => __awaiter(this, void 0, void 0, function* () {
                        const promises = yield dataFunc.generator();
                        return promises.map((promise) => promise.then(onfulfilled));
                    });
                    return {
                        type: 2,
                        generator,
                    };
                }
        }
    }
    nextIteration(onfulfilled) {
        const dataFunc = this.dataFunc;
        switch (dataFunc.type) {
            case 0:
                {
                    const generator = () => dataFunc.generator().then((x) => x.map(onfulfilled));
                    return {
                        type: 0,
                        generator,
                    };
                }
            case 1:
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
                        type: 1,
                        generator,
                    };
                }
            case 2:
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
                        type: 2,
                        generator,
                    };
                }
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
