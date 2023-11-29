import type { RouterContext } from "@koa/router"
import { renderToPipeableStream } from "react-dom/server"
import makeApp from "app"

async function home(ctx: RouterContext) {
    const App = await makeApp(ctx, {
        scripts: [
            "/assets/lib/runtime.js",
            "/assets/lib/react.js",
            "/assets/lib/util.js",
            "/assets/lib/index.js",
            "/assets/lib/home.js"
        ],
        links: [
            { href: "/assets/style/index.css" },
            { href: "/assets/style/home.css" }
        ]
    })
    const { pipe } = renderToPipeableStream(<App/>, {
        onShellReady: () => {
            pipe(ctx.res)
        }
    })
}

const routes = [
    { path: "/", controller: home }
]

export default routes as Route[]