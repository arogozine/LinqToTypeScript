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
const toArray_1 = require("./toArray");
function firstOrDefault(source, predicate) {
    if (predicate) {
        return firstOrDefault_2(source, predicate);
    }
    else {
        return firstOrDefault_1(source);
    }
}
exports.firstOrDefault = firstOrDefault;
function firstOrDefault_1(source) {
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
                        return values[0];
                    }
                }
            case 1 /* ArrayOfPromises */:
                {
                    const promises = dataFunc.generator();
                    if (promises.length === 0) {
                        return null;
                    }
                    else {
                        return yield promises[0];
                    }
                }
            case 2 /* PromiseOfPromises */:
                {
                    const promises = yield dataFunc.generator();
                    if (promises.length === 0) {
                        return null;
                    }
                    else {
                        return yield promises[0];
                    }
                }
        }
    });
}
exports.firstOrDefault_1 = firstOrDefault_1;
function firstOrDefault_2(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield toArray_1.toArray(source);
        for (const value of data) {
            if (predicate(value) === true) {
                return value;
            }
        }
        return null;
    });
}
exports.firstOrDefault_2 = firstOrDefault_2;
