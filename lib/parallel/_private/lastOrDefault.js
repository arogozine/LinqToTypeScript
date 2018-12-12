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
 * Returns the last element of a sequence.
 * If predicate is specified, the last element of a sequence that satisfies a specified condition.
 * @param source An IParallelEnumerable<T> to return the last element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The value at the last position in the source sequence
 * or the last element in the sequence that passes the test in the specified predicate function.
 */
function lastOrDefault(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        if (predicate) {
            return lastOrDefault_2(source, predicate);
        }
        else {
            return lastOrDefault_1(source);
        }
    });
}
exports.lastOrDefault = lastOrDefault;
function lastOrDefault_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                {
                    const values = yield dataFunc.generator();
                    if (values.length === 0) {
                        return null;
                    }
                    else {
                        return values[values.length - 1];
                    }
                }
            case 1 /* ArrayOfPromises */:
                {
                    const promises = dataFunc.generator();
                    if (promises.length === 0) {
                        return null;
                    }
                    else {
                        return yield promises[promises.length - 1];
                    }
                }
            case 2 /* PromiseOfPromises */:
                {
                    const promises = yield dataFunc.generator();
                    if (promises.length === 0) {
                        return null;
                    }
                    else {
                        return yield promises[promises.length - 1];
                    }
                }
        }
    });
}
function lastOrDefault_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                {
                    const values = yield dataFunc.generator();
                    for (let i = values.length - 1; i >= 0; i--) {
                        const value = values[i];
                        if (predicate(value)) {
                            return value;
                        }
                    }
                    break;
                }
            case 1 /* ArrayOfPromises */:
                {
                    const promises = dataFunc.generator();
                    for (let i = promises.length - 1; i >= 0; i--) {
                        const value = yield promises[i];
                        if (predicate(value)) {
                            return value;
                        }
                    }
                    break;
                }
            case 2 /* PromiseOfPromises */:
                {
                    const promises = yield dataFunc.generator();
                    for (let i = promises.length - 1; i >= 0; i--) {
                        const value = yield promises[i];
                        if (predicate(value)) {
                            return value;
                        }
                    }
                    break;
                }
        }
        return null;
    });
}
