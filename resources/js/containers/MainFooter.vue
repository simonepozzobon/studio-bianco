<template lang="html">
    <footer class="main-footer">
        <div class="main-footer-container" ref="container">
            <div class="main-footer-left" ref="content">
                <logo width="150px" />
            </div>
            <div class="main-footer-right">
                <div class="main-footer-content">
                    <div class="main-footer-bold-divider"></div>
                    <span class="main-footer-subtitle">Studio Bianco</span>
                    <p>
                        Indirizzo <br>
                        Telefono <br>
                        Email
                    </p>
                </div>
            </div>
        </div>
        <div class="main-footer-container">
            <div class="main-footer-privacy">
                <p class="text-center">Privacy</p>
            </div>
        </div>
    </footer>
</template>

<script>
import { Logo } from '../ui'

export default {
    name: 'MainFooter',
    components: {
        Logo,
    }
}
</script>

<style lang="scss">
@import '~styles/shared';


.main-footer {
    @include make-container();
    background-color: $light-brown;
    min-height: 20vh;
    margin-left: -15px;
    margin-right: -15px;
    width: 100vw;

    .main-footer-container {
        @include make-row();

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

        .main-footer-left {
            @include make-col(6);
            justify-content: center;
            align-items: flex-end;

            svg {
                padding-right: $spacer * 4;
            }
        }

        .main-footer-right {
            @include make-col(6);
            justify-content: center;
            align-items: flex-start;

            &::before {
                content: '';
                position: absolute;
                width: 1px;
                height: 150px;
                background-color: $black;
            }
        }

        .main-footer-content {
            padding: $spacer * 4;

            .main-footer-bold-divider {
                content: '';
                width: 30px;
                border-top: 6px solid $black;
                margin-bottom: $spacer;

            }

            .main-footer-v-div {
                content: '';
                height: 100px;
                border-left: 1px solid $pink;
                margin-bottom: $spacer;
                margin-top: $spacer;

                &.dark {
                    border-left: 1px solid $black;
                }

                &.light {
                    border-left: 1px solid $white;
                }
            }
        }

        .main-footer-subtitle {
            font-size: $h4-font-size;
            font-weight: 300;
        }

        .main-footer-divider {
            margin-bottom: $spacer;
        }
    }

    .main-footer-privacy {
        @include make-col(12);
        display: flex;
        justify-content: center;

        p {
            font-size: $h4-font-size;
        }
    }
}

</style>
