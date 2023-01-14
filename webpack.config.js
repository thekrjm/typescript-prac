const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require("path");

const prod = process.env.NODE_ENV === "production";
module.exports ={
        mode: prod ? "production" : "development",
        devtool: prod ? "hidden-source-map" : "eval",
        entry: "./src/index.tsx",
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ["babel-loader", "ts-loader"],
                },
            ],
        },
        output: {
            path: path.join(__dirname, "/dist"),
            filename: "bundle.js",
        },
        optimization:{
            minimize:false
        },
        plugins: [
            new webpack.ProvidePlugin({
                React: "react",
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
        devServer:{
            historyApiFallback:true,
            port: 3000,
            hot: true,
            proxy:{
                '/api':'domain.com'
            }
        },
    };