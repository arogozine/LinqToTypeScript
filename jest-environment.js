const JestEnvironment = require('jest-environment-jsdom');
// const tsIndex =  require("./lib/index");

class CustomEnvironment extends JestEnvironment {
    constructor(config) {
        super(config)
    }

    async setup() {
        await super.setup();
        // tsIndex.initializeLinq()
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = CustomEnvironment;