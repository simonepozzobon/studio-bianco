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
      </div>
</template>

<script>
import Accordion from '../components/Accordion.vue'
import OdontoiatriaIllust from '../components/OdontoiatriaIllust.vue'
import services from '../dummies/services'
export default {
    name: 'Odontoiatria',
    components: {
        Accordion,
        OdontoiatriaIllust
    },
    watch: {
        '$root.window.h': function(value) {
            this.positionIllustration()
        }
    },
    data: function() {
        return {
            services: services
        }
    },
    methods: {
        positionIllustration: function() {
            this.$refs.container.style.paddingTop = this.$root.navbarFullHeight + 'px'
        }
    },
    mounted: function() {
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

        .odontoiatria-content {
            padding: $spacer * 4;
            width: 100%;

            .odontoiatria-bold-divider {
                content: '';
                width: 30px;
                border-top: 6px solid $light-brown;
                margin-bottom: $spacer;
            }

            .odontoiatria-v-div {
                content: '';
                height: 100px;
                border-left: 1px solid $light-brown;
                margin-bottom: $spacer;
                margin-top: $spacer;
            }
        }

        .odontoiatria-subtitle {
            font-size: $h4-font-size;
            font-weight: 300;
        }

        .odontoiatria-divider {
            margin-bottom: $spacer;
        }
    }
}

</style>
