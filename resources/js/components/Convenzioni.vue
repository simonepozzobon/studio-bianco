<template lang="html">
    <div class="convenzioni">
        <div class="convenzioni-container" ref="content">
            <div class="convenzioni-content">
                <div class="convenzioni-bold-divider yellow"></div>
                <h1 ref="title" class="text-white">Convenzioni</h1>
                <span class="convenzioni-subtitle text-white">Assicurazioni in convenzione diretta</span>
                <div class="row py-5 mt-5 justify-content-center">
                    <div class="col-md-3">
                        <img src="/svg/unisalute.svg" alt="" class="img-fluid no-max w-75">
                    </div>
                    <div class="col-md-3">
                        <img src="/svg/blueassistance.svg" alt="" class="img-fluid no-max w-75">
                    </div>
                    <div class="col-md-3">
                        <img src="/svg/prontocare.svg" alt="" class="img-fluid no-max w-75">
                    </div>
                </div>
                <span class="convenzioni-subtitle text-white">Assicurazioni in convenzione indiretta</span>
                <div class="row py-5 justify-content-center">
                    <div class="col-md-3">
                        <img src="/svg/fasdac.svg" alt="" class="img-fluid">
                    </div>
                    <div class="col-md-3">
                        <img src="/svg/fasi.svg" alt="" class="img-fluid">
                    </div>
                    <div class="col-md-3">
                        <img src="/svg/faschim1.png" alt="" class="img-fluid">
                    </div>
                    <div class="col-md-3">
                        <img src="/svg/previmedical1.png" alt="" class="img-fluid">
                    </div>
                    <div class="margin-auto"></div>

                    <div class="col-md-3">
                        <img src="/svg/intesa.svg" alt="" class="img-fluid">
                    </div>
                    <div class="col-md-3">
                        <img src="/svg/rbm.svg" alt="" class="img-fluid">
                    </div>
                    <div class="col-md-3">
                        <img src="/svg/fondo1.png" alt="" class="img-fluid no-max">
                    </div>
                    <div class="col-md-3">
                        <img src="/svg/fisde1.png" alt="" class="img-fluid">
                    </div>
                    <div class="margin-auto"></div>


                    <div class="col">
                        <img src="/svg/quas1.png" alt="" class="img-fluid w-50">
                    </div>
                    <div class="col">
                        <img src="/svg/fiasid.svg" alt="" class="img-fluid">
                    </div>
                    <div class="col">
                        <img src="/svg/fasdip1.png" alt="" class="img-fluid w-50">
                    </div>
                    <div class="col">
                        <img src="/svg/fasie1.png" alt="" class="img-fluid">
                    </div>
                    <div class="col">
                        <img src="/svg/casagit1.png" alt="" class="img-fluid">
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
                height: 100px;
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
                    margin-right: auto;
                    margin-left: auto;
                    height: 30px;
                }
            }

            .row {
                .col-md-3, .col {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: $spacer * 4;

                    img {
                        max-width: 100%;
                        max-height: 40%;

                        &.no-max {
                            max-height: inherit;
                        }
                        &.w-50 {
                            max-height: inherit;
                        }
                    }
                }
            }
        }

        .convenzioni-subtitle {
            font-size: $h4-font-size;
            font-weight: 300;
            position: relative;

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
