<template lang="html">
    <div class="mobile-track container-fluid" ref="container">
        <div class="row mobile-track__row">
            <div class="col-6 mobile-track__col" ref="btn">
                <a
                    href="#"
                    @click="goToMap"
                    class="btn btn-sm btn-block btn-light-brown mobile-track__btn"
                    >raggiungici</a
                >
            </div>
            <div class="col-6 mobile-track__col" ref="btn">
                <a
                    href="tel:+393474150873"
                    class="btn btn-sm btn-block btn-light-brown mobile-track__btn"
                    >chiamaci</a
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MobileTracking",
    data: function () {
        return {
            master: null,
        };
    },
    methods: {
        goToMap: function (event) {
            event.preventDefault();
            if (
                /* if we're on iOS, open in Apple Maps */
                navigator.platform.indexOf("iPhone") != -1 ||
                navigator.platform.indexOf("iPad") != -1 ||
                navigator.platform.indexOf("iPod") != -1
            )
                window.open(
                    "maps://maps.google.com/maps?daddr=45.695823,9.659198&amp;ll=",
                    "_blank"
                );
            /* else use Google */ else
                window.open(
                    "https://maps.google.com/maps?daddr=45.695823,9.659198&amp;ll=",
                    "_blank"
                );
        },
        init: function () {
            if (!this.master) {
                let container = this.$refs.container;
                let btns = container.getElementsByClassName("col-6");
                this.master = new TimelineMax({ paused: true });
                this.master.set(btns, {
                    autoAlpha: 0,
                    yoyo: true,
                });

                this.master.fromTo(
                    container,
                    0.3,
                    {
                        y: 43,
                        ease: Power4.easeInOut,
                    },
                    {
                        y: 0,
                        ease: Power4.easeInOut,
                    },
                    0
                );

                this.master.staggerFromTo(
                    btns,
                    0.4,
                    {
                        autoAlpha: 0,
                        y: 43,
                        scale: 0.5,
                        ease: Power4.easeInOut,
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        ease: Power4.easeInOut,
                    },
                    0.4,
                    0.6
                );

                this.master.progress(1).progress(0);
                this.master.delay(0.2).play();
            }
        },
        reverse: function () {
            this.master.reverse();
        },
    },
    mounted: function () {
        this.init();
    },
    beforeDestroy: function () {
        this.master.eventCallback("onCompleteReverse", () => {
            this.master.kill();
        });
        this.reverse();
    },
};
</script>

<style lang="scss" scoped>
@import "~styles/shared";

.mobile-track {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 43px;
    width: 100vw;
    background-color: $light-cyan;
    z-index: $zindex-fixed;
    display: flex;
    justify-content: center;
    align-items: center;

    &__row {
        width: 100%;
    }
}
</style>
