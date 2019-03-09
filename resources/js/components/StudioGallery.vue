<template lang="html">
    <div class="about-studio">
        <div class="about-studio__action">
            <button class="btn btn-purple" @click="toggle($event, false)">
                <span>foto studio </span>
                <icon-arrow-down  width="16px" ref="icon"/>
            </button>
        </div>
        <div class="studio-gallery" ref="galleries">
            <div class="studio-gallery__gallery" ref="galleryContainer">
                <div class="studio-gallery__container" ref="gallery">
                    <gallery-images
                        ref="galleryO"
                        class="studio-images"
                        :items="this.images"
                        :single="true"
                        :listen-change="true"
                        @slide-change="slideChange"
                        @ready="init"
                        @images-ready="imagesReady"/>
                </div>
                <div class="gallery-select" ref="action_o">
                    <div class="gallery-select__container">
                        <span class="gallery-select__dot">•</span>
                        <span class="gallery-select__text"> {{ galleryText }} </span>
                        <span class="gallery-select__dot">•</span>
                    </div>
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
            images: [
                { img: '/img/odontoiatria_01.jpg', type: 'odontoiatria' },
                { img: '/img/odontoiatria_02.jpg', type: 'odontoiatria' },
                { img: '/img/odontoiatria_03.jpg', type: 'odontoiatria' },
                { img: '/img/odontoiatria_04.jpg', type: 'odontoiatria' },
                { img: '/img/medicina_estetica_01.jpg', type: 'estetica' },
                { img: '/img/medicina_estetica_02.jpg', type: 'estetica' },
                { img: '/img/medicina_estetica_03.jpg', type: 'estetica' },
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
                { h: 0, w: 0 }, //galleryContainer
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
            galleryTextCache: 'odontoiatria',
            galleryText: 'Odontoiatria',
            isAnimating: false,
            animCache: [],
            testCounter: 0,
        }
    },
    methods: {
        uuid: function() {
            // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            )
        },
        slideChange: function(item) {
            if (item.type == 'odontoiatria' && this.galleryTextCache != 'odontoiatria') {
                this.galleryTextCache = 'odontoiatria'

                let uuid = this.uuid()
                this.cacheAnimation(true, 'Odontoiatria', uuid)

            } else if (item.type == 'estetica' && this.galleryTextCache != 'estetica') {
                this.galleryTextCache = 'estetica'

                let uuid = this.uuid()
                this.cacheAnimation(true, 'Medicina Estetica', uuid)
            }
        },
        generateAnimation: function(newText = null, uuid) {
            let container = this.$refs.action_o
            let el = container.getElementsByClassName('gallery-select__container')[0]

            // genera il nuovo elemento da sostituire
            let clone = el.cloneNode(true)
            let text = clone.getElementsByClassName('gallery-select__text')[0]
            text.innerText = ' ' + newText + ' '
            // imposto l'opacità a zero per non vederlo subito
            clone.style.opacity = 0
            clone.style.position = 'absolute'

            container.appendChild(clone)

            // inizializzo l'animazione
            let master = new TimelineMax({
                paused: true
            })

            master.fromTo(el, .3, {
                autoAlpha: 1,
                position: 'relative',
            }, {
                autoAlpha: 0,
                position: 'absolute',
            }, 0)

            master.fromTo(clone, .3, {
                autoAlpha: 0,
                position: 'absolute',
            }, {
                autoAlpha: 1,
                position: 'relative',
            }, 0)

            // effettuo il preload per avere un animazione più fluida
            master.progress(1).progress(0)
                .eventCallback('onComplete', () => {
                    // aggiungo un callback quando l'animazione è finita
                    // per rimuovere il testo originale e re-imposto la variabile
                    // globale su false per procedere con le altre animazioni in coda
                    container.removeChild(el)
                    this.$nextTick(() => {
                        this.isAnimating = false
                        // lancio cacheAnimation per rimuovere dalla coda la
                        // animazione appena conclusa
                        this.cacheAnimation(false, null, uuid)
                    })
                })

            // ritorno l'animazione pre-caricata per avviarla da cachedPlay()
            return master
        },
        cacheAnimation: function(adding = true, text = null, uuid) {
            if (adding) {
                // genera l'oggetto da aggiungere in coda ma non l'animazione
                // altrimenti il clone potrebbe non esistere o non essere lo stesso
                // quando finisce l'animazione
                let obj = {
                    uuid: uuid,
                    text: text,
                }
                this.animCache.push(obj)
            } else {
                // se deve rimuovere l'animazione conclusa dalla cache,
                // la cerca attraverso uuid e poi la elimina
                let idx = this.animCache.findIndex(obj => obj.uuid == uuid)
                if (idx > -1) {
                    this.animCache.splice(idx, 1)
                    // se la coda ha altre animazioni da fare fa partire la
                    // riproduzione o genera una nuova animazione attraverso
                    // cachedPlay()
                    if (this.animCache.length > 0 && !this.isAnimating) {
                        this.cachedPlay(this.animCache[0])
                    }
                }
            }

            // se non ci sono animazioni e la cache contiene delle animazione avvia la riproduzione
            if (!this.isAnimating) {
                if (this.animCache.length > 0 && adding) {
                    this.cachedPlay(this.animCache[0])
                }
            }
        },
        cachedPlay: function(obj) {
            // se l'oggetto ha l'animazione allora riproduce la timeline
            if (obj.hasOwnProperty('animation')) {
                // imposta la variabile globale su true
                this.isAnimating = true
                // poi fa partire la riproduzione
                this.$nextTick(() => {
                    obj.animation.play()
                })
            } else {
                // altrimenti ne genera una con le caratteristiche scelte
                // e poi la riproduce
                let animation = this.generateAnimation(obj.text, obj.uuid)
                let newobj = {
                    ...obj,
                    animation: animation
                }
                this.cachedPlay(newobj)
            }
        },
        imagesReady: function() {
            if (!this.initialized) {
                this.getGalleryHeight()
                this.$root.swiperInitialized = true
            }
        },
        getGalleryHeight: function() {
            let odontoiatra = this.$refs.gallery
            let mainContainer = this.$refs.galleries

            let rectO = odontoiatra.getBoundingClientRect()
            let rectMain = mainContainer.getBoundingClientRect()

            this.galleries[0].h = rectO.height
            this.galleries[0].w = rectO.width
            this.mainCHeight = rectMain.height

            let actionO = this.$refs.action_o

            TweenLite.set(odontoiatra, {
                height: 0,
                autoAlpha: 0,
                transformOrigin: 'center bottom 0',
            })

            TweenLite.set(actionO, {
                autoAlpha: 0,
            })

            this.$nextTick(() => {
                let odontoiatraC = this.$refs.galleryContainer
                let rectOC = odontoiatraC.getBoundingClientRect()

                this.galleries[1].h = rectOC.height
                this.galleries[1].w = rectOC.width

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
            let odontoiatra = this.$refs.gallery
            let mainContainer = this.$refs.galleries
            let icon = this.$refs.icon.$el
            let odontoiatraC = this.$refs.galleryContainer
            let actionO = this.$refs.action_o


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
                    TweenLite.set(odontoiatra, {
                        height: 'auto',
                        autoAlpha: 1,
                        transformOrigin: 'center bottom 0',
                    })
                    TweenLite.set(galleryEl, {
                        clearProps: 'all'
                    })

                    TweenLite.set(actionO, {
                    })

                    TweenLite.set([
                            odontoiatra,
                            mainContainer,
                            icon,
                            odontoiatraC,
                            actionO,
                        ], {
                            clearProps: 'all'
                        })

                    this.$nextTick(() => {
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
            let el = this.$refs.gallery
            let container = this.$refs.galleryContainer
            let actionO = this.$refs.action_o


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

            this.master.progress(1).progress(0)

            // debug
            this.toggle()
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
                let mainCH = this.mainCHeight + (padding * 5) + hC + otherHC

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
            let el = this.$refs.gallery
            let container = this.$refs.galleryContainer


            if (this.opened) {
                let open = this.opened
                this.openGallery(open.el, open.container, open.h, open.hC, open.wC, null, false)
                this.openGallery(el, container, this.galleries[0].h, this.galleries[1].h, this.galleries[1].w, 3)
                this.counter = this.counter + 2

            } else {
                this.openGallery(el, container, this.galleries[0].h, this.galleries[1].h, this.galleries[1].w, 3)
                this.counter = this.counter + 1

            }
        },
        toggle: function(event, reset = false) {
            return new Promise(resolve => {
                let el = this.$refs.gallery
                let container = this.$refs.galleryContainer

                if (this.master) {  // se l'animazioni è stata inizializzata
                    if (!this.open) {
                        // apre pannello
                        if (reset) {
                            resolve()
                        } else {
                            this.openGallery(el, container, this.galleries[0].h, this.galleries[1].h, this.galleries[1].w, 3).then(() => {
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
    opacity: 1;

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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // padding-top: $spacer * 3/2;

    &__container {
        position: relative;
        display: flex;
        align-items: center;
    }

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
