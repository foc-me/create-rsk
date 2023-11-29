const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
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
        path: path.resolve(__dirname, "../spa"),
        filename: "assets/lib/[contenthash].js",
        chunkFilename: "assets/lib/[contenthash].js"
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
        new HtmlWebpackPlugin({
            title: ",,Ծ‸Ծ,,",
            chunks: ["react", "util", "index"],
            template: path.resolve(__dirname, "../template.html"),
            filename: path.resolve(__dirname, "../spa/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "assets/style/[contenthash].css",
            linkType: "text/css"
        }),
        new CssMinimizerWebpackPlugin()
    ]
}