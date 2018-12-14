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
// tslint:disable:completed-docs
/**
 * @private Don't use directly.
 */
function nextIteration(source, onfulfilled) {
    const dataFunc = source.dataFunc;
    switch (dataFunc.type) {
        case 0 /* PromiseToArray */:
            {
                const generator = () => dataFunc.generator().then((x) => {
                    const convValues = new Array(x.length);
                    for (let i = 0; i < x.length; i++) {
                        convValues[i] = onfulfilled(x[i]);
                    }
                    return convValues;
                });
                return {
                    generator,
                    type: 0 /* PromiseToArray */,
                };
            }
        case 1 /* ArrayOfPromises */:
            {
                const generator = () => {
                    const previousData = dataFunc.generator();
                    const newPromises = new Array(previousData.length);
                    for (let i = 0; i < previousData.length; i++) {
                        newPromises[i] = previousData[i].then(onfulfilled);
                    }
                    return newPromises;
                };
                return {
                    generator,
                    type: 1 /* ArrayOfPromises */,
                };
            }
        case 2 /* PromiseOfPromises */:
            {
                const generator = () => __awaiter(this, void 0, void 0, function* () {
                    const previousData = yield dataFunc.generator();
                    const newPromises = new Array(previousData.length);
                    for (let i = 0; i < previousData.length; i++) {
                        newPromises[i] = previousData[i].then(onfulfilled);
                    }
                    return newPromises;
                });
                return {
                    generator,
                    type: 2 /* PromiseOfPromises */,
                };
            }
    }
}
exports.nextIteration = nextIteration;
