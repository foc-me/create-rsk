import readline from "node:readline/promises"

const { stdin: input, stdout: output } = process
const rl = readline.createInterface({ input, output })

function ask(message) {
    return rl.question(message)
}

function yes(message) {
    return ask(message).then(res => {
        const lowerRes = res.toLowerCase()
        return ["y", "yes"].includes(lowerRes) || /^y+$/g.test(lowerRes)
    })
}

export { ask, yes }