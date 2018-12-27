<template lang="html">
    <div class="parcelle">
        <div class="parcelle-container" ref="content">
            <div class="parcelle-content">
                <div class="parcelle-bold-divider pink"></div>
                <h1 ref="title">Parcelle</h1>
                <div class="parcelle-v-div pink"></div>
                <p>
                    Le parcelle di Studio Bianco sono basate sulla competenza, l’esperienza ed il tempo necessari per trattare le vostre condizioni in modo brillante e duraturo. È nostra cura in tutte le situazioni selezionare i migliori strumenti ed i migliori materiali disponibili. Qualsiasi terapia non sarà intrapresa senza che il preventivo di spesa e le relative modalità di trattamento siano state accuratamente esposte, dopo la raccolta dei dati clinici e la formulazione del piano di trattamento, ed approvate dal paziente.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Parcelle'
}
</script>

<style lang="scss">
@import '~styles/shared';

.parcelle {
    @include make-row();
    background-color: $light;
    min-height: 20vh;

    .parcelle-container {
        @include make-col(12);

        .parcelle-content {
            padding: $spacer * 4;
            width: 100%;

            .parcelle-bold-divider {
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

            .parcelle-v-div {
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
    }
}
</style>
