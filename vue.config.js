module.exports = {
  configureWebpack: {
    resolve: {
      //alias 配置别名
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'common': '@/common',
      }
    },
  },
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:4000', //API服务器的地址
        // ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          '^/api': '' //需要rewrite的,
        }
      }
    }
  },
  lintOnSave: false,
  productionSourceMap: false,
}