import { lazy } from "react"
import { Suspense } from "component"

const Home = lazy(() => import(/* webpackChunkName: "home" */"./home"))

const routes = [
    { path: "/", element: <Suspense><Home/></Suspense> }
]

export default routes