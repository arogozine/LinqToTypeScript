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
 * Returns distinct elements from a sequence by using the specified equality comparer to compare values.
 * @param source The sequence to remove duplicate elements from.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns An IParallelEnumerable<T> that contains distinct elements from the source sequence.
 */
function distinctAsync(source, comparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const distinctElements = [];
        outerLoop: for (const item of yield source.toArray()) {
            for (const distinctElement of distinctElements) {
                const found = yield comparer(distinctElement, item);
                if (found) {
                    continue outerLoop;
                }
            }
            distinctElements.push(item);
        }
        return distinctElements;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.distinctAsync = distinctAsync;
