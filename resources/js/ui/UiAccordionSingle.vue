<template lang="html">
    <div
        :id="randomID"
        class="ui-accordion-single"
        :class="[alignClass, paddingClass, colorHeadingClass]"
        ref="accordion">
        <div
            class="ui-accordion-single__head"
            @click="openPanel(true)"
            ref="header">
            <div class="ui-accordion-single__title" ref="title">
                <slot name="title"></slot>
            </div>
            <div class="ui-accordion-single__arrow">
                <icon-arrow-down width="16px" color="#283745"/>
            </div>
        </div>

        <div class="ui-accordion-single__body" ref="panel">
            <div class="ui-accordion-single__content" ref="content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import IconArrowDown from './IconArrowDown.vue'
import { TimelineMax } from 'gsap'
require('gsap/ScrollToPlugin')

export default {
    name: 'UiAccordionSingle',
    components: {
        IconArrowDown,
    },
    props: {
        base: {
            type: String,
            default: null,
            required: true,
        },
        obj: {
            type: Object,
            default: function() {},
        },
        idx: {
            type: Number,
            default: null,
            required: true,
        },
        colorHeading: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        item: {
            type: Object,
            default: function() {}
        },
        isDynamic: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: null,
        },
        align: {
            type: String,
            default: null,
        },
        hasPadding: {
            type: Boolean,
            default: true,
        }
    },
    data: function() {
        return {
            master: null,
            isOpen: false,
            panelHeight: 0,
            // title: null,
            text: null,
            isAnimating: false,
            panel: null,
        }
    },
    computed: {
        disableClass: function() {
            if (this.isDisabled) {
                return 'ui-accordion-single--disable'
            }
        },
        alignClass: function() {
            if (this.align == 'start') {
                return 'ui-accordion-single--align-start'
            }
        },
        paddingClass: function() {
            if (!this.hasPadding) {
                return 'ui-accordion-single--no-padding'
            }
        },
        colorHeadingClass: function() {
            if (this.colorHeading) {
                return 'ui-accordion-single--color-head'
            }
        },
        randomID: function() {
            //https://gist.github.com/gordonbrander/2230317
            return '_' + Math.random().toString(36).substr(2, 9)
        }
    },
    watch: {
        '$root.window': function() {
            this.reset()
        },
    },
    methods: {
        reset: function() {
            let panel = this.$refs.panel
            let content = this.$refs.content
            let cRect = content.getBoundingClientRect()
            let cHeight = cRect.height + 16

            if (this.panel) {
                if (this.isOpen) {
                    TweenLite.set(panel, {
                        clearProps: 'all'
                    })
                    this.panel.kill()

                    TweenLite.to(panel, .3, {
                        height: cHeight,
                        autoAlpha: 1,
                        transformOrigin: "left top 0",
                    })

                    this.panel = TweenMax.fromTo(panel, .6, {
                        height: 0,
                        autoAlpha: 0,
                        transformOrigin: "left top 0",
                        ease: Power3.easeInOut
                    },{
                        height: cHeight,
                        autoAlpha: 1,
                        transformOrigin: "left top 0",
                        ease: Power3.easeInOut,
                    })
                    this.master.add(this.panel, 0)
                } else {
                    TweenLite.set(panel, {
                        clearProps: 'all'
                    })
                    this.panel.kill()

                    this.panel = TweenMax.fromTo(panel, .6, {
                        height: 0,
                        autoAlpha: 0,
                        transformOrigin: "left top 0",
                        ease: Power3.easeInOut
                    },{
                        height: cHeight,
                        autoAlpha: 1,
                        transformOrigin: "left top 0",
                        ease: Power3.easeInOut,
                    })
                    this.master.add(this.panel, 0)
                }
            }
        },
        init: function() {
            let panel = this.$refs.panel
            let content = this.$refs.content
            let title = this.$refs.title

            if (this.master) {
                this.isOpen = false
                this.master.kill()
            }

            let cRect = content.getBoundingClientRect()
            let cHeight = cRect.height + 16

            this.panelHeight = cHeight

            TweenLite.set(panel, {
                height: 0,
                autoAlpha: 0,
                transformOrigin: "left top 0",
            })

            this.master = new TimelineMax({
                paused: true,
            })

            this.panel = TweenMax.fromTo(panel, .6, {
                height: 0,
                autoAlpha: 0,
                transformOrigin: "left top 0",
                ease: Power3.easeInOut
            },{
                height: cHeight,
                autoAlpha: 1,
                transformOrigin: "left top 0",
                ease: Power3.easeInOut,
            })
            this.master.add(this.panel, 0)

            this.master.fromTo(content, .9, {
                autoAlpha: 0,
            }, {
                autoAlpha: 1,
                ease: Sine.easeInOut
            }, 0)

            this.master.progress(1).progress(0)

            if (this.$parent.scrollOnComplete) {
                this.master.eventCallback('onComplete', () => {
                    let scroller = TweenMax.to(window, .2, {
                        scrollTo: {
                            y: '#'+this.randomID,
                            offsetY: 90,
                            autoKill: false,
                        },
                        onComplete: () => {
                            scroller.kill()
                        }
                    })
                })

                this.master.eventCallback('onReverseComplete', () => {
                    let scroller = TweenMax.to(window, .2, {
                        scrollTo: {
                            y: '#'+this.randomID,
                            offsetY: 90,
                            autoKill: false,
                        },
                        onComplete: () => {
                            scroller.kill()
                        }
                    })
                })
            }

        },
        openPanel: function(isInternal = null) {
            this.$parent.$emit('open-accordion', this.idx, isInternal)
            if (this.isOpen) {
                this.isOpen = false
                this.$nextTick(() => {
                    this.master.reverse()
                })
            } else {
                if (isInternal) {
                    // cambia route ogni volta che si clicca sull'accordion
                    this.isOpen = true
                    this.$nextTick(() => {
                        this.master.play()
                        this.$router.push({
                            name: this.base,
                            params: {
                                slug: this.obj.slug
                            }
                        })
                    })
                } else {
                    this.isOpen = true
                    this.$nextTick(() => {
                        this.master.play()
                    })
                }
            }
        },
    },
    mounted: function() {
        this.$parent.$on('open-accordion', (idx) => {
            if (this.idx != idx && this.isOpen) {
                this.openPanel()
            }
        })

        this.$parent.$on('toggle-accordion', (idx) => {
            if (this.idx == idx) {
                this.openPanel()
            }
        })
        this.$on('loaded', () => {
            this.reset()
        })

        this.$nextTick(() => {
            this.init()
        })
    }
}
</script>

<style lang="scss" >
@import '~styles/shared';

.ui-accordion-single {
    $self: &;
    width: 100%;

    &__head {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        padding: ($spacer / 4) * 1.618;
    }

    &__title {
        font-weight: 400;
        text-transform: capitalize;
    }

    &__body {
        position: relative;
        // height: 0;

        visibility:hidden; /* hides all .Tile-flyout on load so GSAP autoAlpha can do its thing */
        height:auto; /* tell the browser that initial height is auto */
        overflow:hidden;
    }

    &__content {
        background-color: $white;
        padding-left: $spacer * 1.618;
        padding-right: $spacer * 1.618;
        padding-top: $spacer * 1.618;
        padding-bottom: $spacer * 1.618 * 2;
    }

    &__button {
        #{$self}--disable & {
            background-color: $blue;
            z-index: -1;

        }
    }

    &--color-head &__head {
        background-color: $light-brown;
    }

    &#{$self}--no-padding & {
        &__head {
            padding: 0;
        }

        &__content {
            // padding-top: $spacer * 1.618;
            padding-bottom: 0;
        }
    }
}

</style>
