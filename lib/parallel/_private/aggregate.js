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
const TypesAndHelpers_1 = require("../../shared/TypesAndHelpers");
function aggregate(source, seedOrFunc, func, resultSelector) {
    if (resultSelector) {
        if (!func) {
            throw new ReferenceError(`TAccumulate function is undefined`);
        }
        return aggregate_3(source, seedOrFunc, func, resultSelector);
    }
    else if (func) {
        return aggregate_2(source, seedOrFunc, func);
    }
    else {
        return aggregate_1(source, seedOrFunc);
    }
}
exports.aggregate = aggregate;
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
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        return aggregateValue;
    });
}
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
