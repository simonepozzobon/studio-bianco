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
        <loader />
    </div>
</template>

<script>
import Loader from './Loader.vue'
import MainNav from './MainNav.vue'
import MobileNav from '../containers/MobileNav.vue'
import { TimelineMax } from 'gsap'

export default {
    name: 'MainTemplate',
    components: {
        Loader,
        MainNav,
        MobileNav,
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
        }
    },
    data: function() {
        return {
            isAnimating: false,
            animate: null,
            elEnter: null,
        }
    },
    watch: {
        '$route': function(to, from) {
            TweenLite.to(window, .2, {
                scrollTo: 0,
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
        toggleMobile: function() {
            this.$refs.mobileNav.toggleMobile()
        },
        leave: function(el, done) {
            // console.log('leave', el, this.elEnter)

            if (this.isAnimating) {
                // console.log('animazione home')
                let container = el.getElementsByClassName('homesplit-container')[0]
                let panelLeft = el.getElementsByClassName('homesplit-left')[0]
                let panelRight = el.getElementsByClassName('homesplit-right')[0]

                let master = new TimelineMax({
                    paused: true,
                    reversed: true,
                })

                let t1 = new TimelineLite()
                master.add(t1)

                t1.set(el, {
                    position: 'absolute',
                    width: '100vw',
                    height: '100vh',
                    x: 0,
                    y: 0,
                })

                t1.set(this.elEnter, {
                    position: 'absolute',
                    autoAlpha: 1,
                    x: 0,
                    y: this.$root.window.h
                })

                t1.set(container, {
                    flexWrap: 'nowrap'
                })

                if (this.animate == 'odontoiatria') {
                    let dente = document.getElementById('home-illust-dente')
                    console.log(dente.offsetHeight)
                    t1.set(dente, {
                        height: dente.offsetHeight
                    })

                    // animazione per odontoiatria
                    t1.set(panelLeft, {
                        transformOrigin: 'right center 0',
                    })

                    t1.fromTo(panelLeft, .6, {
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

                    // t1.to(dente, .6, {
                    //     width: '29%'
                    // }, .1)
                    master.play()
                } else {
                    let testa = document.getElementById('home-illust-testa')

                    t1.set(testa, {
                        height: testa.offsetHeight
                    })

                    // animazione per medicina estetica
                    t1.set(panelRight, {
                        transformOrigin: "left center 0",
                    })

                    t1.fromTo(panelLeft, .6, {
                        autoAlpha: 1,
                        xPercent: 0
                    },{
                        xPercent: -100,
                        transformOrigin: "left center 0",
                        ease: Cubic.easeInOut,
                    }, .1)

                    t1.fromTo(panelRight, .6, {
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

                    // t1.to(testa, .6, {
                    //     width: '29%'
                    // }, .1)
                }

                t1.to(container, .6, {
                    yPercent: -100,
                }, 2)

                t1.to(this.elEnter, .6, {
                    y: 0,
                    position: 'inherit'
                }, 2)

                master.eventCallback('onComplete', () => {
                    this.isAnimating = false
                    this.animate = null
                    el.removeAttribute('position')
                    done()
                })

                master.play()
            } else {
                // pass through
                done()
            }
        },
        enter: function(el, done) {
            if (this.isAnimating) {
                this.elEnter = el
                TweenLite.set(this.elEnter, {
                    autoAlpha: 0,
                    onComplete: () => {
                        done()
                        return
                    }
                })
            }
            done()
        }
    },
    beforeMount: function() {
        let parsedEstetica = JSON.parse(this.estetica)
        let parsedOdontoiatria = JSON.parse(this.odontoiatria)

        this.$root.estetica = parsedEstetica
        this.$root.odontoiatria = parsedOdontoiatria
    }
}
</script>

<style lang="scss">
</style>
