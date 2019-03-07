<template lang="html">
    <div class="about-studio">
        <div class="about-studio__action">
            <button class="btn btn-purple" @click="toggle($event, false)">
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
                        @ready="init('odontoiatria')"
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
                        @ready="init('estetica')"
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
    watch: {
        '$root.window.w': function(w) {
            if (this.initialized) {
                this.resetAnim()
            }
        }
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
            baseEase: Sine.easeInOut,
            ease_2: Sine.easeInOut,
            ease_3: Back.easeOut.config(1.1),
            ease_4: Back.easeIn.config(1.1),//Back.easeInOut.config(1.1),
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
            hasListener: false,
            counter: 0,
            resolveCounter: 0,
        }
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
                this.$root.swiperInitialized = true
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


            let actionO = this.$refs.action_o
            let actionE = this.$refs.action_e

            TweenLite.set([odontoiatra, estetica], {
                height: 0,
                autoAlpha: 0,
                transformOrigin: 'center bottom 0',
            })

            TweenLite.set([actionO, actionE], {
                autoAlpha: 0,
            })

            this.$nextTick(() => {
                let odontoiatraC = this.$refs.odontoiatraContainer
                let esteticaC = this.$refs.esteticaContainer

                let rectOC = odontoiatraC.getBoundingClientRect()
                let rectEC = esteticaC.getBoundingClientRect()

                this.galleries[2].h = rectOC.height
                this.galleries[2].w = rectOC.width
                this.galleries[3].h = rectEC.height
                this.galleries[3].w = rectEC.width

                let master = new TimelineMax()
                master.fromTo(mainContainer, .5, {
                    height: rectMain.height,
                    opacity: 0,
                    transformOrigin: 'center top 0',
                    ease: Back.easeIn,
                },{
                    height: 0,
                    opacity: 1,
                    position: 'relative',
                    transformOrigin: 'center top 0',
                    ease: Back.easeInOut,
                }).eventCallback('onComplete', () => {
                    if (!this.master) {
                        this.initAnim()
                    }

                    if (!this.initialized) {
                        this.initialized = true
                    }
                })



            })


        },
        checkTimelines: function() {
            let timelines = []

            this.$on('completed', timeline => {
                timelines.push(timeline)

                if (timelines.length == this.counter) {
                    for (let i = 0; i < timelines.length; i++) {
                        timelines[i].kill()
                        timelines.splice(i, 1)
                        this.counter--
                    }
                }
            })
        },
        resetAnim: function() {

            this.hasListener = true
            let odontoiatra = this.$refs.odontoiatra
            let estetica = this.$refs.estetica
            let mainContainer = this.$refs.galleries
            let icon = this.$refs.icon.$el
            let odontoiatraC = this.$refs.odontoiatraContainer
            let esteticaC = this.$refs.esteticaContainer
            let actionO = this.$refs.action_o
            let actionE = this.$refs.action_e


            if (this.master) {
                this.toggle(null, true).then(() => {
                    this.master.pause().progress(0).kill()
                    let galleryEl = document.getElementsByClassName('studio-images')

                    TweenLite.set(mainContainer, {
                        height: this.mainCHeight,
                        position: 'auto',
                        opacity: 0,
                        transformOrigin: 'center top 0',
                    })
                    TweenLite.set([odontoiatra, estetica], {
                        height: 'auto',
                        autoAlpha: 1,
                        transformOrigin: 'center bottom 0',
                    })
                    TweenLite.set(galleryEl, {
                        clearProps: 'all'
                    })

                    TweenLite.set([actionO, actionE], {
                    })

                    TweenLite.set([
                            odontoiatra,
                            estetica,
                            mainContainer,
                            icon,
                            odontoiatraC,
                            esteticaC,
                            actionO,
                            actionE
                        ], {
                            clearProps: 'all'
                        })

                    this.$nextTick(() => {
                        this.$refs.galleryE.swiper.update()
                        this.$refs.galleryO.swiper.update()
                        this.getGalleryHeight()
                    })
                })
            } else {
                console.log('cnonn ci siamp');
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
        generateMainClose: function(timeline, el, height, scale, duration) {
            let invscale = 1 / scale

            return timeline.fromTo(el, duration, {
                autoAlpha: 0,
                height: 0,
                transformOrigin: 'center top 0',
                ease: ExpoScaleEase.config(scale, 1, this.baseEase),
            }, {
                autoAlpha: 1,
                height: height,
                transformOrigin: 'center top 0',
                ease: ExpoScaleEase.config(scale, 1, this.baseEase),
            }, 0)
        },
        openGallery: function(el, container, h, hC, wC, oIdx, direction = true) {
            return new Promise(resolve => {
                let scale = 0.9
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
                    padding: padding,
                    transformOrigin: 'center bottom 0',
                    ease: ExpoScaleEase.config(scale, 1, baseEase),
                }, {
                    padding: padding,
                    transformOrigin: 'center bottom 0',
                    ease: ExpoScaleEase.config(scale, 1, baseEase),
                }, 0)

                gallery.fromTo(container, duration, {
                    padding: 0,
                    transformOrigin: 'center bottom 0',
                    ease: ExpoScaleEase.config(scale, 1, this.ease_4),
                }, {
                    padding: padding,
                    transformOrigin: 'center bottom 0',
                    ease: ExpoScaleEase.config(scale, 1, this.ease_3),
                }, 0)

                gallery.fromTo(container, duration, {
                    width: wC + (padding * 2),
                    transformOrigin: 'center bottom 0',
                    ease: ExpoScaleEase.config(invscale, 1, this.baseEase),
                }, {
                    width: containerWidth,
                    transformOrigin: 'center bottom 0',
                    ease: ExpoScaleEase.config(invscale, 1, this.baseEase),
                }, 0)

                gallery.fromTo(container, duration, {
                    height: hC,
                    backgroundColor: 'transparent',
                    ease: ExpoScaleEase.config(scale, 1, this.baseEase),
                }, {
                    height: containerHeight,
                    backgroundColor: 'white',
                    ease: ExpoScaleEase.config(scale, 1, this.baseEase),
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

                let borderColor = invscale
                let borderDuration = duration - .4

                if (borderDuration <= .1) {
                    borderDuration = .2
                }

                if (!direction) {
                    borderColor = scale
                }

                gallery.fromTo(el, borderDuration, {
                    borderColor: 'transparent',
                    ease: ExpoScaleEase.config(borderColor, 1, this.baseEase),
                }, {
                    borderColor: '#dda48f',
                    ease: ExpoScaleEase.config(borderColor, 1, this.baseEase),
                }, .4)


                if (direction) {
                    if (this.opened && this.opened.el == el) {
                        this.generateMainClose(gallery, mainContainer, mainCH, scale, duration)
                    } else if (!this.opened) {
                        this.generateMainClose(gallery, mainContainer, mainCH, scale, duration)
                    } else if (this.opened && this.opened.el != el) {
                        if (!this.open) {
                            this.generateMainClose(gallery, mainContainer, mainCH, scale, duration)
                        }
                    }
                } else {
                    if (!this.opened && !this.open) {
                        this.generateMainClose(gallery, mainContainer, mainCH, scale, duration)
                    }
                }

                gallery.progress(1).progress(0)

                if (direction) {
                    gallery.eventCallback('onComplete', () => {
                        this.$emit('completed', gallery)
                        resolve()
                    })

                } else {
                    gallery.eventCallback('onReverseComplete', () => {
                        this.$emit('completed', gallery)
                        resolve()
                    })
                }

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
            })
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
                this.counter = this.counter + 2

            } else {
                this.openGallery(el, container, this.galleries[0].h, this.galleries[2].h, this.galleries[2].w, 3)
                this.counter = this.counter + 1

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
                this.counter = this.counter + 2
            } else {
                this.openGallery(el, container, this.galleries[1].h, this.galleries[3].h, this.galleries[3].w, 2)
                this.counter = this.counter + 1

            }
        },
        toggle: function(event, reset = false) {
            return new Promise(resolve => {
                let el = this.$refs.odontoiatra
                let container = this.$refs.odontoiatraContainer

                if (this.master) {  // se l'animazioni è stata inizializzata
                    if (!this.open) {
                        // apre pannello
                        if (reset) {
                            resolve()
                        } else {
                            this.openGallery(el, container, this.galleries[0].h, this.galleries[2].h, this.galleries[2].w, 3).then(() => {
                                resolve()
                            })
                            this.master.progress(0).play()
                            this.open = true
                        }
                    } else {
                        if (this.opened) {
                            let open = this.opened
                            this.opened = null
                            this.open = false

                            this.$nextTick(() => {
                                this.openGallery(open.el, open.container, open.h, open.hC, open.wC, null, false).then(() => {
                                    resolve()
                                })
                                this.counter++
                                this.master.progress(1).reverse()
                            })
                        } else {
                            this.master.progress(1).reverse()
                            this.open = false
                        }
                    }
                }
            })

        },
        init: function(type) {
        }
    },
    mounted: function() {
        this.checkTimelines()
        if (this.$root.swiperInitialized) {
            this.getGalleryHeight()

        }
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
    // max-width: 1100px;
    // min-height: 400px;
    // opacity: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    overflow: hidden;
    height: auto;

    &__gallery {
        width: 90%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        // background-color: $white;
        // padding: $spacer * 3/2;

        overflow: hidden;
        height: auto;

        @include media-breakpoint-down('xxl') {
            width: 60%; // da rivedere per responsive
        };

        @include media-breakpoint-down('xl') {
            width: 70%; // da rivedere per responsive
        };

        @include media-breakpoint-down('md') {
            width: 90%; // da rivedere per responsive
        };

    }


    &__container {
        position: relative;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: flex-start;

        border-width: 3px;
        border-style: solid;
        border-color: #dda48f;

        overflow: hidden;
        height: auto;
    }


    .studio-images {
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);

        // max-width: 1100px;
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
