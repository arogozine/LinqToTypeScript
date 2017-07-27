import { IEnumerable } from "./Interfaces";
declare global  {
    interface Set<T> extends IEnumerable<T> {
    }
}
