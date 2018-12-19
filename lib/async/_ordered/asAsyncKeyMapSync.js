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
 * Converts values to a key values map.
 * @param source Iterable
 * @param keySelector Async Key Selector for Map
 * @returns Promise for a Map for Key to Values
 */
exports.asAsyncKeyMapSync = (source, keySelector) => __awaiter(this, void 0, void 0, function* () {
    const map = new Map();
    for (const item of source) {
        const key = yield keySelector(item);
        const currentMapping = map.get(key);
        if (currentMapping) {
            currentMapping.push(item);
        }
        else {
            map.set(key, [item]);
        }
    }
    return map;
});
