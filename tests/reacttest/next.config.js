const path = require('path');

module.exports = {
    outputFileTracingRoot: path.join(__dirname),
    eslint: {
        ignoreDuringBuilds: true
    }
}
