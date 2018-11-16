"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function count(source, predicate) {
    if (predicate) {
        return count_2(source, predicate);
    }
    else {
        return count_1(source);
    }
}
exports.count = count;
function count_1(source) {
    // tslint:disable-next-line:no-shadowed-variable
    let count = 0;
    for (const _ of source) {
        count++;
    }
    return count;
}
function count_2(source, predicate) {
    // tslint:disable-next-line:no-shadowed-variable
    let count = 0;
    for (const value of source) {
        if (predicate(value) === true) {
            count++;
        }
    }
    return count;
}
