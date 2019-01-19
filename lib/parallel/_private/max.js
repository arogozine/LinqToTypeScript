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
const ErrorString_1 = require("../../shared/ErrorString");
const InvalidOperationException_1 = require("../../shared/InvalidOperationException");
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
const _nextIteration_1 = require("./_nextIteration");
function max(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let maxInfo;
        if (selector) {
            const dataFunc = _nextIteration_1.nextIteration(source, selector);
            maxInfo = yield new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc).toArray();
        }
        else {
            maxInfo = yield source.toArray();
        }
        if (maxInfo.length === 0) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
        }
        return Math.max.apply(null, maxInfo);
    });
}
exports.max = max;
