const classes: Object[] = []

export function TestClass(target: Object) {
    classes.push(target)
}

export function ExpectedException<E extends Function>(exceptionType: E) {
    return function(
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<() => void | never>): TypedPropertyDescriptor<() => void | never> {

        const func = descriptor.value as Function

        function wrapper() {
            let exceptionOccurred = false
            try {
                func.apply(this)
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
        const className: string = (classInit as any).name

        console.log(`Runnings Tests for ${className}`)
        const obj = Reflect.construct(classInit as any, [])

        let keys: PropertyKey[] = []

        let o: any = classInit
        while (o.prototype !== undefined) {
            keys = keys.concat(Reflect.ownKeys(o)).concat(Reflect.ownKeys(o.prototype))

            o = Object.getPrototypeOf(o)
        }

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

            console.log(`Running Test [${className}] ${key} (${i - j}/${keys.length - 1 - j})`)

            try {
                (func as Function).call(obj)
            } catch (e) {
                console.log(`${className}: Test #${i - j} (${key}) failed ${e} \r\n ${(e as Error).stack}`)
                break
            }
        }

        console.log(``)
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
