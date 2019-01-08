<template lang="html">
    <div id="silvia-illust" ref="illust" :style="'width:'+width"></div>
</template>

<script>
import lottie from 'lottie-web'
import * as Silvia from '../animations/silvia2.json'

import ScrollMagic from 'scrollmagic'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'

export default {
    name: 'AboutSilviaIllust',
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
            animated: false,
            anim: {},
            loopFrameStart: 19,
            loopFrameEnd: 1,
        }
    },
    watch: {
        containerHeight: function(value) {
            if (!this.$root.isMobile) {
                this.onResize()
                // this.animate()
            } else {
                if (this.controller) {
                    this.controller.destroy()
                }
                if (!this.anim) {
                    this.animate().then(() => {
                        this.anim.play()
                    })
                } else {
                    this.anim.play()
                }
            }
        }
    },
    methods: {
        onResize: function() {
            if (this.controller) {
                this.controller.destroy()
            }

            if (!this.animated) {
                this.animate().then(() => {
                    let illust = this.$refs.illust
                    let illustHeight = illust.offsetHeight
                    let maxHeight = this.containerHeight // height with padding and margin
                    let maxPosition = maxHeight * 0.33 // pixel per arrivare al fondo

                    this.controller = new ScrollMagic.Controller()
                    let scroll = new ScrollMagic.Scene({
                        triggerElement: document.getElementById(this.trigger),
                        offset: maxPosition,
                        duration: 1,
                        triggerHook: 'onEnter'
                    })
                        // .addIndicators({ name: 'illustrazione silvia'})
                        .addTo(this.controller)
                        .on('enter', e => {
                            this.anim.play()
                            this.controller.destroy()
                            this.animated = true
                        })
                })
            }
        },
        animate: function() {
            return new Promise(resolve => {
                this.anim = lottie.loadAnimation({
                    container: this.$refs.illust,
                    renderer: 'svg',
                    loop: true,
                    autoplay: false,
                    animationData: Silvia,
                    name: 'Silvia'
                })

                this.anim.addEventListener('enterFrame', () => {
                    this.repeat()
                })

                resolve()
            })
        },
        repeat: function() {
            if (this.anim.currentRawFrame >= this.anim.totalFrames - this.loopFrameEnd) {
                this.anim.goToAndPlay(this.loopFrameStart, true)
            }
        }
    },
    mounted: function() {
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

#silvia-illust {
    position: absolute;
    bottom: -2rem;

    @include media-breakpoint-down('md') {
        position: relative;
    }
}
</style>
