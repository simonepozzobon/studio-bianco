<template lang="html">
    <div class="estetica">
        <div class="estetica-container" ref="container">
            <div class="estetica-left" ref="content">
                <div class="estetica-content">
                    <div class="estetica-bold-divider"></div>
                    <h1 ref="title">Servizi</h1>
                    <span class="estetica-subtitle">Medicina Estetica</span>
                    <div class="estetica-v-div"></div>
                    <accordion :items="services"/>
                </div>
            </div>
            <div class="estetica-right">
                <estetica-illust width="70%" ref="illust"/>
            </div>
        </div>
      </div>
</template>

<script>
import Accordion from '../components/Accordion.vue'
import EsteticaIllust from '../components/EsteticaIllust.vue'
import services from '../dummies/Aservices'
export default {
    name: 'Odontoiatria',
    components: {
        Accordion,
        EsteticaIllust
    },
    watch: {
        '$root.window.h': function(value) {
            this.setViewport(value)
            this.positionIllustration()
        }
    },
    data: function() {
        return {
            height: 0,
            viewport: 0,
            services: services
        }
    },
    methods: {
        setViewport: function(value) {
            this.viewport = value
        },
        positionIllustration: function() {
            this.$refs.container.style.paddingTop = this.$root.navbarFullHeight + 'px'
        }
    },
    mounted: function(){
        let el = this.$refs.illust.$el
        let elSize = el.getBoundingClientRect()
        this.height = elSize.height
        this.positionIllustration()
    }
}
</script>

<style lang="scss">
@import '~styles/shared';


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
        }

        .estetica-left {
            @include make-col(6);

        }

        .estetica-right {
            @include make-col(6);
        }

        .estetica-content {
            padding: $spacer * 4;
            width: 100%;

            .estetica-bold-divider {
                content: '';
                width: 30px;
                border-top: 6px solid $light-brown;
                margin-bottom: $spacer;
            }

            .estetica-v-div {
                content: '';
                height: 100px;
                border-left: 1px solid $light-brown;
                margin-bottom: $spacer;
                margin-top: $spacer;
            }
        }

        .estetica-subtitle {
            font-size: $h4-font-size;
            font-weight: 300;
        }

        .estetica-divider {
            margin-bottom: $spacer;
        }
    }
}

</style>
