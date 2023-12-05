import path from "node:path"
import copy from "./copy"
import pkg from "./pkg"

const cwd = process.cwd()

function makeDirector(dir, project) {
    if (dir !== undefined) return dir
    return project.split("/").pop()
}

async function main(option) {
    const { dir, project, lib, ts, react, description, author } = option
    const localDir = makeDirector(dir, project)
    const projectPath = path.resolve(cwd, localDir)
    await copy({ lib, ts, react, director: projectPath })
    await pkg({ director: projectPath, project, description, author })
}

export default main