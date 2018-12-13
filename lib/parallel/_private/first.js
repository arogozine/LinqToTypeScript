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
 * Returns the first element of a sequence.
 * If predicate is specified, returns the first element in a sequence that satisfies a specified condition.
 * @param source The IParallelEnumerable<T> to return the first element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The first element in the specified sequence.
 * If predicate is specified,
 * the first element in the sequence that passes the test in the specified predicate function.
 */
function first(source, predicate) {
    if (predicate) {
        return first_2(source, predicate);
    }
    else {
        return first_1(source);
    }
}
exports.first = first;
function first_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                {
                    const values = yield dataFunc.generator();
                    if (values.length === 0) {
                        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
                    }
                    else {
                        return values[0];
                    }
                }
            case 1 /* ArrayOfPromises */:
                {
                    const promises = dataFunc.generator();
                    if (promises.length === 0) {
                        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
                    }
                    else {
                        return yield promises[0];
                    }
                }
            case 2 /* PromiseOfPromises */:
                {
                    const promises = yield dataFunc.generator();
                    if (promises.length === 0) {
                        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
                    }
                    else {
                        return yield promises[0];
                    }
                }
        }
    });
}
function first_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield toArray_1.toArray(source);
        for (const value of data) {
            if (predicate(value) === true) {
                return value;
            }
        }
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
    });
}
