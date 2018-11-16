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
/**
 * @throws {InvalidOperationException} No Elements
 */
function averageAsync(source, func) {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        let count;
        for (const item of source) {
            value = (value || 0) + (yield func(item));
            count = (count || 0) + 1;
        }
        if (value === undefined) {
            throw new TypesAndHelpers_1.InvalidOperationException(TypesAndHelpers_1.ErrorString.NoElements);
        }
        return value / count;
    });
}
exports.averageAsync = averageAsync;
