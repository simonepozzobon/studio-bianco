<template lang="html">
    <div
        data-aos="fade-up" data-aos-delay="0"
        class="ui-accordion"
        :class="[fullWidthClass, marginClass]"
        v-if="isDynamic">

        <ui-accordion-single
            v-for="(item, i, key) in this.elements"
            :key="i"
            :idx="key"
            :title="item.title"
            :item="item"/>
    </div>

    <div
        data-aos="fade-up" data-aos-delay="0"
        class="ui-accordion"
        :class="[fullWidthClass, marginClass]"
        v-else>
        <slot></slot>
    </div>
</template>

<script>
import UiAccordionSingle from './UiAccordionSingle.vue'

export default {
    name: 'UiAccordion',
    components: {
        UiAccordionSingle,
    },
    props: {
        isDynamic: {
            type: Boolean,
            default: false,
        },
        elements: {
            type: Array,
            default: function() {}
        },
        title: {
            type: String,
            default: 'titolo'
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        hasMargin: {
            type: Boolean,
            default: true,
        },
        scrollOnComplete: {
            type: Boolean,
            default: true,
        }
    },
    computed: {
        fullWidthClass: function() {
            if (this.fullWidth) {
                return 'ui-accordion--fullwidth'
            }
        },
        marginClass: function() {
            if (!this.hasMargin) {
                return 'ui-accordion--no-margin'
            }
        }
    },
    data: function() {
        return {
            isOpen: false,
        }
    },
    methods: {
    },
    mounted: function() {
    }
}
</script>

<style lang="scss" >
@import '~styles/shared';

.ui-accordion {
    $self: &;
    position: relative;
    margin-bottom: $spacer * 2 * 1.618;

    &--fullwidth {
        width: 100%;
    }

    &--no-margin {
        margin-bottom: 0;
    }
}

</style>
