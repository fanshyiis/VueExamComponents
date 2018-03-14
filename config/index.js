// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var packageJSON = require('../package.json')
var env = require('./prod.env')

var buildPath = path.join(__dirname, '../dist')

module.exports = {
  build: {
    env: env,
    index: path.resolve(buildPath, 'index.html'),
    assetsRoot: buildPath,
    assetsSubDirectory: 'static',
    assetsPublicPath: `https://${env.OSS_BUCKET}.oss-cn-beijing.aliyuncs.com/er-collect/`,
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/graphqlClass": {
        target: 'http://test.intr.koalareading.com:8100',
        changeOrigin: true,
        pathRewrite: {
          '^/graphqlClass': ''
        }
      },
      "/graphql": {
        target: 'http://test.intr.koalareading.com/tasks/graphql',
        changeOrigin: true
      },
      "/fileupload": {
        target: 'http://test.intr.koalareading.com',
        changeOrigin: true
      },
      "/api": {
        target: 'http://test.intr.koalareading.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
