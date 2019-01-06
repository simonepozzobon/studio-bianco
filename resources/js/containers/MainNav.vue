<template lang="html">
    <nav class="navbar navbar-light navbar-expand-lg" ref="navbar" :class="this.navClass">
        <a class="navbar-brand" href="#" ref="brand">
            <!-- <nav-logo :width="214"  ref="logo"/> -->
            <nav-logo :width="this.logoSize"  ref="logo"/>
        </a>

        <div class="d-lg-none position-relative">
            <burger :width="burgerSize" @toggle-mobile="toggleMobile"/>
        </div>

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
import { Burger, NavLogo } from '../ui'

export default {
    name: 'MainNav',
    components: {
        Burger,
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
        '$root.window.w': function(w) {
            this.setNavbarHeight()

            if (w == 0 || w <= 576) {
                // smartphone
                this.logoSize = 83
                this.burgerSize = 40
            } else if (w > 576 || w <= 992) {
                // tablet
                this.logoSize = 171
                this.burgerSize = 80
            } else {
                this.logoSize = 128
            }
        }
    },
    data: function() {
        return {
            burgerSize: 40,
            logoSize: 128,
            navClass: 'bg-light',
        }
    },
    methods: {
        setNavbarHeight: function() {
            this.$root.navbarHeight = this.$refs.navbar.offsetHeight
            let el = this.$refs.logo.$refs.logo
            let elSize = el.getBoundingClientRect()
            this.$root.navbarFullHeight = elSize.height
        },
        toggleMobile: function() {
            this.$emit('toggle-mobile')
        }
    },
    mounted: function() {
        this.setNavbarHeight()
    }
}
</script>

<style lang="scss">
@import '~styles/shared';
.navbar {
    // min-height: 112px;
    min-height: 60px;
    height: 60px;
    z-index: 9999;

    @include media-breakpoint-down('md') {
        min-height: 90px;
        height: 90px;
    }

    @include media-breakpoint-down('xs') {
        min-height: 43px;
        height: 43px;
    }

    transition: $transition-base;

    .nav-link {
        font-weight: normal;
    }
}
</style>
