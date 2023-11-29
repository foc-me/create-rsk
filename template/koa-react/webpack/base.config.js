const path = require("path")

module.exports = {
    resolve: {
        extensions: [".js", ".jsx", ".css"],
        alias: {
            "assets": path.resolve(__dirname, "../assets"),
            "app": path.resolve(__dirname, "../src/app"),
            "component": path.resolve(__dirname, "../src/component"),
            "controller": path.resolve(__dirname, "../src/controller"),
            "module": path.resolve(__dirname, "../src/module"),
            "service": path.resolve(__dirname, "../src/service"),
            "view": path.resolve(__dirname, "../src/view")
        }
    }
}