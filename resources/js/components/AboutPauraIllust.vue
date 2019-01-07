<template lang="html">
    <div id="about-paura-illust" ref="illust"></div>
</template>

<script>
import lottie from 'lottie-web'
import * as Paura from '../animations/strumenti.json'

import ScrollMagic from 'scrollmagic'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'

export default {
    name: 'AboutPauraIllust',
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
                    container: this.$refs.illust,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: Paura,
                    name: 'Studio'
                })

                this.anim.addEventListener('enterFrame', () => {
                    this.repeat()
                })
                this.anim.play()
                resolve()
            })
        },
        repeat: function() {
            if (this.anim.currentRawFrame >= this.anim.totalFrames - this.loopFrameEnd) {
                this.anim.goToAndPlay(this.loopFrameStart, true)
            }
        },
        onResize: function() {
            if (this.controller) {
                this.controller.destroy()
            }

            let illust = this.$refs.illust // element
            let maxHeight = this.containerHeight - (4 * 16 * 2) + 32 // height without padding and margin
            let illustHeight = illust.offsetHeight // altezza dell'illustrazione
            let maxPosition = maxHeight - illustHeight // pixel per arrivare al fondo

            let master = TweenMax.to(illust, 2, {
                top: maxPosition > 0 ? maxPosition * 0.5 : 200
            })

            this.controller = new ScrollMagic.Controller()
            let scroll = new ScrollMagic.Scene({
                triggerElement: document.getElementById(this.trigger),
                offset: 0,
                duration: maxHeight > 0 ? maxHeight : 200,
                triggerHook: 'onLeave'
            })
                // .addIndicators({ name: 'illustratione paura'})
                .setTween(master)
                .addTo(this.controller)
        }
    },
    mounted: function() {
        this.$refs.illust.style.width = this.width
        this.load()
        // if (!this.$root.isMobile) {
        //     this.load()
        // }
    },
    beforeDestroy: function() {
        if (this.controller) {
            this.controller.destroy()
        }
    }
}
</script>

<style lang="scss">
@import '~styles/shared';
#about-paura-illust {
    top: 64px;
    right: -4px;
    position: absolute;

    @include media-breakpoint-down('md') {
        position: relative;
    }
}
</style>
