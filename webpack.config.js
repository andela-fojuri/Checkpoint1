var LiveReloadPlugin = require('webpack-livereload-plugin');
module.exports = {
     entry: './jasmine/spec/inverted-index-test.js',
     output: {
         path: './bin',
         filename: 'app.bundle.js'
     },
     plugins: [
        new LiveReloadPlugin(options)
    ],
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     },
     
 };