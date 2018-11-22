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
const ErrorString_1 = require("../../shared/ErrorString");
const InvalidOperationException_1 = require("../../shared/InvalidOperationException");
/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
function last(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        if (predicate) {
            return last_2(source, predicate);
        }
        else {
            return last_1(source);
        }
    });
}
exports.last = last;
function last_1(source) {
    var source_1, source_1_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_1, _a;
        let lastItem = null;
        try {
            for (source_1 = __asyncValues(source); source_1_1 = yield source_1.next(), !source_1_1.done;) {
                const value = source_1_1.value;
                lastItem = value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield _a.call(source_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!lastItem) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
        }
        return lastItem;
    });
}
exports.last_1 = last_1;
function last_2(source, predicate) {
    var source_2, source_2_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_2, _a;
        let lastItem = null;
        try {
            for (source_2 = __asyncValues(source); source_2_1 = yield source_2.next(), !source_2_1.done;) {
                const value = source_2_1.value;
                if (predicate(value) === true) {
                    lastItem = value;
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
        if (!lastItem) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
        }
        return lastItem;
    });
}
exports.last_2 = last_2;
