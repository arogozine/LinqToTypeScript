import { IEnumerable } from "./Interfaces"

/* tslint:disable */
declare global {
    interface Set<T> extends IEnumerable<T> {

    }    
}
/* tslint:enable */
