<template lang="html">
    <div class="contact">
        <div class="contact-container" ref="container">
            <div class="contact-left" ref="content">
                <contact-illust width="90%"/>
            </div>
            <div class="contact-right">
                <div class="contact-content">
                    <div class="contact-bold-divider"></div>
                    <h1 class="contact-title" ref="title">Contatti</h1>
                    <span class="contact-subtitle">Studio Bianco</span>
                    <div class="contact-v-div"></div>
                    <div class="contact-info">
                        <table class="contact-table">
                            <tr>
                                <td class="contact-table-label">
                                    Indirizzo
                                </td>
                                <td class="contact-table-detail">
                                    Via Mazzini, 3 - Bergamo
                                </td>
                            </tr>
                            <tr>
                                <td class="contact-table-label">
                                    Telefono
                                </td>
                                <td class="contact-table-detail">
                                    3474150873
                                </td>
                            </tr>
                            <tr>
                                <td class="contact-table-label">
                                    Email
                                </td>
                                <td class="contact-table-detail">
                                    silvia.citella@gmail.com
                                </td>
                            </tr>
                        </table>
                        <div class="contact-map">
                            <button class="btn btn-light">
                                <span>Vai alla mappa </span><icon-map  width="16px"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-form">
            <div class="contact-form-btn">
                <button class="btn btn-primary" @click="toggleContact">
                    <span>contattami </span><icon-arrow-down  width="16px" ref="contactIcon"/>
                </button>
            </div>
            <div class="contact-form-modal-row">
                <div class="contact-form-modal" ref="form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" name="" value="" class="form-control" placeholder="Scrivi la tua email">
                    </div>
                    <div class="form-group">
                        <label for="message">Messaggio</label>
                        <textarea name="name" rows="8" cols="80" class="form-control" placeholder="Scrivi il tuo messaggio"></textarea>
                    </div>
                    <div class="form-group send-btn">
                        <button class="btn btn-pink text-white">invia</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ContactIllust from '../components/ContactIllust.vue'
import { IconMap, IconArrowDown } from '../ui'
import { TimelineMax } from 'gsap'

export default {
    name: 'Contact',
    components: {
        ContactIllust,
        IconMap,
        IconArrowDown,
    },
    data: function() {
        return {
            formIsOpen: false,
            master: null,
        }
    },
    methods: {
        toggleContact: function() {
            let form = this.$refs.form
            if (!this.formIsOpen) {
                if (this.master) {
                    this.master.play()
                    this.formIsOpen = true
                } else {
                    this.master = new TimelineMax({
                        paused: true,
                        reversed: true,
                    })

                    TweenLite.set(form, {
                        height: 0,
                        autoAlpha: 0,
                        display: 'none',
                        transformOrigin: "center top 0",
                    })

                    this.master.to(form, .6, {
                        height: '100%',
                        scaleY: 1,
                        autoAlpha: 1,
                        display: "block",
                        //rotation: 0.01,
                        transformOrigin: "center top 0",
                        ease: Cubic.easeInOut
                    })



                    this.master.progress(1).progress(0);
                    this.master.play()
                    this.formIsOpen = true
                }
            } else {
                this.master.reverse()
                this.formIsOpen = false
            }
        },
    },
    mounted: function() {
        let form = this.$refs.form
        TweenLite.set(form, {
            height: 0,
            autoAlpha: 0,
            display: 'none',
            transformOrigin: "center top 0",
        })
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.contact {
    @include make-container();
    background-color: $pink;

    .contact-container {
        @include make-row();
        min-height: 80vh;

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

        .contact-left {
            @include make-col(6);

        }

        .contact-right {
            @include make-col(6);
        }

        .contact-content {
            padding: $spacer * 4;

            .contact-bold-divider {
                content: '';
                width: 30px;
                border-top: 6px solid $light-cyan;
                margin-bottom: $spacer;
            }

            .contact-v-div {
                content: '';
                height: 100px;
                border-left: 1px solid $light-cyan;
                margin-bottom: $spacer;
                margin-top: $spacer;
            }
        }

        .contact-title {
            color: $white;
        }

        .contact-subtitle {
            font-size: $h4-font-size;
            font-weight: 300;
            color: $white;
        }

        .contact-divider {
            margin-bottom: $spacer;
        }

        .contact-table {
            margin-bottom: $spacer * 2;

            tr {
                border: 1px solid $white;

                td {
                    padding-left: $spacer;
                    padding-right: $spacer;
                    padding-top: $spacer / 2;
                    padding-bottom: $spacer / 2;
                }

                .contact-table-label {
                    font-weight: normal;
                    padding-right: $spacer * 4;
                }
            }
        }

        .contact-map {

            .btn {
                span {
                    padding-right: $spacer;
                }
            }
        }

    }

    .contact-form {
        @include make-row();
        min-height: 20vh;
        background-color: $pink;


        .contact-form-btn {
            @include make-col(12);
            display: flex;
            justify-content: center;
            align-items: flex-start;

            .btn {
                span {
                    padding-right: $spacer;
                }
            }
        }
    }

    .contact-form-modal-row {
        display: flex;
        justify-content: center;
        // align-items: center;
        width: 100%;
        margin-bottom: 100px;

        .contact-form-modal {
            background-color: $light-brown;
            padding-left: $spacer * 2;
            padding-right: $spacer * 2;
            padding-top: $spacer * 2;
            padding-bottom: $spacer;

            position: relative;
            visibility:hidden; /* hides all .Tile-flyout on load so GSAP autoAlpha can do its thing */
            height:auto; /* tell the browser that initial height is auto */
            overflow:hidden;

            label {
                padding-left: $input-padding-x;
                color: $orange;
                font-weight: bold;
            }

            .send-btn {
                margin-top: $spacer * 2;
                display: flex;
                justify-content: center;
                align-items: center;

                .btn {
                    padding-left: $spacer * 4;
                    padding-right: $spacer * 4;
                }
            }
        }
    }

}
</style>
