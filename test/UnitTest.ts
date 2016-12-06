const classes: Object[] = []

export function TestClass(target: Object) {
    classes.push(target)
}

export function ExpectedException<E extends Function>(exceptionType: E) {
    return function(
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<() => void | never>): TypedPropertyDescriptor<() => void | never> {

        const func = descriptor.value as () => void | never

        function wrapper() {
            let exceptionOccurred = false
            try {
                func()
            } catch (e) {
                if (e instanceof <any> exceptionType)  {
                    exceptionOccurred = true
                } else {
                    throw e
                }
            }

            if (exceptionOccurred === false) {
                throw `Expected exception of type ${exceptionType.name}`
            }
        }

        descriptor.value = <any> wrapper
        return descriptor
    }
}

export function RunTests() {

    for (let classInit of classes) {

        console.log(`Runnings Tests for ${(classInit as any).name}`)
        const obj = classInit.constructor()

        const keys = Reflect.ownKeys(classInit)
            .concat(Reflect.ownKeys((classInit as any).prototype))

        for (let i = 0, j = 0; i < keys.length; i++) {
            const key = keys[i]

            const func = (classInit as any)[key] || (classInit as any).prototype[key]

            if (typeof func !== "function") {
                j++
                continue
            }

            if (key === "constructor") {
                j++
                continue
            }

            if ((func as Function).length !== 0) {
                j++
                continue
            }

            console.log(`Running Test ${key} (${i - j}/${keys.length - 1 - j})`)

            try {
                (func as Function).apply(obj)
            } catch (e) {
                console.log(`Test #${i - j} (${key}) failed ${e}`)
                break
            }
        }
    }
}

export function AreEqual<TItem>(a: TItem, b: TItem): void {
    if (a !== b) {
        throw new Error(`Assert.AreEqual: ${a} === ${b}`)
    }
}

export function IsTrue(trueValue: boolean): void {
    if (trueValue !== true) {
        throw new Error(`Assert.IsTrue failed`)
    }
}

export function IsFalse(falseValue: boolean): void | never {
    if (falseValue === true) {
        throw new Error(`Assert.IsFalse failed`)
    }
}

export function IterationsAreEqual<TSource>(a: Iterable<TSource>, b: Iterable<TSource>): void {
    const aArray =  [...a]
    const bArray = [...b]

    AreEqual(aArray.length, bArray.length)

    for (let i = 0; i < aArray.length; i++) {
        AreEqual(aArray[i], bArray[i])
    }
}
