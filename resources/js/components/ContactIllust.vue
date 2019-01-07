<template lang="html">
    <div id="contact-illust" ref="illust" :style="'width:'+width"></div>
</template>

<script>
import lottie from 'lottie-web'
import * as Contatti from '../animations/contatti.json'

import ScrollMagic from 'scrollmagic'
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'

export default {
    name: 'ContactIllust',
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
            loopFrameStart: 22,
            loopFrameEnd: 1,
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
                    animationData: Contatti,
                    name: 'Contatti'
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
    },
    mounted: function() {
        // this.$refs.illust.style.width = this.width
        this.load()
        // if (!this.$root.isMobile) {
        //     this.animateContact()
        // }
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

#contact-illust {
    position: absolute;

    @include media-breakpoint-down('md') {
        position: relative;
    }
}
</style>
