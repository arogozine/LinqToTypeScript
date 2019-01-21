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
const _nextIterationAsync_1 = require("./_nextIterationAsync");
const _nextIterationWithIndexAsync_1 = require("./_nextIterationWithIndexAsync");
/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
function selectManyAsync(source, selector) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        let values;
        if (selector.length === 1) {
            values = yield _nextIterationAsync_1.nextIterationAsync(source, selector);
        }
        else {
            values = yield _nextIterationWithIndexAsync_1.nextIterationWithIndexAsync(source, selector);
        }
        const valuesArray = [];
        switch (values.type) {
            case 0 /* PromiseToArray */: {
                for (const outer of yield values.generator()) {
                    for (const y of outer) {
                        valuesArray.push(y);
                    }
                }
                break;
            }
            case 1 /* ArrayOfPromises */: {
                for (const outer of values.generator()) {
                    for (const y of yield outer) {
                        valuesArray.push(y);
                    }
                }
                break;
            }
            case 2 /* PromiseOfPromises */: {
                for (const outer of yield values.generator()) {
                    for (const y of yield outer) {
                        valuesArray.push(y);
                    }
                }
                break;
            }
        }
        return valuesArray;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.selectManyAsync = selectManyAsync;
