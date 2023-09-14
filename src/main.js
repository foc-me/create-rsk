import fs from "node:fs"
import path from "node:path"
import clone from "./clone"
import pkg from "./pkg"

const cwd = process.cwd()

function makePath(project) {
    if (project === undefined || project === "") {
        throw new Error(`set a project name`)
    }
    const director = project.split("/").pop()
    const directorPath = path.join(cwd, director)
    if (fs.existsSync(directorPath) && fs.statSync(directorPath).isDirectory()) {
        throw new Error(`"${directorPath}" already exists`)
    }
    return [director, directorPath]
}

async function main(option) {
    const { project, ts, react, description, author } = option
    const [director, directorPath] = makePath(project)
    await clone({ ts, react, director })
    await pkg({ directorPath, project, description, author })
}

export default main