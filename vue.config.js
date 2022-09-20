const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 项目打包出现白屏
  // publicPath:'./',
  devServer: {
    port: 8888,
    host: 'localhost',
    open: true,
    https: false,
    proxy: {
      // /dev-api 代理名称 process.env.VUE_APP_BASE_API === "/dev-api"
      // [process.env.VUE_APP_BASE_API] : {
      //   target: process.env.VUE_APP_SERVICE_URL,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ["^" + process.env.VUE_APP_BASE_API]: ""
      //   }
      // }
      [process.env.VUE_APP_BASE_API] : {
        target : "http://localhost:3000",
        changeOrigin : true,
        pathRewrite : {
          ["^" + process.env.VUE_APP_BASE_API] : ''
        }
      }
      // "/dev-api":{
      //   target:"http://localhost:3000",
      //   changeOrigin:true,
      //   pathRewrite:{
      //     "^/dev-api":''
      //   }
      // }
    }
  },
  lintOnSave: false
});
