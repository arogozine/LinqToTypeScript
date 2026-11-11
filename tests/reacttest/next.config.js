const path = require('path');

// linq-to-typescript is a `file:` dependency resolved from ../../dist,
// which lives outside this project, so the root must include the repo.
const repoRoot = path.join(__dirname, "..", "..")

module.exports = {
    outputFileTracingRoot: repoRoot,
    turbopack: {
        root: repoRoot,
    },
}
