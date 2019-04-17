<template lang="html">
    <div class="mobile-track container-fluid">
        <div class="row mobile-track__row">
            <div class="col-6 mobile-track__col">
                <button class="btn btn-sm btn-block btn-light-brown mobile-track__btn">raggiungici</button>
            </div>
            <div class="col-6 mobile-track__col">
                <button class="btn btn-sm btn-block btn-light-brown mobile-track__btn">chiamaci</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MobileTracking',

}
</script>

<style lang="scss" scoped>
@import '~styles/shared';

.mobile-track {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 43px;
    width: 100vw;
    background-color: $light-cyan;
    z-index: $zindex-fixed;
    display: flex;
    justify-content: center;
    align-items: center;

    &__row {
        width: 100%;
    }
}
</style>
