import { ITuple } from "./Interfaces"

// ########################
// ## Equality Comparers ##
// ########################

export function StrictEqualityComparer<T>(x: T, y: T): boolean {
    return x === y
}

export function EqualityComparer<T>(x: T, y: T): boolean {
    /* tslint:disable */
    return x == y
    /* tslint:enable */
}

export function StringifyComparer<T>(x: T, y: T): boolean {
    return JSON.stringify(x) === JSON.stringify(y)
}

// #####################
// ## Order Comparers ##
// #####################

export function NumberComparer(x: number, y: number) {
    return x - y
}

// ############
// ## Tuples ##
// ############

export function AsTuple<X, Y>(first: X, second: Y): ITuple<X, Y> {
    return { first, second }
}

// ###################
// ## Error Classes ##
// ###################

export const ErrorString = Object.freeze({
    MoreThanOneElement: `Sequence contains more than one element`,
    NoElements: `Sequence contains more than one element`,
    NoMatch: `No matching element found`,
})

export class InvalidOperationException extends Error {
    constructor(public message: string) {
        super(message)
        this.name = `InvalidOperationException`
        this.stack = this.stack || (new Error()).stack
    }
}

export class ArgumentOutOfRangeException extends RangeError {
    constructor(public paramName: string) {
        super(`Argument ${paramName} is out of range`)
        this.name = `ArgumentOutOfRangeException`
        this.stack = this.stack || (new Error()).stack
    }
}

// ################################
// ## IterableIterator for Array ##
// ################################

export class ArrayIterator<T> implements IterableIterator<T> {

    private index = 0

    constructor(private array: T[]) {
    }

    public next(): IteratorResult<T> {
        const curIndex = this.index
        this.index++

        return {
            done: curIndex >= this.array.length,
            value: this.array[curIndex],
        }
    }

    public [Symbol.iterator]() {
        return this
    }
}
