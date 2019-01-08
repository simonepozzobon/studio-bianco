<template lang="html">
    <div class="accordion-item">
        <div class="accordion-header" ref="header" @click="togglePanel">
            <div class="accordion-title">{{ title }}</div>
            <div><icon-arrow-down width="16px" color="#283745"/></div>
        </div>
        <div class="accordion-content" ref="content">
            <h3>{{ title }}</h3>
            <home-horizontal-sep width="50px" color="#e5c386"/>
            <p v-html="description"></p>
        </div>
    </div>
</template>

<script>
import { IconArrowDown } from '../ui'
import HomeHorizontalSep from './HomeHorizontalSep.vue'
export default {
    name: 'AccordionItem',
    components: {
        IconArrowDown,
        HomeHorizontalSep,
    },
    props: {
        idx: {
            type: Number,
            default: 0,
        },
        title: {
            type: String,
            default: 'Titolo'
        },
        description: {
            type: String,
            default: ''
        },
    },
    data: function() {
        return {
            formIsOpen: false,
            headerColorClass: null,
            master: null,
            panelHeight: 0,
            even: false,
        }
    },
    watch: {
        formIsOpen: function(value) {
            if (value && !this.even) {
                this.$refs.header.style.backgroundColor = '#f6f5ea'
            } else if (!value && !this.even) {
                this.$refs.header.style.backgroundColor = 'inherit'
            }
        }
    },
    methods: {
        isEven: function(n) {
            return n % 2 == 0;
        },
        setHeaderColor: function() {
            if (this.isEven(this.idx)) {
                this.headerColorClass = 'f6f5ea'
                this.$refs.header.style.backgroundColor = '#f6f5ea'
                this.even = true
            }
        },
        togglePanel: function() {
            let panel = this.$refs.content
            if (!this.formIsOpen) {
                if (this.master) {
                    this.master.play()
                    this.formIsOpen = true
                } else {
                    this.master = new TimelineMax({
                        paused: true,
                        reversed: true,
                    })

                    TweenLite.set(panel, {
                        height: 0,
                        autoAlpha: 0,
                        display: 'none',
                        transformOrigin: "left top 0",
                    })

                    this.master.to(panel, .6, {
                        height: this.panelHeight,
                        scaleY: 1,
                        autoAlpha: 1,
                        display: "block",
                        transformOrigin: "left top 0",
                        // ease: Cubic.easeInOut
                    })

                    this.master.progress(1).progress(0);
                    this.master.play()
                    this.formIsOpen = true
                    this.$emit('panel-open', this.panelHeight)
                }
            } else {
                this.master.reverse()
                this.formIsOpen = false
                this.$emit('panel-close', -this.panelHeight)
            }
        },
    },
    mounted: function() {
        this.setHeaderColor()
        let form = this.$refs.content
        this.panelHeight = form.offsetHeight
        TweenLite.set(form, {
            height: 0,
            autoAlpha: 0,
            display: 'none',
            transformOrigin: "left top 0",
        })
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.accordion-item {
    width: 100%;
}

.accordion-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: $spacer / 4;
    padding-bottom: $spacer / 4;
    padding-left: $spacer;
    padding-right: $spacer;

    @include media-breakpoint-down('md') {
        padding-top: $spacer;
        padding-bottom: $spacer;
    }

    .accordion-title {
        font-weight: normal;
        text-transform: capitalize;
        // line-height: 1;
    }
}

.accordion-content {
    font-family: $font-family-custom;
    background-color: $white;
    position: relative;
    width: calc(100vw - 8rem);
    z-index: 2;
    padding: $spacer * 2;

    @include media-breakpoint-down('md') {
        width: 100%;
    }

    visibility:hidden; /* hides all .Tile-flyout on load so GSAP autoAlpha can do its thing */
    height:auto; /* tell the browser that initial height is auto */
    overflow:hidden;

    svg {
        padding-bottom: $spacer;
    }
}

</style>
