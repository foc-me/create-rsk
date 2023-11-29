const path = require("path")

module.exports = {
    target: "node",
    entry: {
        index: path.resolve(__dirname, "../src/index.js")
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                use: ["babel-loader"]
            }
        ]
    }
}