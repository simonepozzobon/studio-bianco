<template lang="html">
    <div class="">
        <main-nav />
        <router-view />
    </div>
</template>

<script>
import MainNav from './MainNav.vue'

export default {
    name: 'MainTemplate',
    components: {
        MainNav,
    }
}
</script>

<style lang="scss">
</style>
