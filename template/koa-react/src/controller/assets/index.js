import path from "node:path"
import fs from "node:fs"
import mime from "mime"
import module from "module/assets"

function makeUrl(url) {
    return url.split("?")[0]
}

async function controller(ctx) {
    const { originalUrl } = ctx
    const filePath = module.getOne(makeUrl(originalUrl))
    if (filePath) {
        const mimeType = mime.getType(path.extname(filePath))
        if (mimeType) {
            ctx.response.set("content-type", mimeType)
            ctx.body = fs.createReadStream(filePath)
        }
    }
}

export default [
    { path: "/assets/(.*)", controller, name: "assets" }
]