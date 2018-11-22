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
const TypesAndHelpers_1 = require("../../shared/TypesAndHelpers");
const _nextIterationAsync_1 = require("./_nextIterationAsync");
function averageAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        const nextIter = _nextIterationAsync_1.nextIterationAsync(source, selector);
        let values;
        switch (nextIter.type) {
            case 1 /* ArrayOfPromises */:
                values = nextIter.generator();
                break;
            case 2 /* PromiseOfPromises */:
                values = yield nextIter.generator();
                break;
            case 0 /* PromiseToArray */:
            default:
                values = yield nextIter.generator();
                break;
        }
        if (values.length === 0) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        let value = 0;
        for (const selectedValue of values) {
            value += yield selectedValue;
        }
        return value / values.length;
    });
}
exports.averageAsync = averageAsync;
