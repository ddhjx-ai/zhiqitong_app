// vue.config.js
module.exports = {
  baseUrl: '',
  devServer: {
    port: 3303,
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target : 'http://139.159.144.119',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/variables.scss"; @import "@/assets/scss/mixin.scss";` // 向所有 Sass 样式传入共享的全局变量
      }
    }
  }
}