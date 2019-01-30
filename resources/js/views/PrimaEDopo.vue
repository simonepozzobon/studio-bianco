<template lang="html">
    <div class="prima-dopo">
        <div class="prima-dopo-container" ref="container">
            <div class="prima-dopo-left" ref="studioContainer">
                <div class="prima-dopo-content" ref="panel">
                    <div class="prima-dopo-bold-divider"></div>
                    <h1 ref="title" class="prima-dopo-title">Medicina Estetica</h1>
                    <span class="prima-dopo-subtitle">Prima e Dopo</span>
                    <div class="prima-dopo-v-div"></div>
                    <gallery-container background="brown"/>
                </div>
            </div>
        </div>
        <div class="prima-dopo-container" ref="container">
            <div class="prima-dopo-left" ref="studioContainer">
                <div class="prima-dopo-content" ref="panel">
                    <div class="prima-dopo-bold-divider blue"></div>
                    <h1 ref="title" class="prima-dopo-title">Odontoiatria</h1>
                    <span class="prima-dopo-subtitle">Prima e Dopo</span>
                    <div class="prima-dopo-v-div blue"></div>
                    <gallery-container background="blue"/>
                </div>
            </div>
        </div>
        <main-footer />
    </div>
</template>

<script>
import GalleryContainer from '../components/GalleryContainer.vue'
import MainFooter from '../containers/MainFooter.vue'

export default {
    name: 'About',
    components: {
        GalleryContainer,
        MainFooter,
    },
    watch: {
        '$root.window': function(value) {
            this.positionIllustration()
            this.getContainersHeight()

            if (value.w > 1920) {
                this.studioWidth = '70%'
                this.silviaWidth = '49.5%'
                this.pauraWidth = '76%'
            } else {
                this.studioWidth = '83%'
                this.silviaWidth = '69.5%'
                this.pauraWidth = '85%'
            }
        }
    },
    data: function() {
        return {
            studioWidth: '83%',
            silviaWidth: '69.5%',
            pauraWidth: '85%',
            studioHeight: 0,
            silviaHeight: 0,
            pauraHeight: 0,
        }
    },
    methods: {
        getContainersHeight: function() {
            this.studioHeight = this.$refs.studioContainer.offsetHeight
        },
        positionIllustration: function() {
            let w = this.$root.window.w
            if (w > 576 && w < 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
            } else if (w >= 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
                this.studioWidth = '70%'
            } else {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 'px'
            }

            if (!this.$root.isMobile) {
                let contentHeight = this.$refs.panel.offsetHeight
                let windowHeight = this.$root.window.h - this.$root.navbarFullHeight
                let illustHeight = 0

                if (contentHeight <= windowHeight) {
                    this.$refs.studioContainer.style.position = 'relative'
                    this.$refs.panel.style.position = 'absolute'
                    this.$refs.panel.style.top = '5vh'
                } else {
                    this.$refs.studioContainer.style.position = null
                    this.$refs.panel.style.position = null
                    this.$refs.panel.style.top = null
                }

                if (illustHeight > contentHeight) {
                    let delta = (illustHeight - contentHeight) + windowHeight
                    this.$refs.container.style.height = delta + 'px'
                } else {
                    this.$refs.container.style.paddingBottom = null
                }
            } else {
                this.$refs.studioContainer.style.position = null
            }
        },
    },
    mounted: function() {
        this.$root.navColor = 2
        this.positionIllustration()
        this.getContainersHeight()
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

// #prima-dopo-studio-illust-ref,
// #prima-dopo-silvia-illust-ref,
// #prima-dopo-paura-illust-ref {
//     width: 300px;
//     background-color: $red;
//     height: 1px;
// }

.prima-dopo {
    @include make-container();
    background-color: $light-brown;

    .prima-dopo-container {
        @include make-row();
        min-height: 100vh;
        max-width: 100vw;
        overflow: hidden;

        > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            text-align: center;

            @include media-breakpoint-down('md') {
                position: inherit;
            }

            > svg {
                margin-bottom: $spacer * 2;
            }

            h1 {
                display: block;
            }

                &.prima-dopo-illust-top {
                    justify-content: flex-start;
                    @include media-breakpoint-up('xxl') {
                        justify-content: center;
                    }

                    .ref {
                        position: absolute;
                        top: 0;
                    }

                    &.paura {
                        align-items: flex-end;
                        padding-bottom: $spacer * 2;
                    }
                }

                &.prima-dopo-illust-bottom {
                    justify-content: flex-end;
                    @include media-breakpoint-up('xxl') {
                        justify-content: center;
                    }

                    .ref {
                        position: absolute;
                        bottom: 0;
                    }
                }
        }

        .prima-dopo-left {
            @include make-col(12);
        }

        .prima-dopo-content {
            padding: $spacer * 4;
            font-family: $font-family-custom;
            width: 100%;
            position: relative;

            .prima-dopo-bold-divider {
                content: '';
                width: 30px;
                border-top: 6px solid $pink;
                margin-bottom: $spacer;
                margin-left: auto;
                margin-right: auto;

                &.blue {
                    border-top: 6px solid $light-cyan;
                }

            }

            .prima-dopo-v-div {
                content: '';
                height: 53px;
                width: 1px;
                border-left: 1px solid $pink;
                margin-bottom: $spacer;
                margin-top: $spacer;
                margin-left: auto;
                margin-right: auto;

                &.blue {
                    border-left: 1px solid $light-cyan;
                }

                @include media-breakpoint-down('md') {
                    height: 29px;
                }

                @include media-breakpoint-down('xs') {
                    height: 13px;
                }
            }
        }

        .prima-dopo-title {
            font-size: calc(100% + 1vw + 1vh);
        }

        .prima-dopo-subtitle {
            font-family: $font-family-sans-serif;
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

        .prima-dopo-divider {
            margin-bottom: $spacer;
        }
    }
}

</style>
