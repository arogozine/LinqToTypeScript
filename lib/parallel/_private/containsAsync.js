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
 * Determines whether a sequence contains a specified element by using the specified or default IEqualityComparer<T>.
 * @param source A sequence in which to locate a value.
 * @param value The value to locate in the sequence.
 * @param comparer An equality comparer to compare values. Optional.
 */
function containsAsync(source, value, comparer) {
    return __awaiter(this, void 0, void 0, function* () {
        const values = _nextIterationAsync_1.nextIterationAsync(source, (x) => comparer(value, x));
        switch (values.type) {
            case 0 /* PromiseToArray */:
                {
                    const data = yield values.generator();
                    return data.some((x) => x);
                }
            case 1 /* ArrayOfPromises */:
                {
                    const data = yield Promise.all(values.generator());
                    return data.some((x) => x);
                }
            case 2 /* PromiseOfPromises */:
                {
                    const data = yield Promise.all(yield values.generator());
                    return data.some((x) => x);
                }
        }
    });
}
exports.containsAsync = containsAsync;
