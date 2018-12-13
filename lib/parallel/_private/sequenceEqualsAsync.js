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
/**
 * Compares two parallel iterables to see if they are equal using a async comparer function.
 * @param first First Sequence
 * @param second Second Sequence
 * @param comparer Async Comparer
 * @returns Whether or not the two iterations are equal
 */
function sequenceEqualsAsync(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstArray = yield first.toArray();
        const secondArray = yield second.toArray();
        if (firstArray.length !== secondArray.length) {
            return false;
        }
        for (let i = 0; i < firstArray.length; i++) {
            const firstResult = firstArray[i];
            const secondResult = secondArray[i];
            if ((yield comparer(firstResult, secondResult)) === false) {
                return false;
            }
        }
        return true;
    });
}
exports.sequenceEqualsAsync = sequenceEqualsAsync;
