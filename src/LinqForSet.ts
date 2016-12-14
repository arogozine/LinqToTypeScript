import { IEnumerable } from "./IEnumerable"

/* tslint:disable */
declare global {
    interface Set<T> extends IEnumerable<T> {

    }    
}
/* tslint:enable */
