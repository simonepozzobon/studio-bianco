const mix = require('laravel-mix')
require('laravel-mix-purgecss')

mix
    .setPublicPath(path.normalize('public/backend'))
    .options({
        processCssUrls: false
    })
    .js('resources/js/admin/admin.js', 'admin.js')
    // .sass('resources/sass/app.scss', 'public/css')
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
            },
            // module: {
            //     rules: [
            //         {
            //             { test: /\.vue$/, loader: 'vue-loader' },
            //             { test: /\.vue\.html$/, loader: 'vue-loader' }
            //         }
            //     ]
            // }
        }
    })
    .browserSync({
        proxy: 'http://studio-bianco.test',
        browser: 'google chrome',
        port: 3010,
        files: [
            'public/**/*',
            'resources/**/*',
            'app/**/*',
            'config/**/*'
        ]
    })
