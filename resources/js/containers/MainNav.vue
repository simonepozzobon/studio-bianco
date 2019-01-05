<template lang="html">
    <nav class="navbar navbar-light navbar-expand-md" ref="navbar" :class="this.navClass">
        <a class="navbar-brand" href="#">
            <!-- <nav-logo :width="214"  ref="logo"/> -->
            <nav-logo :width="148"  ref="logo"/>
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link tag="a" class="nav-link" :to="{ path: '/' }" exact-active-class="active">
                        Home
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link tag="a" class="nav-link" :to="{ path: '/odontoiatria' }" exact-active-class="active" ref="odontoiatria">
                        Odontoiatria
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link tag="a" class="nav-link" :to="{ path: '/medicina-estetica' }" exact-active-class="active" ref="estetica">
                        Medicina estetica
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link tag="a" class="nav-link" :to="{ path: '/about' }" exact-active-class="active">
                        About
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link tag="a" class="nav-link" :to="{ path: '/contatti' }" exact-active-class="active">
                        Contatti
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { NavLogo } from '../ui'

export default {
    name: 'MainNav',
    components: {
        NavLogo,
    },
    props: {
        color: {
            type: Number,
            default: 1,
        }
    },
    watch: {
        '$root.navColor': function(value) {
            switch (value) {
                case 1:
                    this.navClass = 'bg-light'
                    break;
                case 2:
                    this.navClass = 'bg-pink'
                    break;
                default:
                    this.navClass = 'bg-light'
            }
        },
        // '$root.homepage': function(value) {
        //     let currents = null
        //
        //     switch (value) {
        //         case 'odontoiatria':
        //             currents = document.getElementsByClassName('router-link-active')
        //             this.removeActive(currents)
        //             this.$refs.odontoiatria.$el.classList.add('active')
        //             break;
        //         case 'estetica':
        //             currents = document.getElementsByClassName('router-link-active')
        //             this.removeActive(currents)
        //             this.$refs.estetica.$el.classList.add('active')
        //             break;
        //     }
        // }
    },
    data: function() {
        return {
            navClass: 'bg-light'
        }
    },
    methods: {
        // removeActive: function(currents) {
        //     for (var i = 0; i < currents.length; i++) {
        //         currents[i].classList.remove('active')
        //         currents[i].classList.remove('route-link-active')
        //     }
        // }
    },
    mounted: function() {
        this.$root.navbarHeight = this.$refs.navbar.offsetHeight
        let el = this.$refs.logo.$refs.logo
        let elSize = el.getBoundingClientRect()
        this.$root.navbarFullHeight = elSize.height
    }
}
</script>

<style lang="scss">
@import '~styles/shared';
.navbar {
    // min-height: 112px;
    min-height: 90px;
    z-index: 9999;

    .nav-link {
        font-weight: normal;
    }
}
</style>
