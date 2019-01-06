<template lang="html">
    <div class="mobile-nav">
        <ul class="list-unstyled">
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/' }" exact-active-class="active">
                    home
                </router-link>
            </li>
            <li>
                <home-horizontal-sep width="25px" color="#fbfaef"/>
            </li>
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/odontoiatria' }" exact-active-class="active">
                    odontoiatria
                </router-link>
            </li>
            <li>
                <home-horizontal-sep width="25px" color="#fbfaef"/>
            </li>
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/medicina-estetica' }" exact-active-class="active">
                    medicina estetica
                </router-link>
            </li>
            <li>
                <home-horizontal-sep width="25px" color="#fbfaef"/>
            </li>
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/about' }" exact-active-class="active">
                    about
                </router-link>
            </li>
            <li>
                <home-horizontal-sep width="25px" color="#fbfaef"/>
            </li>
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/contatti' }" exact-active-class="active">
                    contatti
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import HomeHorizontalSep from '../components/HomeHorizontalSep.vue'

export default {
    name: 'MobileNav',
    components: {
        HomeHorizontalSep,
    },
    data: function() {
        return {
            isOpen: false,
        }
    },
    methods: {

    },
    mounted: function() {

    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.mobile-nav {
    position: absolute;
    width: 100vw;
    min-height: 100vh;
    background-color: $light-cyan;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    // position: relative;
    visibility: hidden; /* hides all .Tile-flyout on load so GSAP autoAlpha can do its thing */
    height: auto; /* tell the browser that initial height is auto */
    overflow: hidden;

    ul {
        text-align: center;

        li {
            .mobile-nav-link {
                font-size: 1.5rem;
                font-weight: bold;
            }
        }

    }
}
</style>
