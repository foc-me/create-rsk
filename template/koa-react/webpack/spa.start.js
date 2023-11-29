const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        react: ["react", "react-dom", "react-router-dom"],
        util: ["axios"],
        index: {
            import: path.resolve(__dirname, "../src/view/index.jsx"),
            dependOn: ["react", "util"]
        }
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "../spa"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
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
    },
    optimization: {
        runtimeChunk: "single"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: ",,Ծ‸Ծ,,",
            chunks: ["react", "util", "index"],
            template: path.resolve(__dirname, "../template.html"),
            filename: path.resolve(__dirname, "../spa/index.html")
        })
    ]
}