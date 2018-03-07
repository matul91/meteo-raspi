let mix = require('laravel-mix');
let webpack = require("webpack");

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

mix.react('resources/assets/js/src/App.tsx', 'public/js')
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
        },
        output: {
            chunkFilename: 'js/[name].[chunkhash].js',
            publicPath: '/',
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /cs/)
        ]
    })
    .extract(['react', 'redux', 'axios', 'recharts', 'moment']);

if (mix.inProduction()) {
    mix.version();
}
