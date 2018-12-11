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
function last(source, predicate) {
    if (predicate) {
        return last_2(source, predicate);
    }
    else {
        return last_1(source);
    }
}
exports.last = last;
function last_1(source) {
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
                        return values[values.length - 1];
                    }
                }
            case 1 /* ArrayOfPromises */:
                {
                    const promises = dataFunc.generator();
                    if (promises.length === 0) {
                        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
                    }
                    else {
                        return yield promises[promises.length - 1];
                    }
                }
            case 2 /* PromiseOfPromises */:
                {
                    const promises = yield dataFunc.generator();
                    if (promises.length === 0) {
                        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
                    }
                    else {
                        return yield promises[promises.length - 1];
                    }
                }
        }
    });
}
function last_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                {
                    const values = yield dataFunc.generator();
                    // Promise Array - Predicate
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
                    // Promise Array - Predicate
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
                    // Promise Array - Predicate
                    for (let i = promises.length - 1; i >= 0; i--) {
                        const value = yield promises[i];
                        if (predicate(value)) {
                            return value;
                        }
                    }
                    break;
                }
        }
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
    });
}
exports.last_2 = last_2;