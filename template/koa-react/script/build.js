const webpack = require("webpack")
const { merge } = require("webpack-merge")
const createArgv = require("@focme/argv")
const { BuildType, makeEnv, makeDevtool } = require("./base")
const makeServiceConfig = require("./service")
const makeClientConfig = require("./client")
const makeSpaConfig = require("./spa")
const base = require("../webpack/base.config")

function makeBuildConfig(buildType) {
    switch (buildType) {
        case BuildType.client:
            return makeClientConfig()
        case BuildType.spa:
            return makeSpaConfig()
        default: return makeServiceConfig()
    }
}

function build(config) {
    webpack(config).run((error, stats) => {
        if (error) {
            console.log(error)
            return
        }
        const result = stats.toString({ colors: true })
        console.log(result)
        console.log()
    })
}

function main() {
    const argv = createArgv()
    const { _ = [], ...others } = argv.opt()
    if (_.length < 1) {
        console.log("nothing to build")
        process.exit(1)
    }

    try {
        for (const type of _) {
            makeEnv(type, others)
            const { __MODE__ } = process.env
            const mode = { mode: __MODE__ }
            const config = makeBuildConfig(type)
            build(merge(base, mode, makeDevtool(), config))
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main()