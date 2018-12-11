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
 * Computes the average of a sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values to calculate the average of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 */
function averageAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        let count;
        for (const item of source) {
            value = (value || 0) + (yield selector(item));
            count = (count || 0) + 1;
        }
        if (value === undefined) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
        }
        return value / count;
    });
}
exports.averageAsync = averageAsync;