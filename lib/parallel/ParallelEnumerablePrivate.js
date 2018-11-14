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
