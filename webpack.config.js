const path = require('path');
// import * as path from 'path';

const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'assets/js');

module.exports = {
    entry: path.resolve(SRC_DIR, 'App.js'),
    output: {
      filename: 'bundle.js',
      path: BUILD_DIR,
      publicPath: '/'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    }
};