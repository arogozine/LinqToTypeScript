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
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
function zip(first, second, resultSelector) {
    if (resultSelector) {
        return zip_2(first, second, resultSelector);
    }
    else {
        return zip_1(first, second);
    }
}
exports.zip = zip;
function zip_1(source, second) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            const [left, right] = yield Promise.all([source.toArray(), second.toArray()]);
            const maxLength = left.length > right.length ? left.length : right.length;
            const results = new Array(maxLength);
            for (let i = 0; i < maxLength; i++) {
                const a = left[i];
                const b = right[i];
                results[i] = [a, b];
            }
            return results;
        });
    }
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
function zip_2(source, second, resultSelector) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            const [left, right] = yield Promise.all([source.toArray(), second.toArray()]);
            const maxLength = left.length > right.length ? left.length : right.length;
            const results = new Array(maxLength);
            for (let i = 0; i < maxLength; i++) {
                const a = left[i];
                const b = right[i];
                results[i] = resultSelector(a, b);
            }
            return results;
        });
    }
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
