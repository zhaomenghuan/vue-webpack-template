const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const vendorCSS = new ExtractTextPlugin('css/vendor.css');
const appCSS = new ExtractTextPlugin('css/app.css');

module.exports = {
    entry: {
        "app": './src/main.js',
        "vendor": ['vue'{{#router}}, 'vue-router'{{/router}}{{#vuex}}, 'vuex'{{/vuex}}]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.vue|js$/,
                enforce: 'pre',
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                }]
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: appCSS.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: vendorCSS.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, 'src')
        },
        extensions: ['.js', '.json', '.vue', '.css']
    },
    performance: {
        hints: false
    },
    devtool: (process.env.NODE_ENV === 'production') ? '#source-map' : false,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        vendorCSS,
        appCSS
    ]
};

if (process.env.NODE_ENV === 'development') {
    module.exports.devServer = {
        historyApiFallback: true,
        hot: true,
        inline: true
    };
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin()
    ])
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new CleanWebpackPlugin(['dist'])
    ])
}
