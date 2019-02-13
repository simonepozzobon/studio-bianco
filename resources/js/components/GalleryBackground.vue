<template lang="html">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1067.17 621.52">
        <rect x="0" y="0" width="1067.17" height="621.52" :fill="this.colorHex"/>
    </svg>
</template>

<script>
export default {
    name: 'GalleryBackground',
    props: {
        color: {
            type: String,
            default: 'blue'
        }
    },
    computed: {
        colorHex: function() {
            if (this.color == 'blue') {
                return '#b5c9d3'
            }
            return '#e0be81'
        }
    }
}
</script>

<style lang="css">
</style>
