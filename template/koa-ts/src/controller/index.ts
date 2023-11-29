import type KoaRouter from "@koa/router"
import assets from "./assets"
import home from "./home"

const routes = [
    ...assets,
    ...home
]

function apply(router: KoaRouter) {
    for (const route of routes) {
        const { method, path, controller, name } = route
        const routeMethod = Array.isArray(method) ? method : [method || "get"]
        const option = name ? { name } : undefined
        router.register(path, routeMethod, controller, option)
    }
}

export default { apply }