import { EqualityComparer } from "linq-to-typescript"
import { asAsync, itAsync, itEnumerable, itParallel } from "../TestHelpers"

// tslint:disable:variable-name

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

    itAsync("ObjectSelect", async () => {
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

    itAsync("ObjectSelectWithComparer", async () => {
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
        const grouping = asEnumerable([1, 2, 3]).groupByWithSel((_x) => singleKey, (x) => x.toString())

        for (const group of grouping) {
            expect(group.key).toBe(singleKey)
            expect(group.toArray()).toEqual(["1", "2", "3"])
        }
    })

    itAsync("SingleKey", async () => {
        const singleKey = "singleKey"
        const grouping = asAsync([1, 2, 3]).groupByWithSel((_x) => singleKey, (x) => x.toString())

        for await (const group of grouping) {
            expect(group.key).toBe(singleKey)
            expect(group.toArray()).toEqual(["1", "2", "3"])
        }
    })

    itParallel("SingleKey", async (asParallel) => {
        const singleKey = "singleKey"
        const grouping = asParallel([1, 2, 3]).groupByWithSel((_x) => singleKey, (x) => x.toString())

        for await (const group of grouping) {
            expect(group.key).toBe(singleKey)
            expect(group.toArray()).toEqual(["1", "2", "3"])
        }
    })
    // Regression: groups were stored in a plain object, so prototype member
    // names collided and 1 / "1" were merged.
    const protoKeys = ["constructor", "toString", "__proto__", "hasOwnProperty"]

    itEnumerable<string>("PrototypeNamedKeys", (asEnumerable) => {
        const groups = asEnumerable([...protoKeys, ...protoKeys]).groupByWithSel((x) => x, (x) => x).toArray()
        expect(groups.map((g) => g.key)).toEqual(protoKeys)
        for (const g of groups) {
            expect(g.toArray()).toEqual([g.key, g.key])
        }
    })

    itAsync("PrototypeNamedKeys", async () => {
        const groups = await asAsync([...protoKeys, ...protoKeys]).groupByWithSel((x) => x, (x) => x).toArray()
        expect(groups.map((g) => g.key)).toEqual(protoKeys)
    })

    itParallel<string>("PrototypeNamedKeys", async (asParallel) => {
        const groups = await asParallel([...protoKeys, ...protoKeys]).groupByWithSel((x) => x, (x) => x).toArray()
        expect(groups.map((g) => g.key)).toEqual(protoKeys)
    })

    itEnumerable<number | string>("NumberAndStringKeysAreDistinctAndKeepInsertionOrder", (asEnumerable) => {
        const groups = asEnumerable(["b", "2", 2, "a", 1, "1"])
            .groupByWithSel((x) => x, (x) => x).toArray()
        expect(groups.map((g) => g.key)).toEqual(["b", "2", 2, "a", 1, "1"])
    })

    itAsync("NumberAndStringKeysAreDistinctAndKeepInsertionOrder", async () => {
        const groups = await asAsync<number | string>(["b", "2", 2, "a", 1, "1"])
            .groupByWithSel((x) => x, (x) => x).toArray()
        expect(groups.map((g) => g.key)).toEqual(["b", "2", 2, "a", 1, "1"])
    })

    itParallel<number | string>("NumberAndStringKeysAreDistinctAndKeepInsertionOrder", async (asParallel) => {
        const groups = await asParallel(["b", "2", 2, "a", 1, "1"])
            .groupByWithSel((x) => x, (x) => x).toArray()
        expect(groups.map((g) => g.key)).toEqual(["b", "2", 2, "a", 1, "1"])
    })
})
