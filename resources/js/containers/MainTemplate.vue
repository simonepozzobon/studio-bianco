<template lang="html">
    <div class="">
        <main-nav />
        <transition>
            <router-view />
        </transition>
        <main-footer v-if="this.$root.hasFooter"/>
    </div>
</template>

<script>
import MainNav from './MainNav.vue'
import MainFooter from './MainFooter.vue'

export default {
    name: 'MainTemplate',
    props: {
        estetica: {
            type: String,
            default: function() {},
        },
        odontoiatria: {
            type: String,
            default: function() {},
        }
    },
    components: {
        MainNav,
        MainFooter,
    },
    beforeMount: function() {
        let parsedEstetica = JSON.parse(this.estetica)
        let parsedOdontoiatria = JSON.parse(this.odontoiatria)

        this.$root.estetica = parsedEstetica
        this.$root.odontoiatria = parsedOdontoiatria
    }
}
</script>

<style lang="scss">
</style>
