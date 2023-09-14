import createArgv from "@focme/argv"
import { ask, yes } from "./ask"
import main from "./main"

async function rsk() {
    const option = createArgv().opt()
    let { _: [project] = [], ts, react } = option
    try {
        if (project === undefined) project = await ask("project name: ")
        if (ts === undefined) ts = await yes("use typescript? (y/n): ")
        if (react === undefined) react = await yes("use react? (y/n): ")
        const description = await ask("project description: ")
        const author = await ask("project author: ")
        await main({ project, ts, react, description, author })
        process.stdout.write("done")
        process.exit(0)
    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}

rsk()