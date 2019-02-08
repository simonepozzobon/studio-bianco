<template lang="html">
    <div class="prima-dopo">
        <div class="prima-dopo-container" ref="containerEstetica">
            <div class="prima-dopo-left" ref="estetica">
                <div class="prima-dopo-content" ref="panelEstetica">
                    <div ref="hDiv" class="prima-dopo-bold-divider"></div>
                    <h1 ref="title" class="prima-dopo-title">Medicina Estetica</h1>
                    <span ref="subtitle" class="prima-dopo-subtitle">Prima e Dopo</span>
                    <div ref="vDiv" class="prima-dopo-v-div"></div>
                    <gallery-container
                        background="brown"
                        ref="galleryEstetica"
                        :items="esteticaArr"/>
                    <scroll-down
                        color="yellow"
                        trigger="scroll-down-trigger"
                        scroll_to="#gallery-odontoiatria"/>
                </div>
            </div>
        </div>
        <div id="gallery-odontoiatria" class="prima-dopo-container" ref="containerOdontoiatria">
            <div class="prima-dopo-left" ref="odontoiatria">
                <div class="prima-dopo-content" ref="panelOdontoiatria">
                    <div class="prima-dopo-bold-divider blue"></div>
                    <h1 ref="title" class="prima-dopo-title">Odontoiatria</h1>
                    <span class="prima-dopo-subtitle">Prima e Dopo</span>
                    <div class="prima-dopo-v-div blue"></div>
                    <gallery-container
                        background="blue"
                        ref="galleryOdontoiatria"
                        :items="odontoiatriaArr"/>
                </div>
            </div>
        </div>
        <div id="scroll-down-trigger"></div>
        <main-footer />
    </div>
</template>

<script>
import GalleryContainer from '../components/GalleryContainer.vue'
import MainFooter from '../containers/MainFooter.vue'
import ScrollDown from '../components/ScrollDown.vue'

export default {
    name: 'PrimaEDopo',
    components: {
        GalleryContainer,
        MainFooter,
        ScrollDown,
    },
    watch: {
        '$root.window': function(value) {
            this.positionIllustration()
            this.getContainersHeight()
        }
    },
    data: function() {
        return {
            studioWidth: '83%',
            estetica: 0,
            odontoiatria: 0,
            esteticaArr: null,
            odontoiatriaArr: null,
        }
    },
    methods: {
        getContainersHeight: function() {
            this.estetica = this.$refs.estetica.offsetHeight
            this.odontoiatria = this.$refs.odontoiatria.offsetHeight
        },
        positionIllustration: function() {
            let w = this.$root.window.w
            if (w > 576 && w < 1920) {
                this.$refs.containerEstetica.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
                this.$refs.containerOdontoiatria.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
            } else if (w >= 1920) {
                this.$refs.containerEstetica.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
                this.$refs.containerOdontoiatria.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
            } else {
                this.$refs.containerEstetica.style.paddingTop = this.$root.navbarHeight + 'px'
                this.$refs.containerOdontoiatria.style.paddingTop = this.$root.navbarHeight + 'px'
            }

            // Definizione degli elementi (galleria e contenitore)
            let elEstetica = this.$refs.galleryEstetica.$el
            let elOdontoiatria = this.$refs.galleryOdontoiatria.$el

            let galleryEstetica = elEstetica.getElementsByClassName('gallery-bg')[0]
            let galleryOdontoiatria = elOdontoiatria.getElementsByClassName('gallery-bg')[0]


            if (!this.$root.isMobile) {
                let contentHeight = this.$refs.panelEstetica.offsetHeight
                // let contentHeight = this.$refs.panelOdontoiatria.offsetHeight
                let windowHeight = this.$root.window.h - this.$root.navbarFullHeight
                let galleryEsteticaHeight = this.$refs.galleryEstetica.$el.offsetHeight
                let galleryOdontoiatriaHeight = this.$refs.galleryOdontoiatria.$el.offsetHeight
                // console.log('differenza', contentHeight, windowHeight)


                if (contentHeight <= windowHeight) {
                    this.$refs.estetica.style.position = 'relative'
                    this.$refs.panelEstetica.style.top = '5vh'
                    this.$refs.panelOdontoiatria.style.top = '5vh'

                    elEstetica.style.height = null
                    elOdontoiatria.style.height = null
                    galleryEstetica.style.height = null
                    galleryOdontoiatria.style.height = null

                } else {
                    this.$refs.estetica.style.position = null
                    this.$refs.panelEstetica.style.top = null
                    this.$refs.panelOdontoiatria.style.top = null
                    // console.log('va regolata la dimensione')

                    let hDiv = this.$refs.hDiv.offsetHeight + 16
                    let vDiv = this.$refs.vDiv.offsetHeight + 32
                    let title = this.$refs.title.offsetHeight + 8
                    let subtitle = this.$refs.subtitle.offsetHeight

                    let headingHeight = hDiv + vDiv + title + subtitle
                    let delta = windowHeight - headingHeight - (16 * 4 * 2) - 200

                    // elEstetica.style.height = delta + 'px'
                    // elOdontoiatria.style.height = delta + 'px'
                    //
                    // galleryEstetica.style.height = delta + 'px'
                    // galleryOdontoiatria.style.height = delta + 'px'
                    // console.log(headingHeight, delta, windowHeight)
                }

            } else {
                this.$refs.estetica.style.position = null

                elEstetica.style.height = null
                elOdontoiatria.style.height = null
                galleryEstetica.style.height = null
                galleryOdontoiatria.style.height = null
            }
        },
    },
    mounted: function() {
        this.$root.navColor = 2
        this.esteticaArr = this.$root.comparisons.filter(item => {
            return item.category_id == 1
        })
        this.odontoiatriaArr = this.$root.comparisons.filter(item => {
            return item.category_id == 2
        })
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
