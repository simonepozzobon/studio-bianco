<template lang="html">
    <div class="accordion">
        <accordion-item
            v-for="(item, i) in items"
            :key="i"
            :idx="i"
            :title="item.title"
            :description="item.description"
            @panel-open="panelOpen"
            @panel-close="panelClose"/>
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
    },
    data: function() {
        return {
            counter: 0,
        }
    },
    methods: {
        panelOpen: function() {
            this.$emit('panel-open')
            this.counter++
        },
        panelClose: function() {
            this.counter--
            if (this.counter <= 0) {
                this.counter = 0
                this.$emit('panel-close')
            }
        }
    }
}
</script>

<style lang="css">
</style>
