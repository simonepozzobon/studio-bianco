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
                <div class="gallery-select gallery-select--blue" ref="action_o">
                    <div class="gallery-select__container">
                        <span class="gallery-select__dot">•</span>
                        <div class="gallery-select__text-container">
                            <div class="gallery-select__text-frame">
                                <span class="gallery-select__text"> {{ galleryText }} </span>
                            </div>
                        </div>
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
import CustomEase from 'gsap/CustomEase'
// import GSDevTools from 'gsap/GSDevTools'
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
            ease_6: Back.easeInOut.config(1.1),
            ease_7: Power4.easeInOut,
            customEase: '',
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
            colors: [
                'blue',
                'yellow'
            ],
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
                this.cacheAnimation(true, 'Odontoiatria', uuid, 'blue')

            } else if (item.type == 'estetica' && this.galleryTextCache != 'estetica') {
                this.galleryTextCache = 'estetica'

                let uuid = this.uuid()
                this.cacheAnimation(true, 'Medicina Estetica', uuid, 'yellow')
            }


            // let uuid = this.uuid()
            // let colorId
            //
            // if (this.testCounter == 0) {
            //     colorId = 1
            //
            // } else {
            //     colorId = 0
            // }
            //
            // this.testCounter = colorId
            // this.cacheAnimation(true, Math.random(), uuid, this.colors[colorId])
        },
        generateAnimation: function(obj) {
            let newText = obj.text
            let uuid = obj.uuid
            let color = obj.color
            let container = this.$refs.action_o
            let el = container.getElementsByClassName('gallery-select__container')[0]
            let clone = el.cloneNode(true)


            let elTextC = el.getElementsByClassName('gallery-select__text-container')[0]
            let elTextF = el.getElementsByClassName('gallery-select__text-frame')[0]
            let elText = el.getElementsByClassName('gallery-select__text')[0]

            let elHeight = el.getBoundingClientRect().height

            let dots = el.getElementsByClassName('gallery-select__dot')
            let dotL = dots[0]
            let dotR = dots[1]
            let dotLRect = dotL.getBoundingClientRect()
            let dotRRect = dotR.getBoundingClientRect()

            let elTextCRect = elTextC.getBoundingClientRect()
            let elTextW = elTextCRect.width



            elTextC.style.position = 'relative'
            elTextC.style.overflow = 'hidden'
            elTextC.style.width = elTextW + 'px'
            elTextC.style.height = elTextCRect.height + 'px'

            elTextF.style.position = 'absolute'
            elTextF.style.overflow = 'hidden'
            elTextF.style.height = elTextCRect.height + 'px'
            elTextF.style.width = elTextW + 'px'

            elText.style.display = 'inline-block'
            elText.style.position = 'absolute'
            elText.style.width = elTextW + 'px'

            let textMid = elTextCRect.left - elTextCRect.right

            // imposto un'altezza minima all container per evitare degli scatti
            // quando passo da posizione assoluta a relativa

            container.style.minHeight = elHeight + 'px'

            // genera il nuovo elemento da sostituire
            let text = clone.getElementsByClassName('gallery-select__text')[0]
            text.innerText = ' ' + newText + ' '

            // imposto l'opacità a zero per non vederlo subito
            clone.classList.remove('gallery-select--blue', 'gallery-select--yellow')
            clone.classList.add('gallery-select--'+color)

            clone.style.opacity = 0
            clone.style.position = 'absolute'
            // clone.style.overflow = 'hidden'
            container.appendChild(clone)

            let elTextCC = clone.getElementsByClassName('gallery-select__text-container')[0]
            let elTextFC = clone.getElementsByClassName('gallery-select__text-frame')[0]
            let elTextClone = clone.getElementsByClassName('gallery-select__text')[0]

            let dotsC = clone.getElementsByClassName('gallery-select__dot')
            let dotCL = dotsC[0]
            let dotCR = dotsC[1]
            let dotCLRect = dotCL.getBoundingClientRect()
            let dotCRRect = dotCR.getBoundingClientRect()


            let elTextCCRect = elTextCC.getBoundingClientRect()
            let elTextWC = elTextCCRect.width


            elTextCC.style.position = 'relative'
            elTextCC.style.overflow = 'hidden'
            elTextCC.style.width = elTextWC + 'px'
            elTextCC.style.height = elTextCCRect.height + 'px'

            elTextFC.style.position = 'absolute'
            elTextFC.style.overflow = 'hidden'
            elTextFC.style.height = elTextCCRect.height + 'px'
            elTextFC.style.width = 0

            elTextClone.style.display = 'block'
            elTextClone.style.position = 'absolute'
            elTextClone.style.width = elTextWC + 'px'

            let textMidC = elTextCCRect.left - elTextCCRect.right
            let LCMid = dotCRRect.left - dotCLRect.left
            let RCMid = dotCLRect.left - dotCRRect.left


            let LxDelta = dotCLRect.left - dotLRect.left
            let RxDelta = dotCRRect.left - dotRRect.left
            let LMid = dotRRect.left - dotLRect.left
            let RMid = dotLRect.left - dotRRect.left

            // inizializzo l'animazione
            let scale = 2
            let duration = .4
            let durationFaster = duration - (duration * 0.3)
            let duration33 = durationFaster - (durationFaster * 0.3)
            let duration40 = durationFaster - (durationFaster * 0.4)
            let dotOpacityTime = durationFaster * 0.3
            let ease_6 = this.customEase
            let outEase = this.ease_7
            let inEase = this.ease_3
            let invscale = 1 / scale

            // console.log('total', duration + durationFaster );

            let startColor = '#b1c5cf'
            let endColor = '#dcba80'

            if (color == 'blue') {
                startColor = '#dcba80'
                endColor = '#b1c5cf'
            }

            let master = new TimelineMax({
                id: uuid,
                paused: true,
            })

            // master.addLabel('bouncyBalls', duration33)


            master.set(el, {
                position: 'absolute',
            })

            // pallini vanno verso il centro
            master.fromTo(dotL, durationFaster, {
                x: 0,
                ease: ExpoScaleEase.config(invscale, 1, ease_6),
            }, {
                x: LMid / 2,
                ease: ExpoScaleEase.config(invscale, 1, ease_6),
            }, 0)

            master.fromTo(dotR, durationFaster, {
                x: 0,
                ease: ExpoScaleEase.config(invscale, 1, ease_6),
            }, {
                x: RMid / 2,
                ease: ExpoScaleEase.config(invscale, 1, ease_6),
            }, 0)

            master.fromTo([dotL, dotR], durationFaster, {
                color: startColor,
            }, {
                color: endColor,
            }, 0)

            master.addLabel('bouncyBalls', duration33)
            master.addLabel('secondPart', durationFaster)

            master.fromTo([dotL, dotR], dotOpacityTime, {
                autoAlpha: 1,
            }, {
                autoAlpha: 0,
            }, duration40)

            // testo a scomparsa centrale
            master.fromTo(elTextF, duration, {
                width: elTextW,
                transformOrigin: 'center center',
                ease: ExpoScaleEase.config(scale, 1, inEase),
            }, {
                width: 0,
                transformOrigin: 'center center',
                ease: ExpoScaleEase.config(scale, 1, inEase),
            }, 0)

            master.fromTo(elText, duration, {
                x: 0,
                ease: ExpoScaleEase.config(scale, 1, inEase),
            }, {
                x: textMid / 2,
                ease: ExpoScaleEase.config(scale, 1, inEase),
            }, 0)

            master.fromTo(elText, durationFaster, {
                opacity: 1,
                ease: ExpoScaleEase.config(scale, 1, outEase),
            }, {
                opacity: 0,
                ease: ExpoScaleEase.config(scale, 1, outEase),
            }, 0)


            master.fromTo([elTextF], .1, {
                autoAlpha: 1,
            }, {
                autoAlpha: 0,
            }, duration33)

            master.addLabel('destroyOld', duration)

            // Clone

            master.fromTo(clone, .1, {
                autoAlpha: 0,
            }, {
                autoAlpha: 1,
            }, duration33)

            master.fromTo(dotCL, duration, {
                x: LCMid / 2,
                // ease: ExpoScaleEase.config(invscale, 1, inEase),
                ease: ExpoScaleEase.config(scale, 1, ease_6),
            }, {
                x: 0,
                // ease: ExpoScaleEase.config(invscale, 1, inEase),
                ease: ExpoScaleEase.config(scale, 1, ease_6),
            }, duration33)

            master.fromTo(dotCR, duration, {
                x: RCMid / 2,
                // ease: ExpoScaleEase.config(invscale, 1, inEase),
                ease: ExpoScaleEase.config(scale, 1, ease_6),
            }, {
                x: 0,
                // ease: ExpoScaleEase.config(invscale, 1, inEase),
                ease: ExpoScaleEase.config(scale, 1, ease_6),
            }, duration33)


            master.fromTo(elTextFC, durationFaster, {
                width: 0,
                transformOrigin: 'center center',
                ease: ExpoScaleEase.config(invscale, 1, outEase),
            }, {
                width: elTextWC,
                transformOrigin: 'center center',
                ease: ExpoScaleEase.config(invscale, 1, outEase),
            }, durationFaster)

            master.fromTo(elTextClone, durationFaster, {
                x: textMidC / 2,
                ease: ExpoScaleEase.config(invscale, 1, outEase),
            }, {
                x: 0,
                ease: ExpoScaleEase.config(invscale, 1, outEase),
            }, durationFaster)


            master.fromTo(elTextClone, duration, {
                opacity: 0,
                ease: ExpoScaleEase.config(scale, 1, inEase),
            }, {
                opacity: 1,
                ease: ExpoScaleEase.config(scale, 1, inEase),
            }, durationFaster)


            // effettuo il preload per avere un animazione più fluida
            master.progress(1).progress(0)

                // .addCallback(() => {
                //     // container.removeChild(el)
                //     // master.pause()
                // }, 'destroyOld')
                // .addCallback(() => {
                //     // console.log('bouncy balls');
                //     // master.pause()
                // }, 'bouncyBalls')

                .eventCallback('onComplete', () => {
                    // aggiungo un callback quando l'animazione è finita
                    // per rimuovere il testo originale e re-imposto la variabile
                    // globale su false per procedere con le altre animazioni in coda
                    container.removeChild(el)
                    TweenMax.set([clone, dotCL, dotCR, elTextFC, elTextClone], {
                        clearProps: 'all'
                    })

                    elTextCC.style.position = null
                    elTextCC.style.overflow = null
                    elTextCC.style.width = null
                    elTextCC.style.height = null

                    elTextFC.style.position = null
                    elTextFC.style.overflow = null
                    elTextFC.style.height = null
                    elTextFC.style.width = null

                    elTextClone.style.display = null
                    elTextClone.style.position = null
                    elTextClone.style.width = null
                    container.style.minHeight = null

                    clone.style.position = 'relative'

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
        cacheAnimation: function(adding = true, text = null, uuid, color = 'blue') {
            if (adding) {
                // genera l'oggetto da aggiungere in coda ma non l'animazione
                // altrimenti il clone potrebbe non esistere o non essere lo stesso
                // quando finisce l'animazione
                let obj = {
                    uuid: uuid,
                    text: text,
                    color: color,
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
                let animation = this.generateAnimation(obj)
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
            // this.toggle()
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
                // if (this.$root.window.w < 576) {
                //     padding = 16
                // }

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
        this.customEase = CustomEase.create("custom", "M0,0,C0,0,0.035,-0.003,0.055,-0.01,0.1,-0.027,0.129,-0.047,0.175,-0.063,0.193,-0.07,0.209,-0.074,0.227,-0.073,0.248,-0.071,0.269,-0.066,0.287,-0.054,0.309,-0.04,0.326,-0.02,0.342,0.002,0.363,0.033,0.374,0.058,0.39,0.094,0.41,0.142,0.421,0.172,0.435,0.224,0.477,0.392, 0.51,0.611,0.553,0.945,0.558,0.986,0.564,1.008,0.573,1.048,0.576,1.06,0.578,1.067,0.583,1.078,0.586,1.086,0.59,1.092,0.595,1.097,0.597,1.1,0.602,1.102,0.605,1.102,0.609,1.101,0.615,1.099,0.618,1.095,0.64,1.067,0.654,1.04,0.678,1.008,0.683,1.002,0.689,0.997,0.696,0.992,0.702,0.988,0.708,0.985,0.715,0.983,0.725,0.981,0.733,0.981,0.743,0.983,0.765,0.986,0.778,0.993,0.801,0.997,0.814,1,0.823,1.002,0.836,1.002,0.898,1.002,1,0.999,1,0.999")
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
    opacity: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    overflow: hidden;
    height: auto;

    &__gallery {
        width: 85%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        // background-color: $white;
        // padding: $spacer * 3/2;

        overflow: hidden;
        height: auto;

        @include media-breakpoint-down('xxl') {
            width: 50%; // da rivedere per responsive
        };

        @include media-breakpoint-down('xl') {
            width: 55%; // da rivedere per responsive
        };

        @include media-breakpoint-down('md') {
            width: 70%; // da rivedere per responsive
        };

    }


    &__container {
        position: relative;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: flex-start;

        border-width: 5px;
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
    $self: &;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // padding-top: $spacer * 3/2;

    &__text-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
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

    &--blue {
        #{ $self }__dot {
            color: #b1c5cf;
        }
    }

    &--yellow {
        #{ $self }__dot {
            color: #dcba80;
        }
    }
}


</style>
