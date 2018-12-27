<template lang="html">
    <div class="homesplit">
        <div class="homesplit-container" ref="container">
            <div class="homesplit-left" ref="content">
                <home-illust-left width="40%" ref="illust"/>
                <h1 ref="title">Odontoiatria</h1>
                <home-horizontal-sep color="#283745" width="8%" class="homesplit-divider" ref="divider"/>
                <a href="#" class="btn btn-outline-white text-blue" ref="call" @click="goTo($event, 1)">Scopri di più</a>
                <div class="homesplit-v-div" ref="vDividerL"></div>
            </div>
            <div class="homesplit-right" ref="rightContent">
                <home-illust-right width="40%"/>
                <h1>Medicina Estetica</h1>
                <home-horizontal-sep color="#BFD3DD" width="8%" class="homesplit-divider"/>
                <a href="#" class="btn btn-outline-cyan text-white" @click="goTo($event, 2)">Scopri di più</a>
                <div class="homesplit-v-div" ref="vDividerR"></div>
            </div>
        </div>
        <div id="page" class="homesplit-container" ref="page">
            <div class="homesplit-page">
                <odontoiatria v-if="homepage == 'odontoiatria'"/>
                <estetica v-else-if="homepage == 'estetica'"/>
            </div>
        </div>
    </div>
</template>

<script>
import HomeHorizontalSep from './HomeHorizontalSep.vue'
import HomeIllustLeft from './HomeIllustLeft.vue'
import HomeIllustRight from './HomeIllustRight.vue'
import Odontoiatria from '../views/Odontoiatria.vue'
import Estetica from '../views/Estetica.vue'
import { TimelineMax } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

export default {
    name: 'HomeSplitMenu',
    components: {
        Estetica,
        Odontoiatria,
        HomeHorizontalSep,
        HomeIllustLeft,
        HomeIllustRight,
    },
    watch: {
        '$root.window.h': function(value) {
            this.setViewport(value)
            this.fillScreen()
        },
    },
    data: function() {
        return {
            viewport: 0,
            homepage: null,
        }
    },
    methods: {
        getVerticalDividerHeight: function() {
            let content = this.$refs.content.offsetHeight,
            illust = this.$refs.illust.$el.scrollHeight,
            title = this.$refs.title.offsetHeight,
            divider = this.$refs.divider.$el.scrollHeight,
            call = this.$refs.call.offsetHeight,
            result = content - (illust + title + divider + call)

            return Math.floor(result / 2)
        },
        fillScreen: function(height = 0) {
            this.$refs.container.style.paddingTop = this.$root.navbarHeight + 'px'
            this.$refs.container.style.height = this.viewport + 'px'

            let dividerHeight = this.getVerticalDividerHeight()
            this.$refs.vDividerL.style.paddingTop = dividerHeight + 'px'
            this.$refs.vDividerR.style.paddingTop = dividerHeight + 'px'
        },
        setViewport: function(value) {
            this.viewport = value
        },
        goTo: function(e, value) {
            e.preventDefault()
            if (value == 1) {
                this.animateToRight()
            } else if (value == 2) {
                this.animateToLeft()
            }
        },
        animateToLeft: function() {
            this.homepage = 'estetica'
            this.$root.homepage = 'estetica'

            let panel = this.$refs.content
            let panelR = this.$refs.rightContent
            let content = this.$refs.page

            let master = new TimelineMax({
                paused: true,
                reversed: true,
            })


            TweenLite.set(panelR, {
                transformOrigin: "left center 0",
            })
            TweenLite.set(this.$refs.container, {
                flexWrap: 'nowrap'
            })

            let t1 = new TimelineLite()
            let t2 = new TimelineMax()

            master.add(t1, t2)

            t1.fromTo(panel, .6, {
                autoAlpha: 1,
                xPercent: 0
            },{
                xPercent: -100,
                transformOrigin: "left center 0",
                ease: Cubic.easeInOut,
            }, .1)

            t1.fromTo(panelR, .6, {
                xPercent: 0
            },{
                width: '100%',
                autoAlpha: 1,
                flexBasis: '100%',
                maxWidth: '100%',
                flexGrow: 2,
                xPercent: -50,
                transformOrigin: "left top 0",
                ease: Cubic.easeInOut,
            }, .1)

            t1.fromTo(content, .6, {
                autoAlpha: 0,
                height: 0,
            }, {
                autoAlpha: 1,
                display: 'flex',
                height: '100%',
                onComplete: () => {
                    console.log('completed')
                }
            }, .7)

            let scroll = TweenLite.to(window, 2, {
                scrollTo: '#page',
                autoKill: false,
                ease: Cubic.easeInOut,
                onComplete: () => {
                    console.log('completed scrol')
                }
            })

            master.add(scroll, 1.3)

            master.progress(1).progress(0);
            master.play()
        },
        animateToRight: function() {
            this.homepage = 'odontoiatria'
            this.$root.homepage = 'odontoiatria'

            let panel = this.$refs.content
            let panelR = this.$refs.rightContent
            let content = this.$refs.page

            let master = new TimelineMax({
                paused: true,
                reversed: true,
            })


            TweenLite.set(panel, {
                transformOrigin: "right center 0",
            })

            TweenLite.set(this.$refs.container, {
                flexWrap: 'nowrap'
            })

            let t1 = new TimelineLite()
            let t2 = new TimelineMax()

            master.add(t1, t2)

            t1.fromTo(panelR, .6, {
                autoAlpha: 1,
                xPercent: 0
            },{
                xPercent: 100,
                transformOrigin: "right center 0",
                ease: Cubic.easeInOut,
            }, .1)

            t1.fromTo(panel, .6, {
                xPercent: 0
            },{
                width: '100%',
                autoAlpha: 1,
                flexBasis: 100,
                maxWidth: '100%',
                xPercent: 0,
                transformOrigin: "right top 0",
                ease: Cubic.easeInOut,
            }, .1)

            t1.fromTo(content, .6, {
                autoAlpha: 0,
                height: 0,
            }, {
                autoAlpha: 1,
                display: 'flex',
                height: '100%',
                onComplete: () => {
                    console.log('completed')
                }
            }, .7)

            let scroll = TweenLite.to(window, 2, {
                scrollTo: '#page',
                autoKill: false,
                ease: Cubic.easeInOut,
                onComplete: () => {
                    console.log('completed scrol')
                }
            })

            master.add(scroll, 1.3)

            master.progress(1).progress(0);
            master.play()
        }
    },
    mounted: function() {
        let content = this.$refs.page
        content.style.display = 'none'
    }

}
</script>

<style lang="scss">
@import '~styles/shared';

.homesplit {
    @include make-container();

    .homesplit-container {
        @include make-row();
        min-height: 700px;
        overflow: hidden;

        > div {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            position: relative;

            > svg {
                margin-bottom: $spacer * 2;
            }

            h1 {
                display: block;
                font-size: 2em;
            }
        }

        .homesplit-left {
            @include make-col(6);
            background-color: $pink;
            color: $white;
            position: relative;

            width:auto; /* tell the browser that initial height is auto */
            overflow:hidden;
        }

        .homesplit-right {
            @include make-col(6);
            background-color: $blue;
            color: $cyan;
            position: relative;

            width:auto; /* tell the browser that initial height is auto */
            overflow:hidden;
        }

        .homesplit-page {
            @include make-col(12);

            &.blue {
                background-color: $light-cyan;
            }

            &.yellow {
                background-color: $yellow;
            }
        }

        .homesplit-divider {
            margin-bottom: $spacer;
        }

        .homesplit-v-div {
            margin-top: $spacer;
            border-left: 1px solid $white;
            transform: translate(-50%);
        }
    }
}

</style>
