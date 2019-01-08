<template lang="html">
    <div class="convenzioni">
        <div class="convenzioni-container" ref="content">
            <div class="convenzioni-content">
                <div class="convenzioni-bold-divider yellow"></div>
                <h1 ref="title" class="convenzioni-title text-white">Convenzioni</h1>
                <span class="convenzioni-subtitle text-white">Assicurazioni in convenzione diretta</span>
                <div class="row py-5 mt-5 justify-content-center">
                    <div class="col-md-3">
                        <img src="/img/logo_1.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-md-3">
                        <img src="/img/logo_2.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-md-3">
                        <img src="/img/logo_3.png" alt="" class="convenzioni-logo-img">
                    </div>
                </div>
                <span class="convenzioni-subtitle text-white">Assicurazioni in convenzione indiretta</span>
                <div class="row py-5 mt-5 justify-content-center">
                    <div class="col-md-3">
                        <img src="/img/logo_4.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-md-3">
                        <img src="/img/logo_5.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-md-3">
                        <img src="/img/logo_6.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-md-3">
                        <img src="/img/logo_7.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="margin-auto"></div>

                    <div class="col-md-3">
                        <img src="/img/logo_8.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-md-3">
                        <img src="/img/logo_9.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-md-3">
                        <img src="/img/logo_10.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-md-3">
                        <img src="/img/logo_11.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="margin-auto"></div>


                    <div class="col-12 col-md">
                        <img src="/img/logo_12.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-12 col-md">
                        <img src="/img/logo_13.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-12 col-md">
                        <img src="/img/logo_14.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-12 col-md">
                        <img src="/img/logo_15.png" alt="" class="convenzioni-logo-img">
                    </div>
                    <div class="col-12 col-md">
                        <img src="/img/logo_16.png" alt="" class="convenzioni-logo-img">
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
                max-width: 75%;
                max-height: 100%;
                width: 75%;
                height: auto !important;
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
                    margin-bottom: $spacer * 4;

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
