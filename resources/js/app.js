
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import VueRouter from 'vue-router'
import MainTemplate from './containers/MainTemplate.vue'
import routes from './routes'
import Cookie from './Cookies'
import checkView from 'vue-check-view'

if (process.env.NODE_ENV == 'production') {
    Sentry.init({
        dsn: 'https://3ed042c3491243f6a922b9f5ee4e949f@sentry.io/1419615',
        integrations: [new Sentry.Integrations.Vue({
            Vue,
            attachProps: true
        })]
    })
}

Vue.use(VueRouter)
Vue.use(checkView)
Vue.prototype.$cookie = Cookie

const router = new VueRouter({
    mode: 'history',
    dir: __dirname,
    routes: routes,
})

const app = new Vue({
    router,
    components: {
        MainTemplate,
    },
    data: function() {
        return {
            baseUrl: process.env.MIX_APP_URL,
            window: {
                w: 0,
                h: 0,
            },
            navbarHeight: 0,
            navbarFullHeight: 0,
            navColor: 1,
            hasFooter: false,
            homepage: null,
            estetica: null,
            odontoiatria: null,
            comparisons: null,
            isMobile: false,
            isDesktop: false,
            initialized: false,
            swiperInitialized: false,
            animationsReady: false,
            animations: {
                contatti: null,
                dente: null,
                scultura_home: null,
                dente_home: null,
                quadri_medicina_estetica: null,
                silvia_illust: null,
                strumenti: null,
                studio: null,
                silvia: null
            },
        }
    },
    methods: {
        getWindowSize: function() {
            this.window = {
                w: window.innerWidth,
                h: window.innerHeight
            }

            if (this.window.w >= 992) {
                this.isMobile = false
                this.isDesktop = true
            } else {
                this.isMobile = true
                this.isDesktop = false
            }
        },
        loadAnimations: function() {
            let counter = Object.keys(this.animations).length
            for (let key in this.animations) {
                if (this.animations.hasOwnProperty(key)) {
                    let url = window.location.origin + '/js/anims/' + key + '.json'
                    // request
                    axios.get(url).then(response => {
                        this.animations[key] = response.data
                        counter--
                        if (counter == 0) {
                            this.animationsReady = true
                        }
                    })
                }
            }
        }
    },
    created: function() {
        this.loadAnimations()
    },
    mounted: function() {
        this.getWindowSize()

        window.addEventListener('resize', () => {
            this.getWindowSize()
        })
    }
}).$mount('#app');
