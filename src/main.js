import path from "node:path"
import copy from "./copy"
import pkg from "./pkg"

const cwd = process.cwd()

async function main(option) {
    const { dir, project, lib, ts, react, description, author } = option
    const projectPath = path.resolve(cwd, dir)
    await copy({ lib, ts, react, director: projectPath })
    await pkg({ director: projectPath, project, description, author })
}

export default main