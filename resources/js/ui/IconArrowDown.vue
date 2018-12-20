<template lang="html">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 24" :width="width">
        <title>arrow-down-icon</title>
        <g id="af0a32b5-f775-4ba5-b9b0-ed93232aa675" data-name="Icone">
            <polygon points="8 15.94 1.19 9.12 1.89 8.42 8 14.52 14.11 8.42 14.81 9.12 8 15.94" :style="'fill: '+ color"/>
        </g>
    </svg>
</template>

<script>
export default {
    name: 'IconArrowDown',
    props: {
        width: {
            type: String,
            default: '32px'
        },
        color: {
            type: String,
            default: '#f6f5ea'
        }
    }
}
</script>

<style lang="css">
</style>
