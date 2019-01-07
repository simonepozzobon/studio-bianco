<template lang="html">
    <div class="estetica">
        <div class="estetica-container" ref="container">
            <div class="estetica-left" ref="content">
                <div class="estetica-content">
                    <div class="estetica-bold-divider"></div>
                    <h1 ref="title">Servizi</h1>
                    <span class="estetica-subtitle">Medicina Estetica</span>
                    <div class="estetica-v-div"></div>
                    <accordion :items="services"/>
                </div>
            </div>
            <div class="estetica-right estetica-illust-top">
                <estetica-illust
                    :width="illustWidth"
                    ref="illust"
                    trigger="estetica-studio-illust-ref"
                    :containerHeight="illustHeight"/>
                <div id="estetica-studio-illust-ref" class="ref"></div>
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
import EsteticaIllust from '../components/EsteticaIllust.vue'
import MainFooter from '../containers/MainFooter.vue'
import Parcelle from '../components/Parcelle.vue'

export default {
    name: 'Odontoiatria',
    components: {
        Accordion,
        Convenzioni,
        EsteticaIllust,
        MainFooter,
        Parcelle,
    },
    watch: {
        '$root.window': function(value) {
            this.positionIllustration()
            this.illustHeight = this.$refs.content.offsetHeight

            if (value.w > 1920) {
                this.illustWidth = '50%'
            } else {
                this.illustWidth = '60%'
            }
        }
    },
    data: function() {
        return {
            height: 0,
            illustHeight: 0,
            viewport: 0,
            services: this.$root.estetica,
            illustWidth: '60%',
        }
    },
    methods: {
        setViewport: function(value) {
            this.viewport = value
        },
        positionIllustration: function() {
            let w = this.$root.window.w
            if (w > 576 && w < 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 20 + 'px'
            } else if (w >= 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 20 + 'px'
                this.$refs.illust.$el.style.paddingTop = '14%'
                this.illustWidth = '50%'
            } else {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 'px'
            }
        }
    },
    mounted: function(){
        this.$root.navColor = 1
        this.$root.hasFooter = true
        // let el = this.$refs.illust.$el
        // let elSize = el.getBoundingClientRect()
        // this.height = elSize.height
        this.positionIllustration()
        // this.illustHeight = this.$refs.content.offsetHeight
    }
}
</script>

<style lang="scss">
@import '~styles/shared';


.estetica {
    @include make-container();
    background-color: $light-yellow;

    .estetica-container {
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

            &.estetica-illust-top {
                justify-content: flex-start;
                @include media-breakpoint-up('xxl') {
                    justify-content: center;
                }

                .ref {
                    position: absolute;
                    top: 0;
                }
            }
        }

        .estetica-left {
            @include make-col(6);
            @include media-breakpoint-down('md') {
                @include make-col(12);
            }
        }

        .estetica-right {
            @include make-col(6);
            position: relative;

            @include media-breakpoint-down('md') {
                @include make-col(12);
                position: inherit;
            }
        }

    }

    .estetica-content {
        padding: $spacer * 4;
        width: 100%;

        @include media-breakpoint-down('md') {
            padding-left: 0;
            padding-right: 0;
            text-align: center;
        }

        .estetica-bold-divider {
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

        .estetica-v-div {
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

    .estetica-subtitle {
        font-size: calc(60% + 1vw + 1vh);
        font-weight: 300;

    }

    .estetica-divider {
        margin-bottom: $spacer;
    }

    .estetica-parcelle {
        @include make-row();
        background-color: $light;
        min-height: 20vh;

        .estetica-parcelle-container {
            @include make-col(12);
        }
    }

    .estetica-partner {
        @include make-row();
        background-color: $purple;
        min-height: 20vh;

        .estetica-parcelle-container {
            @include make-col(12);
        }
    }
}

</style>
