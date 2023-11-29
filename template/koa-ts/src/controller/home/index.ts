import type { RouterContext } from "@koa/router"

async function home(ctx: RouterContext) {
    ctx.body = "hello home"
}

const routes = [
    { path: "/", controller: home }
]

export default routes as Route[]