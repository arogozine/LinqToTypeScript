import { from, fromAsync, fromParallel } from 'linq-to-typescript'

describe("exceptions", () => {
    it("from", () => {
        expect(typeof from).toBe("function")
    })

    it("fromAsync", () => {
        expect(typeof fromAsync).toBe("function")
    })

    it("fromParallel", () => {
        expect(typeof fromParallel).toBe("function")
    })
})