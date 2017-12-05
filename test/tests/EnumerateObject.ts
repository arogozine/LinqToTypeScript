import { Enumerable } from "../../src/index"

describe("enumerateObject", () => {
    it("EnumerateObject", () => {
        const object = {
            a: 1,
            b: "foo",
            z: [1, 2, false],
        }

        for (const item of Enumerable.enumerateObject(object)) {
            expect(item.second).toBe(object[item.first])
        }
    })
})
