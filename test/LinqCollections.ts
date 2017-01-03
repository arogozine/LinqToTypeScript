import { IsTrue, IsFalse } from "./UnitTest"
import { TestClass } from "./UnitTest"

@TestClass
export class LinqCollectionTests {

    public anyMap() {
        const map = new Map<string, string>()
        map.set("foo", "bar")
        map.set("foo2", "bar")

        IsTrue(map.any())

        IsFalse(new Map<any, any>().any())
    }

    public anyPredicate() {

        const map = new Map<string, string>()
        map.set("foo", "bar")
        map.set("foo2", "bar")

        IsFalse(map.any(x => x[0] === "foo3"))
        IsTrue(map.any(x => x[0] === "foo"))
        IsFalse(new Map<any, any>().any(x => x[0] !== "foo"))
    }

    public allMap() {
        const map = new Map<string, string>()
        map.set("foo", "bar")
        map.set("foo2", "bar")

        const allAreBar = map.all(x => x[1] === "bar")
        IsTrue(allAreBar)
    }
}
