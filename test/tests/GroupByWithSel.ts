import { EqualityComparer } from "../../src/index"
import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

describe("groupByWithSel", () => {
    itEnumerable<{ key: string, value: number }>("ObjectSelect", (asEnumerable) => {
        const array = asEnumerable([{ key: "foo", value: 0 }, { key: "foo", value: 1 }, { key: "bar", value: 3}])
        const grouping = array.groupByWithSel((x) => x.key, (x) => x.value)
        const groupingArray = grouping.toArray()

        expect(groupingArray[0].key).toBe("foo")
        expect(groupingArray[0].toArray()).toEqual([0, 1])

        expect(groupingArray[1].key).toBe("bar")
        expect(groupingArray[1].toArray()).toEqual([3])
    })

    itAsync("ObjectSelectAsync", async () => {
        const array = asAsync([{ key: "foo", value: 0 }, { key: "foo", value: 1 }, { key: "bar", value: 3}])
        const grouping = array.groupByWithSel((x) => x.key, (x) => x.value)
        const groupingArray = await grouping.toArray()

        expect(groupingArray[0].key).toBe("foo")
        expect(groupingArray[0].toArray()).toEqual([0, 1])

        expect(groupingArray[1].key).toBe("bar")
        expect(groupingArray[1].toArray()).toEqual([3])
    })

    itParallel<{ key: string, value: number }>("ObjectSelect", async (asParallel) => {
        const array = asParallel([{ key: "foo", value: 0 }, { key: "foo", value: 1 }, { key: "bar", value: 3}])
        const grouping = array.groupByWithSel((x) => x.key, (x) => x.value)
        const groupingArray = await grouping.toArray()

        expect(groupingArray[0].key).toBe("foo")
        expect(groupingArray[0].toArray()).toEqual([0, 1])

        expect(groupingArray[1].key).toBe("bar")
        expect(groupingArray[1].toArray()).toEqual([3])
    })

    itEnumerable<{ key: string, value: any }>("ObjectSelectWithComparer", (asEnumerable) => {
        const array = asEnumerable([{ key: "foo", value: "0" }, { key: "foo", value: 1 }, { key: "bar", value: 3}])
        const grouping = array.groupByWithSel((x) => x.key, (x) => x.value, EqualityComparer)
        const groupingArray = grouping.toArray()

        expect(groupingArray[0].key).toBe("foo")
        expect(groupingArray[0].toArray()).toEqual(["0", 1])

        expect(groupingArray[1].key).toBe("bar")
        expect(groupingArray[1].toArray()).toEqual([3])
    })

    itAsync("ObjectSelectWithComparerAsync", async () => {
        const array = asAsync([{ key: "foo", value: "0" }, { key: "foo", value: 1 }, { key: "bar", value: 3}])
        const grouping = array.groupByWithSel((x) => x.key, (x) => x.value, EqualityComparer)
        const groupingArray = await grouping.toArray()

        expect(groupingArray[0].key).toBe("foo")
        expect(groupingArray[0].toArray()).toEqual(["0", 1])

        expect(groupingArray[1].key).toBe("bar")
        expect(groupingArray[1].toArray()).toEqual([3])
    })

    itParallel<{ key: string, value: number | string }>("ObjectSelectWithComparer", async (asParallel) => {
        const array = asParallel([{ key: "foo", value: "0" }, { key: "foo", value: 1 }, { key: "bar", value: 3}])
        const grouping = array.groupByWithSel((x) => x.key, (x) => x.value, EqualityComparer)
        const groupingArray = await grouping.toArray()

        expect(groupingArray[0].key).toBe("foo")
        expect(groupingArray[0].toArray()).toEqual(["0", 1])

        expect(groupingArray[1].key).toBe("bar")
        expect(groupingArray[1].toArray()).toEqual([3])
    })

    itEnumerable<number>("SingleKey", (asEnumerable) => {
        const singleKey = "singleKey"
        const grouping = asEnumerable([1, 2, 3]).groupByWithSel((x) => singleKey, (x) => x.toString())

        for (const group of grouping) {
            expect(group.key).toBe(singleKey)
            expect(group.toArray()).toEqual(["1", "2", "3"])
        }
    })

    itAsync("SingleKeyAsync", async () => {
        const singleKey = "singleKey"
        const grouping = asAsync([1, 2, 3]).groupByWithSel((x) => singleKey, (x) => x.toString())

        for await (const group of grouping) {
            expect(group.key).toBe(singleKey)
            expect(group.toArray()).toEqual(["1", "2", "3"])
        }
    })

    itParallel("SingleKeyParalel", async (asParallel) => {
        const singleKey = "singleKey"
        const grouping = asParallel([1, 2, 3]).groupByWithSel((x) => singleKey, (x) => x.toString())

        for await (const group of grouping) {
            expect(group.key).toBe(singleKey)
            expect(group.toArray()).toEqual(["1", "2", "3"])
        }
    })
})
