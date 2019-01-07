const mix = require('laravel-mix');

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

mix
    .js('resources/js/admin/admin.js', 'public/js')
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig(webpack => {
        return {
            resolve: {
                alias: {
                    'styles': path.resolve(__dirname, 'resources/sass'),
                    'TweenLite': path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
                    'TweenMax': path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
                    'TimelineLite': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
                    'TimelineMax': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
                    'ScrollMagic': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
                    'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
                    'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
                }
            }
        }
    })
    .browserSync({
        proxy: 'http://studio-bianco.test:89',
        browser: 'google chrome',
        port: 3010,
        files: [
            'public/**/*',
            'resources/**/*',
            'app/**/*',
            'config/**/*'
        ]
    })
