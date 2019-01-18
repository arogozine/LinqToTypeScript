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
 * Applies a specified async function to the corresponding elements of two sequences,
 * producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector An async function that specifies how to merge the elements from the two sequences.
 * @returns An IAsyncEnumerable<T> that contains merged elements of two input sequences.
 */
function zipAsync(first, second, resultSelector) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            const [left, right] = yield Promise.all([first.toArray(), second.toArray()]);
            const maxLength = left.length > right.length ? left.length : right.length;
            const resultPromises = new Array(maxLength);
            for (let i = 0; i < maxLength; i++) {
                const a = left[i];
                const b = right[i];
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
exports.zipAsync = zipAsync;
