const routes = [
    {
        path: '/',
        name: 'home',
        component: require('./views/Home.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: require('./views/About.vue')
    },
    {
        path: '/prima-e-dopo',
        name: 'primaedopo',
        alias: 'galleria',
        component: require('./views/PrimaEDopo.vue')
    },
    {
        path: '/odontoiatria',
        name: 'odontoiatria',
        component: require('./views/Odontoiatria.vue')
    },
    {
        path: '/medicina-estetica',
        name: 'medicinaestetica',
        component: require('./views/Estetica.vue')
    },
    {
        path: '/contatti',
        alias: '/contact',
        name: 'contact',
        component: require('./views/Contact.vue')
    },
    {
        path: '/privacy',
        alias: '/cookies',
        name: 'privacy',
        component: require('./views/CookiesPolicy.vue')
    }
]

export default routes
