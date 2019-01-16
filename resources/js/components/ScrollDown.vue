<template lang="html">
    <svg id="scroll-down" :width="width" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.05 65.05" ref="icon">
        <g id="#scroll-down-group" data-name="Logo">
            <circle cx="32.52" cy="32.52" r="32.52" :style="'fill: '+this.colorClass"/>
            <g>
                <rect x="30.78" y="15.56" width="3.48" height="29.99" style="fill: #f6f5ea"/>
                <polygon points="32.52 49.49 17.82 34.79 20.28 32.33 32.52 44.57 44.77 32.33 47.23 34.79 32.52 49.49" style="fill: #f6f5ea"/>
            </g>
        </g>
    </svg>
</template>

<script>
import ScrollMagic from 'scrollmagic'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'

export default {
    name: 'ScrollDown',
    props: {
        color: {
            type: String,
            default: 'blue'
        },
        width: {
            type: String,
            default: '48px',
        },
        trigger: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            controller: null,
            animated: false,
        }
    },
    watch: {
        '$root.window': function(value) {
            if (!this.$root.isMobile) {
                this.$refs.icon.style.display = null
            } else {
                this.$refs.icon.style.display = 'none'
            }

            this.init()
        }
    },
    computed: {
        colorClass: function() {
            if (this.color == 'blue') {
                return '#c6d6dc'
            }
            return '#d7b885'
        }
    },
    methods: {
        init: function() {
            if (this.controller) {
                this.controller.destroy()
            }

            this.controller = new ScrollMagic.Controller()
            let scroll = new ScrollMagic.Scene({
                triggerElement: document.getElementById(this.trigger),
                offset: 200,
                duration: 1,
                triggerHook: 'onEnter'
            })
                .on('enter', e => {
                    if (!this.animated) {
                        TweenMax.to(this.$refs.icon, .6, {
                            autoAlpha: 0,
                            onComplete: () => {
                                this.animated = true
                            }
                        })
                    }
                })
                .addTo(this.controller)
        }
    },
    mounted: function() {
        this.init()
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

#scroll-down {
    position: fixed;
    right: 64px;
    bottom: 16px;
}
</style>
