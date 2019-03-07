
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import MainTemplate from './containers/MainTemplate.vue'
import routes from './routes'
import Cookie from './Cookies'
import checkView from 'vue-check-view'

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
        }
    },
    mounted: function() {
        this.getWindowSize()

        window.addEventListener('resize', () => {
            this.getWindowSize()
        })
    }
}).$mount('#app');
