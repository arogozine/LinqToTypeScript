import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

describe("unionAsync", () => {
    // tslint:disable:triple-equals
    itEnumerableAsync<string | number>("WeakEquality", async (asEnumerable) => {
        const ints1 = asEnumerable([5, 3, 9, 7, 5, 9, 3, 7])
        const ints2 = asEnumerable(["8", "3", "6", "4", "4", "9", "1", "0"])
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = await ints1.unionAsync(ints2, async (x, y) => x == y).toArray()
        expect(union).toEqual(result)
    })

    itAsync("WeakEquality", async () => {
        const ints1 = asAsync<string | number>([5, 3, 9, 7, 5, 9, 3, 7])
        const ints2 = asAsync<string | number>(["8", "3", "6", "4", "4", "9", "1", "0"])
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = await ints1.unionAsync(ints2, async (x, y) => x == y).toArray()
        expect(union).toEqual(result)
    })

    itParallel<string | number>("WeakEquality", async (asParallel) => {
        const ints1 = asParallel([5, 3, 9, 7, 5, 9, 3, 7])
        const ints2 = asParallel(["8", "3", "6", "4", "4", "9", "1", "0"])
        const result = [5, 3, 9, 7, "8", "6", "4", "1", "0"]
        const union = await ints1.unionAsync(ints2, async (x, y) => x == y).toArray()
        expect(union).toEqual(result)
    })
})
