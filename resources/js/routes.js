const routes = [
    {
        path: '/',
        name: 'home',
        component: require('./views/Home.vue').default
    },
    {
        path: '/about',
        name: 'about',
        component: require('./views/About.vue').default
    },
    {
        path: '/prima-e-dopo',
        name: 'primaedopo',
        alias: 'galleria',
        component: require('./views/PrimaEDopo.vue').default
    },
    {
        path: '/odontoiatria',
        name: 'odontoiatria',
        component: require('./views/Odontoiatria.vue').default,
        children: [
            {
                path: ':slug',
                name: 'odontoiatria-accordion',
                component: require('./views/Odontoiatria.vue').default,
            }
        ]
    },
    {
        path: '/medicina-estetica',
        name: 'medicinaestetica',
        component: require('./views/Estetica.vue').default,
        children: [
            {
                path: ':slug',
                name: 'medicinaestetica-accordion',
                component: require('./views/Estetica.vue').default,
            }
        ]
    },
    {
        path: '/contatti',
        alias: '/contact',
        name: 'contact',
        component: require('./views/Contact.vue').default
    },
    {
        path: '/privacy',
        alias: '/cookies',
        name: 'privacy',
        component: require('./views/CookiesPolicy.vue').default
    }
]

export default routes
