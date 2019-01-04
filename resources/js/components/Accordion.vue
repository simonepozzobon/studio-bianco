<template lang="html">
    <div class="accordion">
        <accordion-item
            v-for="(item, i) in items"
            :key="i"
            :idx="i"
            :title="item.title"
            :description="item.description"/>
    </div>
</template>

<script>
import AccordionItem from './AccordionItem.vue'
export default {
    name: 'Accordion',
    components: {
        AccordionItem,
    },
    props: {
        items: {
            type: Array,
            default: function() {}
        }
    }
}
</script>

<style lang="css">
</style>
