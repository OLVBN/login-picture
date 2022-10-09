let path = require('path');
let HTMLWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: "none",
    entry: {
        "bundle-index": "./src/main-index.js",
        "bundle-mine": "./src/main-mine.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
                filename: "[name].js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" },
                ]
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         { loader: "html-loader" }
            //     ]
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new HTMLWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: "body",
            chunks: ['bundle-index']
        }),

        new HTMLWebPackPlugin({
            template: "./src/pages/mine.html",
            filename: "./pages/mine.html",
            inject: "body",
            chunks: ["bundle-mine"]
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/images",
                    to: "./images"
                }
            ]
        })
    ],
    devServer: {
        liveReload: true,
        hot: false,
        // 代理
        proxy: {
            "/Api": {
                target:  "http://8.129.109.224:3000/",
                pathRewrite: { '^/Api': '' },  
            }
        }
    },
   
}
