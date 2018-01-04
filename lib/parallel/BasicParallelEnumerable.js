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
        return ParallelEnumerable_1.ParallelEnumerable.all(this, predicate);
    }
    allAsync(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.allAsync(this, predicate);
    }
    any(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.any(this, predicate);
        });
    }
    anyAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.anyAsync(this, predicate);
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
            return ParallelEnumerable_1.ParallelEnumerable.contains(this, value, comparer);
        });
    }
    count(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.count(this, predicate);
    }
    countAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.countAsync(this, predicate);
        });
    }
    distinct(comparer = shared_1.StrictEqualityComparer) {
        return ParallelEnumerable_1.ParallelEnumerable.distinct(this, comparer);
    }
    each(action) {
        return ParallelEnumerable_1.ParallelEnumerable.each(this, action);
    }
    eachAsync(action) {
        return ParallelEnumerable_1.ParallelEnumerable.eachAsync(this, action);
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
            return ParallelEnumerable_1.ParallelEnumerable.max(this, selector);
        });
    }
    maxAsync(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.maxAsync(this, selector);
        });
    }
    min(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.min(this, selector);
        });
    }
    minAsync(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.minAsync(this, selector);
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
        return ParallelEnumerable_1.ParallelEnumerable.select(this, key);
    }
    selectAsync(keyOrSelector) {
        return ParallelEnumerable_1.ParallelEnumerable.selectAsync(this, keyOrSelector);
    }
    selectMany(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.selectMany(this, selector);
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
