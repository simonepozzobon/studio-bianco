<template lang="html">
    <svg
        class="gallery-single-controller"
        :class="directionClass, colorClass"
        @click="swiperChange"
        :width="widthPx"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 145.32 280">
        <polygon
            points="5.32 280 0 274.68 134.68 140 0 5.32 5.32 0 145.32 140 5.32 280"
            :style="'fill: '+ color"/>
    </svg>
</template>

<script>
export default {
    name: 'GallerySingleController',
    props: {
        direction: {
            type: Boolean,
            default: false,
        },
        width: {
            type: Number,
            default: 32,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        directionClass: function() {
            if (this.direction) {
                return 'is-mirror'
            }
            return null
        },
        widthPx: function() {
            if (this.width) {
                return this.width + 'px'
            }
            return '32px'
        },
        color: function() {
            if (this.isDisabled) {
                return '#e9ecef'
            }
            return '#283745'
        },
        colorClass: function() {
            if (this.isDisabled) {
                return 'is-disabled'
            }
            return null
        }
    },
    methods: {
        swiperChange: function() {
            this.$emit('slide-move', this.direction)
        },

    }
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.gallery-single-controller {
    cursor: pointer;

    &.is-mirror {
        transform: rotate(-180deg);
    }

    &.is-disabled {
        cursor: none;
    }
}
</style>
