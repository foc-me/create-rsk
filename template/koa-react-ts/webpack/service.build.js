const path = require("path")

module.exports = {
    target: "node",
    entry: {
        index: path.resolve(__dirname, "../src/index.ts")
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: ["babel-loader"]
            },
            {
                test: /.tsx?$/,
                use: ["babel-loader"]
            },
            {
                test: /.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "global"
                            }
                        }
                    }
                ]
            }
        ]
    }
}