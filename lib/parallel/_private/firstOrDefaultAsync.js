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
const toArray_1 = require("./toArray");
/**
 * Returns first element in sequence that satisfies. Returns null if no value found.
 * @param source An IParallelEnumerable<T> to return an element from.
 * @param predicate An async function to test each element for a condition.
 * @returns The first element that passes the test in the specified predicate function.
 * Returns null if no value found.
 */
function firstOrDefaultAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield toArray_1.toArray(source);
        for (const value of data) {
            if ((yield predicate(value)) === true) {
                return value;
            }
        }
        return null;
    });
}
exports.firstOrDefaultAsync = firstOrDefaultAsync;
