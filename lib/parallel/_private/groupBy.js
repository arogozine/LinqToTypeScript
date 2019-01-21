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
const Grouping_1 = require("../../sync/Grouping");
const BasicParallelEnumerable_1 = require("../BasicParallelEnumerable");
function groupBy(source, keySelector, comparer) {
    if (comparer) {
        return groupBy_0(source, keySelector, comparer);
    }
    else {
        return groupBy_0_Simple(source, keySelector);
    }
}
exports.groupBy = groupBy;
function groupBy_0_Simple(source, keySelector) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const keyMap = {};
        for (const value of yield source.toArray()) {
            const key = keySelector(value);
            const grouping = keyMap[key]; // TODO
            if (grouping) {
                grouping.push(value);
            }
            else {
                keyMap[key] = new Grouping_1.Grouping(key, value);
            }
        }
        const results = new Array();
        /* tslint:disable:forin */
        for (const value in keyMap) {
            results.push(keyMap[value]);
        }
        /* tslint:enable:forin */
        return results;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
function groupBy_0(source, keySelector, comparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const keyMap = new Array();
        for (const value of yield source.toArray()) {
            const key = keySelector(value);
            let found = false;
            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i];
                if (comparer(group.key, key)) {
                    group.push(value);
                    found = true;
                    break;
                }
            }
            if (found === false) {
                keyMap.push(new Grouping_1.Grouping(key, value));
            }
        }
        const results = new Array();
        for (const g of keyMap) {
            results.push(g);
        }
        return results;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
