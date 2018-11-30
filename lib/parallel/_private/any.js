"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _nextIteration_1 = require("./_nextIteration");
/**
 * Determines whether a sequence contains any elements.
 * If predicate is specified, determines whether any element of a sequence satisfies a condition.
 * @param source The IEnumerable<T> to check for emptiness or apply the predicate to.
 * @param predicate A function to test each element for a condition.
 */
function any(source, predicate) {
    const nextIter = _nextIteration_1.nextIteration(source, predicate || ((_) => true));
    switch (nextIter.type) {
        case 0 /* PromiseToArray */:
            return nextIter.generator().then((values) => {
                return values.some((x) => x);
            });
        case 1 /* ArrayOfPromises */:
            return Promise.all(nextIter.generator()).then((values) => {
                return values.some((x) => x);
            });
        case 2 /* PromiseOfPromises */:
            return nextIter.generator().then((values) => Promise.all(values)).then((values) => {
                return values.some((x) => x);
            });
    }
}
exports.any = any;
