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
 * Returns an empty IParallelEnumerable<T> that has the specified type argument.
 * @returns An empty IParallelEnumerable<T> whose type argument is TResult.
 */
function empty() {
    const dataFunc = {
        generator: () => __awaiter(this, void 0, void 0, function* () { return []; }),
        type: 0 /* PromiseToArray */,
    };
    return new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc);
}
exports.empty = empty;
