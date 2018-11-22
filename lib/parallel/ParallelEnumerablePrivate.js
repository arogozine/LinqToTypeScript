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
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared/shared");
const sync_1 = require("../sync/sync");
const BasicParallelEnumerable_1 = require("./BasicParallelEnumerable");
// tslint:disable:completed-docs
function average_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        let itemCount;
        for (const item of yield source.toArray()) {
            value = (value || 0) + item;
            itemCount = (itemCount || 0) + 1;
        }
        if (value === undefined) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return value / itemCount;
    });
}
exports.average_1 = average_1;
function average_2(source, func) {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        // tslint:disable-next-line:no-shadowed-variable
        let count;
        for (const item of yield source.toArray()) {
            value = (value || 0) + func(item);
            count = (count || 0) + 1;
        }
        if (value === undefined) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return value / count;
    });
}
exports.average_2 = average_2;
function count_1(source) {
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
exports.count_1 = count_1;
function count_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const values = yield source.toArray();
        let totalCount = 0;
        for (let i = 0; i < values.length; i++) {
            if (predicate(values[i]) === true) {
                totalCount++;
            }
        }
        return totalCount;
    });
}
exports.count_2 = count_2;
function first_1(source) {
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
exports.first_1 = first_1;
function first_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield toArray(source);
        for (const value of data) {
            if (predicate(value) === true) {
                return value;
            }
        }
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
    });
}
exports.first_2 = first_2;
function firstOrDefault_1(source) {
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
exports.firstOrDefault_1 = firstOrDefault_1;
function firstOrDefault_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield toArray(source);
        for (const value of data) {
            if (predicate(value) === true) {
                return value;
            }
        }
        return null;
    });
}
exports.firstOrDefault_2 = firstOrDefault_2;
function groupBy_0_Simple(source, keySelector) {
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
exports.groupBy_0_Simple = groupBy_0_Simple;
function groupBy_0(source, keySelector, comparer) {
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
exports.groupBy_0 = groupBy_0;
function groupByAsync_0_Simple(source, keySelector) {
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
exports.groupByAsync_0_Simple = groupByAsync_0_Simple;
function groupByAsync_0(source, keySelector, comparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        var e_1, _a;
        const keyMap = new Array();
        try {
            for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield source_1.next(), !source_1_1.done;) {
                const value = source_1_1.value;
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield _a.call(source_1);
            }
            finally { if (e_1) throw e_1.error; }
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
exports.groupByAsync_0 = groupByAsync_0;
function groupBy_1_Simple(source, keySelector, elementSelector) {
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
exports.groupBy_1_Simple = groupBy_1_Simple;
function groupBy_1(source, keySelector, elementSelector, comparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        var e_2, _a;
        const keyMap = new Array();
        try {
            for (var source_2 = __asyncValues(source), source_2_1; source_2_1 = yield source_2.next(), !source_2_1.done;) {
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
                    keyMap.push(new sync_1.Grouping(key, element));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield _a.call(source_2);
            }
            finally { if (e_2) throw e_2.error; }
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
exports.groupBy_1 = groupBy_1;
function last_1(source) {
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
exports.last_1 = last_1;
function last_2(source, predicate) {
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
exports.last_2 = last_2;
function lastOrDefault_1(source) {
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
exports.lastOrDefault_1 = lastOrDefault_1;
function lastOrDefault_2(source, predicate) {
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
exports.lastOrDefault_2 = lastOrDefault_2;
function repeat_1(element, count) {
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
exports.repeat_1 = repeat_1;
function repeat_2(element, count, delay) {
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
exports.repeat_2 = repeat_2;
function single_1(source) {
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
exports.single_1 = single_1;
function single_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield toArray(source);
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
exports.single_2 = single_2;
function singleOrDefault_1(source) {
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
exports.singleOrDefault_1 = singleOrDefault_1;
function singleOrDefault_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield toArray(source);
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
exports.singleOrDefault_2 = singleOrDefault_2;
function sum_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let totalSum = 0;
        for (const value of yield source.toArray()) {
            totalSum += value;
        }
        return totalSum;
    });
}
exports.sum_1 = sum_1;
function sum_2(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let total = 0;
        for (const value of yield source.toArray()) {
            total += selector(value);
        }
        return total;
    });
}
exports.sum_2 = sum_2;
function union_1(first, second) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            var e_3, _a;
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
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (first_3_1 && !first_3_1.done && (_a = first_3.return)) yield _a.call(first_3);
                }
                finally { if (e_3) throw e_3.error; }
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
exports.union_1 = union_1;
function union_2(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer) {
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
exports.union_2 = union_2;
function zip_1(source, second) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            const [left, right] = yield Promise.all([source.toArray(), second.toArray()]);
            const maxLength = left.length > right.length ? left.length : right.length;
            const results = new Array(maxLength);
            for (let i = 0; i < maxLength; i++) {
                const a = left[i];
                const b = right[i];
                results[i] = [a, b];
            }
            return results;
        });
    }
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.zip_1 = zip_1;
function zip_2(source, second, resultSelector) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            const [left, right] = yield Promise.all([source.toArray(), second.toArray()]);
            const maxLength = left.length > right.length ? left.length : right.length;
            const results = new Array(maxLength);
            for (let i = 0; i < maxLength; i++) {
                const a = left[i];
                const b = right[i];
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
exports.zip_2 = zip_2;
function toArray(source) {
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
exports.toArray = toArray;
