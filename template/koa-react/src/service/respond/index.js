function respond(router) {
    return async (ctx, next) => {
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