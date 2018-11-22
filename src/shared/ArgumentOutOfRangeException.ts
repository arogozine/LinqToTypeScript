/**
 * Exception thrown when the passed in argument
 * is out of range.
 */
export class ArgumentOutOfRangeException extends RangeError {
    constructor(public readonly paramName: string) {
        super(`${ paramName } was out of range.` +
            ` Must be non-negative and less than the size of the collection.`)
        this.name = `ArgumentOutOfRangeException`
        this.stack = this.stack || (new Error()).stack
    }
}
