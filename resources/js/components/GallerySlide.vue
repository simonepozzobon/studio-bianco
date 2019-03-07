<template lang="html">
    <div class="slide-container" v-if="!this.single">
        <div class="slide-right with-filter">
            <img :src="item.before.thumb" alt="" class="img-fluid">
        </div>
        <div class="slide-left with-filter">
            <img :src="item.after.thumb" alt=""  class="img-fluid">
        </div>
    </div>
    <div class="slide-container" v-else>
        <div class="slide-single">
            <img :src="item.img" alt="" class="img-fluid">
        </div>
    </div>
</template>

<script>
export default {
    name: 'GallerySlide',
    props: {
        item: {
            type: Object,
            default: function() {}
        },
        single: {
            type: Boolean,
            default: false
        }
    },
    mounted: function() {
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

.slide-left,
.slide-right {
    border: 12px solid $white;
    margin: $spacer;
    flex: 0 0 39%;
    max-width: 39%;

    @include media-breakpoint-down('md') {
        border: 8px solid $white;
        flex: 0 0 40%;
        max-width: 40%;
        margin: $spacer / 2;
    };

    @include media-breakpoint-down('xs') {
        border: 4px solid $white;
        flex: 0 0 40%;
        max-width: 40%;
        margin: $spacer / 4;
    };

    &.with-filter {
        img {
            filter: grayscale(100%);
        }
    }
}

.slide-single {
    // border: 12px solid $white;
    // margin: $spacer;
    flex: 0 0 100%;
    max-width: 100%;

    // @include media-breakpoint-down('md') {
    //     // border: 8px solid $white;
    //     // flex: 0 0 40%;
    //     // max-width: 40%;
    //     margin: $spacer / 2;
    // };
    //
    // @include media-breakpoint-down('xs') {
    //     // border: 4px solid $white;
    //     // flex: 0 0 40%;
    //     // max-width: 40%;
    //     margin: $spacer / 4;
    // };

    &.with-filter {
        img {
            filter: grayscale(100%);
        }
    }
}
</style>
