import { IConstructor } from "./IConstructor"

export interface IPrototype<Y> extends IConstructor<{ [key: string]: any }> {
    new (_?: any): Y
}
