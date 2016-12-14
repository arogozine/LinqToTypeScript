"use strict";
const classes = [];
function TestClass(target) {
    classes.push(target);
}
exports.TestClass = TestClass;
function ExpectedException(exceptionType) {
    return function (target, propertyKey, descriptor) {
        const func = descriptor.value;
        function wrapper() {
            let exceptionOccurred = false;
            try {
                func.apply(this);
            }
            catch (e) {
                if (e instanceof exceptionType) {
                    exceptionOccurred = true;
                }
                else {
                    throw e;
                }
            }
            if (exceptionOccurred === false) {
                throw `Expected exception of type ${exceptionType.name}`;
            }
        }
        descriptor.value = wrapper;
        return descriptor;
    };
}
exports.ExpectedException = ExpectedException;
function RunTests() {
    for (let classInit of classes) {
        const className = classInit.name;
        console.log(`Runnings Tests for ${className}`);
        const obj = Reflect.construct(classInit, []);
        let keys = [];
        let o = classInit;
        while (o.prototype !== undefined) {
            keys = keys.concat(Reflect.ownKeys(o)).concat(Reflect.ownKeys(o.prototype));
            o = Object.getPrototypeOf(o);
        }
        for (let i = 0, j = 0; i < keys.length; i++) {
            const key = keys[i];
            const func = classInit[key] || classInit.prototype[key];
            if (typeof func !== "function") {
                j++;
                continue;
            }
            if (key === "constructor") {
                j++;
                continue;
            }
            if (func.length !== 0) {
                j++;
                continue;
            }
            console.log(`Running Test [${className}] ${key} (${i - j}/${keys.length - 1 - j})`);
            try {
                func.call(obj);
            }
            catch (e) {
                console.log(`${className}: Test #${i - j} (${key}) failed ${e}`);
                break;
            }
        }
        console.log(``);
    }
}
exports.RunTests = RunTests;
function AreEqual(a, b) {
    if (a !== b) {
        throw new Error(`Assert.AreEqual: ${a} === ${b}`);
    }
}
exports.AreEqual = AreEqual;
function IsTrue(trueValue) {
    if (trueValue !== true) {
        throw new Error(`Assert.IsTrue failed`);
    }
}
exports.IsTrue = IsTrue;
function IsFalse(falseValue) {
    if (falseValue === true) {
        throw new Error(`Assert.IsFalse failed`);
    }
}
exports.IsFalse = IsFalse;
function IterationsAreEqual(a, b) {
    const aArray = [...a];
    const bArray = [...b];
    AreEqual(aArray.length, bArray.length);
    for (let i = 0; i < aArray.length; i++) {
        AreEqual(aArray[i], bArray[i]);
    }
}
exports.IterationsAreEqual = IterationsAreEqual;
