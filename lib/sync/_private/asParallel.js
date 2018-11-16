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
const ParallelEnumerable_1 = require("../../parallel/ParallelEnumerable");
/**
 * Converts an iterable to @see {IAsyncParallel}
 */
function asParallel(source) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            const array = [];
            for (const value of source) {
                array.push(value);
            }
            return array;
        });
    }
    return ParallelEnumerable_1.from(0 /* PromiseToArray */, generator);
}
exports.asParallel = asParallel;
