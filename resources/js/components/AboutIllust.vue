<template lang="html">
    <div id="about-illust" ref="illust" :style="'width:'+width"></div>
</template>

<script>
import lottie from 'lottie-web'
import * as Studio from '../animations/studio.json'

import ScrollMagic from 'scrollmagic'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'

export default {
    name: 'AboutIllust',
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
            controller: null,
            height: 0,
            anim: null,
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
                let illust = this.$refs.illust
                let initialPadding = 4 * 16 // 4rem
                illust.style.top = initialPadding + 'px'

                this.anim = lottie.loadAnimation({
                    container: this.$refs.illust,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: Studio,
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
            // this.getHeight()
            let illust = this.$refs.illust // element
            let maxHeight = this.containerHeight - (4 * 16 * 2) + 32 // height without padding and margin
            let illustHeight = illust.offsetHeight // altezza dell'illustrazione
            let maxPosition = maxHeight - illustHeight // pixel per arrivare al fondo
            let master = TweenMax.to(illust, 2, {
                // top: maxPosition > 0 ? maxPosition * 0.45 : 200
            })

            this.controller = new ScrollMagic.Controller()
            let scroll = new ScrollMagic.Scene({
                triggerElement: document.getElementById(this.trigger),
                offset: - this.$root.navbarHeight,
                duration: maxHeight > 0 ? maxHeight : 200,
                triggerHook: 'onLeave'
            })
                // .addIndicators({ name: 'illustrazione studio'})
                .setTween(master)
                .addTo(this.controller)
        }
    },
    mounted: function() {
        // if (!this.$root.isMobile) {
        this.load()
        // }
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

#about-illust {
    position: absolute;
    top: 0;

    @include media-breakpoint-down('md') {
        position: relative;
    }
}
</style>
