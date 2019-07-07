import Home from './views/Home.vue'
import Servizi from './views/Servizi.vue'
import PrimaEDopo from './views/PrimaEDopo.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        alias: '/home',
        component: Home,
    },
    {
        path: '/servizi/:category',
        name: 'servizi',
        component: Servizi,
    },
    {
        path: '/prima-e-dopo',
        name: 'prima-e-dopo',
        component: PrimaEDopo,
    },
]

export default routes
