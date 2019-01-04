const routes = [
    {
        path: '/',
        name: 'home',
        alias: '/home',
        component: require('./views/Home.vue')
    },
    {
        path: '/servizi/:category',
        name: 'servizi',
        component: require('./views/Servizi.vue')
    },
]

export default routes
