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
}
</script>

<style lang="scss">
@import '~styles/shared';

.main {
}
</style>
