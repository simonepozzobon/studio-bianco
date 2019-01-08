<template lang="html">
    <div id="odontoiatria-illust" ref="illust" :style="'width:'+width"></div>
</template>

<script>
import lottie from 'lottie-web'
import * as Dente from '../animations/dente.json'

import ScrollMagic from 'scrollmagic'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'

export default {
    name: 'OdontoiatriaIllust',
    props: {
        width: {
            type: String,
            default: '32px'
        },
        containerHeight: {
            type: Number,
            default: 0,
        },
        trigger: {
            type: String,
            default: '',
        }
    },
    data: function() {
        return {
            anim: {},
            controller: null,
            loopFrameStart: 19,
            loopFrameEnd: 1,
            direct: true,
        }
    },
    watch: {
        containerHeight: function(value) {
            if (!this.$root.isMobile) {
                this.onResize()
            } else {
                if (this.controller) {
                    this.controller.destroy()
                }
            }
        }
    },
    methods: {
        load: function() {
            return new Promise(resolve => {
                this.anim = lottie.loadAnimation({
                    container: document.getElementById('odontoiatria-illust'),
                    renderer: 'svg',
                    loop: false,
                    autoplay: true,
                    animationData: Dente,
                    name: 'Studio'
                })

                resolve()
            })
        },
        onResize: function() {
            if (this.controller) {
                this.controller.destroy()
            }
            // this.getHeight()
            let illust = this.$refs.illust // element
            let maxHeight = this.containerHeight - (4 * 16 * 2) + 32 // height without padding and margin
            let illustHeight = illust.offsetHeight // altezza dell'illustrazione
            let maxPosition = maxHeight - illustHeight // pixel per arrivare al fondo

            let master = TweenMax.to(illust, 2, {
                top: maxPosition > 0 ? maxPosition * 0.45 : 200
            })

            this.controller = new ScrollMagic.Controller()
            let scroll = new ScrollMagic.Scene({
                triggerElement: document.getElementById(this.trigger),
                offset: - this.$root.navbarHeight + 40,
                duration: maxHeight > 0 ? maxHeight : 200,
                triggerHook: 'onLeave'
            })
                // .addIndicators({ name: 'illustrazione studio'})
                .setTween(master)
                .addTo(this.controller)
        }
    },
    mounted: function() {
        this.$root.$on('page-animation-load', () => {
            if (!this.isMobile) {
                this.direct = false
                if (this.anim) {
                    this.anim.destroy()
                }
                this.load().then(() => {
                    this.anim.goToAndStop(0, true)
                })
            }
        })

        this.$root.$on('page-animation-start', () => {
            this.anim.goToAndPlay(0, true)
        })

        if (this.direct) {
            this.load().then(() => {
                this.anim.play()
            })
        }
    },
    beforeDestroy: function() {
        if (this.controller) {
            this.controller.destroy()
        }

        if (this.anim) {
            this.anim.destroy()
        }
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

#odontoiatria-illust {
    position: absolute;
    top: 64px;

    @include media-breakpoint-down('md') {
        position: relative;
    }
}
</style>
