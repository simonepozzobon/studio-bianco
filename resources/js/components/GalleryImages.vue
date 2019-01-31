<template lang="html">
    <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide
            v-for="(item, i) in this.items"
            :key="i">
            <div class="slide-container">
                <div class="slide-right">
                    <img :src="item.before.thumb" alt="" class="img-fluid">
                </div>
                <div class="slide-left">
                    <img :src="item.after.thumb" alt=""  class="img-fluid">
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'GalleryImages',
    components: {
        swiper,
        swiperSlide
    },
    props: {
        items: {
            type: Array,
            default: function() {},
        }
    },
    data: function() {
        return {
            swiperOption: {
                // some swiper options/callbacks
                // 所有的参数同 swiper 官方 api 参数
                // ...
            }
        }
    },
    mounted: function() {
        console.log(this.items)
    }

}
</script>

<style lang="scss">
@import '~styles/shared';

.slide-container {
    @include make-row();
    max-width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 10%;
    margin-left: 0;
    margin-right: 0;

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
    }
}
</style>
