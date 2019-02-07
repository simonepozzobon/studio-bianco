<template lang="html">
    <div>
        <div class="modal fade" id="cookiesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-pink">
                        <h5 class="modal-title" id="exampleModalLabel"></h5>
                        <a href="#" class="cookie-close" data-dismiss="modal" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.71 8.71">
                                <g id="3ac2efaf-5ded-435c-8b33-467b264bc3a7" data-name="Layer 1">
                                    <g>
                                        <line x1="8.64" y1="0.07" x2="0.07" y2="8.64" style="fill: none;stroke: #293745;stroke-miterlimit: 10;stroke-width: 0.203061364420715px"/>
                                        <line x1="8.64" y1="8.64" x2="0.07" y2="0.07" style="fill: none;stroke: #293745;stroke-miterlimit: 10;stroke-width: 0.203061364420715px"/>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <div class="modal-body">
                        <p class="cookie-title">
                            Cookies & Privacy
                        </p>
                        <p>
                            Il presente sito web utilizza cookie tecnici per garantire il corretto funzionamento delle procedure e migliorare l'esperienza di uso delle applicazioni online.
                            Il presente documento fornisce informazioni sull'uso dei cookie e di tecnologie similari, su come sono utilizzati dal sito e su come gestirli.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Maggiori Info</button>
                        <button type="button" class="btn btn-pink" @click="cookieAccepted">Accetta</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CookiesPanel',
    data: function() {
        return {
            cookie: null,
            accepted: false,
        }
    },
    methods: {
        cookieAccepted: function() {
            axios.post('/api/cookies/accepted').then(response => {
                this.$cookie.set('studio-bianco-cookie-policy', JSON.stringify(response.data))
                $(this.$refs.modal).modal('hide')
            })
        }
    },
    mounted: function() {
        if (!this.accepted) {
            let cookie = this.$cookie.get('studio-bianco-cookie-policy')
            if (cookie) {
                this.cookie = JSON.parse(cookie)
            } else {
                $(this.$refs.modal).modal('show')

            }
        }
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.cookie-close {
    width: $spacer * 2;
}

.cookie-title {
    font-weight: bold;
}

.modal-footer {
    padding-top: 0;
}
</style>
