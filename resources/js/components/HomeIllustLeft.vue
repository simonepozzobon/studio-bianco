<template lang="html">
    <div id="home-illust-dente" ref="illust"></div>
</template>

<script>
import lottie from 'lottie-web'
// import * as Dente from '../animations/dente_home.json'

export default {
    name: 'HomeIllustLeft',
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
    watch: {
        '$root.animations.dente_home': function(data) {
            if (data) {
                this.load()
            }
        }
    },
    methods: {
        load: function() {
            return new Promise(resolve => {
                if (this.anim) {
                    this.anim.destroy()
                }
                if (this.$root.animations['dente_home']) {
                    let illust = this.$refs.illust
                    let initialPadding = 4 * 16 // 4rem
                    illust.style.top = initialPadding + 'px'
                    // illust.style.marginLeft = '9%'

                    this.anim = lottie.loadAnimation({
                        container: this.$refs.illust,
                        renderer: 'svg',
                        loop: false,
                        autoplay: false,
                        animationData: this.$root.animations['dente_home'],
                        name: 'dente'
                    })

                    this.anim.addEventListener('enterFrame', () => {
                        if (this.anim.currentRawFrame > this.anim.totalFrames - 1) {
                            this.$root.$emit('odontoiatria-completed')
                        }
                    })
                    resolve()
                }
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
        this.$root.$on('odontoiatria-play', () => {
            this.play()
        })
    },
}
</script>

<style lang="css">
</style>
