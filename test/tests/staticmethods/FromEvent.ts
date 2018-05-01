import { AsyncEnumerable } from "./../../../src/index"
import { itAsync } from "./../../TestHelpers"

describe("fromEvent", () => {
    it("ClickAsync", (done) => {
        const button = document.createElement("button")
        const body = document.querySelector("body")
        if (body) {
            body.appendChild(button)

            const asyncEnum = AsyncEnumerable.fromEvent(button, "click")
            asyncEnum.first().then((value) => {
                expect(value instanceof MouseEvent).toBe(true)
                done()
            })

            button.click()
        } else {
            fail()
        }
    })

    itAsync("ClickAsyncMultiple", async () => {
        const button = document.createElement("button")
        const body = document.querySelector("body")
        if (body) {
            body.appendChild(button)

            const asyncEnum = AsyncEnumerable.fromEvent(button, "click")
            setTimeout(() => {
                button.click()
            }, 10)

            let clicks = 10
            for await (const value of asyncEnum) {
                expect(value instanceof MouseEvent).toBe(true)
                if (clicks--) {
                    setTimeout(() => button.click(), 10)
                } else {
                    break
                }
            }
        } else {
            fail()
        }
    })
})
