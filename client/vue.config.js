module.exports = {
    configureWebpack: {
        optimization: {
            splitChunks: {
                // include all types of chunks
                chunks: "all"
            }
        },
        devServer: {
            proxy: {
                "/api": {
                    target: "http://localhost:3000"
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
