<template lang="html">
    <div class="about">
        <div class="about-container" ref="container">
            <div class="about-left" ref="studioContainer">
                <div class="about-content" ref="panel">
                    <div class="about-bold-divider"></div>
                    <h1 ref="title" class="about-title">About</h1>
                    <span class="about-subtitle">Lo Studio</span>
                    <div class="about-v-div"></div>
                    <p>
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
                    </p>
                </div>
            </div>
            <div class="about-right about-illust-top">
                <about-illust
                    :width="studioWidth"
                    ref="studio"
                    trigger="about-studio-illust-ref"
                    :containerHeight="studioHeight"/>
                <div id="about-studio-illust-ref" class="ref"></div>
            </div>
        </div>
        <div class="about-container bg-light-cyan">
            <div class="about-right order-lg-2">
                <div class="about-content">
                    <div class="about-bold-divider dark"></div>
                    <h1 class="about-title text-white" ref="title">Silvia Citella</h1>
                    <span class="about-subtitle text-white">Chi sono</span>
                    <div class="about-v-div dark"></div>
                    <p>
                        Nel 1999 ho ottenuto una laurea a pieni voti in medicina e chirurgia e, nel 2004, in odontoiatria e protesi dentale. Nei primi 8 anni della mia carriera ho lavorato come medico geriatra in RSA e nell’ambito della medicina di base. Successivamente, ho partecipato a corsi di perfezionamento in medicina estetica presso la scuola Agorà di Milano e collaborato con diversi studi dentistici di Bergamo e provincia.<br>
                        Frequento regolarmente corsi di aggiornamento, sono socia ANDI, possiedo una certificazione Invisalign e oggi, dopo più di 10 anni di carriera, ho aperto il mio studio.<br>
                        <br>
                        La mia esperienza professionale, inizialmente come medico chirurgo e poi come odontoiatra, mi consente di avere una visione olistica del paziente e di prendermene cura durante tutto il percorso, senza sottovalutare nessun aspetto.<br>
                        La mia sfida è interpretare i bisogni dei pazienti; il mio obiettivo, tradurli in sorrisi.<br>
                    </p>
                    <button class="btn btn-primary" @click="toggleSilvia">
                        <span>Silvia Citella - foto </span>
                    </button>
                </div>
            </div>
            <div class="about-left position-relative about-illust-top" ref="silviaContainer">
                <about-silvia-illust
                    :width="silviaWidth"
                    ref="silvia"
                    trigger="about-silvia-illust-ref"
                    :containerHeight="silviaHeight"/>
                <about-silvia-foto
                    :width="silviaFotoWidth"
                    ref="silvia"
                    :containerHeight="silviaHeight"
                />
                <div id="about-silvia-illust-ref" class="ref"></div>
            </div>
        </div>
        <div class="about-container bg-light-yellow">
            <div class="about-left" ref="content">
                <div class="about-content">
                    <div class="about-bold-divider light"></div>
                    <h1 class="about-title text-purple" ref="title">Paura del dentista</h1>
                    <div class="about-v-div light"></div>
                    <p>
                        Il principale motivo per cui le persone evitano di andare dal dentista è il senso di colpa per aver rimandato le cure dentali di cui avevano bisogno e, per questo, hanno paura di essere giudicate. Molti altri, invece, associano il dentista a episodi dolorosi o traumatici del proprio passato.<br>
                        In generale, spesso, quella dal dentista non è percepita come un’esperienza piacevole.<br>
                        Studio Bianco ne è consapevole e, per questo, vuole comprendere le paure dei pazienti per gestirle e superarle, nel massimo rispetto di ciascun caso. Questo percorso, che ha inizio ancor prima delle cure vere e proprie, mira a consolidare l’autostima e a instaurare un rapporto di fiducia, eliminando la preoccupazione per il giudizio altrui. <br>
                        Come? Tramite una visita, diversa dal solito, in uno spazio neutro dedicato e, più in generale, tramite un approccio progressivo e comportamentale, per superare insieme le paure senza farmaci e sedazioni.<br>
                        Inoltre, Studio Bianco offre un’odontoiatria non invasiva e sedativa, con trattamenti a “paura zero”, come, ad esempio, la sedazione cosciente. Si tratta di una tecnica di ansiolisi (e non anestesiologica), messa a punto dal dott. Henry Langa, laureato in odontoiatria a New York, che consiste nella somministrazione di una miscela di ossigeno e protossido d’azoto, detto anche “gas esilarante”. Il paziente sedato è sveglio e cosciente, i suoi riflessi di tosse e deglutizione sono mantenuti e, inoltre, prova un piacevole senso di relax. I principali vantaggi di questa tecnica sono la rapidità di induzione e il completo recupero funzionale in tempi ridottissimi. Non si conoscono casi di allergia, in quanto il protossido non viene metabolizzato ma eliminato con la respirazione.<br>
                        La programmazione di ciascun trattamento viene adeguata alle esigenze e alla disponibilità dei pazienti, in modo da ottimizzare le tempistiche e ridurre al minimo il numero di visite.<br>
                    </p>
                </div>
            </div>
            <div class="about-right position-relative about-illust-top paura" ref="pauraContainer">
                <about-paura-illust
                    :width="pauraWidth"
                    ref="paura"
                    trigger="about-paura-illust-ref"
                    :containerHeight="pauraHeight"/>
                <div id="about-paura-illust-ref" class="ref"></div>
            </div>
        </div>
        <main-footer />
    </div>
</template>

<script>
import AboutIllust from '../components/AboutIllust.vue'
import AboutPauraIllust from '../components/AboutPauraIllust.vue'
import AboutSilviaFoto from '../components/AboutSilviaFoto.vue'
import AboutSilviaIllust from '../components/AboutSilviaIllust.vue'
import MainFooter from '../containers/MainFooter.vue'

export default {
    name: 'About',
    components: {
        AboutIllust,
        AboutPauraIllust,
        AboutSilviaFoto,
        AboutSilviaIllust,
        MainFooter,
    },
    watch: {
        '$root.window': function(value) {
            this.positionIllustration()
            this.getContainersHeight()

            if (value.w > 1920) {
                this.studioWidth = '70%'
                this.silviaWidth = '49.5%'
                this.silviaFotoWidth = '59.5%'
                this.pauraWidth = '76%'
            } else {
                this.studioWidth = '83%'
                this.silviaWidth = '69.5%'
                this.silviaFotoWidth = '79.5%'
                this.pauraWidth = '85%'
            }
        }
    },
    data: function() {
        return {
            studioWidth: '83%',
            silviaWidth: '69.5%',
            silviaFotoWidth: '79.5%',
            pauraWidth: '85%',
            studioHeight: 0,
            silviaHeight: 0,
            pauraHeight: 0,
            silvia: false,
        }
    },
    methods: {
        getContainersHeight: function() {
            this.studioHeight = this.$refs.studioContainer.offsetHeight
            this.silviaHeight = this.$refs.silviaContainer.offsetHeight
            this.pauraHeight = this.$refs.pauraContainer.offsetHeight
        },
        positionIllustration: function() {
            let w = this.$root.window.w
            if (w > 576 && w < 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
            } else if (w >= 1920) {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 30 + 'px'
                this.$refs.studio.$el.style.paddingTop = '5%'
                this.$refs.silvia.$el.style.paddingTop = '20%'
                this.$refs.paura.$el.style.paddingTop = '10%'
                this.studioWidth = '70%'
                this.silviaWidth = '49.5%'
                this.silviaFotoWidth = '59.5%'
                this.pauraWidth = '76%'
            } else {
                this.$refs.container.style.paddingTop = this.$root.navbarHeight + 'px'
            }

            if (!this.$root.isMobile) {
                let contentHeight = this.$refs.panel.offsetHeight
                let windowHeight = this.$root.window.h - this.$root.navbarFullHeight
                let illustHeight = this.$refs.studio.$el.offsetHeight

                if (contentHeight <= windowHeight) {
                    this.$refs.studioContainer.style.position = 'relative'
                    this.$refs.panel.style.position = 'absolute'
                    this.$refs.panel.style.top = '5vh'
                    this.$refs.studio.$el.style.position = 'absolute'
                    this.$refs.studio.$el.style.top = '5vh'
                } else {
                    this.$refs.studioContainer.style.position = null
                    this.$refs.panel.style.position = null
                    this.$refs.studio.$el.style.position = null
                    this.$refs.panel.style.top = null
                }

                if (illustHeight > contentHeight) {
                    let delta = (illustHeight - contentHeight) + windowHeight
                    this.$refs.container.style.height = delta + 'px'
                } else {
                    this.$refs.container.style.paddingBottom = null
                }
            } else {
                this.$refs.studioContainer.style.position = null
                this.$refs.panel.style.position = null
                this.$refs.studio.$el.style.position = null
                this.$refs.panel.style.top = null
            }
        },
        toggleSilvia: function() {
            if (!this.silvia && !this.$root.isMobile) {
                let master = new TimelineMax({
                    paused: true
                })
                master.fromTo('#silvia-illust', 1, {
                    yPercent: 0,
                }, {
                    yPercent: 100,
                    ease: Power4.easeInOut
                }, 0)

                master.fromTo('#silvia-foto', 1, {
                    yPercent: -100,
                }, {
                    yPercent: 100,
                    ease: Power4.easeInOut,
                    onComplete: () => {
                        this.silvia = true
                    }
                }, 0)
                master.play()
            } else {
                let master = new TimelineMax({
                    paused: true
                })
                master.fromTo('#silvia-illust', 1, {
                    yPercent: 100,
                }, {
                    yPercent: 0,
                    ease: Power4.easeInOut
                }, 0)

                master.fromTo('#silvia-foto', 1, {
                    yPercent: 100,
                }, {
                    yPercent: -100,
                    ease: Power4.easeInOut,
                    onComplete: () => {
                        this.silvia = false
                    }
                }, 0)
                master.play()
            }
        }
    },
    mounted: function() {
        this.$root.navColor = 2
        this.positionIllustration()
        this.getContainersHeight()
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

// #about-studio-illust-ref,
// #about-silvia-illust-ref,
// #about-paura-illust-ref {
//     width: 300px;
//     background-color: $red;
//     height: 1px;
// }

.about {
    @include make-container();
    background-color: $light-brown;

    .about-container {
        @include make-row();
        min-height: 100vh;
        max-width: 100vw;
        overflow: hidden;

        > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;

            @include media-breakpoint-down('md') {
                position: inherit;
                text-align: center;
            }

            > svg {
                margin-bottom: $spacer * 2;
            }

            h1 {
                display: block;
            }

                &.about-illust-top {
                    justify-content: flex-start;
                    @include media-breakpoint-up('xxl') {
                        justify-content: center;
                    }

                    .ref {
                        position: absolute;
                        top: 0;
                    }

                    &.paura {
                        align-items: flex-end;
                        padding-bottom: $spacer * 2;
                    }
                }

                &.about-illust-bottom {
                    justify-content: flex-end;
                    @include media-breakpoint-up('xxl') {
                        justify-content: center;
                    }

                    .ref {
                        position: absolute;
                        bottom: 0;
                    }
                }
        }

        .about-left {
            @include make-col(6);
            @include media-breakpoint-down('md') {
                @include make-col(12);
            }

        }

        .about-right {
            @include make-col(6);
            @include media-breakpoint-down('md') {
                @include make-col(12);
            }

        }

        .about-content {
            padding: $spacer * 4;
            font-family: $font-family-custom;

            .btn {
                font-family: $font-family-sans-serif;
            }

            .about-bold-divider {
                content: '';
                width: 30px;
                border-top: 6px solid $pink;
                margin-bottom: $spacer;

                &.dark {
                    border-top: 6px solid $black;
                }

                &.light {
                    border-top: 6px solid $white;
                }

                @include media-breakpoint-down('md') {
                    margin-left: auto;
                    margin-right: auto;
                }
            }

            .about-v-div {
                content: '';
                height: 53px;
                width: 1px;
                border-left: 1px solid $pink;
                margin-bottom: $spacer;
                margin-top: $spacer;

                &.dark {
                    border-left: 1px solid $black;
                }

                &.light {
                    border-left: 1px solid $white;
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
        }

        .about-title {
            font-size: calc(100% + 1vw + 1vh);
        }

        .about-subtitle {
            font-family: $font-family-sans-serif;
            font-size: calc(10% + 1vw + 1vh);
            font-weight: 300;

            @include media-breakpoint-down('md') {
                font-size: calc(30% + 1vw + 1vh);
                text-align: center;
            }
            @include media-breakpoint-down('xs') {
                font-size: calc(50% + 1vw + 1vh);
            }
        }

        .about-divider {
            margin-bottom: $spacer;
        }
    }
}

</style>
