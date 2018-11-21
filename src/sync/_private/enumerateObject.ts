import { IEnumerable, ITuple } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export function enumerateObject<TInput>(source: TInput): IEnumerable<ITuple<keyof TInput, TInput[keyof TInput]>> {
    function *iterable() {
        // tslint:disable-next-line:forin
        for (const key in source) {
            yield {
                first: key,
                second: source[key],
            }
        }
    }

    return new BasicEnumerable(iterable)
}
