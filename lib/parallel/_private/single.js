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
 * Returns the only element of a sequence that satisfies a specified condition (if specified),
 * and throws an exception if more than one such element exists.
 * @param source An IParallelEnumerable<T> to return a single element from.
 * @param predicate A function to test an element for a condition. (Optional)
 * @throws {InvalidOperationException} No element satisfies the condition in predicate. OR
 * More than one element satisfies the condition in predicate. OR
 * The source sequence is empty.
 * @returns The single element of the input sequence that satisfies a condition.
 */
function single(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        if (predicate) {
            return single_2(source, predicate);
        }
        else {
            return single_1(source);
        }
    });
}
exports.single = single;
function single_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */: {
                const results = yield dataFunc.generator();
                if (results.length > 1) {
                    throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.MoreThanOneElement);
                }
                else if (results.length === 0) {
                    throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
                }
                return results[0];
            }
            case 1 /* ArrayOfPromises */: {
                const results = dataFunc.generator();
                if (results.length > 1) {
                    throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.MoreThanOneElement);
                }
                else if (results.length === 0) {
                    throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
                }
                return results[0];
            }
            case 2 /* PromiseOfPromises */: {
                const results = yield dataFunc.generator();
                if (results.length > 1) {
                    throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.MoreThanOneElement);
                }
                else if (results.length === 0) {
                    throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
                }
                return yield results[0];
            }
        }
    });
}
function single_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield toArray_1.toArray(source);
        let hasValue = false;
        let singleValue = null;
        for (const value of results) {
            if (predicate(value)) {
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
