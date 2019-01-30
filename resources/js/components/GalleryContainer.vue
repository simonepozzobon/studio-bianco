<template lang="html">
    <div class="gallery-container">
        <gallery-images
            class="gallery-images"/>

        <!-- <gallery-controller
            class="gallery-controller"/> -->

        <gallery-background-blue
            class="gallery-bg"
            v-if="this.background == 'blue'"/>

        <gallery-background-brown
            class="gallery-bg"
            v-else/>
    </div>
</template>

<script>
import GalleryBackgroundBlue from './GalleryBackgroundBlue.vue'
import GalleryBackgroundBrown from './GalleryBackgroundBrown.vue'
import GalleryController from './GalleryController.vue'
import GalleryImages from './GalleryImages.vue'

export default {
    name: 'GalleryContainer',
    components: {
        GalleryBackgroundBlue,
        GalleryBackgroundBrown,
        GalleryController,
        GalleryImages,
    },
    props: {
        background: {
            type: String,
            default: 'blue'
        }
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.gallery-container {
    position: relative;
    z-index: 1;

    .gallery-controller {
        position: absolute;
        z-index: 2;
    }

    .gallery-images {
        position: absolute;
        width: calc(100% - 44px); // da rivedere per responsive
        left: 22px;
        height: 100%;
        z-index: 1;
    }

    .gallery-bg {
        position: relative;
        z-index: 0;
    }
}
</style>
