const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    "configureWebpack": {
        "plugins": [
            new BundleAnalyzerPlugin({
                analyzerHost: "127.0.0.1",
                analyzerPort: 8081
            })
        ]
    }
}
