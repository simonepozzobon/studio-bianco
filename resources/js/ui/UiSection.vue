<template lang="html">
    <div class="ui-section row bg-light-brown" ref="container">
        <ui-section-block>
            <ui-section-content
                title="About"
                subtitle="Lo Studio">
                Studio Bianco nasce dalla consapevolezza che le dimensioni non contano più: quello che conta è l’esperienza.<br>
                La nostra filosofia unisce la competenza di un personale qualificato al calore di un ambiente raccolto, curato e accogliente, in completa antitesi con le grandi cliniche.<br>
                Lo studio è suddiviso in due unità operative: una dedicata all’odontoiatria e una alla medicina estetica avanzata.<br>
                Il percorso di evoluzione estetica e di cura del sorriso è pensato ad hoc per ciascun paziente, in modo da soddisfare qualsiasi esigenza in totale sicurezza e naturalezza per la felicità massima, data dall’intreccio di bellezza e funzionalità.<br>
                L’approccio professionale e il fattore umano, inoltre, permettono a Studio Bianco di essere un punto di riferimento nel trattamento di paure e disagi dei pazienti.<br>
                <br>
                La nostra missione è immaginare i nostri pazienti che, davanti a uno specchio, sorridono a se stessi con tutta la gratificazione e la soddisfazione del mondo. È allora che il nostro lavoro può ritenersi concluso.<br>
                <br>
                Diversi studi hanno evidenziato che le persone con un bel sorriso vengono percepite mediamente più interessanti, intelligenti, felici, sane, sensibili e gentili.<br>
                Sorridete dunque!<br>
            </ui-section-content>
        </ui-section-block>
        <ui-section-block>
            <ui-section-illust
                width="70%"
                :anim-data="animData"
            ></ui-section-illust>
        </ui-section-block>
    </div>
</template>

<script>
import * as Studio from '../animations/studio.json'
import UiSectionBlock from './UiSectionBlock.vue'
import UiSectionContent from './UiSectionContent.vue'
import UiSectionIllust from './UiSectionIllust.vue'
export default {
    name: 'UiSection',
    components: {
        UiSectionBlock,
        UiSectionContent,
        UiSectionIllust,
    },
    data: function() {
        return {
            animData: Studio,
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.ui-section {
    min-height: 100vh;
    min-width: 100vw;
}
</style>
