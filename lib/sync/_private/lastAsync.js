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
const ErrorString_1 = require("../../shared/ErrorString");
const InvalidOperationException_1 = require("../../shared/InvalidOperationException");
/**
 * Returns the last element of a sequence that satisfies a specified condition.
 * @param source An Iterable<T> to return the last element of.
 * @param predicate A function to test each element for a condition.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The last element in the sequence that passes the test in the specified predicate function.
 */
function lastAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        let last;
        for (const value of source) {
            if ((yield predicate(value)) === true) {
                last = value;
            }
        }
        if (!last) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
        }
        return last;
    });
}
exports.lastAsync = lastAsync;
