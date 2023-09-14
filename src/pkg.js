import fs from "node:fs"
import path from "node:path"
import stringify from "@focme/stringify-json"

function makePkg(pkgPath) {
    if (fs.existsSync(pkgPath)) {
        const stat = fs.statSync(pkgPath)
        if (stat.isFile()) {
            try {
                return JSON.parse(fs.readFileSync(pkgPath))
            } catch(error) {
                throw error
            }
        }
    }
}

async function pkg(option) {
    const { directorPath, project, description, author } = option
    const pkgPath = path.join(directorPath, "package.json")
    const gitPath = path.join(directorPath, ".git")
    const content = Object.assign(makePkg(pkgPath), {
        name: project,
        description,
        author
    })
    fs.writeFileSync(pkgPath, stringify(content))
    fs.rmSync(gitPath, { recursive: true, force: true })
}

export default pkg