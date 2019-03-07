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
                        ref="galleryO"
                        class="studio-images"
                        :items="this.odonto"
                        :single="true"
                        @images-ready="imagesReady('odontoiatria')"/>
                </div>
                <div class="gallery-select" @click="openOdonto" ref="action_o">
                    <span class="gallery-select__dot">•</span>
                    <span class="gallery-select__text"> Odontoiatra </span>
                    <span class="gallery-select__dot">•</span>
                </div>
            </div>
            <div class="studio-gallery__gallery" ref="esteticaContainer">
                <div class="studio-gallery__container" ref="estetica">
                    <gallery-images
                        ref="galleryE"
                        class="studio-images"
                        :items="this.estetica"
                        :single="true"
                        @images-ready="imagesReady('estetica')"/>
                </div>
                <div class="gallery-select" @click="openEstetica" ref="action_e">
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
            ease_2: Power4.easeInOut,
            ease_3: Back.easeIn.config(1.1),
            ease_4: Back.easeOut.config(1.1),
            ease_5: Back.easeInOut,
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
            initialized: false,
            ready: {
                odontoiatria: false,
                estetica: false,
            },
            mainCHeightCache: 0,
            mainCHeight: 0,
        }
    },
    watch: {
    },
    methods: {
        imagesReady: function(type) {
            switch (type) {
                case 'odontoiatria':
                    this.ready.odontoiatria = true
                    break;
                case 'estetica':
                    this.ready.estetica = true
                    break;
            }

            if (!this.initialized && this.ready.estetica && this.ready.odontoiatria) {
                this.getGalleryHeight()
            }
        },
        getGalleryHeight: function() {
            let odontoiatra = this.$refs.odontoiatra
            let estetica = this.$refs.estetica
            let mainContainer = this.$refs.galleries

            let rectO = odontoiatra.getBoundingClientRect()
            let rectE = estetica.getBoundingClientRect()
            let rectMain = mainContainer.getBoundingClientRect()

            this.galleries[0].h = rectO.height
            this.galleries[0].w = rectO.width
            this.galleries[1].h = rectE.height
            this.galleries[1].w = rectE.width
            this.mainCHeight = rectMain.height

            TweenLite.set([odontoiatra, estetica], {
                height: 0,
                autoAlpha: 0,
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


            TweenLite.set(mainContainer, {
                height: 0,
                position: 'relative',
                transformOrigin: 'center top 0',
            })

            if (!this.master) {
                this.initAnim()
            }

            if (!this.initialized) {
                this.initialized = true
            }

        },
        initAnim: function() {
            let icon = this.$refs.icon.$el
            let el = this.$refs.odontoiatra
            let container = this.$refs.odontoiatraContainer
            let actionO = this.$refs.action_o
            let actionE = this.$refs.action_e


            this.master = new TimelineMax({
                paused: true,
                reversed: true,
            })

            this.master.fromTo(icon, .3, {
                directionalRotation: {  rotation: '0_ccw' },
                scale: 1,
                transformOrigin: 'center center 0',
                ease: Back.easeIn,
            }, {
                directionalRotation: { rotation: '-90_ccw' },
                scale: .7,
                transformOrigin: 'center center 0',
                ease: Power0.easeNone,
            }, 0)

            this.master.fromTo(icon, .3, {
                directionalRotation: { rotation: '-90_ccw' },
                scale: .7,
                transformOrigin: 'center center 0',
                ease: Power0.easeNone,
            }, {
                directionalRotation: { rotation: '180_ccw' },
                scale: 1,
                transformOrigin: 'center center 0',
                ease: Back.easeOut,
            }, .3)

            this.master.fromTo(actionO, .6, {
                autoAlpha: 0,
                yPercent: -40,
                zIndex: -1,
                ease: this.ease_2,
            }, {
                autoAlpha: 1,
                yPercent: 0,
                zIndex: 0,
                ease: this.ease_2,
            }, 0)

            this.master.fromTo(actionE, .6, {
                autoAlpha: 0,
                yPercent: -80,
                zIndex: 0,
                ease: Back.easeIn,
            }, {
                autoAlpha: 1,
                yPercent: 0,
                zIndex: 1,
                ease: Back.easeOut,
            }, .2)

            this.master.progress(1).progress(0)
        },
        generateMainClose: function(timeline, el, height, scale) {
            let invscale = 1 / scale

            return timeline.fromTo(el, .6, {
                autoAlpha: 0,
                height: 0,
                ease: ExpoScaleEase.config(scale, 1, this.baseEase),
            }, {
                autoAlpha: 1,
                height: height,
                ease: ExpoScaleEase.config(scale, 1, this.baseEase),
            }, 0)
        },
        openGallery: function(el, container, h, hC, wC, oIdx, direction = true) {
            let scale = 2
            let baseEase = this.baseEase
            let duration = 0.6
            let invscale = 1 / scale
            let padding = 24

            let galleryHeight = h + (padding * 3)
            let containerHeight = h + hC + (padding * 5)
            let containerWidth = wC + (padding * 4)

            let galleryEl = el.getElementsByClassName('studio-images')[0]

            let otherHC = 0
            if (oIdx) {
                otherHC = this.galleries[oIdx].h
            }

            let mainContainer = this.$refs.galleries
            let mainCH = this.mainCHeight + (padding * 5) + hC + otherHC - h


            let gallery = new TimelineMax({
                paused: true,
                reversed: true,
                yoyo: true,
            })

            gallery.fromTo(galleryEl, duration, {
                padding: 0,
                ease: ExpoScaleEase.config(scale, 1, baseEase),
            }, {
                padding: padding,
                ease: ExpoScaleEase.config(scale, 1, baseEase),
            }, 0)

            gallery.fromTo(container, duration, {
                height: hC,
                backgroundColor: 'transparent',
                padding: 0,
                transformOrigin: 'center bottom 0',
                ease: ExpoScaleEase.config(scale, 1, this.ease_3),
            }, {
                height: containerHeight,
                backgroundColor: 'white',
                padding: padding,
                transformOrigin: 'center bottom 0',
                ease: ExpoScaleEase.config(scale, 1, this.ease_4),
            }, 0)

            gallery.fromTo(container, duration, {
                width: wC + (padding * 2),
                transformOrigin: 'center center 0',
                ease: ExpoScaleEase.config(invscale, 1, this.baseEase),
            }, {
                width: containerWidth,
                transformOrigin: 'center center 0',
                ease: ExpoScaleEase.config(invscale, 1, this.baseEase),
            }, 0)

            gallery.fromTo(el, duration, {
                height: 0,
                marginBottom: 0,
                transformOrigin: 'center bottom 0',
                ease: ExpoScaleEase.config(invscale, 1, this.ease_3),
            }, {
                height: galleryHeight,
                marginBottom: padding,
                transformOrigin: 'center bottom 0',
                ease: ExpoScaleEase.config(invscale, 1, this.ease_4),
            }, 0)

            gallery.fromTo(el, duration, {
                autoAlpha: 0,
                ease: ExpoScaleEase.config(scale, 1, this.baseEase),
            }, {
                autoAlpha: 1,
                ease: ExpoScaleEase.config(scale, 1, this.baseEase),
            }, 0)


            if (direction) {
                if (this.opened && this.opened.el == el) {
                    this.generateMainClose(gallery, mainContainer, mainCH, scale)
                } else if (!this.opened) {
                    this.generateMainClose(gallery, mainContainer, mainCH, scale)
                } else if (this.opened && this.opened.el != el) {
                    if (!this.open) {
                        this.generateMainClose(gallery, mainContainer, mainCH, scale)
                    }
                }
            } else {
                if (!this.opened && !this.open) {
                    this.generateMainClose(gallery, mainContainer, mainCH, scale)
                }
            }

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
                        h: h,
                        hC: hC,
                        wC: wC,

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
                this.openGallery(open.el, open.container, open.h, open.hC, open.wC, null, false)
                this.openGallery(el, container, this.galleries[0].h, this.galleries[2].h, this.galleries[2].w, 3)
            } else {
                this.openGallery(el, container, this.galleries[0].h, this.galleries[2].h, this.galleries[2].w, 3)
            }
        },
        openEstetica: function() {
            this.open = true
            let el = this.$refs.estetica
            let container = this.$refs.esteticaContainer

            if (this.opened) {
                let open = this.opened
                this.openGallery(open.el, open.container, open.h, open.hC, open.wC, null, false)
                this.openGallery(el, container, this.galleries[1].h, this.galleries[3].h, this.galleries[3].w, 2)
            } else {
                this.openGallery(el, container, this.galleries[1].h, this.galleries[3].h, this.galleries[3].w, 2)
            }
        },
        toggle: function() {
            if (this.master) {  // se l'animazioni è stata inizializzata
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
                            this.openGallery(open.el, open.container, open.h, open.hC, open.wC, null, false)
                            this.master.progress(1).reverse()
                        })
                    } else {
                        this.master.progress(1).reverse()
                        this.open = false
                    }
                }
            }
        }
    },
    mounted: function() {
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
    width: 100%;
    max-width: 1100px;
    // min-height: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    overflow: hidden;
    height: auto;

    &__gallery {
        width: 64%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        // background-color: $white;
        // padding: $spacer * 3/2;

        overflow: hidden;
        height: auto;
    }


    &__container {
        position: relative;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        border: 3px solid #dda48f;

        overflow: hidden;
        height: auto;
    }


    .studio-images {
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);

        max-width: 1100px;
        width: 100%;
        height: 100%;

        .swiper-button-prev {
            left: 0% !important;
        }

        .swiper-button-next {
            right: 0% !important;
        }
    }
}

.gallery-select {
    position: relative;
    display: flex;
    align-items: center;
    // padding-top: $spacer * 3/2;

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
