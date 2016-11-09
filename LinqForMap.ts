import { IEnumerable } from "./IEnumerable"

/* tslint:disable */
declare global {
    interface Map<K,V> extends IEnumerable<[K,V]> {

    }    
}
/* tslint:enable */
