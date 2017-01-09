import { IEnumerable } from "./Interfaces";
declare global  {
    interface Map<K, V> extends IEnumerable<[K, V]> {
    }
}
