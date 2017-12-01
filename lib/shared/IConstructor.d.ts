export interface IConstructor<TResult> extends Function {
    readonly prototype: TResult;
}
