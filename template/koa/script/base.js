const fs = require("fs")
const path = require("path")
const { rimrafSync } = require("rimraf")
const developConfig = require("../config/service.develop")
const productConfig = require("../config/service.product")

const ModeType = {
    development: "development",
    production: "production"
}

const ConfigType = {
    develop: "develop",
    release: "release",
    product: "product"
}

const BuildType = {
    service: "service",
    client: "client",
    spa: "spa"
}

function makeConfig(type) {
    switch (type) {
        case ConfigType.develop:
            return developConfig
        default: return productConfig
    }
}

function makeEnv(build, argv) {
    const { port, debug, mode, config } = argv
    const { __MODE__, __DEBUG__, __PORT__ } = makeConfig(config)
    const currentMode = nilEmpty(mode) ? __MODE__ : mode
    const currentDebug = nilEmpty(debug) ? __DEBUG__ : debug
    const currentPort = nilEmpty(port) ? __PORT__ : port
    process.env.__APP__ = build
    process.env.__MODE__ = currentMode
    process.env.__DEBUG__ = currentDebug ? "__DEBUG__" : ""
    process.env.__PORT__ = currentPort
}

function nil(target) {
    return target === undefined || target === null
}

function nilEmpty(target) {
    return nil(target) || target === ""
}

function rmDir(...dir) {
    const dirs = dir.reduce((res, current) => {
        if (!fs.existsSync(current)) return res
        const children = fs.readdirSync(current)
        return [
            ...res,
            ...children.map(child => {
                return path.join(current, child)
            })
        ]
    }, [])
    rmPath(...dirs)
}

function rmPath(...dir) {
    for (const item of dir) {
        rimrafSync(item)
    }
}

function makeDefine(target) {
    return Object.assign(...Object.entries(target).map(current => {
        const [key, value] = current
        return { [key]: JSON.stringify(value) }
    }))
}

function makeDevtool() {
    switch (process.env.__MODE__) {
        case "development": return { devtool: "eval-cheap-module-source-map" }
        case "production": return { devtool: "nosources-source-map" }
        default: return {}
    }
}

module.exports = {
    ModeType,
    ConfigType,
    BuildType,
    makeConfig,
    makeEnv,
    nil,
    nilEmpty,
    rmDir,
    rmPath,
    makeDefine,
    makeDevtool
}