<template lang="html">
    <div class="convenzioni">
        <div class="convenzioni-container" ref="content">
            <div class="convenzioni-content">
                <div class="convenzioni-bold-divider yellow"></div>
                <h1 ref="title" class="convenzioni-title text-white">Convenzioni</h1>
                <span class="convenzioni-subtitle text-white">Assicurazioni in convenzione diretta</span>
                <div class="row py-5 mt-5 justify-content-center">
                    <div
                        class="col-12 col-md"
                        title="Convenzioni - UniSalute">
                        <img
                            src="/img/logo_1.png"
                            alt="Convenzioni - UniSalute"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-12 col-md"
                        title="Convenzioni - Blue Assistance">
                        <img
                            src="/img/logo_2.png"
                            alt="Convenzioni - Blue Assistance"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-12 col-md"
                        title="Convenzioni - Pronto Care">
                        <img
                            src="/img/logo_3.png"
                            alt="Convenzioni - Pronto Care"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-12 col-md"
                        title="Convenzioni - Fasdac">
                        <img
                            src="/img/logo_4.png"
                            alt="Convenzioni - Fasdac"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-12 col-md"
                        title="Convenzioni - Fasi">
                        <img
                            src="/img/logo_5.png"
                            alt="Convenzioni - Fasi"
                            class="convenzioni-logo-img">
                    </div>
                </div>
                <span class="convenzioni-subtitle text-white">Assicurazioni in convenzione indiretta</span>
                <div class="row py-5 mt-5 justify-content-center">
                    <div
                        class="col-md-3"
                        title="Convenzioni - Faschim - Fondo Assistenza Sanintaria">
                        <img
                            src="/img/logo_6.png"
                            alt="Convenzioni - Faschim - Fondo Assistenza Sanintaria"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-md-3"
                        title="Convenzioni - Previmedical - Servizi per la sanità integrativa">
                        <img
                            src="/img/logo_7.png"
                            alt="Convenzioni - Previmedical - Servizi per la sanità integrativa"
                            class="convenzioni-logo-img">
                    </div>

                    <div
                        class="col-md-3"
                        title="Convenzioni - Intesa San Paolo">
                        <img
                            src="/img/logo_8.png"
                            alt="Convenzioni - Intesa San Paolo"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-md-3"
                        title="Convenzioni - RBM - Assicurazioni Salute">
                        <img
                            src="/img/logo_9.png"
                            alt="Convenzioni - RBM - Assicurazioni Salute"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-md-3"
                        title="Convenzioni - A Fondo Assitenza UBI">
                        <img
                            src="/img/logo_10.png"
                            alt="Convenzioni - A Fondo Assitenza UBI"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-md-3"
                        title="Convenzioni - Fisde">
                        <img
                            src="/img/logo_11.png"
                            alt="Convenzioni - Fisde"
                            class="convenzioni-logo-img">
                    </div>
                    <!-- <div class="margin-auto"></div> -->


                    <div
                        class="col-md-3"
                        title="Convenzioni - Quas">
                        <img
                            src="/img/logo_12.png"
                            alt="Convenzioni - Quas"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-md-3"
                        title="Convenzioni - Fiasid">
                        <img
                            src="/img/logo_13.png"
                            alt="Convenzioni - Fiasid"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-md-3"
                        title="Convenzioni - Fasdip">
                        <img
                            src="/img/logo_14.png"
                            alt="Convenzioni - Fasdip"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-md-3"
                        title="Convenzioni - Fasie">
                        <img
                            src="/img/logo_15.png"
                            alt="Convenzioni - Fasie"
                            class="convenzioni-logo-img">
                    </div>
                    <div
                        class="col-md-3"
                        title="Convenzioni - Casagit">
                        <img
                            src="/img/logo_16.png"
                            alt="Convenzioni - Casagit"
                            class="convenzioni-logo-img">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Convenzioni',
}
</script>

<style lang="scss">
@import '~styles/shared';

.convenzioni {
    @include make-row();
    background-color: $purple;
    min-height: 20vh;

    .convenzioni-container {
        @include make-col(12);

        .convenzioni-content {
            padding: $spacer * 4;
            width: 100%;

            @include media-breakpoint-down('md') {
                text-align: center;
            }

            .convenzioni-logo-img {
                max-width: 100%;
                max-height: 100%;
                width: 100%;
                height: auto !important;
                max-width: 306px !important;
            }

            .convenzioni-bold-divider {
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

            .convenzioni-v-div {
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

            .row {
                .col-md-3, .col-12 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: $spacer * 2;
                }
            }
        }

        .convenzioni-title {
            font-size: calc(100% + 1vw + 1vh);
        }

        .convenzioni-subtitle {
            font-size: calc(10% + 1vw + 1vh);
            font-weight: 300;
            position: relative;

            @include media-breakpoint-down('sm') {
                display: block;
            }

            @include media-breakpoint-down('md') {
                font-size: calc(30% + 1vw + 1vh);
                text-align: center;
            }
            @include media-breakpoint-down('xs') {
                font-size: calc(50% + 1vw + 1vh);
            }

            &::after {
                content: '';
                width: 100%;
                position: absolute;
                bottom: -($spacer / 2);
                height: 2px;
                left: 50%;
                background-color: $yellow;
                transform: translateX(-50%);


            }
        }

        .convenzioni-divider {
            margin-bottom: $spacer;
        }
    }
}
</style>
