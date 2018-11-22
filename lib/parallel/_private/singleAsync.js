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
const toArray_1 = require("./toArray");
/**
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
function singleAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield toArray_1.toArray(source);
        let hasValue = false;
        let singleValue = null;
        for (const value of results) {
            if ((yield predicate(value)) === true) {
                if (hasValue === true) {
                    throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.MoreThanOneMatchingElement);
                }
                else {
                    hasValue = true;
                    singleValue = value;
                }
            }
        }
        if (hasValue === false) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
        }
        return singleValue;
    });
}
exports.singleAsync = singleAsync;
