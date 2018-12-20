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
    }
]

export default routes
