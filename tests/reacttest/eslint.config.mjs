import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
// eslint-config-next (v16+) exports a flat config array
const nextConfig = require("eslint-config-next/core-web-vitals")

const config = [
    {
        ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
    },
    ...nextConfig,
]

export default config
