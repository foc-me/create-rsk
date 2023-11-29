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
    const { director, project, description, author } = option
    const pkgPath = path.join(director, "package.json")
    const content = Object.assign(makePkg(pkgPath), {
        name: project,
        description,
        author
    })
    fs.writeFileSync(pkgPath, stringify(content))
}

export default pkg