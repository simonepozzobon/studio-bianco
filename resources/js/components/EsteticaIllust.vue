<template lang="html">
    <div id="estetica-illust" ref="illust" :style="'width:'+width"></div>
</template>

<script>
import lottie from 'lottie-web'
// import * as Estetica from '../animations/quadri_medicina_estetica.json'

import ScrollMagic from 'scrollmagic'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'

export default {
    name: 'EsteticaIllust',
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
            loopFrameStart: 22,
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
        },
        '$root.animations.quadri_medicina_estetica': function(data) {
            if (data) {
                this.load()
            }
        }
    },
    methods: {
        load: function() {
            return new Promise((resolve, reject) => {
                if (this.anim) {
                    this.anim.destroy()
                }

                if (document.getElementById('estetica-illust') && this.$root.animations['quadri_medicina_estetica']) {
                    this.anim = lottie.loadAnimation({
                        container: document.getElementById('estetica-illust'),
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        animationData: this.$root.animations['quadri_medicina_estetica'],
                        name: 'Studio'
                    })

                    this.anim.addEventListener('enterFrame', () => {
                        this.repeat()
                    })

                    resolve()
                } else {
                    // reject()
                }

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
                top: maxPosition > 0 ? maxPosition * 0.45 : 100
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
        this.$root.$on('page-animation-load', (name) => {
            if (name == 'estetica') {
                if (!this.isMobile) {
                    this.direct = false

                    this.load().then(() => {
                        this.anim.goToAndStop(0, true)
                    })
                }
            }
        })

        this.$root.$on('page-animation-start', (name) => {
            if (name == 'estetica') {
                if (this.anim) {
                    this.anim.goToAndPlay(0, true)
                }
            }
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

#estetica-illust {
    position: absolute;
    top: 64px;

    @include media-breakpoint-down('md') {
        position: relative;
    }
}
</style>
