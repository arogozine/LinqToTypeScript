/**
 * Represents a type with a constructor
 */
export interface IConstructor<TResult> extends Function {
    readonly prototype: TResult
    new(...args: any[]): TResult
}
