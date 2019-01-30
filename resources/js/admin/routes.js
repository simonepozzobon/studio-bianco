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
    {
        path: '/prima-e-dopo',
        name: 'prima-e-dopo',
        component: require('./views/PrimaEDopo.vue')
    },
]

export default routes
