import fs from "node:fs"
import path from "node:path"
import { ask, yes } from "./ask"

const { stdout: output } = process
const templateHome = path.resolve(__dirname, "../template")

function makeTemplate(option) {
    const { lib, ts, react } = option
    if (lib && ts) return "lib-ts"
    if (lib) return "lib"
    if (ts && react) return "koa-react-ts"
    if (react) return "koa-react"
    if (ts) return "koa-ts"
    return "koa"
}

async function createDirector(director, ask = true) {
    if (fs.existsSync(director) && fs.statSync(director).isDirectory()) {
        if (!ask) return
        const result = await yes(`${director} already exist. continue? (y/n): `)
        if (!result) {
            output.write("stop create")
            process.exit(0)
        }
    }
    fs.mkdirSync(director, { recursive: true })
}

function makeTemplateFiles(itemPath) {
    const result = []
    for (const item of fs.readdirSync(itemPath)) {
        const stat = fs.statSync(path.resolve(itemPath, item))
        if (stat.isFile()) result.push(item)
        if (stat.isDirectory()) {
            const next = makeTemplateFiles(path.resolve(itemPath, item))
            result.push(...next.map(nextItem => {
                if (Array.isArray(nextItem)) {
                    return [nextItem[0], [item, ...nextItem[1]]]
                }
                return [nextItem, [item]]
            }))
        }
    }
    return result
}

async function copyFile(files, target) {
    const count = files.length
    let replace = undefined
    let current = 0
    for (const [name, [template, ...dir]] of files) {
        const originItemPath = path.resolve(templateHome, template, ...dir, name)
        
        const targetPath = path.resolve(target, ...dir)
        const targetItemPath = path.resolve(targetPath, name)
        await createDirector(targetPath, false)

        const exist = fs.existsSync(targetItemPath)
        if (exist && fs.statSync(targetItemPath).isFile()) {
            if (!["replace-all", "skip-all"].includes(replace)) {
                const result = await ask(`file '${targetItemPath}' already exist. \nreplace file? (r: replace / ra: replace all / s: skip / sa: skip all): `)
                if (result === "r") replace = "replace"
                if (result === "ra") replace = "replace-all"
                if (result === "s") replace = "skip"
                if (result === "sa") replace = "skip-all"
            }
        }
        if (!exist || ["replace", "replace-all"].includes(replace)) {
            fs.copyFileSync(originItemPath, targetItemPath)
        }
        output.clearLine(0)
        output.cursorTo(0)
        output.write(`[${++current}/${count}] ${targetItemPath}`)
        await new Promise(resolve => {
            setTimeout(() => resolve(), 10)
        })
    }
    output.clearLine(0)
    output.cursorTo(0)
    output.write(`\n`)
}

async function copy(option) {
    const { director } = option
    await createDirector(director)

    const template = makeTemplate(option)
    const templatePath = path.resolve(templateHome, template)
    const templateFiles = makeTemplateFiles(templatePath).map(item => {
        if (Array.isArray(item)) {
            return [item[0], [template, ...item[1]]]
        }
        return [item, [template]]
    })
    await copyFile(templateFiles, director)
}

export default copy