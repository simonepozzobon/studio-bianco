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
    </div>
</template>

<script>
import HomeHorizontalSep from './HomeHorizontalSep.vue'
import HomeIllustLeft from './HomeIllustLeft.vue'
import HomeIllustRight from './HomeIllustRight.vue'
import { TimelineMax } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

export default {
    name: 'HomeSplitMenu',
    components: {
        HomeHorizontalSep,
        HomeIllustLeft,
        HomeIllustRight,
    },
    watch: {
        '$root.window': function(value) {
            this.setViewport(value.h)
            this.fillScreen()
        },
    },
    data: function() {
        return {
            viewport: 0,
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
            // se breakpoint maggiore di lg
            if (!this.$root.isMobile) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 'px'
                this.$refs.container.style.height = this.viewport + 'px'

                let dividerHeight = this.getVerticalDividerHeight()
                this.$refs.vDividerL.style.paddingTop = dividerHeight + 'px'
                this.$refs.vDividerR.style.paddingTop = dividerHeight + 'px'
            } else {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 'px'
                this.$refs.container.style.height = '100%'

            }
        },
        setViewport: function(value) {
            this.viewport = value
        },
        goTo: function(e, value) {
            e.preventDefault()
            if (value == 1) {
                this.$router.push({ path: '/odontoiatria' })
            } else if (value == 2) {
                this.$router.push({ path: '/medicina-estetica' })
            }
        },
    },
    mounted: function() {
        this.fillScreen()
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

            @include media-breakpoint-down('md') {
                @include make-col(12);
            }
        }

        .homesplit-right {
            @include make-col(6);
            background-color: $blue;
            color: $cyan;
            position: relative;

            width:auto; /* tell the browser that initial height is auto */
            overflow:hidden;

            @include media-breakpoint-down('md') {
                @include make-col(12);
            }
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
