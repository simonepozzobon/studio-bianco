<template lang="html">
    <svg id="scroll-down" :width="width" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.05 65.05" ref="icon" @click="goTo">
        <g id="#scroll-down-group" data-name="Logo">
            <circle cx="32.52" cy="32.52" r="32.52" :style="'fill: '+this.colorClass"/>
            <g>
                <rect x="30.78" y="15.56" width="3.48" height="29.99" style="fill: #f6f5ea"/>
                <polygon points="32.52 49.49 17.82 34.79 20.28 32.33 32.52 44.57 44.77 32.33 47.23 34.79 32.52 49.49" style="fill: #f6f5ea"/>
            </g>
        </g>
    </svg>
</template>

<script>
import {TweenMax} from 'gsap'
require('gsap/ScrollToPlugin')

// import ScrollMagic from 'scrollmagic'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'

export default {
    name: 'ScrollDown',
    props: {
        color: {
            type: String,
            default: 'blue'
        },
        width: {
            type: String,
            default: '48px',
        },
        trigger: {
            type: String,
            default: null
        },
        restore_trigger: {
            type: String,
            default: null,
        },
        scroll_to: {
            type: String,
            default: '#parcelle'
        }
    },
    data: function() {
        return {
            controller: null,
            restoreController: null,
            animated: false,
        }
    },
    watch: {
        '$root.window': function(value) {
            if (!this.$root.isMobile) {
                this.$refs.icon.style.display = null
            } else {
                this.$refs.icon.style.display = 'none'
            }

            this.init()
        }
    },
    computed: {
        colorClass: function() {
            if (this.color == 'blue') {
                return '#c6d6dc'
            }
            return '#d7b885'
        }
    },
    methods: {
        reset: function() {
            // console.log('show')
            TweenMax.to(this.$refs.icon, .6, {
                autoAlpha: 1,
                onComplete: () => {
                    this.animated = false
                }
            })
        },
        hide: function() {
            // console.log('hide')
            TweenMax.to(this.$refs.icon, .6, {
                autoAlpha: 0,
                onComplete: () => {
                    this.animated = true
                }
            })
        },
        init: function() {
            // if (this.controller) {
            //     this.controller.destroy()
            // }
            // this.controller = new ScrollMagic.Controller()
            // let scroll = new ScrollMagic.Scene({
            //     triggerElement: document.getElementById(this.trigger),
            //     offset: 200,
            //     duration: 1,
            //     triggerHook: 'onEnter'
            // })
            //     .on('enter', e => {
            //         if (!this.animated) {
            //             TweenMax.to(this.$refs.icon, .6, {
            //                 autoAlpha: 0,
            //                 onComplete: () => {
            //                     this.animated = true
            //                 }
            //             })
            //         }
            //     })
            //     // .addIndicators({ name: '1 (duration: 45)'})
            //     .addTo(this.controller)
        },
        goTo: function() {
            TweenMax.to(window, .6, {
                scrollTo: {
                    offsetY: 0,
                    y: this.scroll_to,
                    autoKill: false,
                },
                ease: Power2.easeInOut,
            })
        },
        resetStyle: function() {
            let el = this.$refs.icon.style
            let height = window.innerHeight - 64 - 16
            el.top = height + 'px' // imposta l'altezza dall'alto in base alla finestra
            this.reset()
        },
        setStyle: function() {
            let el = this.$refs.icon.style
            el.position = 'fixed'
            el.left = '50%'
            el.bottom = '16px'
            el.width = '64px'
            el.height = '64px'
            el.transform = 'translateX(-50%)'
            el.zIndex = '4'
        }
    },
    mounted: function() {
        this.init()
        // this.setStyle()

        this.$root.$on('leave-completed', () => {
            this.reset()
            this.$nextTick(() => {
                // this.resetStyle()
            })
        })
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

#scroll-down {
    position: fixed;
    left: 50%;
    top: calc(100vh - 80px);
    // bottom: 16px;
    width: 64px;
    height: 64px;
    transform: translateX(-50%);
    z-index: 4;
}

</style>
