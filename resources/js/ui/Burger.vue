<template lang="html">
    <svg id="burger" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" :width="width" ref="burger" @click="toggleMobile">
        <title>menu-burger</title>
        <circle cx="20" cy="20" r="19" style="fill: #283745"/>
        <g>
            <rect x="12.83" y="14.42" width="14.34" height="1.59" style="fill: #fbfaef"/>
            <rect x="12.83" y="23.98" width="14.34" height="1.59" style="fill: #fbfaef"/>
            <rect x="12.83" y="19.2" width="14.34" height="1.59" style="fill: #fbfaef"/>
        </g>
    </svg>
</template>

<script>
export default {
    name: 'Burger',
    props: {
        width: {
            type: Number,
            default: 40,
        }
    },
    watch: {
        '$root.window.w': function(w) {
            if (w <= 576) {
                this.$refs.burger.style.top = '23px'
            } else {
                this.$refs.burger.style.top = '50px'
            }
        }
    },
    methods: {
        toggleMobile: function() {
            this.$emit('toggle-mobile')
        }
    }
}
</script>

<style lang="scss">
@import '~styles/shared';

#burger {
    position: fixed;
    right: $spacer;
}
</style>
