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
 * Invokes an async transform function on each element of a sequence and returns the maximum value.
 * @param source A sequence of values to determine the maximum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
function maxAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let max = null;
        for (const item of source) {
            max = Math.max(max || Number.NEGATIVE_INFINITY, yield selector(item));
        }
        if (max === null) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
        }
        else {
            return max;
        }
    });
}
exports.maxAsync = maxAsync;
