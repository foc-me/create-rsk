import type { Context, Next } from "koa"
import type KoaRouter from "@koa/router"

function respond(router: KoaRouter) {
    return async (ctx: Context, next: Next) => {
        const { originalUrl, method } = ctx
        const { pathAndMethod } = router.match(originalUrl, method)
        const assets = pathAndMethod.filter(item => {
            return item.name === "assets"
        })
        if (assets.length < 1 && pathAndMethod.length > 0) {
            ctx.res.statusCode = 200
            ctx.respond = false
        }
        await next()
    }
}

export default respond