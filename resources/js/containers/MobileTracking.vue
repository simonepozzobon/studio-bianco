<template lang="html">
    <div class="mobile-track container-fluid" ref="container">
        <div class="row mobile-track__row">
            <div class="col-6 mobile-track__col" ref="btn">
                <button class="btn btn-sm btn-block btn-light-brown mobile-track__btn">raggiungici</button>
            </div>
            <div class="col-6 mobile-track__col" ref="btn">
                <button class="btn btn-sm btn-block btn-light-brown mobile-track__btn">chiamaci</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MobileTracking',
    data: function() {
        return {
            master: null,
        }
    },
    methods: {
        init: function() {
            if (!this.master) {
                let container = this.$refs.container
                let btns = container.getElementsByClassName('col-6')
                this.master = new TimelineMax({ paused: true })
                this.master.set(btns, {
                    autoAlpha: 0,
                    yoyo: true,
                })

                this.master.fromTo(container, .3, {
                    y: 43,
                    ease: Power4.easeInOut
                }, {
                    y: 0,
                    ease: Power4.easeInOut
                }, 0)

                this.master.staggerFromTo(btns, .4, {
                    autoAlpha: 0,
                    y: 43,
                    scale: .5,
                    ease: Power4.easeInOut
                }, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    ease: Power4.easeInOut
                }, .4, .6)

                this.master.progress(1).progress(0)
                this.master.delay(.2).play()
            }
        },
        reverse: function() {
            this.master.reverse()
        }
    },
    mounted: function() {
        this.init()
    },
    beforeDestroy: function() {
        this.master.eventCallback('onCompleteReverse', () => {
            this.master.kill()
        })
        this.reverse()
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

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
