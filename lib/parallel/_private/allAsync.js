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
 * Determines whether all elements of a sequence satisfy a condition.
 * @param source An IEnumerable<T> that contains the elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 */
function allAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const nextIter = _nextIterationAsync_1.nextIterationAsync(source, (x) => __awaiter(this, void 0, void 0, function* () {
            if ((yield predicate(x)) === false) {
                throw new Error(String(false));
            }
            return true;
        }));
        switch (nextIter.type) {
            case 0 /* PromiseToArray */:
                return nextIter
                    .generator()
                    .then(() => true, () => false);
            case 1 /* ArrayOfPromises */:
                return Promise.all(nextIter.generator())
                    .then(() => true, () => false);
            case 2 /* PromiseOfPromises */:
                return nextIter.generator()
                    .then(Promise.all.bind(Promise))
                    .then(() => true, () => false);
        }
    });
}
exports.allAsync = allAsync;
