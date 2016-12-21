import { IEnumerable } from "./Interfaces"

/* tslint:disable */
declare global {
    interface Map<K,V> extends IEnumerable<[K,V]> {

    }    
}
/* tslint:enable */
