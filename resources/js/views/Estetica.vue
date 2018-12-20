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
        <div class="estetica-parcelle">
            <div class="estetica-parcelle-container" ref="content">
                <div class="estetica-content">
                    <div class="estetica-bold-divider pink"></div>
                    <h1 ref="title">Parcelle</h1>
                    <div class="estetica-v-div pink"></div>
                    <p>
                        Le parcelle di Studio Bianco sono basate sulla competenza, l’esperienza ed il tempo necessari per trattare le vostre condizioni in modo brillante e duraturo. È nostra cura in tutte le situazioni selezionare i migliori strumenti ed i migliori materiali disponibili. Qualsiasi terapia non sarà intrapresa senza che il preventivo di spesa e le relative modalità di trattamento siano state accuratamente esposte, dopo la raccolta dei dati clinici e la formulazione del piano di trattamento, ed approvate dal paziente.
                    </p>
                </div>
            </div>
        </div>
        <convenzioni />
    </div>
</template>

<script>
import Accordion from '../components/Accordion.vue'
import Convenzioni from '../components/Convenzioni.vue'
import EsteticaIllust from '../components/EsteticaIllust.vue'
import services from '../dummies/Aservices'
export default {
    name: 'Odontoiatria',
    components: {
        Accordion,
        Convenzioni,
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
        this.$root.navColor = 1
        this.$root.hasFooter = false
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

    }

    .estetica-content {
        padding: $spacer * 4;
        width: 100%;

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
        }

        .estetica-v-div {
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

    .estetica-subtitle {
        font-size: $h4-font-size;
        font-weight: 300;
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
