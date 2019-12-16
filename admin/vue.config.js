module.exports = {
  devServer: {
    proxy: {
      '/api/': {
        target: process.env.VUE_APP_PROXY,
        secure: false
      },
      '/static': {
        target: process.env.VUE_APP_PROXY,
        secure: false
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production'
}
