import {
    createStaticHandler,
    createStaticRouter,
    StaticRouterProvider
} from "react-router-dom/server"
import App from "./app"
import routes from "./route"

async function makeApp(ctx, props = {}) {
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