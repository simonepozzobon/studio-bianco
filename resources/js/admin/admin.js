require ('../bootstrap')

import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import wysiwyg from 'vue-wysiwyg'
Vue.use(wysiwyg, {
    hideModules: {
        "justifyLeft": true,
        "justifyRight": true,
        "justifyCenter": true,
        "link": true,
        "code": true,
        "orderedList": true,
        // "headings": true,
        // "unorderedList": true,
        "image": true,
        "table": true,
        // "removeFormat": true,
        "separator": true,
    },
    forcePlainTextOnPaste: true
})

import routes from './routes'
Vue.use(VueRouter)

import axios from 'axios'
Vue.prototype.$http = axios

const router = new VueRouter({
    mode: 'history',
    dir: __dirname,
    routes: routes,
    base: '/admin'
})

import MainTemplate from './containers/MainTemplate.vue'
const admin = new Vue({
    router,
    components: {
        MainTemplate
    },
}).$mount('#admin')
