<template lang="html">
    <swiper
        :options="swiperOption"
        ref="Swiper"
        @ready="init"
        @imagesReady="imagesReady">
        <!-- slides -->
        <swiper-slide
            v-for="(item, i) in this.items"
            :key="i">
            <gallery-slide :item="item" :single="single"/>
        </swiper-slide>
        <div ref="prev" class="swiper-button-prev" slot="button-prev"></div>
        <div ref="next" class="swiper-button-next" slot="button-next"></div>
    </swiper>
</template>

<script>
import GallerySlide from './GallerySlide.vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'GalleryImages',
    components: {
        GallerySlide,
        swiper,
        swiperSlide
    },
    props: {
        items: {
            type: Array,
            default: function() {},
        },
        single: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        swiper: function() {
            return this.$refs.Swiper.swiper
        }
    },
    data: function() {
        return {
            swiperOption: {
                updateOnImagesReady: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        }
    },
    methods: {
        imagesReady: function() {
            this.$emit('images-ready')
        },
        init: function() {
            this.$emit('ready')
        },
    },
    mounted: function() {
    }

}
</script>

<style lang="scss">
@import '~styles/shared';

.swiper-button-prev {
    left: 5%;
    background-image: url('/svg/prev-arrow.svg');
    background-position: center;
    background-size: contain;

    @include media-breakpoint-down('xs') {
        left: 4%;
        width: 12px;
    };
}

.swiper-button-next {
    right: 5%;
    background-image: url('/svg/next-arrow.svg');
    background-position: center;
    background-size: contain;
    @include media-breakpoint-down('xs') {
        right: 4%;
        width: 12px;
    };
}

.slide-container {
    @include make-row();
    max-width: 100%;
    justify-content: center;
    align-items: center;
    padding: 0 10%;
    margin-left: 0;
    margin-right: 0;


}
</style>
