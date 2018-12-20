<template lang="html">
    <div class="">
        <main-nav />
        <router-view />
        <main-footer v-if="this.$root.hasFooter"/>
    </div>
</template>

<script>
import MainNav from './MainNav.vue'
import MainFooter from './MainFooter.vue'

export default {
    name: 'MainTemplate',
    components: {
        MainNav,
        MainFooter,
    },
}
</script>

<style lang="scss">
</style>
