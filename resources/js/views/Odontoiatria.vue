<template lang="html">
    <div class="odontoiatria">
        <div class="odontoiatria-container" ref="container">
            <div class="odontoiatria-left" ref="content">
                <div class="odontoiatria-content" ref="panel">
                    <div class="odontoiatria-bold-divider"></div>
                    <h1 class="odontoiatria-title" ref="title">Servizi</h1>
                    <span class="odontoiatria-subtitle">Odontoiatria</span>
                    <div class="odontoiatria-v-div"></div>
                    <accordion
                        :items="services"
                        @panel-open="panelOpen"
                        @panel-close="panelClose"
                        @remove-height="removeHeight"/>
                </div>
            </div>
            <div class="odontoiatria-right odontoiatria-illust-top">
                <odontoiatria-illust
                    :width="illustWidth"
                    ref="illust"
                    trigger="odontoiatria-studio-illust-ref"
                    :containerHeight="illustHeight"/>
                <div id="odontoiatria-studio-illust-ref" class="ref"></div>
            </div>
        </div>
        <parcelle />
        <convenzioni />
        <main-footer />
    </div>
</template>

<script>
import Accordion from '../components/Accordion.vue'
import Convenzioni from '../components/Convenzioni.vue'
import MainFooter from '../containers/MainFooter.vue'
import OdontoiatriaIllust from '../components/OdontoiatriaIllust.vue'
import Parcelle from '../components/Parcelle.vue'
// import services from '../dummies/services'

export default {
    name: 'Odontoiatria',
    components: {
        Accordion,
        Convenzioni,
        MainFooter,
        OdontoiatriaIllust,
        Parcelle,
    },
    watch: {
        '$root.window': function(value) {
            this.positionIllustration()
            // this.illustHeight = this.$refs.content.offsetHeight

            if (value.w > 1920) {
                this.illustWidth = '72.2%'
            } else {
                this.illustWidth = '92.2%'
            }
        }
    },
    data: function() {
        return {
            illustHeight: 0,
            services: this.$root.odontoiatria,
            illustWidth: '92.2%',
            illustHidden: false,
        }
    },
    methods: {
        panelOpen: function(height) {
            if (!this.illustHidden) {
                TweenMax.to(this.$refs.illust.$el, .6, {
                    autoAlpha: 0,
                    onComplete: () => {
                        this.illustHidden = true
                    }
                })
            }
            TweenMax.to(this.$refs.container, .6, {
                height: '+='+height
            })
        },
        panelClose: function() {
            TweenMax.to(this.$refs.illust.$el, .6, {
                autoAlpha: 1,
                onComplete: () => {
                    this.illustHidden = false
                }
            })
        },
        removeHeight: function(height) {
            TweenMax.to(this.$refs.container, .6, {
                height: '+='+height
            })
        },
        positionIllustration: function() {
            let w = this.$root.window.w
            if (w > 576 && w < 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
            } else if (w >= 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
                // this.$refs.illust.$el.style.paddingTop = '20%'
                this.illustWidth = '72.2%'
            } else {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 'px'
            }

            if (!this.$root.isMobile) {
                let contentHeight = this.$refs.panel.offsetHeight
                let windowHeight = this.$root.window.h - this.$root.navbarFullHeight
                let illustHeight = this.$refs.illust.$el.offsetHeight

                if (contentHeight <= windowHeight) {
                    this.$refs.content.style.position = 'relative'
                    this.$refs.panel.style.position = 'absolute'
                    this.$refs.panel.style.top = '5vh'
                    this.$refs.illust.$el.style.position = 'absolute'
                    this.$refs.illust.$el.style.top = '5vh'
                } else {
                    this.$refs.content.style.position = null
                    this.$refs.panel.style.position = null
                    this.$refs.panel.style.top = null
                }

                if (illustHeight > contentHeight) {
                    let delta = (illustHeight - contentHeight) / 2
                    this.$refs.container.style.paddingBottom = delta + 'px'
                } else {
                    this.$refs.container.style.paddingBottom = null
                }
            }
        },
    },
    mounted: function() {
        this.$root.navColor = 1
        this.$root.hasFooter = true
        this.positionIllustration()
    }
}
</script>

<style lang="scss">
@import '~styles/shared';


.odontoiatria {
    @include make-container();
    background-color: $cyan;

    .odontoiatria-container {
        @include make-row();
        min-height: 100vh;

        > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;

            > svg {
                margin-bottom: $spacer * 2;
            }

            h1 {
                display: block;
            }

            &.odontoiatria-illust-top {
                justify-content: flex-start;
                @include media-breakpoint-up('xxl') {
                    justify-content: center;
                }
            }
        }

        .odontoiatria-left {
            @include make-col(6);
            @include media-breakpoint-down('md') {
                @include make-col(12);
            }
        }

        .odontoiatria-right {
            @include make-col(6);
            position: relative;

            @include media-breakpoint-down('md') {
                @include make-col(12);
                position: inherit;
            }
        }
    }

    .odontoiatria-content {
        padding: $spacer * 4;
        width: 100%;

        @include media-breakpoint-down('md') {
            padding-left: 0;
            padding-right: 0;
            text-align: center;
        }

        .odontoiatria-bold-divider {
            content: '';
            width: 30px;
            border-top: 6px solid $light-brown;
            margin-bottom: $spacer;

            &.pink {
                border-top: 6px solid $pink;
            }

            &.yellow {
                border-top: 6px solid $yellow;
            }

            @include media-breakpoint-down('md') {
                margin-right: auto;
                margin-left: auto;
            }
        }

        .odontoiatria-v-div {
            content: '';
            height: 53px;
            width: 1px;
            border-left: 1px solid $light-brown;
            margin-bottom: $spacer;
            margin-top: $spacer;

            &.pink {
                border-left: 1px solid $pink;
            }

            &.yellow {
                border-left: 1px solid $yellow;
            }

            @include media-breakpoint-down('md') {
                margin-left: auto;
                margin-right: auto;
                height: 29px;
            }

            @include media-breakpoint-down('xs') {
                height: 13px;
            }
        }
    }

    .odontoiatra-title {
        font-size: calc(100% + 1vw + 1vh);
    }

    .odontoiatria-subtitle {
        font-size: calc(10% + 1vw + 1vh);
        font-weight: 300;

        @include media-breakpoint-down('md') {
            font-size: calc(30% + 1vw + 1vh);
            text-align: center;
        }
        @include media-breakpoint-down('xs') {
            font-size: calc(50% + 1vw + 1vh);
        }
    }

    .odontoiatria-divider {
        margin-bottom: $spacer;
    }

    .odontoiatria-parcelle {
        @include make-row();
        background-color: $light;
        min-height: 20vh;

        .odontoiatria-parcelle-container {
            @include make-col(12);
        }
    }

    .odontoiatria-partner {
        @include make-row();
        background-color: $purple;
        min-height: 20vh;

        .odontoiatria-parcelle-container {
            @include make-col(12);
        }
    }
}

</style>
