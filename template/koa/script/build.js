const webpack = require("webpack")
const { merge } = require("webpack-merge")
const createArgv = require("@focme/argv")
const { BuildType, makeEnv, makeDevtool } = require("./base")
const makeServiceConfig = require("./service")
const base = require("../webpack/base.config")

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
    const option = createArgv().opt()
    try {
        makeEnv(BuildType.service, option)
        const { __MODE__ } = process.env
        const mode = { mode: __MODE__ }
        const config = makeServiceConfig()
        build(merge(base, mode, makeDevtool(), config))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main()