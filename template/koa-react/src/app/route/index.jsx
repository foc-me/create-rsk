import { Suspense } from "component"
import Home from "view/home"

const routes = [
    { path: "/", element: <Suspense><Home/></Suspense> },
]

export default routes