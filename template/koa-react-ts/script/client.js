const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const { rmPath, makeDefine } = require("./base")
const config = require("../webpack/client.build")

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
            new DefinePlugin(makeDefine(defines))
        ]
    }
}

function makeClean() {
    rmPath(path.resolve(__dirname, "../dist/assets"))
}

function makeConfig() {
    makeClean()
    return merge(config, makePlugins())
}

module.exports = makeConfig