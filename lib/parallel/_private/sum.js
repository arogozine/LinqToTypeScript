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
function sum(source, selector) {
    if (selector) {
        return sum_2(source, selector);
    }
    else {
        return sum_1(source);
    }
}
exports.sum = sum;
function sum_1(source) {
    return __awaiter(this, void 0, void 0, function* () {
        let totalSum = 0;
        for (const value of yield source.toArray()) {
            totalSum += value;
        }
        return totalSum;
    });
}
function sum_2(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let total = 0;
        for (const value of yield source.toArray()) {
            total += selector(value);
        }
        return total;
    });
}
