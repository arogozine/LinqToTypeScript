import { IConstructor } from ".";
export interface IPrototype<Y> extends IConstructor<{
    [key: string]: any;
}> {
    new (_?: any): Y;
}
