const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { rmDir, makeDefine } = require("./base")
const config = require("../webpack/spa.build")

const { DefinePlugin } = webpack

function makePlugins() {
    const { __APP__, __MODE__, __DEBUG__, __BASE__, __ROOT__ } = process.env
    const defines = {
        __APP__,
        __MODE__,
        __DEBUG__: __DEBUG__ === "__DEBUG__",
        __BASE__,
        __ROOT__
    }
    return {
        plugins: [
            new DefinePlugin(makeDefine(defines)),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "../assets"),
                        to: path.resolve(__dirname, "../spa/assets")
                    }
                ]
            })
        ]
    }
}

function makeClean() {
    rmDir(path.resolve(__dirname, "../spa"))
}

function makeConfig() {
    makeClean()
    return merge(config, makePlugins())
}

module.exports = makeConfig
module.exports.makePlugins = makePlugins