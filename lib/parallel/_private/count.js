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
 * Returns the number of elements in a sequence
 * or represents how many elements in the specified sequence satisfy a condition
 * if the predicate is specified.
 * @param source A sequence that contains elements to be counted.
 * @param predicate A function to test each element for a condition. Optional.
 * @return The number of elements in the input sequence.
 */
function count(source, predicate) {
    if (predicate) {
        return count_2(source, predicate);
    }
    else {
        return count_1(source);
    }
}
exports.count = count;
function count_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
            case 2 /* PromiseOfPromises */:
                const arrayData = yield source.toArray();
                return arrayData.length;
            case 1 /* ArrayOfPromises */:
                const promises = dataFunc.generator();
                return promises.length;
        }
    });
}
function count_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const values = yield source.toArray();
        let totalCount = 0;
        for (let i = 0; i < values.length; i++) {
            if (predicate(values[i]) === true) {
                totalCount++;
            }
        }
        return totalCount;
    });
}
