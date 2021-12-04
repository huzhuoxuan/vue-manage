module.exports = {
    devServer: {
      // 端口号
      port: 8080,
      // 配置不同的后台API地址
      proxy: {
        '/api': {
          target: 'https://cwtest.usth.pubs.net.cn/Rust',
          ws: false,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
    
  }
 