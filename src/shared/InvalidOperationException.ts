/**
 * Invalid Operation Exception
 */
export class InvalidOperationException extends Error {
    public constructor(message: string) {
        super(message)
        this.name = "InvalidOperationException"
        this.stack = this.stack || (new Error()).stack
    }
}
