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
const StrictEqualityComparer_1 = require("../../shared/StrictEqualityComparer");
function sequenceEquals(first, second, comparer = StrictEqualityComparer_1.StrictEqualityComparer) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstIterator = first[Symbol.asyncIterator]();
        const secondIterator = second[Symbol.asyncIterator]();
        let results = yield Promise.all([firstIterator.next(), secondIterator.next()]);
        let firstResult = results[0];
        let secondResult = results[1];
        while (!firstResult.done && !secondResult.done) {
            if (!comparer(firstResult.value, secondResult.value)) {
                return false;
            }
            results = yield Promise.all([firstIterator.next(), secondIterator.next()]);
            firstResult = results[0];
            secondResult = results[1];
        }
        return firstResult.done && secondResult.done;
    });
}
exports.sequenceEquals = sequenceEquals;
