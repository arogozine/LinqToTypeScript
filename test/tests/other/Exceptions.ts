import { InvalidOperationException, ErrorString, ArgumentOutOfRangeException } from "linq-to-typescript";

describe("exceptions", () => {
    it("InvalidOperationException", () => {
        try {
            throw new InvalidOperationException(ErrorString.MoreThanOneElement);
        }
        catch (ex) {
            expect(typeof ex).toBe("object")
            expect(ex instanceof InvalidOperationException).toBe(true)

            const invEx = ex as InvalidOperationException
            expect(invEx.message).toBe(ErrorString.MoreThanOneElement)
            expect(invEx.name).toBe(InvalidOperationException.name)
            expect(typeof invEx.stack).toBe("string")
        }
    })

    it("ArgumentOutOfRangeException", () => {
        try {
            throw new ArgumentOutOfRangeException("bob");
        }
        catch (ex) {
            expect(typeof ex).toBe("object")
            expect(ex instanceof ArgumentOutOfRangeException).toBe(true)

            const invEx = ex as ArgumentOutOfRangeException
            expect(invEx.message.includes("bob")).toBe(true)
            expect(invEx.name).toBe(ArgumentOutOfRangeException.name)
            expect(typeof invEx.stack).toBe("string")
        }
    })
});