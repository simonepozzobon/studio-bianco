<template lang="html">
    <div class="about">
        <ui-section>
            
        </ui-section>
    </div>
</template>

<script>
import UiSection from '../ui/UiSection.vue'

export default {
    name: 'About',
    components: {
        UiSection
    },
    watch: {
        '$root.window': function(value) {
        }
    },
    data: function() {
        return {
            studioWidth: '83%',
            silviaWidth: '69.5%',
            silviaFotoWidth: '59.5%',
            pauraWidth: '85%',
            studioHeight: 0,
            silviaHeight: 0,
            pauraHeight: 0,
            silvia: false,
            esteticaArr: null,
        }
    },
    methods: {
        scrollDownHandler: function(e) {
            if (e.type == 'enter') {
                this.$refs.scrollDown.reset()
            } else if (e.type == 'exit') {
                this.$refs.scrollDown.hide()
            }
        },
    },
    mounted: function() {
        this.$root.navColor = 2

    }
}
</script>

<style lang="scss">
@import '~styles/shared';

</style>
