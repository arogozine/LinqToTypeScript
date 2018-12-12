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
 * @param source An IParallelEnumerable<T> to return the last element of.
 * @param predicate A function to test each element for a condition.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The last element in the sequence that passes the test in the specified predicate function.
 */
function lastAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                {
                    const values = yield dataFunc.generator();
                    // Promise Array - Predicate
                    for (let i = values.length - 1; i >= 0; i--) {
                        const value = values[i];
                        if ((yield predicate(value)) === true) {
                            return value;
                        }
                    }
                    break;
                }
            case 1 /* ArrayOfPromises */:
                {
                    const promises = dataFunc.generator();
                    // Promise Array - Predicate
                    for (let i = promises.length - 1; i >= 0; i--) {
                        const value = yield promises[i];
                        if ((yield predicate(value)) === true) {
                            return value;
                        }
                    }
                    break;
                }
            case 2 /* PromiseOfPromises */:
                {
                    const promises = yield dataFunc.generator();
                    // Promise Array - Predicate
                    for (let i = promises.length - 1; i >= 0; i--) {
                        const value = yield promises[i];
                        if ((yield predicate(value)) === true) {
                            return value;
                        }
                    }
                    break;
                }
        }
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
    });
}
exports.lastAsync = lastAsync;
