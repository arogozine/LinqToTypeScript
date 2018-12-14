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
 * Paritions the Iterable<T> into a tuple of failing and passing arrays
 * based on the predicate.
 * @param source Elements to Partition
 * @param predicate Async Pass / Fail condition
 * @returns Promise of [pass, fail]
 */
function partitionAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const fail = [];
        const pass = [];
        for (const value of source) {
            if ((yield predicate(value)) === true) {
                pass.push(value);
            }
            else {
                fail.push(value);
            }
        }
        return [pass, fail];
    });
}
exports.partitionAsync = partitionAsync;
