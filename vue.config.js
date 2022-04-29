module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 8083,
    proxy: {
      '': {
        target: 'http://127.0.0.1:8082',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
        }
      },
    }
  },
};
