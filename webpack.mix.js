let mix = require('laravel-mix');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/src/services/firebase.ts', 'public/js')
    .react('resources/assets/js/src/App.tsx', 'public/js')
    .sass('resources/assets/sass/app.sass', 'public/css')
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
            },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, './resources/assets/js/src'),
            ]
        },
        output: {
            chunkFilename: 'js/[name].[chunkhash].js',
            publicPath: '/',
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /cs/),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$|\.svg$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new SWPrecacheWebpackPlugin(
                {
                    cacheId: 'myapp',
                    filename: 'firebase-messaging-sw.js',
                    maximumFileSizeToCacheInBytes: 4194304,
                    dontCacheBustUrlsMatching: /\.\w{8}\./,
                    minify: false,
                    importScripts: [
                        'js/vendor.js',
                        'js/firebase.js'
                    ]
                }
            )
        ]
    })
    .copy('resources/assets/images', 'public/images', false)
    .extract(['react', 'redux', 'axios', 'recharts', 'moment', 'react-bootstrap', 'react-router-bootstrap', 'firebase']);

if (mix.inProduction()) {
    mix.version();
}
