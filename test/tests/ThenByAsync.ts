import { asAsync, itAsync, itEnumerableAsync, itParallel } from "../TestHelpers"

interface IOrderable {
    first: boolean,
    then: number,
}

describe("thenByAsync", () => {
    const generateValues = () => {
        const values: IOrderable[] = []
        for (let i = 0; i < 2; i++) {
            const first = i === 0
            for (let j = 0; j < 10; j++) {
                const then = Math.random()
                values.push({
                    first,
                    then,
                })
            }
        }
        return values
    }

    itEnumerableAsync<IOrderable>("sync", async (asEnumerable) => {
        const values = generateValues()
        const enumerable = asEnumerable(values)
        const orderby = await enumerable
            .orderBy((x) => x.first ? 0 : 1)
            .thenByAsync(async (x) => x.then)
            .toArray()

        expect(orderby.length).toBe(values.length)

        let thenPart1 = 0
        let thenPart2 = 0

        for (let i = 0; i < orderby.length; i++) {
            const val = orderby[i]
            if (i < 10) {
                if (val.first === false) {
                    fail()
                }

                if (val.then < thenPart1) {
                    fail()
                }

                thenPart1 = val.then
            } else {
                if (val.first === true) {
                    fail()
                }

                if (val.then < thenPart2) {
                    fail()
                }

                thenPart2 = val.then
            }
        }
    })

    itEnumerableAsync<IOrderable>("AsyncBoth", async (asEnumerable) => {
        const values = generateValues()
        const enumerable = asEnumerable(values)
        const orderby = await enumerable
            .orderByAsync(async (x) => x.first ? 0 : 1)
            .thenByAsync(async (x) => x.then)
            .toArray()

        expect(orderby.length).toBe(values.length)

        let thenPart1 = 0
        let thenPart2 = 0

        for (let i = 0; i < orderby.length; i++) {
            const val = orderby[i]
            if (i < 10) {
                if (val.first === false) {
                    fail()
                }

                if (val.then < thenPart1) {
                    fail()
                }

                thenPart1 = val.then
            } else {
                if (val.first === true) {
                    fail()
                }

                if (val.then < thenPart2) {
                    fail()
                }

                thenPart2 = val.then
            }
        }
    })

    itAsync("ThenByAsync", async () => {
        const values = generateValues()
        const enumerable = asAsync(values)
        const orderby = await enumerable
            .orderBy((x) => x.first ? 0 : 1)
            .thenByAsync(async (x) => x.then)
            .toArray()

        expect(orderby.length).toBe(values.length)

        let thenPart1 = 0
        let thenPart2 = 0

        for (let i = 0; i < orderby.length; i++) {
            const val = orderby[i]
            if (i < 10) {
                if (val.first === false) {
                    fail()
                }

                if (val.then < thenPart1) {
                    fail()
                }

                thenPart1 = val.then
            } else {
                if (val.first === true) {
                    fail()
                }

                if (val.then < thenPart2) {
                    fail()
                }

                thenPart2 = val.then
            }
        }
    })

    itAsync("AsyncBoth", async () => {
        const values = generateValues()
        const enumerable = asAsync(values)
        const orderby = await enumerable
            .orderByAsync(async (x) => x.first ? 0 : 1)
            .thenByAsync(async (x) => x.then)
            .toArray()

        expect(orderby.length).toBe(values.length)

        let thenPart1 = 0
        let thenPart2 = 0

        for (let i = 0; i < orderby.length; i++) {
            const val = orderby[i]
            if (i < 10) {
                if (val.first === false) {
                    fail()
                }

                if (val.then < thenPart1) {
                    fail()
                }

                thenPart1 = val.then
            } else {
                if (val.first === true) {
                    fail()
                }

                if (val.then < thenPart2) {
                    fail()
                }

                thenPart2 = val.then
            }
        }
    })

    itParallel<IOrderable>("thenByAsync", async (asParallel) => {
        const values = generateValues()
        const enumerable = asParallel(values)
        const orderby = await enumerable
            .orderBy((x) => x.first ? 0 : 1)
            .thenByAsync(async (x) => x.then)
            .toArray()

        expect(orderby.length).toBe(values.length)

        let thenPart1 = 0
        let thenPart2 = 0

        for (let i = 0; i < orderby.length; i++) {
            const val = orderby[i]
            if (i < 10) {
                if (val.first === false) {
                    fail()
                }

                if (val.then < thenPart1) {
                    fail()
                }

                thenPart1 = val.then
            } else {
                if (val.first === true) {
                    fail()
                }

                if (val.then < thenPart2) {
                    fail()
                }

                thenPart2 = val.then
            }
        }
    })

    itParallel<IOrderable>("AsyncBoth", async (asParallel) => {
        const values = generateValues()
        const enumerable = asParallel(values)
        const orderby = await enumerable
            .orderByAsync(async (x) => x.first ? 0 : 1)
            .thenByAsync(async (x) => x.then)
            .toArray()

        expect(orderby.length).toBe(values.length)

        let thenPart1 = 0
        let thenPart2 = 0

        for (let i = 0; i < orderby.length; i++) {
            const val = orderby[i]
            if (i < 10) {
                if (val.first === false) {
                    fail()
                }

                if (val.then < thenPart1) {
                    fail()
                }

                thenPart1 = val.then
            } else {
                if (val.first === true) {
                    fail()
                }

                if (val.then < thenPart2) {
                    fail()
                }

                thenPart2 = val.then
            }
        }
    })
})
