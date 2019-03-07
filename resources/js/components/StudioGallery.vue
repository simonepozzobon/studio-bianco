<template lang="html">
    <div class="about-studio">
        <div class="about-studio__action">
            <button class="btn btn-purple" @click="toggle">
                <span>foto studio </span>
                <icon-arrow-down  width="16px" ref="icon"/>
            </button>
        </div>
        <div class="studio-gallery" ref="galleries">
            <div class="studio-gallery__gallery" ref="odontoiatraContainer">
                <div class="studio-gallery__container" ref="odontoiatra">
                        <gallery-images
                        :items="this.odonto"
                        :single="true"/>
                </div>
                <div class="gallery-select" @click="openOdonto">
                    <span class="gallery-select__dot">•</span>
                    <span class="gallery-select__text"> Odontoiatra </span>
                    <span class="gallery-select__dot">•</span>
                </div>
            </div>
            <div class="studio-gallery__gallery" ref="esteticaContainer">
                <div class="studio-gallery__container" ref="estetica">
                    <gallery-images
                    :items="this.estetica"
                    :single="true"/>
                </div>
                <div class="gallery-select" @click="openEstetica">
                    <span class="gallery-select__dot">•</span>
                    <span class="gallery-select__text"> Medicina Estetica </span>
                    <span class="gallery-select__dot">•</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GalleryImages from './GalleryImages.vue'
import { IconArrowDown } from '../ui'
export default {
    name: 'StudioGallery',
    components: {
        GalleryImages,
        IconArrowDown,
    },
    data: function() {
        return {
            odonto: [
                { img: '/img/odontoiatria_01.jpg' },
                { img: '/img/odontoiatria_02.jpg' },
                { img: '/img/odontoiatria_03.jpg' },
                { img: '/img/odontoiatria_04.jpg' },
            ],
            estetica: [
                { img: '/img/medicina_estetica_01.jpg' },
                { img: '/img/medicina_estetica_02.jpg' },
                { img: '/img/medicina_estetica_03.jpg' },
            ],
            baseEase: Cubic.easeInOut,
            open: false,
            opened: null,
            master: null,
            button: null,
            gallery_0: null,
            galleries: [
                { h: 0, w: 0 }, // odontoiatra
                { h: 0, w: 0 }, // estetica
                { h: 0, w: 0 }, //odontoiatraContainer
                { h: 0, w: 0 }, //esteticaContainer
            ],
        }
    },
    watch: {
    },
    methods: {
        getGalleryHeight: function() {
            let odontoiatra = this.$refs.odontoiatra
            let estetica = this.$refs.estetica

            let rectO = odontoiatra.getBoundingClientRect()
            let rectE = estetica.getBoundingClientRect()


            this.galleries[0].h = rectO.height
            this.galleries[0].w = rectO.width
            this.galleries[1].h = rectE.height
            this.galleries[1].w = rectE.width


            TweenLite.set([odontoiatra, estetica], {
                height: 0,
                autoAlpha: 0,
                // scaleY: 0,
                transformOrigin: 'center bottom 0',
            })



            let odontoiatraC = this.$refs.odontoiatraContainer
            let esteticaC = this.$refs.esteticaContainer

            let rectOC = odontoiatraC.getBoundingClientRect()
            let rectEC = esteticaC.getBoundingClientRect()

            this.galleries[2].h = rectOC.height
            this.galleries[2].w = rectOC.width
            this.galleries[3].h = rectEC.height
            this.galleries[3].w = rectEC.width

        },
        initAnim: function() {
            let icon = this.$refs.icon.$el
            let el = this.$refs.odontoiatra
            let container = this.$refs.odontoiatraContainer

            this.master = new TimelineMax({
                paused: true,
                reversed: true,
            })

            this.master.fromTo(icon, .6, {
                rotation: 0,
            }, {
                rotation: 180,
            }, 0)

            this.master.progress(1).progress(0)
        },
        openGallery: function(el, container, h, hC, direction = true) {
            let scale = 2
            let baseEase = this.baseEase
            let duration = .6
            let invscale = 1 / scale;

            let gallery = new TimelineMax({
                paused: true,
                reversed: true,
                yoyo: true,
            })

            gallery.fromTo(container, duration, {
                height: hC,
                backgroundColor: 'transparent',
                padding: 0,
                transformOrigin: 'center bottom 0',
                ease: ExpoScaleEase.config(scale, 1, baseEase),
            }, {
                height: (h + hC),
                backgroundColor: 'white',
                paddingLeft: 48,
                paddingRight: 48,
                paddingTop: 48,
                paddingBottom: 24,
                transformOrigin: 'center bottom 0',
                ease: ExpoScaleEase.config(scale, 1, baseEase),
            }, .1)

            gallery.fromTo(el, duration, {
                autoAlpha: 0,
                height: 0,
                // scaleY: 0,
                marginBottom: 0,
                transformOrigin: 'center bottom 0',
                ease: ExpoScaleEase.config(invscale, 1, baseEase),
            }, {
                autoAlpha: 1,
                height: h,
                // scaleY: 1,
                marginBottom: 24,
                transformOrigin: 'center bottom 0',
                ease: ExpoScaleEase.config(invscale, 1, baseEase),
            }, .1)

            gallery.progress(1).progress(0)

            if (direction) {

                if (this.opened && this.opened.el == el) {
                    this.opened = null
                    gallery.progress(1).reverse()
                    this.$nextTick(() => {
                        this.toggle()
                    })
                } else {
                    this.opened = {
                        el: el,
                        container: container,
                        h: this.galleries[0].h,
                        hC: this.galleries[2].h,

                    }
                    gallery.progress(0).play()
                }
            } else {
                gallery.progress(1).reverse()
            }
        },
        openOdonto: function() {
            if (!this.open) {
                this.master.progress(0).play()
                this.open = true
            } else {
                this.open = true
            }
            let el = this.$refs.odontoiatra
            let container = this.$refs.odontoiatraContainer


            if (this.opened) {
                let open = this.opened
                this.openGallery(open.el, open.container, open.h, open.hC, false)
                this.openGallery(el, container, this.galleries[0].h, this.galleries[2].h)
            } else {
                this.openGallery(el, container, this.galleries[0].h, this.galleries[2].h)
            }
        },
        openEstetica: function() {
            this.open = true
            let el = this.$refs.estetica
            let container = this.$refs.esteticaContainer

            if (this.opened) {
                let open = this.opened
                this.openGallery(open.el, open.container, open.h, open.hC, false)
                this.openGallery(el, container, this.galleries[1].h, this.galleries[3].h)
            } else {
                this.openGallery(el, container, this.galleries[1].h, this.galleries[3].h)
            }
        },
        toggle: function() {
            if (!this.open) {
                // apre pannello
                this.openOdonto()
                this.master.progress(0).play()
                this.open = true
            } else {
                if (this.opened) {
                    let open = this.opened
                    this.opened = null
                    this.open = false

                    this.$nextTick(() => {
                        this.openGallery(open.el, open.container, open.h, open.hC, false)
                        this.master.progress(1).reverse()
                    })
                } else {
                    this.master.progress(1).reverse()
                    this.open = false
                }
            }
        }
    },
    mounted: function() {
        this.getGalleryHeight()
        this.$nextTick(() => {
            this.initAnim()
        })
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.about-studio {
    width: 100%;
    // background-color: rgba($black, .5);
    padding-bottom: $spacer * 5;
}

.studio-gallery {
    &__gallery {
        // background-color: $white;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        min-width: 600px;
        height: 300px;

        position: relative;
        overflow: hidden;
        height: auto;
    }

    &__container {
        display: flex;
        position: relative;
        height: 300px;
        width: 600px;
        border: 3px solid #dda48f;
        overflow: hidden;
        // height: auto;
        // justify-content: center;
        align-items: center;
        // background-color: rgba($red, .3);
        // min-height: 300px;
    }
}

.gallery-images {
    position: absolute;
    width: calc(80% - 44px); // da rivedere per responsive
    max-width: 1100px;
    height: 100%;
    z-index: 1;
    border-style: solid;
    border-width: 16px;
    border-top-color: #e1a893;
    border-left-color: #283745;
    border-right-color: #283745;
    border-bottom-color: #e1a893;

    @include media-breakpoint-down('xl') {
        width: calc(80% - 44px); // da rivedere per responsive
    };

    @include media-breakpoint-down('md') {
        width: calc(100% - 44px); // da rivedere per responsive
    };

    @include media-breakpoint-down('xs') {
        border-width: 8px;
    }


}


.gallery-select {
    position: relative;
    display: flex;
    align-items: center;
    padding-bottom: $spacer / 2;
    padding-top: $spacer / 2;

    &__dot {
        display: block;
        margin-left: $spacer / 4;
        margin-right: $spacer / 4;
    }

    &__text {
        font-size: $font-size-sm;
        font-weight: bold;
        display: block;
    }
}

</style>
