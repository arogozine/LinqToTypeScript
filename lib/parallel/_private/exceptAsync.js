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
 * Produces the set difference of two sequences by using the comparer provided to compare values.
 * @param first An IAsyncParallel<T> whose elements that are not also in second will be returned.
 * @param second An IAsyncParallel<T> whose elements that also occur in the first sequence
 * will cause those elements to be removed from the returned sequence.
 * @param comparer An IAsyncEqualityComparer<T> to compare values.
 * @returns A sequence that contains the set difference of the elements of two sequences.
 */
function exceptAsync(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield Promise.all([first.toArray(), second.toArray()]);
        const firstValues = values[0];
        const secondValues = values[1];
        const resultValues = [];
        for (const firstItem of firstValues) {
            let exists = false;
            for (let j = 0; j < secondValues.length; j++) {
                const secondItem = secondValues[j];
                if ((yield comparer(firstItem, secondItem)) === true) {
                    exists = true;
                    break;
                }
            }
            if (exists === false) {
                resultValues.push(firstItem);
            }
        }
        return resultValues;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.exceptAsync = exceptAsync;
