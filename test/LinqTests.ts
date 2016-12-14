import * as Linq from "./../src/index"
import { NumberTest } from "./LinqNumberArrays"
import { LinqTests } from "./LinqBasicTypes"
import { TestClass, RunTests } from "./UnitTest"
Linq.initialize()

import "./LinqCollections"

@TestClass
class ArrayNumberTests extends NumberTest<Array<number>> {
    constructor() {
        super(x => x)
    }
}

@TestClass
class EnumerableNumberTests extends NumberTest<Linq.IEnumerable<number>> {
    constructor() {
        super(x => x.select(y => y))
    }
}

@TestClass
class Float32Tests extends NumberTest<Float32Array> {
    constructor() {
        super(x => new Float32Array(x))
    }
}

@TestClass
class Float64Tests extends NumberTest<Float64Array> {
    constructor() {
        super(x => new Float64Array(x))
    }
}

@TestClass
class ByteTests extends NumberTest<Int8Array> {
    constructor() {
        super(x => new Int8Array(x))
    }
}

@TestClass
class UByteTests extends NumberTest<Uint8Array> {
     constructor() {
        super(x => new Uint8Array(x))
    }
}

@TestClass
class UByteClampedTests extends NumberTest<Uint8ClampedArray> {
     constructor() {
        super(x => new Uint8ClampedArray(x))
    }
}

@TestClass
class ShortTests extends NumberTest<Int16Array> {
    constructor() {
        super(x => new Int16Array(x))
    }
}

@TestClass
class UShortTests extends NumberTest<Uint16Array> {
    constructor() {
        super(x => new Uint16Array(x))
    }
}

@TestClass
class IntTests extends NumberTest<Int32Array> {
    constructor() {
        super(x => new Int32Array(x))
    }
}

@TestClass
class UIntTests extends NumberTest<Uint32Array> {
    constructor() {
        super(x => new Uint32Array(x))
    }
}

@TestClass
class ArrayAnyTests extends LinqTests {
    constructor() {
        super(x => x)
    }
}

@TestClass
class EnumerableAnyTests extends LinqTests {
    constructor() {
        // Makes a BasicEnumerable
        super(x => x.select(y => y))
    }
}

RunTests()

declare var process: any
process.exit()
