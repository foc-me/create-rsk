const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")

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
        path: path.resolve(__dirname, "../dist"),
        filename: "assets/lib/[name].js",
        chunkFilename: "assets/lib/[name].js"
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
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            filename: "assets/style/[name].css",
            linkType: "text/css"
        }),
        new CssMinimizerWebpackPlugin()
    ]
}