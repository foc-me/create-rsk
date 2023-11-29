async function home(ctx) {
    ctx.body = "hello home"
}

const routes = [
    { path: "/", controller: home }
]

export default routes