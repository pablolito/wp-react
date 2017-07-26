var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/js/main.js', './src/sass/main.scss'],
    /*devtool: '#inline-source-map',*/
    output: {
        //path: path.resolve(__dirname, 'dist'),
        filename: 'dist/bundle.js'
    },
    /*devServer: {
        historyApiFallback: true,
        port: 8090
    },*/
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This tells the Webpack and Babel for optimization for performance
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin(), // Makes sure Webpack will not compile if Errors
    new ExtractTextPlugin({ // define where to save the file
      filename: 'dist/[name].bundle.css',
      allChunks: true,
    }),
  ]
};