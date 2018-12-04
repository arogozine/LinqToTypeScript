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
const _nextIterationAsync_1 = require("./_nextIterationAsync");
/**
 * Returns the number of elements in a sequence
 * or represents how many elements in the specified sequence satisfy a condition
 * if the predicate is specified.
 * @param source A sequence that contains elements to be counted.
 * @param predicate A function to test each element for a condition. Optional.
 */
function countAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = _nextIterationAsync_1.nextIterationAsync(source, predicate);
        let countPromise;
        switch (data.type) {
            case 1 /* ArrayOfPromises */:
                countPromise = Promise.all(data.generator());
                break;
            case 2 /* PromiseOfPromises */:
                countPromise = Promise.all(yield data.generator());
                break;
            case 0 /* PromiseToArray */:
            default:
                countPromise = data.generator();
                break;
        }
        let totalCount = 0;
        for (const value of yield countPromise) {
            if (value) {
                totalCount++;
            }
        }
        return totalCount;
    });
}
exports.countAsync = countAsync;
