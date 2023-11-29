import fs from "node:fs"
import path from "node:path"

const cwd = process.cwd()
const dist = path.join(cwd, "dist")

function getOne(url) {
    for (const dir of [cwd, dist]) {
        const filePath = path.join(dir, url)
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            return filePath
        }
    }
}

export default { getOne }