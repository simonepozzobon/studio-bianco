<template lang="html">
    <div class="gallery-container">
        <gallery-images
            class="gallery-images"
            :items="items"/>

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
        },
        items: {
            type: Array,
            default: function() {},
        }
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.gallery-container {
    position: relative;
    width: 100%; // da rivedere per responsive
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;


    .gallery-controller {
        position: absolute;
        z-index: 2;
    }

    .gallery-images {
        position: absolute;
        width: calc(80% - 44px); // da rivedere per responsive
        max-width: 1100px;
        height: 100%;
        z-index: 1;

        @include media-breakpoint-down('xl') {
            width: calc(80% - 44px); // da rivedere per responsive
        };

        @include media-breakpoint-down('md') {
            width: calc(100% - 44px); // da rivedere per responsive
        };
    }

    .gallery-bg {
        position: relative;
        z-index: 0;
        width: 100%;
        max-width: 1100px;

        @include media-breakpoint-down('xl') {
            width: calc(80% - 44px); // da rivedere per responsive
        };

        @include media-breakpoint-down('md') {
            width: calc(100% - 44px); // da rivedere per responsive
        };
    }
}
</style>
