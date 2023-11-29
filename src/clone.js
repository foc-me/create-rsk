import { spawn } from "node:child_process"

const { stdout } = process
const rskTemplate = "https://github.com/foc-me/rsk-template.git"

function makeBranch(option) {
    const { lib, ts, react } = option
    if (lib && ts) return "lib-ts"
    if (lib) return "lib"
    if (ts && react) return "koa-react-ts"
    if (react) return "koa-react"
    if (ts) return "koa-ts"
    return "koa"
}

function makeArgs(option) {
    const { lib, ts, react, director } = option
    return [
        "clone",
        rskTemplate,
        director,
        "-b",
        makeBranch({ lib, ts, react }),
        "--single-branch",
        "--progress"
    ]
}

function clone(option) {
    return new Promise((resolve, reject) => {
        const git = spawn("git", makeArgs(option))
        git.stderr.on("data", (chunk) => {
            const msg = chunk.toString("utf-8")
            if (msg.startsWith("Receiving objects")) {
                stdout.clearLine()
                stdout.cursorTo(0)
                stdout.write(msg)
            } else stdout.write(msg)
        })
        git.on("exit", (code) => {
            if (code === 0) resolve()
            else reject("clone rsk tempalte failed")
        })
    })
}

export default clone