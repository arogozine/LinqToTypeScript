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
 * Returns the element at a specified index in a sequence or a default value if the index is out of range.
 * @param source An IEnumerable<T> to return an element from.
 * @param index The zero-based index of the element to retrieve.
 * @returns
 * default(TSource) if the index is outside the bounds of the source sequence;
 * otherwise, the element at the specified position in the source sequence.
 */
function elementAtOrDefault(source, index) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = source.dataFunc;
        switch (dataFunc.type) {
            case 0 /* PromiseToArray */:
                return dataFunc.generator().then((values) => {
                    if (index >= values.length) {
                        return null;
                    }
                    else {
                        return values[index];
                    }
                });
            case 1 /* ArrayOfPromises */:
                return Promise.all(dataFunc.generator()).then((values) => {
                    if (index >= values.length) {
                        return null;
                    }
                    else {
                        return values[index];
                    }
                });
            case 2 /* PromiseOfPromises */:
                return dataFunc.generator().then((values) => __awaiter(this, void 0, void 0, function* () {
                    if (index >= values.length) {
                        return null;
                    }
                    else {
                        return yield values[index];
                    }
                }));
        }
    });
}
exports.elementAtOrDefault = elementAtOrDefault;
