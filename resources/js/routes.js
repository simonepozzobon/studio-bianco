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
        path: '/contact',
        name: 'contact',
        component: require('./views/Contact.vue')
    }
]

export default routes
