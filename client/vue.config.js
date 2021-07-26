const fs = require("fs");

module.exports = {
    configureWebpack: {
        optimization: {
            splitChunks: {
                // include all types of chunks
                chunks: "all"
            }
        },
        devServer: {
            https: {
                key: fs.readFileSync("../server.key"),
                cert: fs.readFileSync("../server.cert")
            },
            proxy: {
                "/api": {
                    target: "https://localhost:3000"
                }
            }
        }
    },
    css: {
        sourceMap: true,
        loaderOptions: {
            sass: {
                additionalData: `
            @import "@/scss/main.scss";
          `
            }
        }
    }
    // publicPath: process.env.NODE_ENV === "production" ? "/vue-chech/" : "/"
};
