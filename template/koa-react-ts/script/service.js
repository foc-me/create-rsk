const path = require("node:path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const rimraf = require("rimraf")
const { makeDefine, ModeType } = require("./base")
const config = require("../webpack/service.build")

const { DefinePlugin } = webpack

function makePlugins() {
    const { __APP__, __MODE__, __DEBUG__, __PORT__, __BASE__ } = process.env
    const defines = {
        __APP__,
        __MODE__,
        __DEBUG__: __DEBUG__ === "__DEBUG__",
        __PORT__,
        __BASE__
    }
    const plugins = [
        new DefinePlugin(makeDefine(defines))
    ]
    if (__MODE__ === ModeType.production) {
        plugins.push(new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../assets"),
                    to: path.resolve(__dirname, "../dist/assets")
                }
            ]
        }))
    }
    return { plugins }
}

function makeClean() {
    rimraf.sync(path.resolve(__dirname, "../dist"), {
        filter: (dir) => {
            return !dir.includes("/assets/")
        }
    })
}

function makeConfig() {
    makeClean()
    return merge(config, makePlugins())
}

module.exports = makeConfig