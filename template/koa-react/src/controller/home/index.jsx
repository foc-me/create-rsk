import { renderToPipeableStream } from "react-dom/server"
import makeApp from "app"

async function home(ctx) {
    const App = await makeApp(ctx, {
        scripts: [
            { src: "/assets/lib/runtime.js" },
            { src: "/assets/lib/react.js" },
            { src: "/assets/lib/util.js" },
            { src: "/assets/lib/index.js" },
            { src: "/assets/lib/home.js" }
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

export default routes