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
/**
 * Converts values to a key values map.
 * @param source Async Iterable
 * @param keySelector Key Selector for Map
 * @returns Promise for a Map for Key to Values
 */
exports.asKeyMap = (source, keySelector) => { var source_1, source_1_1; return __awaiter(this, void 0, void 0, function* () {
    var e_1, _a;
    const map = new Map();
    try {
        for (source_1 = __asyncValues(source); source_1_1 = yield source_1.next(), !source_1_1.done;) {
            const item = source_1_1.value;
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
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield _a.call(source_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return map;
}); };
