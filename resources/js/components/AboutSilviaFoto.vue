<template lang="html">
    <div id="silvia-foto" class="silvia-foto">
        <img src="/img/silvia.jpg" alt="" class="silvia-image">
        <about-silvia-bg class="silvia-bg"/>
    </div>
</template>

<script>
import AboutSilviaBg from './AboutSilviaBg.vue'

export default {
    name: 'AboutSilviaFoto',
    components: {
        AboutSilviaBg,
    },
    mounted: function() {

    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.silvia-foto {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60%;
    top: -100%;

    .silvia-image {
        position: absolute;
        max-width: 70%;
        border: 8px solid $light-brown;
    }

    .silvia-bg {
    }
}
</style>
