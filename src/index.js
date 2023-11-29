import createArgv from "@focme/argv"
import { ask, yes } from "./ask"
import main from "./main"

async function rsk() {
    const option = createArgv().opt()
    let { _: [dir, project] = [], ts, react, lib } = option
    try {
        if (!project) {
            project = dir
            dir = "./"
        }
        if (project === undefined) project = await ask("project name: ")
        if (lib === undefined) {
            if (react === undefined) react = await yes("use react? (y/n): ")
        }
        if (ts === undefined) ts = await yes("use typescript? (y/n): ")
        const description = await ask("project description: ")
        const author = await ask("project author: ")
        await main({ dir, project, lib, ts, react, description, author })
        process.stdout.write("done")
        process.exit(0)
    } catch(error) {
        console.error(error)
        process.exit(1)
    }
}

rsk()