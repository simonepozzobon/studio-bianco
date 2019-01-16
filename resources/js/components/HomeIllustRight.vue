<template lang="html">
    <div id="home-illust-testa" ref="illust"></div>
</template>

<script>
import lottie from 'lottie-web'
import * as Testa from '../animations/scultura_home.json'

export default {
    name: 'HomeIllustRight',
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
            anim: null,
            controller: null,
            height: 0,
            loopFrameStart: 0,
            loopFrameEnd: 1,
        }
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
                // illust.style.marginLeft = '10%'

                this.anim = lottie.loadAnimation({
                    container: this.$refs.illust,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    animationData: Testa,
                    name: 'testa'
                })

                this.anim.addEventListener('enterFrame', () => {
                    if (this.anim.currentRawFrame > this.anim.totalFrames - 1) {
                        this.$root.$emit('estetica-completed')
                    }
                })

                resolve()
            })
        },
        play: function() {
            if (this.anim) {
                this.anim.goToAndPlay(0, true)
            } else {
                this.load().then(() => {
                    this.anim.goToAndPlay(0, true)
                })
            }
        }
    },
    mounted: function() {
        this.$refs.illust.style.width = this.width
        this.load()
        this.$root.$on('estetica-play', () => {
            this.play()
        })
    },
}
</script>

<style lang="css">
</style>
