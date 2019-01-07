<template lang="html">
    <div id="silvia-illust" ref="anim"></div>
</template>

<script>
import lottie from 'lottie-web'
import * as Silvia from '../animations/silvia.json'

export default {
    name: 'AboutSilviaIllust',
    props: {
        width: {
            type: String,
            default: '32px'
        }
    },
    data: function() {
        return {
            anim: {},
            height: 0,
            loaded: false,
            speed: 1,
        }
    },
    watch: {
        loaded: function(value) {
            this.animate()
        }
    },
    methods: {
        animate: function() {
            this.play()
        },
        init: function() {
            this.anim = lottie.loadAnimation({
                container: this.$refs.anim,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: Silvia,
                name: 'Silvia'
            })

            this.anim.setSpeed(this.speed)
            this.anim.pause()
            this.loaded = true
        },
        play: function() {
            this.anim.play()
        },
    },
    mounted: function() {
        this.init()
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

#silvia-illust {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

#db6d75a53be9 {
    bottom: -2rem;
    position: absolute;

    @include media-breakpoint-down('md'){
        position: relative;
    }
}
</style>
