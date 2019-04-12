<template lang="html">
    <div class="estetica">
        <div class="estetica-container" ref="container">
            <div class="estetica-left" ref="content">
                <div class="estetica-content" ref="panel">
                    <div id="scroll-down-reset-trigger" v-view="scrollDownHandler"></div>
                    <div class="estetica-bold-divider"></div>
                    <h1 class="estetica-title" ref="title">Servizi</h1>
                    <span class="estetica-subtitle">Medicina Estetica</span>
                    <div class="estetica-v-div"></div>

                    <ui-accordion
                        ref="accordion"
                        :scroll-on-complete="false"
                        :is-dynamic="false">
                        <ui-accordion-single
                            base="medicinaestetica-accordion"
                            v-for="(service, i) in services"
                            :idx="service.id"
                            :obj="service"
                            :color-heading="i | isEven"
                            :key="service.id">
                            <template v-slot:title>
                                {{ service.title }}
                            </template>
                            <template v-slot:content>
                                <h3>{{ service.title }}</h3>
                                <home-horizontal-sep width="50px" color="#e5c386" class="pb-3"/>
                                <div v-html="service.description">
                                </div>
                            </template>
                        </ui-accordion-single>
                    </ui-accordion>

                    <scroll-down
                        ref="scrollDown"
                        color="yellow"
                        trigger="scroll-down-trigger"
                        restore_trigger="scroll-down-reset-trigger"/>
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
        <div id="scroll-down-trigger"></div>
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
import ScrollDown from '../components/ScrollDown.vue'

import HomeHorizontalSep from '../components/HomeHorizontalSep.vue'
import { UiAccordion, UiAccordionSingle } from '../ui'

export default {
    name: 'Odontoiatria',
    components: {
        Accordion,
        Convenzioni,
        EsteticaIllust,
        HomeHorizontalSep,
        MainFooter,
        Parcelle,
        ScrollDown,
        UiAccordion,
        UiAccordionSingle,
    },
    watch: {
        '$root.window': function(value) {
            this.positionIllustration()
            // this.illustHeight = this.$refs.content.offsetHeight

            if (value.w > 1920) {
                this.illustWidth = '50%'
            } else {
                this.illustWidth = '60%'
            }
        },
        '$route.path': function() {
            this.positionIllustration()
        }
    },
    data: function() {
        return {
            height: 0,
            illustHeight: 0,
            viewport: 0,
            services: this.$root.estetica,
            illustWidth: '60%',
            illustHidden: false,
        }
    },
    metaInfo: function() {
        return {
            title: this.$root.seos[2].title,
            meta: [
                {
                    property: 'og:title', vmid: 'og:title', content: this.$root.seos[2].title,
                },
                {
                    property: 'twitter:title', vmid: 'twitter:title', content: this.$root.seos[2].title,
                },
                {
                    vmid: 'description', content: this.$root.seos[2].description,
                },
                {
                    property: 'og:description', vmid: 'og:description', content: this.$root.seos[2].description,
                },
                {
                    property: 'twitter:description', vmid: 'twitter:description', content: this.$root.seos[2].description,
                },
                {
                    property: 'og:image', vmid: 'og:image', content: this.$root.seos[2].img,
                },
                {
                    property: 'twitter:image', vmid: 'twitter:image', content: this.$root.seos[2].img,
                },
                {
                    property: 'og:url', vmid: 'og:url', content: window.location.href,
                },
            ],
        }
    },
    methods: {
        scrollDownHandler: function(e) {
            if (e.type == 'enter') {
                this.$refs.scrollDown.reset()
            } else if (e.type == 'exit') {
                this.$refs.scrollDown.hide()
            }
        },
        panelOpen: function(height) {
            if (!this.illustHidden) {
                TweenMax.to(this.$refs.illust.$el, .6, {
                    autoAlpha: 0,
                    onComplete: () => {
                        this.illustHidden = true
                    }
                })
            }
            TweenMax.to(this.$refs.container, .6, {
                height: '+='+height
            })
        },
        panelClose: function() {
            TweenMax.to(this.$refs.illust.$el, .6, {
                autoAlpha: 1,
                onComplete: () => {
                    this.illustHidden = false
                }
            })
        },
        removeHeight: function(height) {
            TweenMax.to(this.$refs.container, .6, {
                height: '+='+height,
                onComplete: () => {
                    this.positionIllustration()
                }
            })
        },
        positionIllustration: function() {
            let w = this.$root.window.w
            if (w > 576 && w < 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
            } else if (w >= 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
                this.$refs.illust.$el.style.paddingTop = '5%'
                this.illustWidth = '50%'
            } else {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 'px'
            }

            if (!this.$root.isMobile) {
                let contentHeight = this.$refs.panel.offsetHeight
                let windowHeight = this.$root.window.h - this.$root.navbarFullHeight
                let illustHeight = this.$refs.illust.$el.offsetHeight

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
                }

                // if (illustHeight > contentHeight) {
                //     let delta = (illustHeight - contentHeight) / 2
                //     this.$refs.container.style.paddingBottom = delta + 'px'
                // } else {
                //     this.$refs.container.style.paddingBottom = null
                // }
            } else {
                this.$refs.content.style.justifyContent = 'center'
                // this.$refs.content.style.position = null
                // this.$refs.panel.style.position = null
                // this.$refs.illust.$el.style.position = null
                // this.$refs.panel.style.top = null
            }
        },
        checkParams: function() {
            if (this.$route.params.hasOwnProperty('slug')) {
                let slug = this.$route.params.slug
                let service = this.services.filter(item => item.slug == slug)[0]
                if (service) {
                    this.$nextTick(() => {
                        this.$refs.accordion.$emit('toggle-accordion', service.id)
                    })
                }
            }
        }
    },
    filters: {
        isEven: function(num) {
            if (num % 2 == 0) {
                return true
            }
            return false
        }
    },
    mounted: function(){
        this.$root.navColor = 1
        this.$root.hasFooter = true
        this.positionIllustration()
        this.$nextTick(this.checkParams)
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

#scroll-down-reset-trigger {
    width: 300px;
    // background-color: $red;
    height: 1px;
}

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


            li {
                text-align: left;
            }
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

    .estetica-title {
        font-size: calc(100% + 1vw + 1vh);
    }

    .estetica-subtitle {
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
