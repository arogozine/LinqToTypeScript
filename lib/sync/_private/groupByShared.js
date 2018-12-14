"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
const Grouping_1 = require("../Grouping");
/**
 * @private Don't Use Directly
 */
function groupBy_0(source, keySelector, comparer) {
    function* generate() {
        const keyMap = new Array();
        for (const value of source) {
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
        for (const keyValue of keyMap) {
            yield keyValue;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(generate);
}
exports.groupBy_0 = groupBy_0;
/**
 * @private Don't Use Directly
 */
function groupBy_0_Simple(source, keySelector) {
    function* iterator() {
        const keyMap = {};
        for (const value of source) {
            const key = keySelector(value);
            const grouping = keyMap[key];
            if (grouping) {
                grouping.push(value);
            }
            else {
                keyMap[key] = new Grouping_1.Grouping(key, value);
            }
        }
        // tslint:disable-next-line:forin
        for (const value in keyMap) {
            yield keyMap[value];
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.groupBy_0_Simple = groupBy_0_Simple;
/**
 * @private Don't Use Directly
 */
function groupBy_1_Simple(source, keySelector, elementSelector) {
    function* generate() {
        const keyMap = {};
        for (const value of source) {
            const key = keySelector(value);
            const grouping = keyMap[key];
            const element = elementSelector(value);
            if (grouping) {
                grouping.push(element);
            }
            else {
                keyMap[key] = new Grouping_1.Grouping(key, element);
            }
        }
        /* tslint:disable:forin */
        for (const value in keyMap) {
            yield keyMap[value];
        }
        /* tslint:enable:forin */
    }
    return new BasicEnumerable_1.BasicEnumerable(generate);
}
exports.groupBy_1_Simple = groupBy_1_Simple;
/**
 * @private Don't Use Directly
 */
function groupBy_1(source, keySelector, elementSelector, comparer) {
    function* generate() {
        const keyMap = new Array();
        for (const value of source) {
            const key = keySelector(value);
            let found = false;
            for (let i = 0; i < keyMap.length; i++) {
                const group = keyMap[i];
                if (comparer(group.key, key)) {
                    group.push(elementSelector(value));
                    found = true;
                    break;
                }
            }
            if (found === false) {
                const element = elementSelector(value);
                keyMap.push(new Grouping_1.Grouping(key, element));
            }
        }
        for (const keyValue of keyMap) {
            yield keyValue;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(generate);
}
exports.groupBy_1 = groupBy_1;
