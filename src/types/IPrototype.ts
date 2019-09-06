import { IConstructor } from "./IConstructor"

/**
 * TODO: Simplify
 */
export interface IPrototype<Y> extends IConstructor<{ [key: string]: any }> {
    new (_?: any): Y
}
