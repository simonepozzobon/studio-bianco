const mix = require('laravel-mix');

if (process.env.section) {
    require(path.resolve(__dirname)+`/webpack.${process.env.section}.mix.js`)
}
