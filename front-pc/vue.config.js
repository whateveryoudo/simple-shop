const path = require('path');
const port = process.env.port || process.env.npm_config_port || 8081 // dev port



function resolve(dir){
    return path.join(__dirname,dir);
}
module.exports = {
    devServer : {
        port: port,
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                // target: `http://127.0.0.1:${port}/mock`,
                target: `http://127.0.0.1:7001`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        after: require('./mock/mock-server.js')
    },
    lintOnSave : false,
    configureWebpack : {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config){
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config
        // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

    }
}