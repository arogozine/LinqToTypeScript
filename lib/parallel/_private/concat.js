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
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IParallelEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
function concat(
// tslint:disable-next-line:no-shadowed-variable
first, second) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        // Wait for both enumerables
        const promiseResults = yield Promise.all([first.toArray(), second.toArray()]);
        // Concat
        const firstData = promiseResults[0];
        const secondData = promiseResults[1];
        const data = new Array(firstData.length + secondData.length);
        let i = 0;
        for (; i < firstData.length; i++) {
            data[i] = firstData[i];
        }
        for (let j = 0; j < secondData.length; j++, i++) {
            data[i] = secondData[j];
        }
        return data;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.concat = concat;
