<template lang="html">
    <div class="accordion">
        <accordion-item
            v-for="(item, i) in items"
            :key="i"
            :idx="i"
            :title="item.title"
            :description="item.description"
            @panel-open="panelOpen"
            @panel-close="panelClose"
            @panel-height-changed="panelChange"/>
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
            totalHeight: 0,
        }
    },
    methods: {
        panelChange: function(height) {
            this.$emit('panel-height-changed', height)
            this.totalHeight = this.totalHeight + height
            console.log(height)
        },
        panelOpen: function(height) {
            if (!this.$root.isMobile) {
                this.$emit('panel-open', height)
            }
            this.totalHeight = this.totalHeight + height
            this.counter++
        },
        panelClose: function(height) {
            this.counter--
            this.totalHeight = this.totalHeight + height
            if (!this.$root.isMobile) {
                this.$emit('remove-height', height)
            }
            if (this.counter <= 0) {
                this.counter = 0
                this.totalHeight = 0
                if (!this.$root.isMobile) {
                    this.$emit('panel-close')
                }
            }
        }
    }
}
</script>

<style lang="css">
</style>
