import type { Context } from "koa"
import type { FC } from "react"
import {
    createStaticHandler,
    createStaticRouter,
    StaticRouterProvider
} from "react-router-dom/server"
import App, { type Props } from "./app"
import routes from "./route"

async function makeApp(ctx: Context, props: Props = {}): Promise<FC<Props>> {
    const { originalUrl } = ctx
    const request = new Request(`http://,,Ծ‸Ծ,,${originalUrl}`)
    const handler = createStaticHandler(routes)
    const context = await handler.query(request)

    if (context instanceof Response) {
        throw context
    }

    const router = createStaticRouter(handler.dataRoutes, context)

    return () => {
        return <App {...props}>
            <StaticRouterProvider router={router} context={context}/>
        </App>
    }
}

export default makeApp