<template lang="html">
    <svg id="1aae5091-b9e1-4a7d-b14e-962f5ebc125c" class="home-hor-dots" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.77 6.77" :width="width">
        <title>three-dots-divider</title>
        <g>
            <circle cx="3.38" cy="3.38" r="3.38" :style="'fill: ' + this.color"/>
            <circle cx="28.38" cy="3.38" r="3.38" :style="'fill: ' + this.color"/>
            <circle cx="53.38" cy="3.38" r="3.38" :style="'fill: ' + this.color"/>
        </g>
    </svg>

</template>

<script>
export default {
    name: 'HomeHorizontalSep',
    props: {
        color: {
            type: String,
            default: '#283745'
        },
        width: {
            type: String,
            default: '100%'
        }
    }
}
</script>

<style lang="scss">
@import '~styles/shared';
.home-hor-dots {
    max-width: 30px;
}

</style>
