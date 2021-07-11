import { fromAsync } from 'linq-to-typescript'
import { expectAsync, itAsync } from '../../TestHelpers'

describe("fromAsync", () => {
    it("is function", () => {
        expect(typeof fromAsync).toBe("function")
    })

    itAsync("promise", async () => {
        const promises = [
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3)
        ]

        const asyncEnumerable = fromAsync(promises)
        const expectArray = await expectAsync(asyncEnumerable.toArray())
        expectArray.toEqual([1, 2, 3])        
    })

    itAsync("generator", async () => {
        const generator = async function*() {
            yield 1
            yield 2
            yield 3
        }

        const asyncEnumerable = fromAsync(generator)
        const expectArray = await expectAsync(asyncEnumerable.toArray())
        expectArray.toEqual([1, 2, 3])   
    })
})