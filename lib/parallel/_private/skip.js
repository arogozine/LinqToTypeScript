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
/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An IParallelEnumerable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns
 * An IParallelEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
function skip(source, count) {
    const dataFunc = source.dataFunc;
    switch (dataFunc.type) {
        case 0 /* PromiseToArray */: {
            const generator = () => __awaiter(this, void 0, void 0, function* () { return (yield dataFunc.generator()).slice(count); });
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator,
                type: 0 /* PromiseToArray */,
            });
        }
        case 1 /* ArrayOfPromises */: {
            const generator = () => dataFunc.generator().slice(count);
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator,
                type: 1 /* ArrayOfPromises */,
            });
        }
        case 2 /* PromiseOfPromises */: {
            const generator = () => __awaiter(this, void 0, void 0, function* () {
                const dataInner = yield dataFunc.generator();
                return dataInner.slice(count);
            });
            const dataFuncNew = {
                generator,
                type: 2 /* PromiseOfPromises */,
            };
            return new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFuncNew);
        }
    }
}
exports.skip = skip;
