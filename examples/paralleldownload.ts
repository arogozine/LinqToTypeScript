import { from } from "linq-to-typescript"
import * as url from "url"
import * as https from "https"

const downloadFile = (url: url.URL) => {
    return new Promise<string>((resolve) => {
        let content = ``
        https.get(url, (res) => {
            res.setEncoding("utf8");
            // https://stackoverflow.com/questions/54096937/why-i-keep-getting-econnreset-error-on-proxy-calls-in-mac-osx-only-totally-arbi
            res.headers.connection = "keep-alive";
            res.on("data", (chunk) => content += chunk);
            res.on("end", () => resolve(content));
        })
    })
}

const getTitle = (html: string) => {
    const start = html.indexOf('<title>') + '<title>'.length
    const end = html.indexOf('</title>')
    return html.substring(start, end)
}

const bing = new url.URL(`https://www.bing.com/`)
const google = new url.URL(`https://www.google.com/`)
const quackQuackGo = new url.URL(`https://duckduckgo.com/`)
const promise = from([bing, google, quackQuackGo])
    .asParallel()
    .selectAsync(downloadFile)
    .select(getTitle)
    .toArray()

promise.then(console.log)
