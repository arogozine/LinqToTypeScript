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
const ArgumentOutOfRangeException_1 = require("../../shared/ArgumentOutOfRangeException");
/**
 * Returns the element at a specified index in a sequence.
 * @param source An IEnumerable<T> to return an element from.
 * @param index The zero-based index of the element to retrieve.
 * @throws {ArgumentOutOfRangeException}
 * index is less than 0 or greater than or equal to the number of elements in source.
 */
function elementAt(source, index) {
    return __awaiter(this, void 0, void 0, function* () {
        if (index < 0) {
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("index");
        }
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                return dataFunc.generator().then((values) => {
                    if (index >= values.length) {
                        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("index");
                    }
                    else {
                        return values[index];
                    }
                });
            case 1 /* ArrayOfPromises */:
                return Promise.all(dataFunc.generator()).then((values) => {
                    if (index >= values.length) {
                        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("index");
                    }
                    else {
                        return values[index];
                    }
                });
            case 2 /* PromiseOfPromises */:
                return dataFunc.generator().then((values) => __awaiter(this, void 0, void 0, function* () {
                    if (index >= values.length) {
                        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("index");
                    }
                    else {
                        return yield values[index];
                    }
                }));
        }
    });
}
exports.elementAt = elementAt;
