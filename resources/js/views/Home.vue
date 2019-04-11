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
    metaInfo: function() {
        return {
            title: this.$root.seos[0].title,
            meta: [
                {
                    property: 'og:title', vmid: 'og:title', content: this.$root.seos[0].title,
                },
                {
                    property: 'twitter:title', vmid: 'twitter:title', content: this.$root.seos[0].title,
                },
                {
                    vmid: 'description', content: this.$root.seos[0].description,
                },
                {
                    property: 'og:description', vmid: 'og:description', content: this.$root.seos[0].description,
                },
                {
                    property: 'twitter:description', vmid: 'twitter:description', content: this.$root.seos[0].description,
                },
                {
                    property: 'og:image', vmid: 'og:image', content: this.$root.seos[0].img,
                },
                {
                    property: 'twitter:image', vmid: 'twitter:image', content: this.$root.seos[0].img,
                },
                {
                    property: 'og:url', vmid: 'og:url', content: window.location.href,
                },
            ],
        }
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
