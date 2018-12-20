<template lang="html">
    <div class="main">
        <home-split-menu ref="splitMenu"/>
    </div>
</template>

<script>
import HomeSplitMenu from '../components/HomeSplitMenu.vue'

export default {
    name: 'Home',
    components: {
        HomeSplitMenu,
    },
    mounted: function() {
        this.$root.navColor = 1
        this.$refs.splitMenu.setViewport(this.$root.window.h)
        this.$refs.splitMenu.fillScreen()
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.main {
}
</style>
