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
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IParallelEnumerable<T> that contains a repeated value.
 */
function repeat(
// tslint:disable-next-line:no-shadowed-variable
element, count, delay) {
    if (count < 0) {
        throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException(`count`);
    }
    if (delay) {
        return repeat_2(element, count, delay);
    }
    else {
        return repeat_1(element, count);
    }
}
exports.repeat = repeat;
function repeat_1(element, count) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = new Array(count);
        for (let i = 0; i < count; i++) {
            values[i] = element;
        }
        return values;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
function repeat_2(element, count, delay) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = new Array(count);
        for (let i = 0; i < count; i++) {
            values[i] = new Promise((resolve) => setTimeout(() => resolve(element), delay));
        }
        return values;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 2 /* PromiseOfPromises */,
    });
}
