import { from, fromAsync, fromParallel } from 'linq-to-typescript'

describe("exceptions", () => {
    it("from array", () => {
        const array = [1, 2, 3]

        expect(from(array).toArray()).toEqual(array)
    })

    it("from map", () => {
        const map = new Map<number, string>();
        map.set(1, "1")
        map.set(2, "2")
        map.set(3, "3")

        expect(from(map).select(([n,]) => n).toArray()).toEqual([1, 2, 3])
        expect(from(map).select(([,s]) => s).toArray()).toEqual(["1", "2", "3"])
    })
    
    it("from array iterator", () => {
        const array = [1, 2, 3]

        expect(from(array[Symbol.iterator]()).toArray()).toEqual(array)
    })

    it("from map iterator", () => {
        const map = new Map<number, string>();
        map.set(1, "1")
        map.set(2, "2")
        map.set(3, "3")

        expect(from(map[Symbol.iterator]()).select(([n,]) => n).toArray()).toEqual([1, 2, 3])
    })

    it("from generator", () => {
        const generator = function* () {
            yield 1
            yield 2
            yield 3
        }

        expect(from(generator).toArray()).toEqual([1, 2, 3])
    })

    it("fromAsync", () => {
        expect(typeof fromAsync).toBe("function")
    })

    it("fromParallel", () => {
        expect(typeof fromParallel).toBe("function")
    })
})