import Koa from "koa"
import KoaRouter from "@koa/router"
import cors from "@koa/cors"
import chalk from "chalk"
import { createTimer, createDater } from "@focme/rsk-util"
import contoller from "./controller"
import { respond } from "./service"

function date() {
    const dater = createDater(new Date())
    return dater.format("[YYYY-MM-DD HH:mm:ss:SSS]")
}

function makeExit(callback?: () => void) {
    process.stdin.resume()
    const timer = createTimer()
    process.on("exit", (code) => {
        timer.check()
        if (callback) callback()
        console.log(chalk.green(`${date()} receive exit code "${code}`))
        console.log(chalk.green(`${date()} process stop after ${timer.format("ddd hhh sss")}`))
    })
    const processEvents = ["SIGINT", "SIGUSR1", "SIGUSR2", "uncaughtException"]
    processEvents.forEach(eventType => {
        process.on(eventType, (event) => {
            console.log(chalk.red(`${date()} ${eventType}:`))
            console.log(chalk.red(`${date()} ${event}:`))
            if (typeof event !== "string") console.log(event)
            process.exit()
        })
    })
}

function main() {
    const app = new Koa()
    const router = new KoaRouter()
    contoller.apply(router)
    app.use(respond(router))
    app.use(cors())
    app.use(router.routes())
    app.use(router.allowedMethods())

    makeExit()

    app.listen(__PORT__)
    console.log(chalk.green(`${date()} now service on port ${__PORT__}`))
}

main()