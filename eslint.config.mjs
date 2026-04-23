import stylistic from '@stylistic/eslint-plugin';
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import jsdoc from "eslint-plugin-jsdoc";
import preferArrow from "eslint-plugin-prefer-arrow-functions";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import js from "@eslint/js";

export default [
    {
        ignores: [
            "**/*.js",
            "**/*.cjs",
            "**/*.mjs",
            "config/*",
            "tests/*",
            "dist/*",
            "doc/*",
            "examples/*",
        ],
    },
    js.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parser: tsParser,
            sourceType: "module",

            parserOptions: {
                project: "tsconfig.json",
            },
        },

        plugins: {
            jsdoc: jsdoc,
            "@stylistic": stylistic,
            "prefer-arrow-functions": preferArrow,
            "@typescript-eslint": typescriptEslint,
        },

        settings: {
            jsdoc: {
                ignorePrivate: true,
                ignoreInternal: true,
                mode: "typescript",
            },
        },

        rules: {
            // disallows empty async methods which are needed in places
            "@typescript-eslint/require-await": "off",
            "@typescript-eslint/adjacent-overload-signatures": "error",

            "@typescript-eslint/array-type": ["error", {
                default: "array",
            }],

            "@typescript-eslint/no-empty-object-type": "error",
            "@typescript-eslint/no-unsafe-function-type": "error",
            "@typescript-eslint/no-wrapper-object-types": "error",

            "@typescript-eslint/consistent-type-assertions": "error",
            "@typescript-eslint/dot-notation": "error",

            "@typescript-eslint/explicit-member-accessibility": ["error", {
                accessibility: "explicit",
            }],

            "@stylistic/member-delimiter-style": ["error", {
                multiline: {
                    delimiter: "none",
                    requireLast: true,
                },

                singleline: {
                    delimiter: "semi",
                    requireLast: false,
                },
            }],

            "@typescript-eslint/member-ordering": "error",
            "@typescript-eslint/no-empty-function": "error",
            "@typescript-eslint/no-empty-interface": "error",
            // messes up type check methods
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-misused-new": "error",
            "@typescript-eslint/no-namespace": "error",
            "@typescript-eslint/no-unnecessary-type-assertion": "error",
            "@typescript-eslint/no-unused-expressions": "error",
            "@typescript-eslint/no-var-requires": "error",
            "@typescript-eslint/prefer-namespace-keyword": "error",

            "@typescript-eslint/consistent-type-imports": ["error", {
                prefer: "type-imports",
            }],

            "@stylistic/semi": ["error", "never"],

            "@typescript-eslint/triple-slash-reference": ["error", {
                path: "always",
                types: "prefer-import",
                lib: "always",
            }],

            "constructor-super": "error",
            "eqeqeq": ["error", "smart"],
            "guard-for-in": "error",

            "id-blacklist": [
                "error",
                "Number",
                "number",
                "String",
                "string",
                "Boolean",
                "boolean",
                "Undefined",
                "undefined",
            ],

            "id-match": "error",
            // requires js doc in stupid places
            "jsdoc/require-jsdoc": "off",
            "jsdoc/check-alignment": "error",
            "jsdoc/check-indentation": "error",
            // these are not required with TS enabled
            "jsdoc/require-param-type": "off",
            "jsdoc/require-returns-type": "off",
            "jsdoc/require-yields": "off",
            "new-parens": "error",
            "no-bitwise": "error",
            "no-caller": "error",
            "no-cond-assign": "error",
            "no-console": "error",
            "no-debugger": "error",
            "no-duplicate-imports": "error",
            "no-empty": "error",
            "no-eval": "error",
            "no-new-wrappers": "error",
            "no-restricted-imports": ["error", "..", ".", "../.."],

            "no-shadow": ["error", {
                hoist: "all",
            }],

            "no-throw-literal": "error",
            "no-trailing-spaces": "error",
            "no-undef-init": "error",
            "no-underscore-dangle": "error",
            "no-unsafe-finally": "error",
            "no-unused-labels": "error",
            "no-var": "error",
            "object-shorthand": "error",
            "one-var": ["error", "never"],
            "prefer-arrow-functions/prefer-arrow-functions": "error",
            "prefer-const": "error",
            "radix": "error",

            "spaced-comment": ["error", "always", {
                markers: ["/"],
            }],

            "use-isnan": "error",
            "valid-typeof": "error",
            "quotes": ["error", "double"],
            "no-unused-vars": "off"
        },
    },
    {
        files: ["**/*.ts", "**/*.tsx"],

        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },
    },
];
