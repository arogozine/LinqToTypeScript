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
function nextIterationWithIndexAsync(source, onfulfilled) {
    const dataFunc = source.dataFunc;
    switch (dataFunc.type) {
        case 0 /* PromiseToArray */: {
            const generator = () => __awaiter(this, void 0, void 0, function* () {
                const results = yield dataFunc.generator();
                const newPromises = new Array(results.length);
                for (let i = 0; i < results.length; i++) {
                    newPromises[i] = onfulfilled(results[i], i);
                }
                return newPromises;
            });
            return {
                generator,
                type: 2 /* PromiseOfPromises */,
            };
        }
        case 1 /* ArrayOfPromises */: {
            const generator = () => dataFunc
                .generator()
                .map((promise, index) => promise.then((x) => onfulfilled(x, index)));
            return {
                generator,
                type: 1 /* ArrayOfPromises */,
            };
        }
        case 2 /* PromiseOfPromises */: {
            const generator = () => __awaiter(this, void 0, void 0, function* () {
                const promises = yield dataFunc.generator();
                return promises.map((promise, index) => promise.then((x) => onfulfilled(x, index)));
            });
            return {
                generator,
                type: 2 /* PromiseOfPromises */,
            };
        }
    }
}
exports.nextIterationWithIndexAsync = nextIterationWithIndexAsync;
