<template lang="html">
    <div class="mobile-nav" ref="container">
        <ul class="list-unstyled">
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/' }" exact-active-class="active" @click.native="toggleMobile">
                    home
                </router-link>
            </li>
            <li>
                <home-horizontal-sep width="25px" color="#fbfaef"/>
            </li>
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/odontoiatria' }" exact-active-class="active" @click.native="toggleMobile">
                    odontoiatria
                </router-link>
            </li>
            <li>
                <home-horizontal-sep width="25px" color="#fbfaef"/>
            </li>
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/medicina-estetica' }" exact-active-class="active" @click.native="toggleMobile">
                    medicina estetica
                </router-link>
            </li>
            <li>
                <home-horizontal-sep width="25px" color="#fbfaef"/>
            </li>
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/about' }" exact-active-class="active" @click.native="toggleMobile">
                    about
                </router-link>
            </li>
            <li>
                <home-horizontal-sep width="25px" color="#fbfaef"/>
            </li>
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/contatti' }" exact-active-class="active" @click.native="toggleMobile">
                    contatti
                </router-link>
            </li>
            <li>
                <home-horizontal-sep width="25px" color="#fbfaef"/>
            </li>
            <li>
                <router-link tag="a" class="mobile-nav-link" :to="{ path: '/prima-e-dopo' }" exact-active-class="active" @click.native="toggleMobile">
                    prima e dopo
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import HomeHorizontalSep from '../components/HomeHorizontalSep.vue'
import { TweenMax } from 'gsap'

export default {
    name: 'MobileNav',
    components: {
        HomeHorizontalSep,
    },
    data: function() {
        return {
            isOpen: false,
            master: null,
            height: 0,
        }
    },
    watch: {
        '$root.window.w': function(w) {
            if (w > 992) {
                this.$refs.container.style.display = 'none'
            }
        }
    },
    methods: {
        goTo: function(path) {
            this.$router.push(path)
        },
        toggleMobile: function() {
            let container = this.$refs.container
            let height = container.offsetHeight

            if (!this.isOpen) {
                let master = new TimelineMax({
                    paused: true,
                })

                master.set(container, {
                    height: 0,
                    minHeight: 0,
                    autoAlpha: 1,
                    display: 'flex',
                })

                master.to(container, .4, {
                    height: height,
                    scaleY: 1,
                    minHeight: '100vh',
                    ease: Cubic.easeInOut,
                })

                master.progress(1).progress(0);
                master.play()

                this.isOpen = true
            } else {
                let master = new TimelineMax({
                    paused: true,
                })

                master.to(container, .3, {
                    height: 0,
                    minHeight: 0,
                    autoAlpha: 1,
                    display: 'flex',
                })

                master.set(container, {
                    display: 'none'
                })

                master.progress(1).progress(0)
                master.play()

                this.isOpen = false
            }


        }
    },
    mounted: function() {

    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.mobile-nav {
    position: fixed;
    width: 100vw;
    min-height: 100vh;
    background-color: $light-cyan;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;

    // position: relative;
    visibility: hidden; /* hides all .Tile-flyout on load so GSAP autoAlpha can do its thing */
    height: auto; /* tell the browser that initial height is auto */
    overflow: hidden;

    transform-origin: center top 0;

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
