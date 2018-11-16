"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function partition(source, predicate) {
    const fail = [];
    const pass = [];
    for (const value of source) {
        if (predicate(value) === true) {
            pass.push(value);
        }
        else {
            fail.push(value);
        }
    }
    return [fail, pass];
}
exports.partition = partition;
