<template lang="html">
    <div class="odontoiatria">
        <div class="odontoiatria-container" ref="container">
            <div class="odontoiatria-left" ref="content">
                <div class="odontoiatria-content">
                    <div class="odontoiatria-bold-divider"></div>
                    <h1 ref="title">Servizi</h1>
                    <span class="odontoiatria-subtitle">Odontoiatria</span>
                    <div class="odontoiatria-v-div"></div>
                    <accordion :items="services"/>
                </div>
            </div>
            <div class="odontoiatria-right">
                <odontoiatria-illust width="90%"/>
            </div>
        </div>
        <parcelle />
        <convenzioni />
    </div>
</template>

<script>
import Accordion from '../components/Accordion.vue'
import Convenzioni from '../components/Convenzioni.vue'
import OdontoiatriaIllust from '../components/OdontoiatriaIllust.vue'
import Parcelle from '../components/Parcelle.vue'
// import services from '../dummies/services'

export default {
    name: 'Odontoiatria',
    components: {
        Accordion,
        Convenzioni,
        OdontoiatriaIllust,
        Parcelle,
    },
    watch: {
        '$root.window.h': function(value) {
            this.positionIllustration()
        }
    },
    data: function() {
        return {
            services: this.$root.odontoiatria
        }
    },
    methods: {
        positionIllustration: function() {
            this.$refs.container.style.paddingTop = this.$root.navbarFullHeight + 'px'
        },
    },
    mounted: function() {
        this.$root.navColor = 1
        this.$root.hasFooter = false
        this.positionIllustration()
    }
}
</script>

<style lang="scss">
@import '~styles/shared';


.odontoiatria {
    @include make-container();
    background-color: $cyan;

    .odontoiatria-container {
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
        }

        .odontoiatria-left {
            @include make-col(6);

        }

        .odontoiatria-right {
            @include make-col(6);
        }
    }

    .odontoiatria-content {
        padding: $spacer * 4;
        width: 100%;

        .odontoiatria-bold-divider {
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
        }

        .odontoiatria-v-div {
            content: '';
            height: 100px;
            border-left: 1px solid $light-brown;
            margin-bottom: $spacer;
            margin-top: $spacer;

            &.pink {
                border-left: 1px solid $pink;
            }

            &.yellow {
                border-left: 1px solid $yellow;
            }
        }
    }

    .odontoiatria-subtitle {
        font-size: $h4-font-size;
        font-weight: 300;
    }

    .odontoiatria-divider {
        margin-bottom: $spacer;
    }

    .odontoiatria-parcelle {
        @include make-row();
        background-color: $light;
        min-height: 20vh;

        .odontoiatria-parcelle-container {
            @include make-col(12);
        }
    }

    .odontoiatria-partner {
        @include make-row();
        background-color: $purple;
        min-height: 20vh;

        .odontoiatria-parcelle-container {
            @include make-col(12);
        }
    }
}

</style>
