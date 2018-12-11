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
 * Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.
 * @param source An Iterable<T> to return an element from.
 * @param predicate A function to test each element for a condition.
 * @returns null if source is empty or if no element passes the test specified by predicate;
 * otherwise, the first element in source that passes the test specified by predicate.
 */
function firstOrDefaultAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const value of source) {
            if ((yield predicate(value)) === true) {
                return value;
            }
        }
        return null;
    });
}
exports.firstOrDefaultAsync = firstOrDefaultAsync;
