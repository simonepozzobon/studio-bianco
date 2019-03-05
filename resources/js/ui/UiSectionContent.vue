<template lang="html">
    <div class="ui-section-content">
        <div class="ui-section-content__divider"></div>
        <h1 ref="title" class="ui-section-content__title">{{ title }}</h1>
        <span class="ui-section-content__subtitle">{{ subtitle }}</span>
        <div class="ui-section-content__vdiv"></div>
        <p>
            <slot></slot>
        </p>
    </div>
</template>

<script>
export default {
    name: 'UiSectionContent',
    props: {
        title: {
            type: String,
            default: 'Titolo',
        },
        subtitle: {
            type: String,
            default: 'Sottotitolo',
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.ui-section-content {
    padding: $spacer * 4;
    font-family: $font-family-custom;

    @include media-breakpoint-down('sm') {
        padding-top: $spacer * 4;
        padding-left: $spacer * 4;
        padding-right: $spacer * 4;
        padding-bottom: 0;
    }

    &__divider {
        content: '';
        width: 30px;
        border-top: 6px solid $pink;
        margin-bottom: $spacer;

        &.dark {
            border-top: 6px solid $black;
        }

        &.light {
            border-top: 6px solid $white;
        }

        @include media-breakpoint-down('md') {
            margin-left: auto;
            margin-right: auto;
        }
    }

    &__title {
        font-size: calc(100% + 1vw + 1vh);
    }

    &__subtitle {
        font-family: $font-family-sans-serif;
        font-size: calc(10% + 1vw + 1vh);
        font-weight: 300;

        @include media-breakpoint-down('md') {
            font-size: calc(30% + 1vw + 1vh);
            text-align: center;
        }
        @include media-breakpoint-down('xs') {
            font-size: calc(50% + 1vw + 1vh);
        }
    }

    &__vdiv {
        content: '';
        height: 53px;
        width: 1px;
        border-left: 1px solid $pink;
        margin-bottom: $spacer;
        margin-top: $spacer;

        &.dark {
            border-left: 1px solid $black;
        }

        &.light {
            border-left: 1px solid $white;
        }

        @include media-breakpoint-down('md') {
            margin-left: auto;
            margin-right: auto;
            height: 29px;
        }

        @include media-breakpoint-down('xs') {
            height: 13px;
        }
    }
}
</style>
