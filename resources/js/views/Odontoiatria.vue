<template lang="html">
    <div class="odontoiatria">
        <div class="odontoiatria-container" ref="container">
            <div class="odontoiatria-left" ref="content">
                <div class="odontoiatria-content">
                    <div class="odontoiatria-bold-divider"></div>
                    <h1 class="odontoiatria-title" ref="title">Servizi</h1>
                    <span class="odontoiatria-subtitle">Odontoiatria</span>
                    <div class="odontoiatria-v-div"></div>
                    <accordion :items="services"/>
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
        }
    },
    methods: {
        positionIllustration: function() {
            let w = this.$root.window.w
            if (w > 576 && w < 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 20 + 'px'
            } else if (w >= 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 20 + 'px'
                this.$refs.illust.$el.style.paddingTop = '20%'
                this.illustWidth = '72.2%'
            } else {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 'px'
            }
        },
    },
    mounted: function() {
        this.$root.navColor = 1
        this.$root.hasFooter = true
        this.positionIllustration()
        // this.illustHeight = this.$refs.content.offsetHeight
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
