module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                    target: "http://localhost:3000"
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
            @import "@/scss/main.scss";
          `
            }
        }
    },
    publicPath: process.env.NODE_ENV === "production" ? "/vue-chech/" : "/"
};
