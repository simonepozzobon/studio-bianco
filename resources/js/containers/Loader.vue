<template lang="html">
    <div id="logo-animation" ref="illust"></div>
</template>

<script>
import lottie from 'lottie-web'
import * as LogoAnim from '../animations/logo_animation.json'

export default {
    name: 'Loader',
    data: function() {
        return {
            anim: null
        }
    },
    methods: {
        load: function() {
            return new Promise(resolve => {
                this.anim = lottie.loadAnimation({
                    container: this.$refs.illust,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    animationData: LogoAnim,
                    name: 'LogoAnim'
                })

                this.anim.addEventListener('enterFrame', () => {
                    if (this.anim.currentRawFrame >= this.anim.totalFrames - 1) {
                        this.fadeOut()
                    }
                })

                resolve()
            })
        },
        fadeOut: function() {
            TweenMax.set(window, {
                scrollTo: 0,
            })
            TweenMax.to(this.$refs.illust, .3, {
                autoAlpha: 0,
                display: 'none',
                onComplete: () => {
                    this.$root.initialized = true
                }
            })
        }
    },
    mounted: function() {
        if (!this.$root.initialized) {
            this.load().then(() => {
                setTimeout(() => {
                    this.anim.play()
                }, 500)
            })
        }
    },
    beforeDestroy: function() {
        if (this.anim) {
            this.anim.destroy()
        }
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

#logo-animation {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $light-brown;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    // display: none;
}
</style>
