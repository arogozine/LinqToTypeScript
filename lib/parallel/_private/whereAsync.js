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
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to filter.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
function whereAsync(source, predicate) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield source.toArray();
        const valuesAsync = values.map((x, i) => __awaiter(this, void 0, void 0, function* () {
            const keep = yield predicate(x, i);
            return {
                keep,
                x,
            };
        }));
        const filteredValues = [];
        for (const value of yield Promise.all(valuesAsync)) {
            if (value.keep) {
                filteredValues.push(value.x);
            }
        }
        return filteredValues;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.whereAsync = whereAsync;
