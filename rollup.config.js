import terser from "@rollup/plugin-terser"
import copy from "rollup-plugin-copy"
import pick from "@focme/rollup-plugin-pick"

export default {
    input: "./src/index.js",
    output: {
        file: "./dist/index.js",
        format: "cjs",
        banner: "#!/usr/bin/env node"
    },
    plugins: [
        terser({
            mangle: { toplevel: true }
        }),
        copy({
            targets: [
                { src: ["./readme.md"], dest: "./dist" }
            ]
        }),
        pick([
            "name",
            "version",
            ["bin", { "create-rsk": "./index.js" }],
            ["main", "./index.js"],
            "description",
            "keywords",
            ["files", ["index.js", "readme.md", "package.json"]],
            "author",
            "repository",
            "license",
            "dependencies"
        ])
    ]
}