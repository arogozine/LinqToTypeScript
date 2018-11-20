"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(source, selector) {
    if (selector) {
        return sum_2(source, selector);
    }
    else {
        return sum_1(source);
    }
}
exports.sum = sum;
function sum_1(source) {
    let total = 0;
    for (const value of source) {
        total += value;
    }
    return total;
}
function sum_2(source, selector) {
    let total = 0;
    for (const value of source) {
        total += selector(value);
    }
    return total;
}
