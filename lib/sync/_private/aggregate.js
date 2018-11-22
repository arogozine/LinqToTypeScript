"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorString_1 = require("../../shared/ErrorString");
const InvalidOperationException_1 = require("../../shared/InvalidOperationException");
function aggregate(source, seedOrFunc, func, resultSelector) {
    if (resultSelector) {
        if (!func) {
            throw new ReferenceError(`TAccumulate function is undefined`);
        }
        return aggregate_3(source, seedOrFunc, func, resultSelector);
    }
    else if (func) {
        return aggregate_2(source, seedOrFunc, func);
    }
    else {
        return aggregate_1(source, seedOrFunc);
    }
}
exports.aggregate = aggregate;
/**
 * @throws {InvalidOperationException} No Elements
 */
function aggregate_1(source, func) {
    let aggregateValue;
    for (const value of source) {
        if (aggregateValue) {
            aggregateValue = func(aggregateValue, value);
        }
        else {
            aggregateValue = value;
        }
    }
    if (aggregateValue === undefined) {
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
    }
    return aggregateValue;
}
function aggregate_2(source, seed, func) {
    let aggregateValue = seed;
    for (const value of source) {
        aggregateValue = func(aggregateValue, value);
    }
    return aggregateValue;
}
function aggregate_3(source, seed, func, resultSelector) {
    let aggregateValue = seed;
    for (const value of source) {
        aggregateValue = func(aggregateValue, value);
    }
    return resultSelector(aggregateValue);
}
