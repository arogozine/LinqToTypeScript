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
const _nextIteration_1 = require("./_nextIteration");
function contains(source, value, comparer = TypesAndHelpers_1.StrictEqualityComparer) {
    return __awaiter(this, void 0, void 0, function* () {
        let values;
        if (comparer) {
            values = _nextIteration_1.nextIteration(source, (x) => comparer(value, x));
        }
        else {
            values = _nextIteration_1.nextIteration(source, (x) => x === value);
        }
        switch (values.type) {
            case 0 /* PromiseToArray */:
                {
                    const data = yield values.generator();
                    return data.some((x) => x);
                }
            case 1 /* ArrayOfPromises */:
                {
                    const data = yield Promise.all(values.generator());
                    return data.some((x) => x);
                }
            case 2 /* PromiseOfPromises */:
                {
                    const data = yield Promise.all(yield values.generator());
                    return data.some((x) => x);
                }
        }
    });
}
exports.contains = contains;
