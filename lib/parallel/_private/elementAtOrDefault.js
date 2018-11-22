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
