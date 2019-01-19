"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
/**
 * Produces the set union of two sequences by using a specified IAsyncEqualityComparer<T>.
 * @param first An AsyncIterable<T> whose distinct elements form the first set for the union.
 * @param second An AsyncIterable<T> whose distinct elements form the second set for the union.
 * @param comparer The IAsyncEqualityComparer<T> to compare values.
 * @returns An IAsyncEnumerable<T> that contains the elements from both input sequences, excluding duplicates.
 */
function unionAsync(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer) {
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
exports.unionAsync = unionAsync;
