<template lang="html">
    <div class="gallery-container">
        <gallery-images
            class="gallery-images"
            :items="items"/>

        <gallery-background
            class="gallery-bg"
            :color="this.background"/>
    </div>
</template>

<script>
import GalleryBackground from './GalleryBackground.vue'
// import GalleryController from './GalleryController.vue'
// import GalleryFrame from './GalleryFrame.vue'
import GalleryImages from './GalleryImages.vue'

export default {
    name: 'GalleryContainer',
    components: {
        GalleryBackground,
        // GalleryController,
        // GalleryFrame,
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

    .gallery-images {
        position: absolute;
        width: calc(80% - 44px); // da rivedere per responsive
        max-width: 1100px;
        height: 100%;
        z-index: 1;
        border-style: solid;
        border-width: 16px;
        border-top-color: #e1a893;
        border-left-color: #283745;
        border-right-color: #283745;
        border-bottom-color: #e1a893;

        @include media-breakpoint-down('xl') {
            width: calc(80% - 44px); // da rivedere per responsive
        };

        @include media-breakpoint-down('md') {
            width: calc(100% - 44px); // da rivedere per responsive
        };

        @include media-breakpoint-down('xs') {
            border-width: 8px;
        }


    }

    .gallery-bg {
        position: relative;
        z-index: 0;
        width: 100%;
        max-width: 1100px;

        @include media-breakpoint-down('xl') {
            width: calc(80% - 44px); // da rivedere per responsive
        };

        @include media-breakpoint-down('xl') {
            width: calc(80% - 44px); // da rivedere per responsive
        };

        @include media-breakpoint-down('md') {
            width: calc(100% - 44px); // da rivedere per responsive
        };
    }
}
</style>
