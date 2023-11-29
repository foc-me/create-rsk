import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import routes from "./route"
import "./index.css"

function App() {
    const router = createBrowserRouter(routes)
    return <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
}

const root = document.getElementById("root")
if (root) {
    if (__APP__ === "client") {
        hydrateRoot(root, <App/>)
    } else {
        const reactRoot = createRoot(root)
        reactRoot.render(<App/>)
    }
}