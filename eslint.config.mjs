import reactCompiler from "eslint-plugin-react-compiler";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
), {
    plugins: {
        "react-compiler": reactCompiler,
        "@typescript-eslint": typescriptEslint,
        prettier,
    },

    rules: {
        "@typescript-eslint/no-unused-expressions": ["error", {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
        }],

        "react-compiler/react-compiler": "error",
        "no-console": "warn",
        "prettier/prettier": "error",
    },
}, {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    ignores: ["node_modules/**", "dist/**", "build/**"],
}];