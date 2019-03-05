<template lang="html">
    <div id="about-illust" ref="illust" :style="'width:'+width"></div>
</template>

<script>
import lottie from 'lottie-web'
import ScrollMagic from 'scrollmagic'
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'

export default {
    name: 'UiSectionIllust',
    props: {
        width: {
            type: String,
            default: '32px'
        },
        containerHeight: {
            type: Number,
            default: 0,
        },
        animData: {
            type: Object,
            default: function() {},
        },
    },
    methods: {
        load: function() {
            return new Promise(resolve => {
                if (this.anim) {
                    this.anim.destroy()
                }
                let illust = this.$refs.illust
                let initialPadding = 4 * 16 // 4rem
                illust.style.top = initialPadding + 'px'

                this.anim = lottie.loadAnimation({
                    container: this.$refs.illust,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: this.animData,
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
    },
    mounted: function() {
        this.load()
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

<style lang="css" scoped>
</style>
