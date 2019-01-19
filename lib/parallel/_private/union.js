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
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
/**
 * Produces the set union of two sequences by using scrict equality comparison or a specified IEqualityComparer<T>.
 * @param first An IAsyncParallel<T> whose distinct elements form the first set for the union.
 * @param second An IAsyncParallel<T> whose distinct elements form the second set for the union.
 * @param comparer The IEqualityComparer<T> to compare values. Optional.
 * @returns An IParallelEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
function union(first, second, comparer) {
    if (comparer) {
        return union_2(first, second, comparer);
    }
    else {
        return union_1(first, second);
    }
}
exports.union = union;
function union_1(first, second) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            const set = new Set();
            const secondPromise = second.toArray();
            try {
                for (var first_1 = __asyncValues(first), first_1_1; first_1_1 = yield first_1.next(), !first_1_1.done;) {
                    const item = first_1_1.value;
                    if (set.has(item) === false) {
                        set.add(item);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (first_1_1 && !first_1_1.done && (_a = first_1.return)) yield _a.call(first_1);
                }
                finally { if (e_1) throw e_1.error; }
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
