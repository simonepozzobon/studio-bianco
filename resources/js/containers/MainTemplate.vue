<template lang="html">
    <div class="">
        <main-nav @toggle-mobile="toggleMobile"/>
        <mobile-nav ref="mobileNav"/>
        <transition
            mode="in-out"
            @leave="leave"
            @enter="enter">
            <router-view />
        </transition>
        <mobile-tracking v-if="this.deviceMobile"/>
        <loader />
        <cookies-panel />
    </div>
</template>

<script>
import CookiesPanel from '../components/CookiesPanel.vue'
import Loader from './Loader.vue'
import MainNav from './MainNav.vue'
import MobileNav from '../containers/MobileNav.vue'
import MobileTracking from '../containers/MobileTracking.vue'
import { TimelineMax } from 'gsap'

export default {
    name: 'MainTemplate',
    components: {
        CookiesPanel,
        Loader,
        MainNav,
        MobileNav,
        MobileTracking,
        // MainFooter,
    },
    props: {
        estetica: {
            type: String,
            default: function() {},
        },
        odontoiatria: {
            type: String,
            default: function() {},
        },
        comparisons: {
            type: String,
            default: '',
        },
        seos: {
            type: String,
            default: '',
        },
    },
    data: function() {
        return {
            isAnimating: false,
            animate: null,
            elEnter: null,
            deviceMobile: false,
        }
    },
    watch: {
        '$route': function(to, from) {
            this.deviceCheck()

            TweenLite.to(window, .2, {
                scrollTo: 0,
                autoKill: false,
                ease: Power2.easeInOut,
            })

            if (from.name == 'home' && to.name == 'odontoiatria' && !this.isAnimating && !this.$root.isMobile) {
                // console.log('slide rosa')
                this.isAnimating = true
                this.animate = 'odontoiatria'
            }

            if (from.name == 'home' && to.name == 'medicinaestetica' && !this.isAnimating && !this.$root.isMobile) {
                // console.log('slide blu')
                this.isAnimating = true
                this.animate = 'estetica'
            }
        }
    },
    methods: {
        deviceCheck: function() {
            this.deviceMobile = window.mobilecheck()
        },
        toggleMobile: function() {
            this.$refs.mobileNav.toggleMobile()
        },
        leave: function(el, done) {
            // console.log('leave', el)

            if (this.isAnimating) {
                // console.log('animazione home')
                let container = el.getElementsByClassName('homesplit-container')[0]
                let panelLeft = el.getElementsByClassName('homesplit-left')[0]
                let panelRight = el.getElementsByClassName('homesplit-right')[0]

                let master = new TimelineMax({
                    paused: true,
                    reversed: true,
                })

                // let t1 = new TimelineLite()
                // master.add(t1)

                master.set(el, {
                    position: 'absolute',
                    width: '100vw',
                    height: '100vh',
                    x: 0,
                    y: 0,
                })
                // console.log(this.elEnter)
                master.set(this.elEnter, {
                    position: 'absolute',
                    autoAlpha: 1,
                    x: 0,
                    y: this.$root.window.h
                })

                master.set(container, {
                    flexWrap: 'nowrap'
                })

                if (this.animate == 'odontoiatria') {
                    let dente = document.getElementById('home-illust-dente')

                    master.set(dente, {
                        height: dente.offsetHeight
                    })

                    // animazione per odontoiatria
                    master.set(panelLeft, {
                        transformOrigin: 'right center 0',
                    })

                    master.fromTo(panelLeft, .6, {
                        xPercent: 0
                    }, {
                        width: '100%',
                        autoAlpha: 1,
                        flexBasis: 100,
                        maxWidth: '100%',
                        xPercent: 0,
                        transformOrigin: "right top 0",
                        ease: Cubic.easeInOut,
                        onStart: () => {
                            this.$root.$emit('odontoiatria-play')
                        }
                    }, .1)

                    // master.play()
                } else {
                    let testa = document.getElementById('home-illust-testa')

                    master.set(testa, {
                        height: testa.offsetHeight
                    })

                    // animazione per medicina estetica
                    master.set(panelRight, {
                        transformOrigin: "left center 0",
                    })

                    master.fromTo(panelLeft, .6, {
                        autoAlpha: 1,
                        xPercent: 0
                    },{
                        xPercent: -100,
                        transformOrigin: "left center 0",
                        ease: Cubic.easeInOut,
                    }, .1)

                    master.fromTo(panelRight, .6, {
                        xPercent: 0
                    },{
                        width: '100%',
                        autoAlpha: 1,
                        flexBasis: '100%',
                        maxWidth: '100%',
                        flexGrow: 2,
                        xPercent: -50,
                        transformOrigin: "left top 0",
                        ease: Cubic.easeInOut,
                        onStart: () => {
                            this.$root.$emit('estetica-play')
                        }
                    }, .1)

                }

                master.to(container, .6, {
                    yPercent: -100,
                    onStart: () => {
                        this.$nextTick(() => {
                            this.$root.$emit('page-animation-start', this.animate)
                        })
                    }
                }, 2)

                master.to(this.elEnter, .6, {
                    y: 0,
                    position: 'relative',
                }, 2)

                master.eventCallback('onComplete', () => {
                    this.isAnimating = false
                    this.animate = null
                    el.removeAttribute('style')
                    this.elEnter.removeAttribute('style')
                    // this.$root.$emit('leave-completed')
                    // console.log('completato leave', el)
                    done()
                })

                master.progress(1).progress(0).play()
            } else {
                // pass through
                done()
            }
        },
        enter: function(el, done) {
            // console.log('enter', el)
            if (this.isAnimating) {
                this.elEnter = el
                TweenLite.set(this.elEnter, {
                    autoAlpha: 0,
                    onComplete: () => {
                        this.$nextTick(() => {
                            this.$root.$emit('page-animation-load', this.animate)
                            done()
                        })
                        // console.log('completato enter', el)
                        return
                    }
                })
            }
            done()
        }
    },
    created: function() {
        this.deviceCheck()
    },
    beforeMount: function() {
        let parsedEstetica = JSON.parse(this.estetica)
        let parsedOdontoiatria = JSON.parse(this.odontoiatria)
        let parsedComparisons = JSON.parse(this.comparisons)
        let parsedSeos = JSON.parse(this.seos)

        this.$root.estetica = parsedEstetica
        this.$root.odontoiatria = parsedOdontoiatria
        this.$root.comparisons = parsedComparisons
        this.$root.seos = parsedSeos
    },
}
</script>

<style lang="scss">
</style>
