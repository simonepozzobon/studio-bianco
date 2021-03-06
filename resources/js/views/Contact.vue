<template lang="html">
    <div class="contact">
        <div class="contact-container" ref="container">
            <div class="contact-left" v-if="!this.$root.isMobile">
                <contact-illust
                    :width="illustWidth"
                    ref="illust"
                />
            </div>
            <div class="contact-right" ref="content">
                <div class="contact-content" ref="panel">
                    <div class="contact-bold-divider"></div>
                    <h1 class="contact-title" ref="title">Contatti</h1>
                    <span class="contact-subtitle">Studio Bianco</span>
                    <div class="contact-v-div"></div>
                    <div class="contact-info">
                        <table class="contact-table">
                            <tr>
                                <td class="contact-table-label">
                                    Indirizzo
                                </td>
                                <td class="contact-table-detail">
                                    Via Mazzini, 3 - Bergamo
                                </td>
                            </tr>
                            <tr>
                                <td class="contact-table-label">
                                    Telefono
                                </td>
                                <td class="contact-table-detail">
                                    392 25 94 312
                                </td>
                            </tr>
                            <tr>
                                <td class="contact-table-label">
                                    Email
                                </td>
                                <td class="contact-table-detail">
                                    <a href="mailto:info@studiobiancosc.it">info@studiobiancosc.it</a>
                                </td>
                            </tr>
                        </table>
                        <div id="form-ref"></div>
                        <div class="contact-map">
                            <a class="btn btn-light" href="https://goo.gl/maps/8xzrtFZnK4t" target="_blank">
                                <span>Vai alla mappa </span><icon-map  width="16px"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-form" ref="row">
            <div class="contact-form-btn">
                <button class="btn btn-primary" @click="toggleContact">
                    <span>contattami </span><icon-arrow-down  width="16px" ref="contactIcon"/>
                </button>
            </div>
            <div class="contact-form-modal-row">
                <div class="contact-form-modal" ref="form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" name="email" v-model="email" class="form-control" placeholder="Scrivi la tua email">
                    </div>
                    <div class="form-group">
                        <label for="message">Messaggio</label>
                        <textarea name="name" v-model="message" rows="8" cols="80" class="form-control" placeholder="Scrivi il tuo messaggio"></textarea>
                    </div>
                    <div class="form-group send-btn">
                        <button class="btn btn-pink text-white" @click="sendMessage">invia</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-container" v-if="this.$root.isMobile" ref="containerMob">
            <div class="contact-left">
                <contact-illust
                    width="90%"
                    ref="illust"
                    />
            </div>
        </div>
    </div>
</template>

<script>
import ContactIllust from '../components/ContactIllust.vue'
import { IconMap, IconArrowDown } from '../ui'
import { TimelineMax } from 'gsap'
require('gsap/ScrollToPlugin')

export default {
    name: 'Contact',
    components: {
        ContactIllust,
        IconMap,
        IconArrowDown,
    },
    watch: {
        '$root.window': function(value) {
            this.positionIllustration()
            if (value.w > 1920) {
                this.illustWidth = '63%'
            } else {
                this.illustWidth = '79%'
            }
        },
        '$route.path': function() {
            this.positionIllustration()
        }
    },
    data: function() {
        return {
            formIsOpen: false,
            master: null,
            height: 0,
            illustWidth: '79%',
            email: null,
            message: null,
        }
    },
    metaInfo: function() {
        return {
            title: this.$root.seos[4].title,
            meta: [
                {
                    property: 'og:title', vmid: 'og:title', content: this.$root.seos[4].title,
                },
                {
                    property: 'twitter:title', vmid: 'twitter:title', content: this.$root.seos[4].title,
                },
                {
                    vmid: 'description', content: this.$root.seos[4].description,
                },
                {
                    property: 'og:description', vmid: 'og:description', content: this.$root.seos[4].description,
                },
                {
                    property: 'twitter:description', vmid: 'twitter:description', content: this.$root.seos[4].description,
                },
                {
                    property: 'og:image', vmid: 'og:image', content: this.$root.seos[4].img,
                },
                {
                    property: 'twitter:image', vmid: 'twitter:image', content: this.$root.seos[4].img,
                },
                {
                    property: 'og:url', vmid: 'og:url', content: window.location.href,
                },
            ],
        }
    },
    methods: {
        sendMessage: function() {
            let data = new FormData()
            data.append('email', this.email)
            data.append('message', this.message)

            axios.post('/api/send-message', data).then(response => {
                this.email = null
                this.message = null
                this.toggleContact()
            })
        },
        toggleContact: function() {
            let form = this.$refs.form
            if (!this.formIsOpen) {
                if (this.master) {
                    this.master.play()
                    this.formIsOpen = true
                } else {
                    this.master = new TimelineMax({
                        paused: true,
                        reversed: true,
                    })

                    TweenLite.set(form, {
                        height: 0,
                        autoAlpha: 0,
                        display: 'none',
                        transformOrigin: 'center top 0',
                    })

                    this.master.to(form, .6, {
                        height: '100%',
                        scaleY: 1,
                        autoAlpha: 1,
                        display: 'block',
                        transformOrigin: 'center top 0',
                        ease: Cubic.easeInOut,
                    })

                    this.master.to(window, .6, {
                        scrollTo: '#form-ref',
                        offsetY: 500,
                        autoKill: false,
                        ease: Power2.easeInOut
                    })

                    // this.master.progress(1).progress(0)

                    this.master.play()
                    this.formIsOpen = true
                }
            } else {
                this.master.reverse()
                this.formIsOpen = false
            }
        },
        positionIllustration: function() {
            let w = this.$root.window.w
            if (w > 576 && w < 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
                this.$refs.illust.$el.style.paddingTop = '60px'
            } else if (w >= 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
                this.$refs.illust.$el.style.paddingTop = '5%'
                this.illustWidth = '63%'
            } else {
                this.$refs.container.style.paddingTop = this.$root.navbarFullHeight + 'px'
            }

            if (!this.$root.isMobile) {
                let contentHeight = this.$refs.panel.offsetHeight
                let illustHeight = this.$refs.illust.$el.offsetHeight
                let windowHeight = this.$root.window.h - this.$root.navbarFullHeight

                if (contentHeight <= windowHeight) {
                    this.$refs.content.style.justifyContent = 'flex-start'
                    // this.$refs.content.style.position = 'relative'
                    // this.$refs.panel.style.position = 'absolute'
                    // this.$refs.panel.style.top = '5vh'
                    // this.$refs.illust.$el.style.position = 'absolute'
                    // this.$refs.illust.$el.style.top = '5vh'
                } else {
                    this.$refs.content.style.justifyContent = 'center'
                    // this.$refs.content.style.position = null
                    // this.$refs.panel.style.position = null
                    // this.$refs.illust.$el.style.position = null
                    // this.$refs.panel.style.top = null
                    this.$refs.container.style.height = contentHeight + this.$root.navbarFullHeight + 64 + 'px'
                }

                // if (illustHeight > contentHeight) {
                //     this.$refs.container.paddingBottom = illustHeight - contentHeight + 64 + 'px'
                // } else {
                //     this.$refs.container.paddingBottom = null
                // }
            } else {
                this.$refs.container.style.paddingTop = this.$root.navbarFullHeight + 30 + 'px'
                this.$refs.content.style.justifyContent = 'center'
                // this.$refs.content.style.position = null
                // this.$refs.panel.style.position = null
                // this.$refs.illust.$el.style.position = null
                // this.$refs.panel.style.top = null
            }
        }
    },
    mounted: function() {
        this.$root.hasFooter = false
        this.$root.navColor = 1
        let form = this.$refs.form
        TweenLite.set(form, {
            height: 0,
            autoAlpha: 0,
            display: 'none',
            transformOrigin: "center top 0",
        })

        this.$nextTick(() => {
            this.positionIllustration()
        })
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

// #form-ref {
//     width: 300px;
//     height: 5px;
//     background-color: $red;
// }

.contact {
    @include make-container();
    background-color: $pink;
    max-width: 100vw;
    overflow-x: hidden;

    .contact-container {
        @include make-row();
        min-height: 80vh;
        @include media-breakpoint-down('md') {
            min-height: 40vh;
        }

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

            &.contact-illust-top {
                justify-content: flex-start;
                @include media-breakpoint-up('xxl') {
                    justify-content: center;
                }

                .ref {
                    position: absolute;
                    top: 0;
                }
            }

            &.contact-illust-bottom {
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

        .contact-left {
            @include make-col(6);
            position: relative;

            @include media-breakpoint-down('md') {
                @include make-col(12);
                position: inherit;
            }
        }

        .contact-right {
            @include make-col(6);
            @include media-breakpoint-down('md') {
                @include make-col(12);
            }
        }

        .contact-content {
            width: 100%;
            padding: $spacer * 4;

            @include media-breakpoint-down('md') {
                padding-top: 0;
                padding-left: $spacer;
                padding-right: $spacer;
                text-align: center;
            }

            .contact-bold-divider {
                content: '';
                width: 30px;
                border-top: 6px solid $light-cyan;
                margin-bottom: $spacer;

                @include media-breakpoint-down('md') {
                    margin-right: auto;
                    margin-left: auto;
                }
            }

            .contact-v-div {
                content: '';
                height: 53px;
                width: 1px;
                border-left: 1px solid $light-cyan;
                margin-bottom: $spacer;
                margin-top: $spacer;


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

        .contact-title {
            color: $white;
            font-size: calc(100% + 1vw + 1vh);
        }

        .contact-subtitle {
            font-size: calc(10% + 1vw + 1vh);
            font-weight: 300;
            color: $white;


            @include media-breakpoint-down('md') {
                font-size: calc(30% + 1vw + 1vh);
                text-align: center;
            }
            @include media-breakpoint-down('xs') {
                font-size: calc(50% + 1vw + 1vh);
            }
        }

        .contact-divider {
            margin-bottom: $spacer;
        }

        .contact-table {
            margin-bottom: $spacer * 2;

            @include media-breakpoint-down('md') {
                width: 100%;
            }

            tr {
                border: 1px solid $white;

                td {
                    padding-left: $spacer;
                    padding-right: $spacer;
                    padding-top: $spacer / 2;
                    padding-bottom: $spacer / 2;

                    @include media-breakpoint-down('xs') {
                        font-size: 0.7rem;
                    }
                }

                .contact-table-label {
                    font-weight: normal;
                    padding-right: $spacer * 4;

                    @include media-breakpoint-down('xs') {
                        padding-right: $spacer;
                        font-size: 0.7rem;
                    }
                }
            }
        }

        .contact-map {
            @include media-breakpoint-down('md') {
                display: flex;
                justify-content: center;
            }

            .btn {
                span {
                    padding-right: $spacer;
                }
            }
        }

    }

    .contact-form {
        @include make-row();
        min-height: 20vh;
        background-color: $pink;


        .contact-form-btn {
            @include make-col(12);
            display: flex;
            justify-content: center;
            align-items: flex-start;

            .btn {
                span {
                    padding-right: $spacer;
                }
            }
        }
    }

    .contact-form-modal-row {
        display: flex;
        justify-content: center;
        // align-items: center;
        width: 100%;
        margin-bottom: 100px;

        .contact-form-modal {
            background-color: $light-brown;
            padding-left: $spacer * 2;
            padding-right: $spacer * 2;
            padding-top: $spacer * 2;
            padding-bottom: $spacer;

            position:relative;
            visibility:hidden; /* hides all .Tile-flyout on load so GSAP autoAlpha can do its thing */
            height:auto; /* tell the browser that initial height is auto */
            overflow:hidden;

            label {
                padding-left: $input-padding-x;
                color: $orange;
                font-weight: bold;
            }

            .send-btn {
                margin-top: $spacer * 2;
                display: flex;
                justify-content: center;
                align-items: center;

                .btn {
                    padding-left: $spacer * 4;
                    padding-right: $spacer * 4;
                }
            }
        }
    }

}
</style>
