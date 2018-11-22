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
function average(source, selector) {
    if (selector) {
        return average_2(source, selector);
    }
    else {
        return average_1(source);
    }
}
exports.average = average;
function average_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        let itemCount;
        for (const item of yield source.toArray()) {
            value = (value || 0) + item;
            itemCount = (itemCount || 0) + 1;
        }
        if (value === undefined) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
        }
        return value / itemCount;
    });
}
function average_2(source, func) {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        // tslint:disable-next-line:no-shadowed-variable
        let count;
        for (const item of yield source.toArray()) {
            value = (value || 0) + func(item);
            count = (count || 0) + 1;
        }
        if (value === undefined) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
        }
        return value / count;
    });
}
