const HTMLWebpackPlugin = require('html-webpack-plugin');

let HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/client/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: __dirname + '/client/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: 'transformed.js',
        path: __dirname + '/build'
    },
    plugins: [HTMLWebpackPluginConfig],
    node: {
        console: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      }
};