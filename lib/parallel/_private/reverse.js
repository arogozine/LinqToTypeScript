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
 * Inverts the order of the elements in a sequence.
 * @param source A sequence of values to reverse.
 * @returns A sequence whose elements correspond to those of the input sequence in reverse order.
 */
function reverse(source) {
    const dataFunc = source.dataFunc;
    switch (dataFunc.type) {
        case 1 /* ArrayOfPromises */: {
            const generator = () => {
                return dataFunc.generator().reverse();
            };
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            });
        }
        case 2 /* PromiseOfPromises */: {
            const generator = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield dataFunc.generator();
                return array.reverse();
            });
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            });
        }
        case 0 /* PromiseToArray */: {
            const generator = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield dataFunc.generator();
                return array.reverse();
            });
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            });
        }
    }
}
exports.reverse = reverse;
