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
function singleOrDefault(source, predicate) {
    if (predicate) {
        return singleOrDefault_2(source, predicate);
    }
    else {
        return singleOrDefault_1(source);
    }
}
exports.singleOrDefault = singleOrDefault;
function singleOrDefault_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                {
                    const results = yield dataFunc.generator();
                    if (results.length > 1) {
                        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.MoreThanOneElement);
                    }
                    else if (results.length === 0) {
                        return null;
                    }
                    return results[0];
                }
            case 1 /* ArrayOfPromises */:
                {
                    const results = dataFunc.generator();
                    if (results.length > 1) {
                        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.MoreThanOneElement);
                    }
                    else if (results.length === 0) {
                        return null;
                    }
                    return results[0];
                }
            case 2 /* PromiseOfPromises */:
                {
                    const results = yield dataFunc.generator();
                    if (results.length > 1) {
                        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.MoreThanOneElement);
                    }
                    else if (results.length === 0) {
                        return null;
                    }
                    return yield results[0];
                }
        }
    });
}
function singleOrDefault_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield toArray_1.toArray(source);
        let hasValue = false;
        let singleValue = null;
        for (const value of results) {
            if (predicate(value)) {
                if (hasValue === true) {
                    throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.MoreThanOneElement);
                }
                else {
                    hasValue = true;
                    singleValue = value;
                }
            }
        }
        return singleValue;
    });
}
