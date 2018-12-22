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
/**
 * Converts the Iteration to an Object. Duplicate values will be overriden.
 * @param source An Iterable<T> to filter.
 * @param selector A async function to determine the Key based on the value.
 * @returns Promise for Mapping of Key to Value derived from the source iterable
 */
function toObjectAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        const map = {};
        for (const value of source) {
            map[yield selector(value)] = value;
        }
        return map;
    });
}
exports.toObjectAsync = toObjectAsync;
